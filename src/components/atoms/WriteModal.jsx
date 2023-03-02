import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import styled, { keyframes } from "styled-components";
import { THEME } from "../../constants/colors";
import axios from "axios";
import React, { useState, useRef, memo } from "react";
import Img from "./Img";

export default function WriteModal(props) {
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();
  const [pw, setPw] = useState();
  const [type, setType] = useState();

  const [imgFile, setImgFile] = useState("");

  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const onCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    let img = imgRef.current.files;
    for (let i = 0; i < img.length; i++) {
      formData.append("images[]", img[i]);
    }

    let variables = {
      title: title,
      contents: contents,
      pw: pw,
      type: type,
      latitude: 35.9004,
      longitude: 128.6,
    };

    for (let key in variables) {
      formData.append(key, variables[key]);
    }

    //Post 기능
    try {
      let response = await axios.post("/api/v1/pinboard/createpin", formData);
      console.log(response.status);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Header>
          <PinTitle>
            PIN 선택&nbsp;
            <PinImg src={"https://cdn-icons-png.flaticon.com/512/1201/1201684.png"}></PinImg>
            <PinCancel onClick={() => navigate(-1)}>게시글 작성 취소 X</PinCancel>
          </PinTitle>
        </Header>
        <FormWrapper>
          <Category>
            <FreeButton
              value={type}
              onClick={(e) => {
                e.preventDefault();
                setType("free");
              }}
            >
              자유
            </FreeButton>
            <WantedButton
              value={type}
              onClick={(e) => {
                e.preventDefault();
                setType("gathering");
              }}
            >
              구인구직
            </WantedButton>
            <MarketButton
              value={type}
              onClick={(e) => {
                e.preventDefault();
                setType("buy");
              }}
            >
              장터
            </MarketButton>
          </Category>
          <Wrapper>
            <ImgPreview id="img-preview" src={imgFile ? imgFile : process.env.PUBLIC_URL + "/img/CreatePin_sampleimg.png"}></ImgPreview>
            <UploadImage
              type="file"
              multiple
              accept="image/jpg,image/jpeg,image/jpe,image/png"
              id="uploadImg"
              onChange={saveImgFile}
              ref={imgRef}
            ></UploadImage>
          </Wrapper>
          <Wrapper>
            <Type>게시글 작성 ✒️</Type>
            <br />
            <StyledInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요." />
            <br />
            <StyledTextarea value={contents} onChange={(e) => setContents(e.target.value)} placeholder="내용을 입력하세요." />
          </Wrapper>
          <Wrapper>
            <Type>비번번호 🔒︎</Type>
            <StyledInput2 value={pw} onChange={(e) => setPw(e.target.value)} />
          </Wrapper>
          <Wrapper>
            <br />
            <StyledButton onClick={onCreate}>완료</StyledButton>
          </Wrapper>
        </FormWrapper>
      </Container>
      ;
    </>
  );
}
const PinCancel = styled.button`
  display: inline-block;
  margin: auto 0 0 auto;
  font-size: 1em;
  border: none;
  background-color: white;
  width: 10em;
  text-align: right;
`;
const PinImg = styled.img`
  width: 1em;
  height: 1em;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2REM;
  width: 100%;
`;
const PinTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  font-size: 1em;
  margin-left: 1.5em;
  margin-bottom: 1em;
`;
const modalSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(200px);
  }
  100% {
    opacity: 1;
    transform: none;
  }
`;
const Container = styled.div`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 100%;

  background-color: white;

  z-index: 1;
  overflow: scroll;
  //아래에서
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${modalSlideUp} 1s ease-out;
`;
const FreeButton = styled.button`
  color: white;
  width: 30%;
  height: 3rem;
  margin-right: 0.5em;
  font-size: 20px;
  border: none;
  border-radius: 3em;
  background-color: #ff6868;
  letter-spacing: 0.5px;
  &:focus {
    outline: none;
    border: 4px solid ${THEME.primary};
  }
`;

const WantedButton = styled.button`
  color: white;
  width: 30%;
  height: 3rem;
  font-size: 20px;
  border: none;
  border-radius: 3em;
  background-color: #ffdb5b;
  letter-spacing: 0.5px;
  &:focus {
    outline: none;
    border: 4px solid ${THEME.primary};
  }
`;

const MarketButton = styled.button`
  color: white;
  width: 30%;
  height: 3rem;
  margin-left: 0.5em;
  font-size: 20px;
  border: none;
  border-radius: 3em;
  background-color: #6ee36e;
  letter-spacing: 0.5px;
  &:focus {
    outline: none;
    border: 4px solid ${THEME.primary};
  }
`;
const Category = styled.div`
  display: flex;
  margin-top: 0.5rem;
  //자식 요소 가운데 정렬을 위해 가로 100을 주고 justify-content설정 해줍니다.
  //justify-conetnet에는 space-envenly, space-around, space-between등의 설정도 있습니다.
  width: 100%;
  justify-content: center;
`;
const ImgPreview = styled.img`
  width: 80%;
  height: 80%;
  position: relative;
  border: 2px solid ${THEME.black400};
  border-radius: 0.5em;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  display: flex;
  margin: auto;
`;

const UploadImage = styled.input`
  position: relative;
  display: flex;
  margin: 0.5rem auto;
  width: 40%;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.form`
  display: flex;
  margin: auto;
  flex-direction: column;
  background-color: white;
  gap: 0.5rem;
`;
const Type = styled.span`
  font-family: "GangwonEduPowerExtraBoldA";
  font-size: 1rem;
  margin-left: 1em;
  text-align: left;
`;
const Wrapper = styled.div`
  padding: 0.5rem;
`;
const StyledInput = styled.input`
  font-size: 1rem;
  line-height: 2rem;
  color: black;
  text-align: left;
  border: 2px solid ${THEME.black400};
  border-radius: 0.5em;
  padding: 0.5rem;
  width: 90%;
  transition: 0.5s;
  ::placeholder {
    color: black;
    text-align: left;
  }
  &:focus {
    outline: none;
    border: 2px solid ${THEME.primary};
  }
  display: flex;
  margin: auto;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
`;
const StyledInput2 = styled.input`
  font-size: 1rem;
  line-height: 1rem;
  color: black;
  background-color: ${THEME.black400};
  text-align: left;
  border: 2px solid ${THEME.black400};
  border-radius: 0.5em;
  padding: 0.5rem;
  width: 90%;
  display: flex;
  margin: auto;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
`;
const StyledButton = styled.button`
  font-size: 1.2rem;
  line-height: 2rem;
  background-color: #7a84db;
  border: 2px solid #7a84db;
  color: white;
  border-radius: 0.5em;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  margin: auto;
  width: 40%;
  justify-content: center;
  align-items: center;
`;
const StyledTextarea = styled.textarea`
  font-size: 1rem;
  line-height: 2rem;
  color: black;
  text-align: left;
  border: 2px solid ${THEME.black400};
  border-radius: 0.5em;
  padding: 0.5rem;
  width: 90%;
  height: 9rem;
  transition: 0.5s;
  ::placeholder {
    color: black;
    text-align: left;
  }
  &:focus {
    outline: none;
    border: 2px solid ${THEME.primary};
  }
  display: flex;
  margin: auto;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
`;
