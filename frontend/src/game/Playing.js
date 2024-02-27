import { styled } from "styled-components";
import TableComponent from "./gameComponents/TableComponent";

const PlayingContainer = styled.div``;

function Playing({
  board,
  myPlayer,
  setBoard,
  client,
  message,
  userData,
  userId,
}) {
  return (
    <PlayingContainer>
      <TableComponent
        myPlayer={myPlayer}
        board={board}
        setBoard={setBoard}
        client={client}
        message={message}
        userData={userData}
        userId={userId}
      />
      ;
    </PlayingContainer>
  );
}

export default Playing;
