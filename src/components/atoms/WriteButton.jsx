import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WriteModal from "./WriteModal";
import React, { useState, useRef } from "react";

export default function WriteButton() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

  function showModal() {
    setModalOpen(true);
  }
  return (
    <>
      <StyledButton type="button"
        onClick={() => {
          showModal();
        }}
      >
        <Img src={process.env.PUBLIC_URL + "/img/WriteButton.png"}></Img>
      </StyledButton>
      <StyledDiv>{modalOpen && <WriteModal setModalOpen={setModalOpen}></WriteModal>}</StyledDiv>
    </>
  );
}
const Img = styled.img`
  width: 60px;
  height: 60px;
`;
const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
`;
const StyledButton = styled.button`

  right: 20%;
  bottom:2rem;
  position:fixed;
  border: none;
  cursor: pointer;
  background-color: white;
`;
