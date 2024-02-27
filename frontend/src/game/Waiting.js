import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { styled } from "styled-components";
import TableComponent from "./gameComponents/TableComponent";
import Button from "react-bootstrap/Button";

const WaitingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SpinnerOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

function Waiting({ board, myPlayer, message, userData, userId }) {
  return (
    <WaitingContainer>
      <SpinnerOverlay>
        <Button variant="primary" disabled size="lg">
          <Spinner as="span" animation="grow" size="sm" role="status" />
          게임시작 대기중
        </Button>
      </SpinnerOverlay>
      <TableComponent
        myPlayer={myPlayer}
        board={board}
        message={message}
        userData={userData}
        userId={userId}
      />
    </WaitingContainer>
  );
}

export default Waiting;
