import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import { THEME } from "../constants/colors";
import { useState } from "react";

export default function CreatePin() {
  return (
    <>
      <Layout title="게시글 작성" hasBackButton>
        <Wrapper>
          <StyledH1>글 작성</StyledH1>
          <FormWrapper>
            <Wrapper>
              <Type>Tag</Type>
              <br />
              <StyledSelect>
                <option>선택</option>
                <option>자유</option>
                <option>구인구직</option>
                <option>장터</option>
              </StyledSelect>
            </Wrapper>
            <Wrapper>
              <Type>제목</Type>
              <br />
              <StyledInput placeholder=" 제목을 입력하세요." />
            </Wrapper>
            <Wrapper>
              <Type>내용</Type>
              <br />
              <StyledTextarea placeholder=" 내용을 입력하세요." />
            </Wrapper>
          </FormWrapper>
          <RowWrapper></RowWrapper>
        </Wrapper>
      </Layout>
      ;
    </>
  );
}

const FormWrapper = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${THEME.black100};
  gap: 1.1rem;
  width: 100%;
  padding: 1.1rem;
  border-radius: 10px;
`;
const Type = styled.span`
  font-family: "GangwonEduPowerExtraBoldA";
  font-size: 1.2rem;
  margin-bottom: -0.5rem;
`;
const RowWrapper = styled.p`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  vertical-align: text-bottom;
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
  border-radius: .5em;
  padding: 0.5rem;
  padding-left: 1rem;
  width: 18rem;
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
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
`;
const StyledTextarea = styled.textarea`
  font-size: 1.2rem;
  line-height: 2rem;
  color: black;
  text-align: left;
  border: 2px solid ${THEME.black400};
  border-radius: .5em;
  padding: 0.5rem;
  padding-left: 1rem;
  width: 18rem;
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
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
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
  border-radius: .5em;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);

  &:focus {
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
    border: 2px solid ${THEME.primary};
  }
`;
