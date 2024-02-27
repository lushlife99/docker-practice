import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { styled } from "styled-components";
import { BASE_URL } from "../api";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px;
`;
const TableComponent = styled.div`
  max-height: 25vh;
  height: 25vh;
  width: 30vw;
  overflow-y: auto;
  border-radius: 10px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #adb5bd;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 12px 15px;
  background-color: #2c3e50; /* 배경색 추가 */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  width: 30vw;
`;

const Blind = styled.h1`
  font-size: 25px;
  color: whitesmoke;
  font-weight: bold;
`;

const QuickJoinBtn = styled.button`
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Adding smooth transition */
  &:hover {
    background-color: #219653;
  }
  font-weight: bold;
`;
const EnterBtn = styled(QuickJoinBtn)`
  background-color: #718093;
  &:hover {
    background-color: #7f8fa6;
  }
`;

const InputBox = styled(motion.div)`
  background-color: rgba(44, 62, 80, 0.9); /* 투명한 배경 색상 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ecf0f1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

// 나머지 코드는 그대로 유지

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
const BtnDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 60%;
`;

const BoardTitle = styled.th`
  font-weight: bolder;
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
function GameRoomList({
  blind1,
  blind2,
  blind3,
  blind4,
  userData,
  userId,
  getBlind1,
  getBlind2,
  getBlind3,
  getBlind4,
}) {
  const [bb, setBb] = useState(50);
  const [isPlay, isSetPlay] = useState(false);
  const [type, setType] = useState(0);
  const [blind, setBlind] = useState();
  const [board, setBoard] = useState();

  const handleMoneyChange = (e) => {
    setBb(parseInt(e.target.value, 10));
  };

  const playGame = (cancel) => {
    isSetPlay((prev) => !prev);

    if (cancel) {
      setBb(50);
    }
  };
  const f1 = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/board/joinGame`, null, {
        params: {
          bb,
          blind,
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
      console.log(error);
      alert(error.response.data.message);
    }
  };
  const f2 = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/board/joinGame/${board.id}`,
        null,
        {
          params: {
            boardId: board.id,
            bb,
          },
        }
      );

      const userIdInt = parseInt(userId, 10);
      const isExistUser = board.players.some(
        (player) => player.userId === userIdInt
      );

      if (!isExistUser) {
        const goGame = window.open("/gameRoom", `gameRoom${board.id}`);
        const sendData = {
          userData: userData,
          userId: userId,
          boardData: res.data,
        };
        goGame.name = JSON.stringify(sendData);
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  const createRoom = async (blind) => {
    playGame();
    setType(1);
    setBlind(blind);
  };
  const enterGame = async (boardData) => {
    playGame();
    setType(2);
    setBoard(boardData);
  };
  const buyIn = () => {
    if (type === 1) {
      f1();
    } else if (type === 2) {
      f2();
    }
    playGame();
    //getBoardList();
  };

  const refreshTable = (blind) => {
    // 새로고침 버튼

    if (blind === 1000) {
      getBlind1();
    } else if (blind === 2000) {
      getBlind2();
    } else if (blind === 4000) {
      getBlind3();
    } else if (blind === 10000) {
      getBlind4();
    }
  };

  const renderTable = (blindData, blind) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#34495e", // 게임 배경색
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Title>
        <Blind>Blind : {blind}</Blind>
        <BtnDiv>
          <QuickJoinBtn onClick={() => createRoom(blind)}>
            빠른 참가
          </QuickJoinBtn>
          <QuickJoinBtn onClick={() => refreshTable(blind)}>
            새로고침
          </QuickJoinBtn>
        </BtnDiv>
      </Title>
      <TableComponent>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <BoardTitle>NO</BoardTitle>
              <BoardTitle>인원</BoardTitle>
              <BoardTitle>게임 상태</BoardTitle>
              <BoardTitle>입장 여부</BoardTitle>
            </tr>
          </thead>
          <tbody>
            {blindData &&
              blindData.map((board, index) => (
                <tr key={index}>
                  <td>{board.id}</td>
                  <td>{board.totalPlayer}/6</td>
                  <td>
                    {board.phaseStatus === 0 ? <p>대기중</p> : <p>게임중</p>}
                  </td>
                  <td>
                    <EnterBtn onClick={() => enterGame(board)}>
                      입장하기
                    </EnterBtn>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </TableComponent>
    </div>
  );
  const renderNoTable = (blind) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#34495e", // 게임 배경색
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Title>
        <Blind>Blind : {blind}</Blind>
        <BtnDiv>
          <QuickJoinBtn onClick={() => createRoom(blind)}>
            빠른 참가
          </QuickJoinBtn>
          <QuickJoinBtn onClick={() => refreshTable(blind)}>
            새로고침
          </QuickJoinBtn>
        </BtnDiv>
      </Title>
      <div
        style={{
          maxHeight: "25vh",
          height: "25vh",
          width: "30vw",
          overflowY: "auto",
        }}
      >
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <BoardTitle>NO</BoardTitle>
              <BoardTitle>인원</BoardTitle>
              <BoardTitle>게임 상태</BoardTitle>
              <BoardTitle>입장 여부</BoardTitle>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>방이 없습니다</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Grid>
        {blind1.length >= 1 ? renderTable(blind1, 1000) : renderNoTable(1000)}
        {blind2.length >= 1 ? renderTable(blind2, 2000) : renderNoTable(2000)}
        {blind3.length >= 1 ? renderTable(blind3, 4000) : renderNoTable(4000)}
        {blind4.length >= 1 ? renderTable(blind4, 10000) : renderNoTable(10000)}
      </Grid>

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
    </React.Fragment>
  );
}

export default GameRoomList;
