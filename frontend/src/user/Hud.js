import axios from "axios";
import React, { useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { styled } from "styled-components";
import { BASE_URL } from "../api";

const HudContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

const UserImg = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InformBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.span`
  color: white;
  font-weight: bold;
  font-size: 30px;
`;
const PlayCount = styled(UserName)`
  font-size: 20px;
  margin-bottom: 10px;
`;

const HudInform = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 20px;
`;

const HudBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HudText = styled.span`
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;
const HudPercent = styled.div`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;
const Subscription = styled.span`
  background-color: #444345;
  padding: 10px;
  font-weight: bolder;
  position: absolute;
  color: white;
  transition: opacity 0.3s ease-in-out;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1;
`;

function Hud() {
  const receivedData = JSON.parse(window.name);

  const { hudData } = receivedData;

  const [hud, setHud] = useState({});
  const [image, setImage] = useState();
  const [vpip, setVpip] = useState(false);
  const [pfr, setPFR] = useState(false);
  const [cbet, setCBet] = useState(false);
  const [threeBet, setThreeBet] = useState(false);
  const [wtsd, setWTSD] = useState(false);
  const [wsd, setWsd] = useState(false);
  const img = "/images/defaultProfile.png";

  const handleMouseLeave = (event) => {
    setVpip(false);
    setPFR(false);
    setCBet(false);
    setThreeBet(false);
    setWTSD(false);
    setWsd(false);
  };

  useEffect(() => {
    setHud(hudData);
    const getUserImg = async () => {
      const res = await axios.get(
        `${BASE_URL}/api/user/image/${hudData.userId}`,
        {
          responseType: "blob",
        }
      );

      setImage(res.data);
    };
    getUserImg();
  }, []);
  return (
    <HudContainer>
      <div>
        <UserName>{hud.userName}'s HUD</UserName>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100vw",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserImg
            src={image && image.size !== 0 ? URL.createObjectURL(image) : img}
          />
        </div>

        <InformBox>
          <PlayCount>{hud.totalHands} GAME</PlayCount>
          <HudInform>
            <HudBox
              onMouseEnter={() => setVpip(true)}
              onMouseLeave={handleMouseLeave}
            >
              <HudText>VPIP</HudText>
              {vpip && (
                <Subscription>프리플랍에서 베팅하거나 콜하는 비율</Subscription>
              )}
              <CircularProgressbarWithChildren
                value={
                  hud.totalHands !== 0 ? (hud.vpip / hud.totalHands) * 100 : 0
                }
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "red",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },

                  trail: {
                    stroke: "#d7d7d7",
                  },
                }}
              >
                <HudPercent>
                  {hud.totalHands !== 0
                    ? (hud.vpip / hud.totalHands).toFixed(1) * 100
                    : 0}
                  %
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>

            <HudBox
              onMouseEnter={() => setPFR(true)}
              onMouseLeave={handleMouseLeave}
            >
              <HudText>PFR</HudText>
              {pfr && (
                <Subscription>
                  프리플랍에서 베팅 또는 레이즈하는 비율
                </Subscription>
              )}
              <CircularProgressbarWithChildren
                value={
                  hud.totalHands !== 0 ? (hud.pfr / hud.totalHands) * 100 : 0
                }
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "orange",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },
                  trail: {
                    stroke: "lightgray",
                  },
                }}
              >
                <HudPercent>
                  {hud.totalHands !== 0
                    ? (hud.pfr / hud.totalHands).toFixed(1) * 100
                    : 0}
                  %
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>

            <HudBox
              onMouseEnter={() => setCBet(true)}
              onMouseLeave={handleMouseLeave}
            >
              <HudText>CBET</HudText>
              {cbet && (
                <Subscription>
                  프리플랍에서 레이즈 또는 콜에 대한 응답
                </Subscription>
              )}
              <CircularProgressbarWithChildren
                value={
                  hud.pfAggressiveCnt !== 0 ? hud.cbet / hud.pfAggressiveCnt : 0
                }
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "yellow",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },
                  trail: {
                    stroke: "lightgray",
                  },
                }}
              >
                <HudPercent>
                  {hud.pfAggressiveCnt !== 0
                    ? (hud.cbet / hud.pfAggressiveCnt).toFixed(1)
                    : 0}
                  %
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>

            <HudBox
              onMouseEnter={() => setThreeBet(true)}
              onMouseLeave={handleMouseLeave}
            >
              <HudText>3BET</HudText>
              {threeBet && (
                <Subscription>상대 베팅에 대한 리레이즈 비율</Subscription>
              )}
              <CircularProgressbarWithChildren
                value={hud.wtf !== 0 ? hud.threeBet / hud.wtf : 0}
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "green",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },
                  trail: {
                    stroke: "lightgray",
                  },
                }}
              >
                <HudPercent>
                  {hud.wtf !== 0 ? (hud.threeBet / hud.wtf).toFixed(1) : 0}%
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>

            <HudBox
              onMouseEnter={() => setWTSD(true)}
              onMouseLeave={handleMouseLeave}
            >
              <HudText>WTSD</HudText>
              {wtsd && <Subscription>리버에서 쇼다운 참여한 비율</Subscription>}
              <CircularProgressbarWithChildren
                value={hud.wtf !== 0 ? hud.wtsd / hud.wtf : 0}
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "blue",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },
                  trail: {
                    stroke: "lightgray",
                  },
                }}
              >
                <HudPercent>
                  {hud.wtf !== 0 ? (hud.wtsd / hud.wtf).toFixed(1) : 0}%
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>

            <HudBox
              onMouseEnter={() => setWsd(true)}
              onMouseLeave={handleMouseLeave}
            >
              <HudText>WSD</HudText>
              {wsd && <Subscription>쇼다운에서 이긴 비율</Subscription>}
              <CircularProgressbarWithChildren
                value={hud.wtsd !== 0 ? hud.wsd / hud.wtsd : 0}
                styles={{
                  root: { height: "60px" },
                  path: {
                    stroke: "violet",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    strokeWidth: "8px",
                  },
                  trail: {
                    stroke: "lightgray",
                  },
                }}
              >
                <HudPercent>
                  {hud.wtsd !== 0 ? (hud.wsd / hud.wtsd).toFixed(1) : 0}%
                </HudPercent>
              </CircularProgressbarWithChildren>
            </HudBox>
          </HudInform>
        </InformBox>
      </div>
    </HudContainer>
  );
}

export default Hud;
