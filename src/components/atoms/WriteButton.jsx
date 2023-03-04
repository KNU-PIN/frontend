import styled from "styled-components";
import WriteModal from "./WriteModal";
import React, { useState } from "react";

export default function WriteButton({ setIsWriteButtonClicked }) {
    // const [modalOpen, setModalOpen] = useState(false);

    // function showModal() {
    //     setModalOpen(true);
    // }

    return (
        <>
            <StyledButton
                onClick={() => {
                    setIsWriteButtonClicked(true);
                }}
            >
                <Img src={process.env.PUBLIC_URL + "/img/Button.jpg"}></Img>
            </StyledButton>
            {/* <StyledDiv>{modalOpen && <WriteModal></WriteModal>}</StyledDiv> */}
        </>
    );
}
const Img = styled.img`
    padding: none;
    border-radius: 15px;
    box-shadow: 5px 5px 5px grey;
`;
const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
`;
const StyledButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 10px;

    padding: 0;
    z-index: 1;

    border: none;
    border-radius: 15px;

    cursor: pointer;
`;

// const Container = styled.div`
//     border-top-left-radius: 4em;
//     border-top-right-radius: 4em;
//     width: 100%;
//     height: 60%;

//     background-color: white;

//     z-index: 1;
//     overflow: scroll;
//     //아래에서
//     position: fixed;
//     bottom: 0;
//     left: 0;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     animation: ${modalSlideUp} 0.5s;
// `;
