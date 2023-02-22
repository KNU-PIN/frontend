import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import { THEME } from "../constants/colors";
import axios from "axios";
import React, { useState, useRef } from "react";

export default function CreatePin() {
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
      longitude: 128.6000,
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

  return (
    <>
      <Layout title="게시글 작성" hasBackButton>
        <FormWrapper>
          <Wrapper className="img-preview">
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
          <br></br>
          <Wrapper>
            <Category>
              <FreeButton value={"free"} onChange={(e) => setType(e.target.value)}>
                자유글
              </FreeButton>
              <WantedButton value={"gathering"} onChange={(e) => setType(e.target.value)}>
                구인구직
              </WantedButton>
              <MarketButton value={"buy"} onChange={(e) => setType(e.target.value)}>
                장터
              </MarketButton>
            </Category>
          </Wrapper>
          <Wrapper>
            <Type>게시글 작성 ✒️</Type>
            <br />
            <br />
            <StyledInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요." />
          </Wrapper>
          <Wrapper>
            <StyledTextarea value={contents} onChange={(e) => setContents(e.target.value)} placeholder="내용을 입력하세요." />
          </Wrapper>
          <Wrapper>
            <Type>비번번호 🔒︎</Type>
            <br />
            <StyledInput2 value={pw} onChange={(e) => setPw(e.target.value)} />
          </Wrapper>
          <Wrapper>
            <br />
            <StyledButton onClick={onCreate}>완료</StyledButton>
          </Wrapper>
        </FormWrapper>
      </Layout>
      ;
    </>
  );
}
//버튼 태그는 content 자동 중앙 정렬 해줍니다.
const FreeButton = styled.button`
  color: black;
  width: 30%;
  height: 3rem;
  margin-right: 1em;
  font-size: 12px;
  border: none;
  border-radius: 1em;
  background-color: #ff6868;
  letter-spacing: 0.5px;
  &:focus {
    outline: none;
    border: 4px solid ${THEME.primary};
  }
`;

const WantedButton = styled.button`
  color: black;
  width: 30%;
  height: 3rem;
  font-size: 12px;
  border: none;
  border-radius: 1em;
  background-color: #e2ff08;
  letter-spacing: 0.5px;
  &:focus {
    outline: none;
    border: 4px solid ${THEME.primary};
  }
`;

const MarketButton = styled.button`
  color: black;
  width: 30%;
  height: 3rem;
  margin-left: 1em;
  font-size: 12px;
  border: none;
  border-radius: 1em;
  background-color: #6ee36e;
  letter-spacing: 0.5px;
  &:focus {
    outline: none;
    border: 4px solid ${THEME.primary};
  }
`;
const Category = styled.div`
  display: flex;

  //자식 요소 가운데 정렬을 위해 가로 100을 주고 justify-content설정 해줍니다.
  //justify-conetnet에는 space-envenly, space-around, space-between등의 설정도 있습니다.
  width: 100%;
  justify-content: center;
`;
const ImgPreview = styled.img`
  width: 60%;
  height: 60%;
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
  margin: 1rem auto;
  width: 40%;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.form`
  height: 80%;
  width:90%
  display: flex;
  margin: auto;
  flex-direction: column;
  background-color: white;
  gap: 1.1rem;
  border-radius: 10px;
`;
const Type = styled.span`
  font-family: "GangwonEduPowerExtraBoldA";
  font-size: 1rem;
  margin-bottom: -0.5rem;
  margin-left: 0.5rem;
  text-align: left;
`;
const Wrapper = styled.div`
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const StyledH1 = styled.h1`
  font-size: 2rem;
  color: ${THEME.primary};
  margin-bottom: 1.1rem;
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
  line-height: 1.5rem;
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
const StyledSelect = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  font-family: "Noto Sansf KR", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;

  padding: 0.6em 1.4em 0.5em 0.8em;
  display: flex;
  margin: auto;

  border: 2px solid ${THEME.black400};
  border-radius: 0.5em;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);

  &:focus {
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
    border: 2px solid ${THEME.primary};
  }
`;
