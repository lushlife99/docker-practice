import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("/images/pokerBack.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const StartDiv = styled(motion.div)`
  font-weight: bold;
  font-size: 60px;
  &:hover {
    font-size: 70px;
  }
`;
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const boxV = {
  start: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 20,
  },
};

function Start() {
  return (
    <StartContainer>
      <StartDiv
        initial={{ scale: 1 }}
        animate={{
          scale: 1,
          opacity: [1, 0, 1],
          transition: { duration: 2, repeat: Infinity },
        }}
      >
        <Link style={{ color: "yellow" }} to={"/login"}>
          시작하기
        </Link>
      </StartDiv>
    </StartContainer>
  );
}

export default Start;
