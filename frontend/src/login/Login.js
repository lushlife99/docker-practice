import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { BASE_URL } from "../api";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #15202b;
`;

const LoginForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 18vw;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
`;

const LoginInput = styled.input`
  width: 100%;
  border-radius: 15px;
  margin: 10px 0;
  padding: 10px;
  background-color: #f0f2f5;
  font-size: 16px;
  outline: none;
  border: none;
  color: #15202b;
  font-weight: bold;
  &::placeholder {
    color: #2f3640;
    font-weight: bold;
  }
`;

const LoginSpan = styled.span`
  color: red;
  margin-top: 5px;
  font-weight: bold;
  font-size: 15px;
`;

const LoginBtn = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
  background-color: #1e88e5;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  outline: none;

  &:hover {
    background-color: #1565c0;
  }
`;

const loginVar = {
  start: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1,
    },
  },
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const onValid = async (data) => {
    const { userId, password } = data;

    try {
      const res = await axios.post(`${BASE_URL}/login`, null, {
        params: {
          username: userId,
          password,
        },
      });

      const subId = res.headers["subscribe-id"]; //웹소켓 구독 + board에서 본인 찾기위함

      const res2 = await axios.get(`${BASE_URL}/api/board/context`);

      //재접속시 필요한 보드 데이터

      navigate("/main", {
        state: { userData: data, userId: subId, existBoard: res2.data },
      });
    } catch (error) {
      console.log("로그인 에러", error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }

    setValue("userId", "");
    setValue("password", "");
  };

  const onClickJoinBtn = (e) => {
    e.preventDefault();
    navigate("/join");
  };

  return (
    <LoginContainer>
      <AnimatePresence>
        <LoginForm
          variants={loginVar}
          initial="start"
          animate="visible"
          onSubmit={handleSubmit(onValid)}
        >
          <LoginInput
            {...register("userId", {
              required: "아이디를 입력해주세요",
            })}
            placeholder="아이디"
          />

          <LoginSpan>{errors.userId?.message}</LoginSpan>
          <LoginInput
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            placeholder="비밀번호"
            type="password"
          />
          <LoginSpan>{errors.password?.message}</LoginSpan>

          <LoginBtn>로그인</LoginBtn>
          <LoginBtn onClick={onClickJoinBtn}>회원가입</LoginBtn>
        </LoginForm>
      </AnimatePresence>
    </LoginContainer>
  );
}

export default Login;
