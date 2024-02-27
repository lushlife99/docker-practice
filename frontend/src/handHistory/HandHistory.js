import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BASE_URL } from "../api";
import HandHistoryTable from "./HandHistoryTable";
import Carousel from "react-bootstrap/Carousel";
import { useLocation } from "react-router-dom";

const CustomCarousel = styled(Carousel)`
  .carousel-control-prev {
    left: -5%;
  }

  .carousel-control-next {
    right: -5%;
  }
  overflow: hidden;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  height: 40%;
  background-color: #141414;
`;
const Col = styled.div`
  width: 100%;
  color: white;
  font-weight: bold;
  font-size: 23px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const Phase = styled.div`
  background-color: #141414;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px solid lightgray;
`;
const PhaseText = styled.span`
  margin-bottom: 10px;
`;
const PhaseBB = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  color: gold;
`;
const Content = styled.div`
  background-color: #3b3b3f;
  height: 90%;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 10px 20px;
`;
const DetailContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;
const Postion = styled.div`
  margin-right: 30px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${(props) => props.$position};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  border: 2px solid black;
`;

const BetDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  color: black;
  padding: 10px;
  border-radius: 8px;
  font-size: 17px;
  width: 10vw;
  height: 3vh;
`;
const MyBetDetail = styled(BetDetail)`
  background-color: gold;
  color: red;
`;
const NoHandContainer = styled.div`
  background-color: #15202b;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NoHandText = styled.span`
  color: whitesmoke;
  font-weight: bold;
  font-size: 30px;
`;
function HandHistory() {
  const [hand, setHand] = useState([]);
  const {
    state: { userData, userId },
  } = useLocation();
  useEffect(() => {
    const getHandHistory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/handHistory`);

        setHand(res.data);
      } catch (error) {
        console.error("핸드 히스토리 가져오기", error);
        if (error.response) {
          //alert(error.response.data.message);
        }
      }
    };
    getHandHistory();
  }, []);
  const playerPosition = (position, btnPosition) => {
    if (position === btnPosition) {
      return "BTN";
    } else if ((position + 1) % 6 === btnPosition) {
      return "CO";
    } else if ((position + 2) % 6 === btnPosition) {
      return "MP";
    } else if ((position + 3) % 6 === btnPosition) {
      return "UTG";
    } else if ((position + 4) % 6 === btnPosition) {
      return "BB";
    } else {
      return "SB";
    }
  };
  const positionBackgroundColor = (position, btnPosition) => {
    let positionColor = "";
    if (position === btnPosition) {
      positionColor = "#443125";
    } else if ((position + 1) % 6 === btnPosition) {
      positionColor = "#796120";
    } else if ((position + 2) % 6 === btnPosition) {
      positionColor = "#39425D";
    } else if ((position + 3) % 6 === btnPosition) {
      positionColor = "#295357";
    } else if ((position + 4) % 6 === btnPosition) {
      positionColor = "#3B3B3F";
    } else {
      positionColor = "#616E3A";
    }
    return positionColor;
  };
  const userIdInt = parseInt(userId, 10);

  return (
    <React.Fragment>
      {hand.length !== 0 ? (
        <CustomCarousel interval={null}>
          {hand &&
            hand.map((data, index) => (
              <Carousel.Item key={index}>
                <Container>
                  <HandHistoryTable hand={data} userId={userId} />
                  <Row>
                    <Col>
                      <Phase>
                        <PhaseText>프리 플랍</PhaseText>
                        {data.potAmountPf !== 0 && (
                          <PhaseBB>{data.potAmountPf}BB</PhaseBB>
                        )}
                      </Phase>

                      <Content>
                        {data.actionList.map(
                          (action, index) =>
                            action.phaseStatus == 1 && (
                              <DetailContainer key={index + "pf"}>
                                <Postion
                                  $position={positionBackgroundColor(
                                    action.actPosition,
                                    data.btnPosition
                                  )}
                                >
                                  {playerPosition(
                                    action.actPosition,
                                    data.btnPosition
                                  )}
                                </Postion>
                                {userIdInt === action.userId ? (
                                  <MyBetDetail>{action.detail}</MyBetDetail>
                                ) : (
                                  <BetDetail>{action.detail}</BetDetail>
                                )}
                              </DetailContainer>
                            )
                        )}
                      </Content>
                    </Col>
                    <Col>
                      <Phase>
                        <PhaseText>플랍</PhaseText>
                        {data.potAmountFlop !== 0 && (
                          <PhaseBB>{data.potAmountFlop}BB</PhaseBB>
                        )}
                      </Phase>

                      <Content>
                        {data.actionList.map(
                          (action, index) =>
                            action.phaseStatus == 2 && (
                              <DetailContainer key={index + "flop"}>
                                <Postion
                                  $position={positionBackgroundColor(
                                    action.actPosition,
                                    data.btnPosition
                                  )}
                                >
                                  {playerPosition(
                                    action.actPosition,
                                    data.btnPosition
                                  )}
                                </Postion>
                                {userIdInt === action.userId ? (
                                  <MyBetDetail>{action.detail}</MyBetDetail>
                                ) : (
                                  <BetDetail>{action.detail}</BetDetail>
                                )}
                              </DetailContainer>
                            )
                        )}
                      </Content>
                    </Col>
                    <Col>
                      <Phase>
                        <PhaseText>턴</PhaseText>
                        {data.potAmountTurn !== 0 && (
                          <PhaseBB>{data.potAmountTurn}BB</PhaseBB>
                        )}
                      </Phase>

                      <Content>
                        {data.actionList.map(
                          (action, index) =>
                            action.phaseStatus == 3 && (
                              <DetailContainer key={index + "turn"}>
                                <Postion
                                  $position={positionBackgroundColor(
                                    action.actPosition,
                                    data.btnPosition
                                  )}
                                >
                                  {playerPosition(
                                    action.actPosition,
                                    data.btnPosition
                                  )}
                                </Postion>
                                {userIdInt === action.userId ? (
                                  <MyBetDetail>{action.detail}</MyBetDetail>
                                ) : (
                                  <BetDetail>{action.detail}</BetDetail>
                                )}
                              </DetailContainer>
                            )
                        )}
                      </Content>
                    </Col>
                    <Col>
                      <Phase>
                        <PhaseText>리버</PhaseText>
                        {data.potAmountRiver !== 0 && (
                          <PhaseBB>{data.potAmountRiver}BB</PhaseBB>
                        )}
                      </Phase>

                      <Content>
                        {data.actionList.map(
                          (action, index) =>
                            action.phaseStatus == 4 && (
                              <DetailContainer key={index + "river"}>
                                <Postion
                                  $position={positionBackgroundColor(
                                    action.actPosition,
                                    data.btnPosition
                                  )}
                                >
                                  {playerPosition(
                                    action.actPosition,
                                    data.btnPosition
                                  )}
                                </Postion>
                                {userIdInt === action.userId ? (
                                  <MyBetDetail>{action.detail}</MyBetDetail>
                                ) : (
                                  <BetDetail>{action.detail}</BetDetail>
                                )}
                              </DetailContainer>
                            )
                        )}
                      </Content>
                    </Col>
                  </Row>
                </Container>
              </Carousel.Item>
            ))}
        </CustomCarousel>
      ) : (
        <NoHandContainer>
          <NoHandText>핸드 히스토리 기록이 없습니다</NoHandText>
        </NoHandContainer>
      )}
    </React.Fragment>
  );
}

export default HandHistory;
