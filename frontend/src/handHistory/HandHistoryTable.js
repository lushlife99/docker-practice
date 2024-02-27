import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BASE_URL } from "../api";
const Container = styled.div`
  height: 60%;
  display: grid;
  grid-template-areas:
    ". top ."
    "left table right"
    ". bottom .";
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  background: linear-gradient(135deg, #1b1516 0%, #2f2627 100%);
`;
const Table = styled.div`
  width: 50vw;
  height: 30vh;
  border-radius: 250px;
  background-image: linear-gradient(135deg, #6e1410 0%, #a71f17 100%);
  box-shadow: 0 0 50px 0px rgba(0, 0, 0, 0.75);
  border: 15px solid #654b45;
  display: flex;
  justify-content: space-around;
  align-items: center;
  grid-area: table;
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
const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 175px;
  width: 90%;
  height: 70%;
`;

const Card1 = styled.div`
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
`;
const Card2 = styled.div`
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
`;
const Card3 = styled.div`
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
  //margin: 0 5px;
`;
const Card4 = styled.div`
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
  // margin: 0 5px;
  border-radius: 10px;
`;
const Card5 = styled.div`
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
  // margin: 0 5px;
`;
const Card = styled.div`
  border-radius: 10px;
  width: 100px;
  height: 150px;
  background-image: url("/images/cardBack.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  // margin: 0 5px;
`;

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  ${(props) => {
    if (props.position === "top") {
      return "grid-area:top;";
    } else if (props.position === "bottom") {
      return "grid-area:bottom;";
    } else if (props.position === "left") {
      return "grid-area:left;";
    } else if (props.position === "right") {
      return "grid-area:right;";
    }
  }}
`;
const PlayerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PlayerCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PlayerCard1 = styled.div`
  width: 80px;
  height: 120px;
  background-image: ${(props) =>
    props.$myCard1shape !== null
      ? `url("/images/${getCardNum(props.$mycard1num)}_of_${getCardShape(
          props.$mycard1shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin: 0px 5px;
`;
const PlayerCard2 = styled.div`
  width: 80px;
  height: 120px;
  background-image: ${(props) =>
    props.$myCard2shape !== null
      ? `url("/images/${getCardNum(props.$mycard2num)}_of_${getCardShape(
          props.$mycard2shape
        )}.png")`
      : 'url("/images/cardBack.jpg")'};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0px 5px;
  border-radius: 10px;
`;
const Player = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$position};
  border: 1px solid white;
  color: white;
  font-weight: bold;
`;
const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PlayerName = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px 10px;
  border-radius: 10px;
  color: lightgray;
  font-size: 24px;
  font-weight: bold;
`;
const EmptyBox = styled.div``;

function HandHistoryTable({ hand, userId }) {
  const card1Shape = Math.floor(hand.communityCard1 / 13);
  const card2Shape = Math.floor(hand.communityCard2 / 13);
  const card3Shape = Math.floor(hand.communityCard3 / 13);
  const card4Shape = Math.floor(hand.communityCard4 / 13);
  const card5Shape = Math.floor(hand.communityCard5 / 13);
  const card1Num = hand.communityCard1 % 13;
  const card2Num = hand.communityCard2 % 13;
  const card3Num = hand.communityCard3 % 13;
  const card4Num = hand.communityCard4 % 13;
  const card5Num = hand.communityCard5 % 13;
  const userIdInt = parseInt(userId, 10);
  const [myPlayer, setMyPlayer] = useState({});
  const [playerArray, setPlayerArray] = useState([]);
  const [myIndex, setMyIndex] = useState();
  const [player0Index, setPlayer0Index] = useState();
  const [player1Index, setPlayer1Index] = useState();
  const [player2Index, setPlayer2Index] = useState();
  const [player3Index, setPlayer3Index] = useState();
  const [player4Index, setPlayer4Index] = useState();
  const [phaseStatus, setPhaseStatus] = useState();

  useEffect(() => {
    const foundUser = hand.userList.find((user) => user.id === userIdInt);
    const userIndex = hand.userList.findIndex((user) => user.id === userIdInt);
    setMyIndex(userIndex);
    setMyPlayer(foundUser);
    const updatedOthers = Array.from(
      { length: 5 },
      (_, i) => (hand.posList[userIndex] + i + 1) % 6
    );

    const updatedPlayerArray = updatedOthers.map((position) =>
      hand.posList.find((player) => player === position)
    );

    const player0Idx = hand.posList.findIndex(
      (pos) => pos === updatedPlayerArray[0]
    );
    setPlayer0Index(player0Idx);
    const player1Idx = hand.posList.findIndex(
      (pos) => pos === updatedPlayerArray[1]
    );
    setPlayer1Index(player1Idx);
    const player2Idx = hand.posList.findIndex(
      (pos) => pos === updatedPlayerArray[2]
    );
    setPlayer2Index(player2Idx);
    const player3Idx = hand.posList.findIndex(
      (pos) => pos === updatedPlayerArray[3]
    );
    setPlayer3Index(player3Idx);
    const player4Idx = hand.posList.findIndex(
      (pos) => pos === updatedPlayerArray[4]
    );
    setPlayer4Index(player4Idx);

    setPlayerArray(updatedPlayerArray);
    const phaseList = hand.actionList.map((item) => item.phaseStatus);
    const maxPhase = Math.max(...phaseList);

    setPhaseStatus(maxPhase);
  }, []);

  const findName = (playerPos) => {
    const index = hand.posList.findIndex((value) => value === playerPos);
    return hand.userList[index].userName;
  };

  const playerPosition = (position) => {
    if (position === hand.btnPosition) {
      return "BTN";
    } else if ((position + 1) % 6 === hand.btnPosition) {
      return "CO";
    } else if ((position + 2) % 6 === hand.btnPosition) {
      return "MP";
    } else if ((position + 3) % 6 === hand.btnPosition) {
      return "UTG";
    } else if ((position + 4) % 6 === hand.btnPosition) {
      return "BB";
    } else {
      return "SB";
    }
  };
  const positionBackgroundColor = (position) => {
    let positionColor = "";
    if (position === hand.btnPosition) {
      positionColor = "#443125";
    } else if ((position + 1) % 6 === hand.btnPosition) {
      positionColor = "#796120";
    } else if ((position + 2) % 6 === hand.btnPosition) {
      positionColor = "#39425D";
    } else if ((position + 3) % 6 === hand.btnPosition) {
      positionColor = "#295357";
    } else if ((position + 4) % 6 === hand.btnPosition) {
      positionColor = "#3B3B3F";
    } else {
      positionColor = "#616E3A";
    }
    return positionColor;
  };
  const viewHud = async (playerPos) => {
    const index = hand.posList.findIndex((value) => value === playerPos);
    const userId = hand.userList[index].hud.userId;
    const goHud = window.open("/hud", "_blank", "width=500,height=300");
    const res = await axios.get(`${BASE_URL}/api/hud/${userId}`);
    const sendData = {
      hudData: res.data,
    };
    goHud.name = JSON.stringify(sendData);
  };
  const myHud = async () => {
    const goHud = window.open("/hud", "_blank", "width=500,height=300");
    const res = await axios.get(`${BASE_URL}/api/hud`);
    const sendData = {
      hudData: res.data,
    };
    goHud.name = JSON.stringify(sendData);
  };

  const myCard1 = hand.cardList[myIndex * 2];
  const myCard2 = hand.cardList[myIndex * 2 + 1];
  const mycard1shape = Math.floor(myCard1 / 13);
  const mycard2shape = Math.floor(myCard2 / 13);
  const mycard1num = myCard1 % 13;
  const mycard2num = myCard2 % 13;

  const isShowDownUser = (userId) => {
    return hand.showDownUserIdList.includes(userId);
  };

  return (
    <Container>
      <Table>
        <CardContainer>
          {hand && phaseStatus >= 2 ? (
            <React.Fragment>
              <Card1 $card1shape={card1Shape} $card1num={card1Num} />
              <Card2 $card2shape={card2Shape} $card2num={card2Num} />
              <Card3 $card3shape={card3Shape} $card3num={card3Num} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Card />
              <Card />
              <Card />
            </React.Fragment>
          )}
          {hand && phaseStatus >= 3 ? (
            <Card4 $card4shape={card4Shape} $card4num={card4Num} />
          ) : (
            <Card />
          )}
          {hand && phaseStatus >= 4 ? (
            <Card5 $card5shape={card5Shape} $card5num={card5Num} />
          ) : (
            <Card />
          )}
        </CardContainer>
      </Table>
      <PlayerContainer position="top">
        {playerArray[2] ? (
          <PlayerBox>
            <PlayerInfo>
              <Player
                onClick={() => viewHud(playerArray[2])}
                $position={positionBackgroundColor(playerArray[2])}
              >
                {playerPosition(playerArray[2])}
                <PlayerName>{findName(playerArray[2])}</PlayerName>
              </Player>
            </PlayerInfo>
            {hand &&
              player2Index !== -1 &&
              isShowDownUser(hand.userList[player2Index].id) && (
                <PlayerCardContainer>
                  <PlayerCard1
                    $mycard1shape={Math.floor(
                      hand.cardList[player2Index * 2] / 13
                    )}
                    $mycard1num={hand.cardList[player2Index * 2] % 13}
                  />
                  <PlayerCard2
                    $mycard2shape={Math.floor(
                      hand.cardList[player2Index * 2 + 1] / 13
                    )}
                    $mycard2num={hand.cardList[player2Index * 2 + 1] % 13}
                  />
                </PlayerCardContainer>
              )}
          </PlayerBox>
        ) : (
          <EmptyBox />
        )}
        {playerArray[3] ? (
          <PlayerBox>
            <PlayerInfo>
              <Player
                onClick={() => viewHud(playerArray[3])}
                $position={positionBackgroundColor(playerArray[3])}
              >
                {playerPosition(playerArray[3])}
              </Player>
              <PlayerName>{findName(playerArray[3])}</PlayerName>
            </PlayerInfo>
            {hand &&
              player3Index !== -1 &&
              isShowDownUser(hand.userList[player3Index].id) && (
                <PlayerCardContainer>
                  <PlayerCard1
                    $mycard1shape={Math.floor(
                      hand.cardList[player3Index * 2] / 13
                    )}
                    $mycard1num={hand.cardList[player3Index * 2] % 13}
                  />
                  <PlayerCard2
                    $mycard2shape={Math.floor(
                      hand.cardList[player3Index * 2 + 1] / 13
                    )}
                    $mycard2num={hand.cardList[player3Index * 2 + 1] % 13}
                  />
                </PlayerCardContainer>
              )}
          </PlayerBox>
        ) : (
          <EmptyBox />
        )}
      </PlayerContainer>
      <PlayerContainer position="bottom">
        {playerArray[0] ? (
          <PlayerBox>
            <PlayerInfo>
              <Player
                onClick={() => viewHud(playerArray[0])}
                $position={positionBackgroundColor(playerArray[0])}
              >
                {playerPosition(playerArray[0])}
              </Player>
              <PlayerName>{findName(playerArray[0])}</PlayerName>
            </PlayerInfo>
            {hand &&
              player0Index !== -1 &&
              isShowDownUser(hand.userList[player0Index].id) && (
                <PlayerCardContainer>
                  <PlayerCard1
                    $mycard1shape={Math.floor(
                      hand.cardList[player0Index * 2] / 13
                    )}
                    $mycard1num={hand.cardList[player0Index * 2] % 13}
                  />
                  <PlayerCard2
                    $mycard2shape={Math.floor(
                      hand.cardList[player0Index * 2 + 1] / 13
                    )}
                    $mycard2num={hand.cardList[player0Index * 2 + 1] % 13}
                  />
                </PlayerCardContainer>
              )}
          </PlayerBox>
        ) : (
          <EmptyBox />
        )}
        {myPlayer && (
          <PlayerBox>
            <PlayerInfo>
              <Player
                onClick={myHud}
                $position={positionBackgroundColor(hand.posList[myIndex])}
              >
                {playerPosition(hand.posList[myIndex])}
              </Player>
              <PlayerName>{myPlayer.userName}</PlayerName>
            </PlayerInfo>

            <PlayerCardContainer>
              <PlayerCard1
                $mycard1shape={mycard1shape}
                $mycard1num={mycard1num}
              />
              <PlayerCard2
                $mycard2shape={mycard2shape}
                $mycard2num={mycard2num}
              />
            </PlayerCardContainer>
          </PlayerBox>
        )}
      </PlayerContainer>
      <PlayerContainer position="left">
        {playerArray[1] && (
          <PlayerBox>
            <PlayerInfo>
              <Player
                onClick={() => viewHud(playerArray[1])}
                $position={positionBackgroundColor(playerArray[1])}
              >
                {playerPosition(playerArray[1])}
              </Player>
              <PlayerName>{findName(playerArray[1])}</PlayerName>
            </PlayerInfo>
            {hand &&
              player1Index !== -1 &&
              isShowDownUser(hand.userList[player1Index].id) && (
                <PlayerCardContainer>
                  <PlayerCard1
                    $mycard1shape={Math.floor(
                      hand.cardList[player1Index * 2] / 13
                    )}
                    $mycard1num={hand.cardList[player1Index * 2] % 13}
                  />
                  <PlayerCard2
                    $mycard2shape={Math.floor(
                      hand.cardList[player1Index * 2 + 1] / 13
                    )}
                    $mycard2num={hand.cardList[player1Index * 2 + 1] % 13}
                  />
                </PlayerCardContainer>
              )}
          </PlayerBox>
        )}
      </PlayerContainer>
      <PlayerContainer position="right">
        {playerArray[4] && (
          <PlayerBox>
            <PlayerInfo>
              <Player
                onClick={() => viewHud(playerArray[4])}
                $position={positionBackgroundColor(playerArray[4])}
              >
                {playerPosition(playerArray[4])}
              </Player>
              <PlayerName>{findName(playerArray[4])}</PlayerName>
            </PlayerInfo>
            {hand &&
              player4Index !== -1 &&
              isShowDownUser(hand.userList[player4Index].id) && (
                <PlayerCardContainer>
                  <PlayerCard1
                    $mycard1shape={Math.floor(
                      hand.cardList[player4Index * 2] / 13
                    )}
                    $mycard1num={hand.cardList[player4Index * 2] % 13}
                  />
                  <PlayerCard2
                    $mycard2shape={Math.floor(
                      hand.cardList[player4Index * 2 + 1] / 13
                    )}
                    $mycard2num={hand.cardList[player4Index * 2 + 1] % 13}
                  />
                </PlayerCardContainer>
              )}
          </PlayerBox>
        )}
      </PlayerContainer>
    </Container>
  );
}

export default HandHistoryTable;
