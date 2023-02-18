import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ImgUpload from "../components/ImgUpload";
import styled from "styled-components";
import { THEME } from "../constants/colors";
import axios from "axios";
import React, { useState } from "react";

export default function CreatePin() {
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();
  const [pw, setPw] = useState();
  const [type,setType]=useState();
  return (
    <>
      <Layout title="게시글 작성" hasBackButton>
        <Wrapper>
          <StyledH1>핀 작성</StyledH1>
          <FormWrapper value>
            <ImgUpload></ImgUpload>
            <Wrapper>
              <StyledSelect value={type} onChange={(e)=>setType(e.target.value)}>
                <option>Tag 선택</option>
                <option value={"free"}>자유</option>
                <option value={"gathering"}>구인구직</option>
                <option value={"buy"}>장터</option>
              </StyledSelect>
            </Wrapper>
            <Wrapper>
              <Type>제목</Type>
              <br />
              <StyledInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder=" 제목을 입력하세요." />
            </Wrapper>
            <Wrapper>
              <Type>내용</Type>
              <br />
              <StyledTextarea value={contents} onChange={(e) => setContents(e.target.value)} placeholder=" 내용을 입력하세요." />
            </Wrapper>
            <Wrapper>
              <Type>비번</Type>
              <br />
              <StyledInput value={pw} onChange={(e) => setPw(e.target.value)} placeholder=" 비번을 입력하세요." />
            </Wrapper>
            <Wrapper>
              <StyledButton
                onClick={(e) => {
                  e.preventDefault();
                  axios
                    .post("http://localhost:4000/title", {
                      title: title,
                      contents: contents,
                      pw: pw,
                      type: type,
                      latitude: "",
                      longitude: "",
                    }) //주소url 입력 필요
                    .then(() => {
                      console.log(title, contents);
                    })
                    .catch((err) => {
                      console.log(err); //응답 실패
                    });
                }}
              >
                작성 완료!
              </StyledButton>
            </Wrapper>
          </FormWrapper>
        </Wrapper>
      </Layout>
      ;
    </>
  );
}
const StyledButton = styled.button`
  font-size: 2rem;
  background-color: ${THEME.primary};
  border: 2px solid ${THEME.primary};
  color: white;
  border-radius: 8px;
  font-weight: 500;
`;

const FormWrapper = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${THEME.black100};
  gap: 1.1rem;
  width: 100%;
  padding: 1.1rem;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
const Type = styled.span`
  font-family: "GangwonEduPowerExtraBoldA";
  font-size: 1.2rem;
  margin-bottom: -0.5rem;
  text-align: left;
  padding-right: 0.5rem;
`;
const Wrapper = styled.div`
  padding: 0.2rem 3rem;
`;

const StyledH1 = styled.h1`
  font-size: 2rem;
  color: ${THEME.primary};
  margin-bottom: 1.1rem;
`;
const StyledInput = styled.input`
  font-size: 1.2rem;
  line-height: 2rem;
  color: black;
  text-align: left;
  border: 2px solid ${THEME.black400};
  border-radius: 0.5em;
  padding: 0.5rem;
  padding-left: 1rem;
  width: 16rem;
  transition: 0.5s;
  ::placeholder {
    color: ${THEME.black500};
    text-align: left;
  }
  &:focus {
    outline: none;
    border: 2px solid ${THEME.primary};
  }
  margin: 0.5rem 0;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
`;
const StyledTextarea = styled.textarea`
  font-size: 1.2rem;
  line-height: 2rem;
  color: black;
  text-align: left;
  border: 2px solid ${THEME.black400};
  border-radius: 0.5em;
  padding: 0.5rem;
  padding-left: 1rem;
  width: 16rem;
  height: 6rem;
  transition: 0.5s;
  ::placeholder {
    color: ${THEME.black500};
    text-align: left;
  }
  &:focus {
    outline: none;
    border: 2px solid ${THEME.primary};
  }
  margin: 0.5rem 0;
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
  margin: 0.5rem 0;

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
