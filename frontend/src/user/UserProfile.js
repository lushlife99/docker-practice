import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { BASE_URL } from "../api";
import Form from "react-bootstrap/Form";
import "./user.css";

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const UserImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
`;
const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProfileInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid red;
  display: none;
`;

const ProfileSubmitButton = styled.label`
  padding: 10px 20px;
  background-color: #3498db; /* 변경된 배경색 */
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
  &:hover {
    background-color: #2980b9; /* 호버 시 변경될 배경색 */
  }
`;
const UserInfo = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Label = styled.label`
  color: #15202b;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: #f0f2f5;
  color: #15202b;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
`;

function UserProfile() {
  const [user, setUser] = useState({});
  const [image, setImage] = useState();
  const img = "/images/defaultProfile.png";

  useEffect(() => {
    const getProfile = async () => {
      let res;
      try {
        res = await axios.get(`${BASE_URL}/api/user/profile`);

        setUser(res.data);
      } catch (error) {
        console.log("유저 정보 가져오기 에러", error);
        if (error.response) {
          //alert(error.response.data.message);
        }
      }
      try {
        const res2 = await axios.get(
          `${BASE_URL}/api/user/image/${res.data.id}`,
          { responseType: "blob" }
        );

        setImage(res2.data);
      } catch (error) {
        console.error("프로필 사진 가져오기 에러", error);
        if (error.response) {
          // alert(error.response.data.message);
        }
      }
    };
    getProfile();
  }, []);

  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append("file", e.currentTarget.files[0]);
    try {
      const res = await axios.post(`${BASE_URL}/api/user/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const res2 = await axios.get(
        `${BASE_URL}/api/user/image/${res.data.id}`,
        {
          responseType: "blob",
        }
      );
      setImage(res2.data);
    } catch (error) {
      console.log("사진전송에러", error);
      if (error.response) {
        //alert(error.response.data.message);
      }
    }
  };

  return (
    <UserContainer>
      <UserImageWrapper>
        <UserImage
          src={image && image.size !== 0 ? URL.createObjectURL(image) : img}
        />
        <ProfileForm>
          <ProfileSubmitButton htmlFor="image">
            이미지 업로드
          </ProfileSubmitButton>
          <ProfileInput onChange={handleFileChange} type="file" id="image" />
        </ProfileForm>
      </UserImageWrapper>

      <UserInfo>
        <Label>아이디</Label>
        <Input value={user.userId || ""} disabled />
      </UserInfo>
      <UserInfo>
        <Label>이름</Label>
        <Input value={user.userName || ""} disabled />
      </UserInfo>
      <UserInfo>
        <Label>보유 금액</Label>
        <Input value={user.money || ""} disabled />
      </UserInfo>
    </UserContainer>
  );
}

export default UserProfile;
