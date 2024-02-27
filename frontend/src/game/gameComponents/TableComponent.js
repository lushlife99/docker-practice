import axios from "axios";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BASE_URL } from "../../api";
import { client } from "../../client";
import Player from "./Player";
import { PiPokerChipBold } from "react-icons/pi";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { IoArrowBackOutline } from "react-icons/io5";

const TableContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas:
    "boardNumber top playerCount"
    "left table right"
    ". bottom .";

  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;
const PlayerCount = styled.span`
  color: white;
  font-weight: bold;
  font-size: 38px;
  height: 5%;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-top: 10px;
  grid-area: playerCount;
`;

const Table = styled.div`
  position: relative;
  width: 60vw;
  height: 50vh;
  border-radius: 250px;
  background-image: linear-gradient(135deg, #6e1410 0%, #a71f17 100%);
  box-shadow: 0 0 50px 0px rgba(0, 0, 0, 0.75);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  border: 15px solid #654b45;
  grid-area: table;
`;
const PlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  ${(props) => {
    if (props.position === "bottom") {
      return "grid-area : bottom;";
    } else if (props.position === "top") {
      return "grid-area : top;";
    } else if (props.position === "left") {
      return "grid-area : left;";
    } else if (props.position === "right") {
      return "grid-area : right;";
    }
  }}
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 250px;
  width: 100%;
  height: 100%;
`;
const getCardShape = (shape) => {
  switch (shape) {
    case 0:
      return "spades";
    case 1:
      return "diamonds";
    case 2:
      return "hearts";
    case 3:
      return "clubs";
    default:
      return "";
  }
};
const getCardNum = (num) => {
  if (num >= 0 && num <= 8) {
    return num + 2;
  } else {
    switch (num) {
      case 9:
        return "jack";
      case 10:
        return "queen";
      case 11:
        return "king";
      case 12:
        return "ace";
      default:
        return "";
    }
  }
};
const CardBorder = styled.div`
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  border: 2px solid #fbc531;
  box-shadow: 0 0 10px rgba(251, 197, 49, 0.7); /* 후광 효과 지정 */
  border-radius: 8px; /* 테두리 모서리를 둥글게 만듦 */
`;

const Card1 = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    props.$card1shape !== null
      ? `url("/images/${getCardNum(props.$card1num)}_of_${getCardShape(
          props.$card1shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card2 = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    props.$card2shape !== null
      ? `url("/images/${getCardNum(props.$card2num)}_of_${getCardShape(
          props.$card2shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card3 = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    props.$card3shape !== null
      ? `url("/images/${getCardNum(props.$card3num)}_of_${getCardShape(
          props.$card3shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;
const Card4 = styled(motion.div)`
  position: relative;
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    props.$card4shape !== null
      ? `url("/images/${getCardNum(props.$card4num)}_of_${getCardShape(
          props.$card4shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
  border-radius: 10px;
`;
const Card5 = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  width: 100px;
  height: 150px;
  background-image: ${(props) =>
    props.$card5shape !== null
      ? `url("/images/${getCardNum(props.$card5num)}_of_${getCardShape(
          props.$card5shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 10px;
`;

const SubPlayerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const EmptyBox = styled.div``;

const PotContainer = styled.div``;

const Pot = styled.span`
  color: white;
  font-weight: bolder;
  font-size: 24px;
  color: yellow;
`;

const ChipContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: #0097e6;
    width: 30px;
    height: 30px;
  }
`;
const Chip = styled.div`
  color: white;
  font-weight: bold;
`;
const UserProfileContainer = styled.div`
  display: flex;
`;
const UserProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PlayerName = styled.span`
  color: gray;
  font-weight: bold;
  font-size: 24px;
`;
const PlayerImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UserMoneyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px 10px;
  border-radius: 10px;
`;
const UserMoney = styled.span`
  color: white;
  font-weight: bold;
  font-size: 24px;
`;

const winnerVar = {
  start: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.4,
    },
  },
};

const VictoryContainer = styled(motion.div)`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  z-index: 999;
  width: 20vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VictoryMessage = styled.div`
  color: #154734;
  font-size: 30px;
  font-weight: bold;
`;
const PositionButton = styled.button`
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const BoardNumber = styled.div`
  color: white;
  font-weight: bold;
  font-size: 38px;
  height: 5%;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-top: 10px;
  grid-area: boardNumber;
  padding-top: 10px;
`;

function TableComponent({ board, myPlayer, message, userData, userId }) {
  const [others, setOthers] = useState([]);
  const numOfOtherPlayers = 5;

  const card1Shape = Math.floor(board.communityCard1 / 13);
  const card2Shape = Math.floor(board.communityCard2 / 13);
  const card3Shape = Math.floor(board.communityCard3 / 13);
  const card4Shape = Math.floor(board.communityCard4 / 13);
  const card5Shape = Math.floor(board.communityCard5 / 13);
  const card1Num = board.communityCard1 % 13;
  const card2Num = board.communityCard2 % 13;
  const card3Num = board.communityCard3 % 13;
  const card4Num = board.communityCard4 % 13;
  const card5Num = board.communityCard5 % 13;

  const [result, setResult] = useState([]);
  const [current, setCurrent] = useState(0);
  const [exit, setExit] = useState(false);
  const [playerArray, setPlayerArray] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const img = "/images/defaultProfile.png";
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();
  const [img5, setImg5] = useState();
  const [img6, setImg6] = useState();

  const [cardImages, setCardImages] = useState({
    card1: { shape: null, num: null },
    card2: { shape: null, num: null },
    card3: { shape: null, num: null },
    card4: { shape: null, num: null },
    card5: { shape: null, num: null },
  });

  const cardControls = {
    card1: useAnimation(),
    card2: useAnimation(),
    card3: useAnimation(),
    card4: useAnimation(),
    card5: useAnimation(),
  };

  const startCardAnimation = async () => {
    await cardControls.card1.start({ y: 0 });
    await cardControls.card2.start({ y: 0 });
    await cardControls.card3.start({ y: 0 });
    await cardControls.card4.start({ y: 0 });
    await cardControls.card5.start({ y: 0 });

    if (board.phaseStatus === 2) {
      const animations = [
        cardControls.card1.start({ scale: 0 }),
        cardControls.card2.start({ scale: 0 }),
        cardControls.card3.start({ scale: 0 }),
      ];
      await Promise.all(animations);

      setCardImages({
        ...cardImages,
        card1: { shape: card1Shape, num: card1Num },
        card2: { shape: card2Shape, num: card2Num },
        card3: { shape: card3Shape, num: card3Num },
      });
      await Promise.all([
        cardControls.card1.start({ scale: 1 }),
        cardControls.card2.start({ scale: 1 }),
        cardControls.card3.start({ scale: 1 }),
      ]);
    }
    if (board.phaseStatus === 3) {
      await cardControls.card4.start({ scale: 0 });
      setCardImages({
        ...cardImages,
        card4: { shape: card4Shape, num: card4Num },
      });
      await cardControls.card4.start({ scale: 1 });
    }
    if (board.phaseStatus === 4) {
      await cardControls.card5.start({ scale: 0 });
      setCardImages({
        ...cardImages,
        card5: { shape: card5Shape, num: card5Num },
      });
      await cardControls.card5.start({ scale: 1 });
      //await cardControls.card5.start({ rotateY: 180 });
    }
  };
  useEffect(() => {
    // 컴포넌트가 마운트될 때 카드 애니메이션을 시작합니다.
    startCardAnimation();
  }, [board.phaseStatus]); // phaseStatus 값이 변경될 때마다 애니메이션을 재생합니다

  useEffect(() => {
    if (myPlayer) {
      const updatedOthers = Array.from(
        { length: numOfOtherPlayers },
        (_, i) => (myPlayer.position + i + 1) % 6
      );
      setOthers(updatedOthers);
    }
  }, [board.totalPlayer, myPlayer]); //postion 배치

  useEffect(() => {
    const updatedPlayerArray = others.map((position) =>
      board.players.find((player) => player.position === position)
    );
    setPlayerArray(updatedPlayerArray);

    const getUser1Img = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/user/image/${myPlayer.userId}`,
        {
          responseType: "blob",
        }
      );
      setImg1(res.data);
    };
    const getUser2Img = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/user/image/${updatedPlayerArray[0].userId}`,
        {
          responseType: "blob",
        }
      );

      setImg2(res.data);
    };
    const getUser3Img = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/user/image/${updatedPlayerArray[1].userId}`,
        {
          responseType: "blob",
        }
      );
      setImg3(res.data);
    };
    const getUser4Img = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/user/image/${updatedPlayerArray[2].userId}`,
        {
          responseType: "blob",
        }
      );
      setImg4(res.data);
    };
    const getUser5Img = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/user/image/${updatedPlayerArray[3].userId}`,
        {
          responseType: "blob",
        }
      );
      setImg5(res.data);
    };
    const getUser6Img = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/user/image/${updatedPlayerArray[4].userId}`,
        {
          responseType: "blob",
        }
      );
      setImg6(res.data);
    };

    if (myPlayer) {
      getUser1Img();
    }
    if (updatedPlayerArray[0]) {
      getUser2Img();
    }
    if (updatedPlayerArray[1]) {
      getUser3Img();
    }
    if (updatedPlayerArray[2]) {
      getUser4Img();
    }
    if (updatedPlayerArray[3]) {
      getUser5Img();
    }
    if (updatedPlayerArray[4]) {
      getUser6Img();
    }
  }, [others, board.players]);

  const clickExit = async () => {
    try {
      const userResponse = window.confirm("게임에서 나가시겠습니까?");
      if (userResponse) {
        client.publish({
          destination: "/pub/board/exit",
          body: JSON.stringify(board),
          headers: {
            board_id: board.id,
          },
        });
        client.disconnectHeaders = {
          disconnect_option: "exit",
        };
        setTimeout(() => {
          client.deactivate();
        }, 100);
        client.onDisconnect = () => {
          window.close();
        };
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
      console.log("나가기 에러", error);
    }
  };

  const jokBoComparison = (numbers, jokBo) => {
    // 플레이어 카드 와 족보에서 일치하는것 찾기 true/false
    return numbers.map((number) => jokBo.includes(number));
  };

  const calculateJokBoArrays = (players) => {
    return players.map((player) => {
      const communityCards = [
        board.communityCard1,
        board.communityCard2,
        board.communityCard3,
        board.communityCard4,
        board.communityCard5,
      ];

      const allNumbers = [...communityCards];
      return jokBoComparison(allNumbers, player.gameResult.jokBo);
    });
  };

  const [winnerPlayers, setWinnerPlayers] = useState([]);
  useEffect(() => {
    if (message === "GAME_END") {
      const winnerPlayerList = board.players.filter(
        (player) => player.gameResult && player.gameResult.winner === true
      );

      setWinnerPlayers(winnerPlayerList);
    } else if (message === "SHOW_DOWN") {
      const winnerPlayerList = board.players.filter(
        (player) => player.gameResult && player.gameResult.winner === true
      );

      const sortedHandValuePlayer = winnerPlayerList.sort(
        (a, b) => b.gameResult.handValue - a.gameResult.handValue
      ); //handValue 큰 순서대로 정렬(내림차순)

      setWinnerPlayers((prevPlayers) => [...sortedHandValuePlayer]);

      const resultArray = calculateJokBoArrays(sortedHandValuePlayer);
      setResult(resultArray);
      for (let i = 0; i < resultArray.length; i++) {
        //승자 여러명일 경우 순서대로 애니메이션 보기 위해 시간 지연
        setTimeout(() => {
          setCurrent(i);
        }, i * 2000);
      }
    }
  }, [message]);

  const test = () => {
    client.publish({
      destination: "/pub/errorTest",
      headers: { board_id: board.id },
    });
  };

  const viewHud = async (userId) => {
    const goHud = window.open("/hud", "_blank", "width=500,height=300");
    const res = await axios.get(`${BASE_URL}/api/hud/${userId}`);
    const sendData = {
      hudData: res.data,
    };
    goHud.name = JSON.stringify(sendData);
  };
  const actionTime = 20;

  const remainTimeView = Math.floor(
    new Date(board.lastActionTime).getTime() / 1000 +
      actionTime -
      currentTime.getTime() / 1000
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const progressValue = (remainTimeView / actionTime) * 100;

  return (
    <TableContainer>
      <BoardNumber>
        <IoArrowBackOutline onClick={clickExit} />
        <span style={{ marginLeft: "10px" }}>NO. {board.id}</span>
      </BoardNumber>
      <PlayerCount>{board.totalPlayer}/6</PlayerCount>

      <AnimatePresence>
        {message === "GAME_END" &&
          winnerPlayers.length >= 1 &&
          winnerPlayers.map((player, index) => (
            <VictoryContainer
              variants={winnerVar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={player.userId}
            >
              <VictoryMessage>
                플레이어 {player.playerName}{" "}
                {player.gameResult.earnedMoney / board.blind}BB 얻었습니다!!
              </VictoryMessage>
            </VictoryContainer>
          ))}
      </AnimatePresence>
      <AnimatePresence>
        {message === "SHOW_DOWN" &&
          winnerPlayers.length >= 1 &&
          winnerPlayers.map((player, index) => (
            <VictoryContainer
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === current ? 1 : 0 }}
              transition={{ duration: 0.5, delay: index * 2, ease: "easeOut" }}
            >
              <VictoryMessage>
                플레이어 {player.playerName}{" "}
                {player.gameResult.earnedMoney / board.blind}BB 얻었습니다!!
                랭크 : {player.gameResult.handContext}
              </VictoryMessage>
            </VictoryContainer>
          ))}
      </AnimatePresence>

      <Table>
        {board.phaseStatus >= 1 ? (
          <PotContainer
            style={{
              gridColumn: "2 / span 1",
              gridRow: "1 / span 1",
              alignSelf: "flex-start",
            }}
          >
            <Pot>Pot : {board.pot}BB</Pot>
          </PotContainer>
        ) : null}
        <div
          style={{
            display: "flex",
            gridColumn: "3 / span 1",
            gridRow: "3 / span 1",
            alignSelf: "flex-end",
            justifySelf: "flex-start",
          }}
        >
          {myPlayer && myPlayer.position === board.btn && (
            <PositionButton>D</PositionButton>
          )}
          {myPlayer &&
            myPlayer.phaseCallSize !== 0 &&
            board.phaseStatus >= 1 && (
              <ChipContainer>
                <PiPokerChipBold />
                <Chip>
                  {(myPlayer.phaseCallSize / board.blind).toFixed(1)}BB
                </Chip>
              </ChipContainer>
            )}
        </div>
        <div
          style={{
            display: "flex",
            gridColumn: "1 / span 1",
            gridRow: "3 / span 1",
            alignSelf: "flex-end",
            justifySelf: "flex-end",
          }}
        >
          {playerArray[0] && playerArray[0].position === board.btn && (
            <PositionButton>D</PositionButton>
          )}
          {board.totalPlayer >= 2 &&
            playerArray[0] &&
            playerArray[0].phaseCallSize &&
            board.phaseStatus >= 1 && (
              <ChipContainer>
                <PiPokerChipBold />
                <Chip>{playerArray[0].phaseCallSize / board.blind}BB</Chip>
              </ChipContainer>
            )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gridColumn: "1 / span 1",
            gridRow: "2 / span 1",
            justifySelf: "flex-start",
            alignSelf: "center",
          }}
        >
          {playerArray[1] && playerArray[1].position === board.btn && (
            <PositionButton>D</PositionButton>
          )}
          {board.totalPlayer >= 2 &&
            playerArray[1] &&
            playerArray[1].phaseCallSize !== 0 &&
            board.phaseStatus >= 1 && (
              <ChipContainer style={{}}>
                <PiPokerChipBold />
                <Chip>{playerArray[1].phaseCallSize / board.blind}BB</Chip>
              </ChipContainer>
            )}
        </div>
        <div
          style={{
            display: "flex",
            gridColumn: "1 / span 1",
            gridRow: "1 / span 1",
            alignSelf: "flex-start",
            justifySelf: "flex-end",
          }}
        >
          {playerArray[2] && playerArray[2].position === board.btn && (
            <PositionButton>D</PositionButton>
          )}
          {board.totalPlayer >= 2 &&
            playerArray[2] &&
            playerArray[2].phaseCallSize !== 0 &&
            board.phaseStatus >= 1 && (
              <ChipContainer>
                <PiPokerChipBold />
                <Chip>
                  {(playerArray[2].phaseCallSize / board.blind).toFixed(1)}BB
                </Chip>
              </ChipContainer>
            )}
        </div>
        <div
          style={{
            gridColumn: "3 / span 1",
            gridRow: "1 / span 1",
            alignSelf: "flex-start",
            justifySelf: "flex-start",
            display: "flex",
          }}
        >
          {playerArray[3] && playerArray[3].position === board.btn && (
            <PositionButton>D</PositionButton>
          )}
          {board.totalPlayer >= 2 &&
            playerArray[3] &&
            playerArray[3].phaseCallSize !== 0 &&
            board.phaseStatus >= 1 && (
              <ChipContainer>
                <PiPokerChipBold />
                <Chip>
                  {(playerArray[3].phaseCallSize / board.blind).toFixed(1)}BB
                </Chip>
              </ChipContainer>
            )}
        </div>
        <div
          style={{
            gridColumn: "3 / span 1",
            gridRow: "2 / span 1",
            justifySelf: "flex-end",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {playerArray[4] && playerArray[4].position === board.btn && (
            <PositionButton>D</PositionButton>
          )}
          {board.totalPlayer >= 2 &&
            playerArray[4] &&
            playerArray[4].phaseCallSize !== 0 &&
            board.phaseStatus >= 1 && (
              <ChipContainer style={{}}>
                <PiPokerChipBold />
                <Chip>
                  {(playerArray[4].phaseCallSize / board.blind).toFixed(1)}BB
                </Chip>
              </ChipContainer>
            )}
        </div>

        {board.phaseStatus >= 2 && board.phaseStatus <= 4 ? (
          <CardContainer
            style={{
              gridColumn: "2 / span 1",
              gridRow: "2 / span 1",
            }}
          >
            <React.Fragment>
              <motion.div
                initial={{ y: -100 }}
                animate={cardControls.card1}
                transition={{ delay: 0.02 }}
              >
                <Card1
                  $card1shape={cardImages.card1.shape}
                  $card1num={cardImages.card1.num}
                />
              </motion.div>
              <motion.div
                initial={{ y: -100 }}
                animate={cardControls.card2}
                transition={{ delay: 0.02 }}
              >
                <Card2
                  $card2shape={cardImages.card2.shape}
                  $card2num={cardImages.card2.num}
                />
              </motion.div>
              <motion.div
                initial={{ y: -100 }}
                animate={cardControls.card3}
                transition={{ delay: 0.02 }}
              >
                <Card3
                  $card3shape={cardImages.card3.shape}
                  $card3num={cardImages.card3.num}
                />
              </motion.div>
              <motion.div
                initial={{ y: -100 }}
                animate={cardControls.card4}
                transition={{ delay: 0.02 }}
              >
                <Card4
                  $card4shape={cardImages.card4.shape}
                  $card4num={cardImages.card4.num}
                />
              </motion.div>
              <motion.div
                initial={{ y: -100 }}
                animate={cardControls.card5}
                transition={{ delay: 0.02 }}
              >
                <Card5
                  $card5shape={cardImages.card5.shape}
                  $card5num={cardImages.card5.num}
                />
              </motion.div>
            </React.Fragment>
          </CardContainer>
        ) : null}
        {board.phaseStatus === 6 ? (
          <AnimatePresence>
            {result.map((playerResult, index) => (
              <CardContainer
                key={index}
                style={{ gridColumn: "2 / span 1", gridRow: "2 / span 1" }}
              >
                {index === current ? (
                  <React.Fragment>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }} // 애니메이션 추가: 초기 상태
                      animate={{ opacity: 1, scale: 1 }} // 애니메이션 추가: 최종 상태
                      transition={{ duration: 0.5 }} // 애니메이션 추가: 지속 시간
                      style={{ marginRight: "10px" }} // 카드 사이의 간격 조정
                    >
                      <Card1
                        initial={{ opacity: 1, y: 0 }}
                        animate={{
                          opacity: 1,
                          scale: playerResult[0] ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.5, delay: index * 2 }}
                        $card1shape={card1Shape}
                        $card1num={card1Num}
                      >
                        {playerResult[0] && <CardBorder />}
                      </Card1>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ marginRight: "10px" }}
                    >
                      <Card2
                        initial={{ opacity: 1, y: 0 }}
                        animate={{
                          opacity: 1,
                          scale: playerResult[1] ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.5, delay: index * 2 }}
                        $card2shape={card2Shape}
                        $card2num={card2Num}
                      >
                        {playerResult[1] && <CardBorder />}
                      </Card2>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ marginRight: "10px" }}
                    >
                      <Card3
                        initial={{ opacity: 1, y: 0 }}
                        animate={{
                          opacity: 1,
                          scale: playerResult[2] ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.5, delay: index * 2 }}
                        $card3shape={card3Shape}
                        $card3num={card3Num}
                      >
                        {playerResult[2] && <CardBorder />}
                      </Card3>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ marginRight: "10px" }}
                    >
                      <Card4
                        initial={{ opacity: 1, y: 0 }}
                        animate={{
                          opacity: 1,
                          scale: playerResult[3] ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.5, delay: index * 2 }}
                        $card4shape={card4Shape}
                        $card4num={card4Num}
                      >
                        {playerResult[3] && <CardBorder />}
                      </Card4>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ marginRight: "10px" }}
                    >
                      <Card5
                        initial={{ opacity: 1, y: 0 }}
                        animate={{
                          opacity: 1,
                          scale: playerResult[4] ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.5, delay: index * 2 }}
                        $card5shape={card5Shape}
                        $card5num={card5Num}
                      >
                        {playerResult[4] && <CardBorder />}
                      </Card5>
                    </motion.div>
                  </React.Fragment>
                ) : null}
              </CardContainer>
            ))}
          </AnimatePresence>
        ) : null}
      </Table>

      <PlayerContainer position="bottom">
        <SubPlayerContainer>
          {board.totalPlayer >= 2 && playerArray[0] ? (
            <UserProfileContainer>
              <UserProfileBox>
                {board &&
                board.actionPos === playerArray[0].position &&
                board.phaseStatus >= 1 &&
                board.phaseStatus <= 4 ? (
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <CircularProgress
                      variant="determinate"
                      value={100 - progressValue}
                      sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                      size={100}
                    />

                    <PlayerImg
                      onClick={() => viewHud(playerArray[0].userId)}
                      src={
                        img1 && img1.size !== 0
                          ? URL.createObjectURL(img1)
                          : img
                      }
                    />
                  </Box>
                ) : (
                  <PlayerImg
                    onClick={() => viewHud(playerArray[0].userId)}
                    src={
                      img1 && img1.size !== 0 ? URL.createObjectURL(img1) : img
                    }
                  />
                )}
                <UserMoneyBox>
                  <PlayerName>{playerArray[0].playerName}</PlayerName>
                  <UserMoney>
                    {(playerArray[0].money / board.blind).toFixed(1)}BB
                  </UserMoney>
                </UserMoneyBox>
              </UserProfileBox>

              <Player
                boardData={board}
                player1={playerArray[0]}
                message={message}
                winnerPlayers={winnerPlayers}
                userData={userData}
                userId={userId}
              />
            </UserProfileContainer>
          ) : (
            <EmptyBox></EmptyBox>
          )}
          {myPlayer && (
            <UserProfileContainer>
              <UserProfileBox>
                {board &&
                board.actionPos === myPlayer.position &&
                board.phaseStatus >= 1 &&
                board.phaseStatus <= 4 ? (
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <CircularProgress
                      variant="determinate"
                      value={100 - progressValue}
                      sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                      size={100}
                    />

                    <PlayerImg
                      onClick={() => viewHud(myPlayer.userId)}
                      src={
                        img1 && img1.size !== 0
                          ? URL.createObjectURL(img1)
                          : img
                      }
                    />
                  </Box>
                ) : (
                  <PlayerImg
                    onClick={() => viewHud(myPlayer.userId)}
                    src={
                      img1 && img1.size !== 0 ? URL.createObjectURL(img1) : img
                    }
                  />
                )}

                <UserMoneyBox>
                  <PlayerName>{myPlayer.playerName}</PlayerName>
                  <UserMoney>
                    {(myPlayer.money / board.blind).toFixed(1)}BB
                  </UserMoney>
                </UserMoneyBox>
              </UserProfileBox>

              <Player
                boardData={board}
                myPlayer={myPlayer}
                message={message}
                winnerPlayers={winnerPlayers}
                userData={userData}
                userId={userId}
              />
            </UserProfileContainer>
          )}
        </SubPlayerContainer>
      </PlayerContainer>

      <PlayerContainer position="top">
        <SubPlayerContainer>
          {board.totalPlayer >= 2 && playerArray[2] ? (
            <UserProfileContainer>
              <UserProfileBox>
                {board &&
                board.actionPos === playerArray[2].position &&
                board.phaseStatus >= 1 &&
                board.phaseStatus <= 4 ? (
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <CircularProgress
                      variant="determinate"
                      value={100 - progressValue}
                      sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                      size={100}
                    />

                    <PlayerImg
                      onClick={() => viewHud(playerArray[2].userId)}
                      src={
                        img1 && img1.size !== 0
                          ? URL.createObjectURL(img1)
                          : img
                      }
                    />
                  </Box>
                ) : (
                  <PlayerImg
                    onClick={() => viewHud(playerArray[2].userId)}
                    src={
                      img1 && img1.size !== 0 ? URL.createObjectURL(img1) : img
                    }
                  />
                )}
                <UserMoneyBox>
                  <PlayerName>{playerArray[2].playerName}</PlayerName>
                  <UserMoney>
                    {(playerArray[2].money / board.blind).toFixed(1)}BB
                  </UserMoney>
                </UserMoneyBox>
              </UserProfileBox>
              <Player
                boardData={board}
                player3={playerArray[2]}
                message={message}
                winnerPlayers={winnerPlayers}
                userData={userData}
                userId={userId}
              />
            </UserProfileContainer>
          ) : (
            <EmptyBox></EmptyBox>
          )}
          {board.totalPlayer >= 2 && playerArray[3] ? (
            <UserProfileContainer>
              <UserProfileBox>
                {board &&
                board.actionPos === playerArray[3].position &&
                board.phaseStatus >= 1 &&
                board.phaseStatus <= 4 ? (
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <CircularProgress
                      variant="determinate"
                      value={100 - progressValue}
                      sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                      size={100}
                    />

                    <PlayerImg
                      onClick={() => viewHud(playerArray[3].userId)}
                      src={
                        img1 && img1.size !== 0
                          ? URL.createObjectURL(img1)
                          : img
                      }
                    />
                  </Box>
                ) : (
                  <PlayerImg
                    onClick={() => viewHud(playerArray[3].userId)}
                    src={
                      img1 && img1.size !== 0 ? URL.createObjectURL(img1) : img
                    }
                  />
                )}
                <UserMoneyBox>
                  <PlayerName>{playerArray[3].playerName}</PlayerName>
                  <UserMoney>
                    {(playerArray[3].money / board.blind).toFixed(1)}BB
                  </UserMoney>
                </UserMoneyBox>
              </UserProfileBox>
              <Player
                boardData={board}
                player4={playerArray[3]}
                message={message}
                winnerPlayers={winnerPlayers}
                userData={userData}
                userId={userId}
              />
            </UserProfileContainer>
          ) : (
            <EmptyBox></EmptyBox>
          )}
        </SubPlayerContainer>
      </PlayerContainer>

      <PlayerContainer position="left">
        {board.totalPlayer >= 2 && playerArray[1] && (
          <UserProfileContainer>
            <UserProfileBox>
              {board &&
              board.actionPos === playerArray[1].position &&
              board.phaseStatus >= 1 &&
              board.phaseStatus <= 4 ? (
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <CircularProgress
                    variant="determinate"
                    value={100 - progressValue}
                    sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                    size={100}
                  />

                  <PlayerImg
                    onClick={() => viewHud(playerArray[1].userId)}
                    src={
                      img1 && img1.size !== 0 ? URL.createObjectURL(img1) : img
                    }
                  />
                </Box>
              ) : (
                <PlayerImg
                  onClick={() => viewHud(playerArray[1].userId)}
                  src={
                    img1 && img1.size !== 0 ? URL.createObjectURL(img1) : img
                  }
                />
              )}
              <UserMoneyBox>
                <PlayerName>{playerArray[1].playerName}</PlayerName>
                <UserMoney>
                  {(playerArray[1].money / board.blind).toFixed(1)}BB
                </UserMoney>
              </UserMoneyBox>
            </UserProfileBox>
            <Player
              boardData={board}
              player2={playerArray[1]}
              message={message}
              winnerPlayers={winnerPlayers}
              userData={userData}
              userId={userId}
            />
          </UserProfileContainer>
        )}
      </PlayerContainer>

      <PlayerContainer position="right">
        {board.totalPlayer >= 2 && playerArray[4] && (
          <UserProfileContainer>
            <UserProfileBox>
              {board &&
              board.actionPos === playerArray[4].position &&
              board.phaseStatus >= 1 &&
              board.phaseStatus <= 4 ? (
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <CircularProgress
                    variant="determinate"
                    value={100 - progressValue}
                    sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                    size={100}
                  />

                  <PlayerImg
                    onClick={() => viewHud(playerArray[4].userId)}
                    src={
                      img1 && img1.size !== 0 ? URL.createObjectURL(img1) : img
                    }
                  />
                </Box>
              ) : (
                <PlayerImg
                  onClick={() => viewHud(playerArray[4].userId)}
                  src={
                    img1 && img1.size !== 0 ? URL.createObjectURL(img1) : img
                  }
                />
              )}
              <UserMoneyBox>
                <PlayerName>{playerArray[4].playerName}</PlayerName>
                <UserMoney>
                  {(playerArray[4].money / board.blind).toFixed(1)}BB
                </UserMoney>
              </UserMoneyBox>
            </UserProfileBox>
            <Player
              boardData={board}
              player5={playerArray[4]}
              message={message}
              winnerPlayers={winnerPlayers}
              userData={userData}
              userId={userId}
            />
          </UserProfileContainer>
        )}
      </PlayerContainer>
    </TableContainer>
  );
}

export default TableComponent;
