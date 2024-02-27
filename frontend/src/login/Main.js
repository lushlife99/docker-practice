import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import UserProfile from "../user/UserProfile";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #15202b;
`;
const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  width: 30vw;
  height: 80vh;
`;
const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
  &:hover {
    background-color: #2980b9;
  }
  margin-bottom: 10px;
  width: 30%;
`;

function Main(props) {
  const {
    state: { userData, userId, existBoard },
  } = useLocation();
  const navigate = useNavigate();

  const goPlay = () => {
    navigate("/game", {
      state: { userData: userData, userId: userId, existBoard: existBoard },
    });
  };
  const goHandHistory = () => {
    navigate("/handHistory", {
      state: { userData: userData, userId, userId },
    });
  };
  return (
    <MainContainer>
      <MainWrapper>
        <UserProfile />
        <Button onClick={goPlay}>플레이</Button>
        <Button onClick={goHandHistory}>핸드히스토리</Button>
      </MainWrapper>
    </MainContainer>
  );
}

export default Main;
