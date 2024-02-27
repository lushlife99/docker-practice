import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const CardContainer = styled.div`
  display: flex;
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
  box-shadow: 0 0 10px rgba(251, 197, 49, 0.7);
  border-radius: 8px;
`;
const Card1 = styled(motion.div)`
  position: relative;
  width: 80px;
  height: 120px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.$card1num)}_of_${getCardShape(
      props.$card1shape
    )}.png")`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 5px;
  border-radius: 10px;
`;
const Card2 = styled(motion.div)`
  position: relative;
  border-radius: 10px;
  width: 80px;
  height: 120px;
  background-image: ${(props) =>
    `url("/images/${getCardNum(props.$card2num)}_of_${getCardShape(
      props.$card2shape
    )}.png")`};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 5px;
`;

const Card = styled.div`
  border-radius: 10px;
  width: 80px;
  height: 120px;
  background-image: url("/images/cardBack.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 5px;
`;

function CardComponent({ board, player, myPlayer, message }) {
  const card1Shape = Math.floor(player.card1 / 13);
  const card2Shape = Math.floor(player.card2 / 13);
  const card1Num = player.card1 % 13;
  const card2Num = player.card2 % 13;

  const [winners, setWinners] = useState([]);

  const jokBoComparison = (numbers, jokBo) => {
    return numbers.map((number) => jokBo.includes(number));
  };
  const calculateJokBoArrays = (players) => {
    return players.map((player) => {
      const playerCards = [player.card1, player.card2];
      const allNumbers = [...playerCards];
      return jokBoComparison(allNumbers, player.gameResult.jokBo);
    });
  };
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (message === "SHOW_DOWN") {
      const winnerPlayerList = board.players.filter(
        (player) => player.gameResult && player.gameResult.winner === true
      );

      const sortedHandValuePlayer = winnerPlayerList.sort(
        (a, b) => b.gameResult.handValue - a.gameResult.handValue
      ); //handValue 큰 순서대로 정렬(내림차순)
      setWinners((prev) => [...sortedHandValuePlayer]);

      const resultArray = calculateJokBoArrays(sortedHandValuePlayer);
      setResult(resultArray);
      for (let i = 0; i < resultArray.length; i++) {
        setTimeout(() => {
          setCurrent(i);
        }, i * 2000);
      }
    }
  }, [message]);

  return (
    <CardContainer>
      {board &&
        myPlayer === player &&
        player.status !== 3 &&
        board.phaseStatus >= 1 &&
        board.phaseStatus <= 5 && (
          <>
            <Card1 $card1shape={card1Shape} $card1num={card1Num} />
            <Card2 $card2shape={card2Shape} $card2num={card2Num} />
          </>
        )}
      {board &&
        myPlayer === player &&
        board.phaseStatus === 0 &&
        player.status !== 3 && (
          <>
            <Card />
            <Card />
          </>
        )}
      {board &&
        myPlayer !== player &&
        board.phaseStatus !== 6 &&
        player.status !== 3 && (
          <>
            <Card />
            <Card />
          </>
        )}

      {board &&
        board.phaseStatus === 6 &&
        player.status !== 3 &&
        winners.length >= 1 && (
          <>
            <React.Fragment>
              {winners[current].userId === player.userId ? (
                <React.Fragment>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginRight: "10px" }}
                  >
                    <Card1
                      initial={{ opacity: 1, y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: result[current][0] ? 1.3 : 1,
                      }}
                      transition={{ duration: 0.5, delay: current * 2 }}
                      $card1shape={card1Shape}
                      $card1num={card1Num}
                    >
                      {result[current][0] && <CardBorder />}
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
                        scale: result[current][1] ? 1.3 : 1,
                      }}
                      transition={{ duration: 0.5, delay: current * 2 }}
                      $card2shape={card2Shape}
                      $card2num={card2Num}
                    >
                      {result[current][1] && <CardBorder />}
                    </Card2>
                  </motion.div>
                </React.Fragment>
              ) : (
                <>
                  <Card1 $card1shape={card1Shape} $card1num={card1Num} />
                  <Card2 $card2shape={card2Shape} $card2num={card2Num} />
                </>
              )}
            </React.Fragment>
          </>
        )}
    </CardContainer>
  );
}

export default CardComponent;
