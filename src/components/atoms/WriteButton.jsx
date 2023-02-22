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
            <StyledButton
                onClick={() => {
                    showModal();
                }}
            >
                게시글 작성
            </StyledButton>
            <StyledDiv>
                {modalOpen && (
                    <WriteModal setModalOpen={setModalOpen}></WriteModal>
                )}
            </StyledDiv>
        </>
    );
}
const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
`;
const StyledButton = styled.button`
    border: 1px solid black;
    font-size: 1rem;
    font-weight: bold;
    background-color: transparent;
    left: 45%;
    bottom: 5px;
    position: fixed;
`;
