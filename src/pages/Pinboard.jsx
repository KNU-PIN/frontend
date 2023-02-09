import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import { THEME } from "../constants/colors";
import { useState } from "react";

export default function Pinboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Layout title="Main Page">
        <FormWrapper>
          <StyledH1>KNU-PIN</StyledH1>
          <StyledBtn
            onClick={() => {
              navigate("/CreatePin");
            }}
          >
            게시글 작성
          </StyledBtn>
        </FormWrapper>
      </Layout>
    </>
  );
}

const FormWrapper = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledH1 = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const StyledBtn = styled.button`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  background-color: transparent;
  justify-content: center;
`;
