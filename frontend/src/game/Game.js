import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../api";
import GameRoomList from "./GameRoomList";

const GameContainer = styled.div`
  background-color: #2c3e50;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px 45px;
`;

const TitleBox = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.span`
  color: #e74c3c;
  font-weight: bold;
  font-size: 48px;
`;

const GameList = styled.div`
  height: 60%;
`;

const InputBox = styled(motion.div)`
  background-color: rgba(44, 62, 80, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ecf0f1;
  position: fixed;
`;

const MoneyInput = styled.input`
  width: 80%;
  margin: 10px 0;
  background-color: #2c3e50;
  color: #ecf0f1;
  border: none;
  border-bottom: 2px solid #3498db;
  padding: 5px;
  font-size: 16px;
`;

const MoneyStatus = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;

const MoneyBtn = styled.button`
  width: 120px;
  height: 35px;
  background-color: #2980b9;
  border: none;
  border-radius: 5px;
  color: white;
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #2574a9;
  }
`;

const inputVar = {
  start: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.5,
    },
  },
  leaving: {
    opacity: 0,
    scale: 0,
  },
};
function GameMenu() {
  const {
    state: { userData, userId, existBoard },
  } = useLocation();

  const [bb, setBb] = useState(50);
  const [isPlay, isSetPlay] = useState(false);
  const navigate = useNavigate();
  const [blind1000, setBlind1000] = useState([]);
  const [blind2000, setBlind2000] = useState([]);
  const [blind4000, setBlind4000] = useState([]);
  const [blind10000, setBlind10000] = useState([]);

  const handleMoneyChange = (e) => {
    setBb(parseInt(e.target.value, 10));
  };

  const playGame = (cancel) => {
    isSetPlay((prev) => !prev);
    if (cancel) {
      setBb(50);
    }
  };

  useEffect(() => {
    if (existBoard && existBoard.length >= 1) {
      //이전 게임 존재 할 경우 들어가기
      existBoard.forEach(async (board, index) => {
        const res = await axios.get(`${BASE_URL}/api/board/${board.id}`);
        const goGame = window.open("/gameRoom", `gameRoom${board.id}`);
        const sendData = {
          userData: userData,
          userId: userId,
          boardData: res.data,
        };
        goGame.name = JSON.stringify(sendData);
      });
    }
    //blind단위로 보드 받아오기
    const getBoardList = async () => {
      try {
        const [res1, res2, res3, res4] = await Promise.all([
          await axios.get(`${BASE_URL}/api/board/search/${1000}`),
          await axios.get(`${BASE_URL}/api/board/search/${2000}`),
          await axios.get(`${BASE_URL}/api/board/search/${4000}`),
          await axios.get(`${BASE_URL}/api/board/search/${10000}`),
        ]);
        setBlind1000(res1.data);
        setBlind2000(res2.data);
        setBlind4000(res3.data);
        setBlind10000(res4.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
        console.error("방검색 에러", error);
      }
    };
    getBoardList();
  }, []);
  const getBlind1 = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/board/search/${1000}`);
      setBlind1000(res.data);
    } catch (error) {
      console.error("새로고침 search board error", error);
    }
  };
  const getBlind2 = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/board/search/${2000}`);
      setBlind2000(res.data);
    } catch (error) {
      console.error("새로고침 search board error", error);
    }
  };
  const getBlind3 = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/board/search/${4000}`);
      setBlind4000(res.data);
    } catch (error) {
      console.error("새로고침 search board error", error);
    }
  };
  const getBlind4 = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/board/search/${10000}`);
      setBlind10000(res.data);
    } catch (error) {
      console.error("새로고침 search board error", error);
    }
  };

  const buyIn = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/board/joinGame`, null, {
        params: {
          bb,
          blind: 1000,
        },
      });

      const goGame = window.open("/gameRoom", `gameRoom${res.data.id}`);
      const sendData = {
        userData: userData,
        userId: userId,
        boardData: res.data,
      };
      goGame.name = JSON.stringify(sendData);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
      console.log("바이인 에러", error);
    }
  };

  const viewProfile = () => {
    window.open("/profile", "_blank", "width=500,height=500");
  };
  const goHandHistory = () => {
    navigate("/handHistory");
  };

  return (
    <GameContainer>
      <TitleBox>
        <Title>포커 게임</Title>
      </TitleBox>

      <GameList>
        <GameRoomList
          userData={userData}
          userId={userId}
          blind1={blind1000}
          blind2={blind2000}
          blind3={blind4000}
          blind4={blind10000}
          getBlind1={getBlind1}
          getBlind2={getBlind2}
          getBlind3={getBlind3}
          getBlind4={getBlind4}
        />
      </GameList>

      <AnimatePresence>
        {isPlay ? (
          <InputBox
            variants={inputVar}
            initial="start"
            animate="visible"
            exit="leaving"
          >
            <MoneyInput
              type="range"
              id="money"
              min="50"
              max="100"
              value={bb}
              onChange={handleMoneyChange}
            />
            <MoneyStatus>{bb}</MoneyStatus>
            <MoneyBtn onClick={buyIn}>바이인</MoneyBtn>
            <MoneyBtn onClick={() => playGame("cancel")}>취소</MoneyBtn>
          </InputBox>
        ) : null}
      </AnimatePresence>
    </GameContainer>
  );
}

export default GameMenu;
