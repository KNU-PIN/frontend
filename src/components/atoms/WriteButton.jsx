import styled from "styled-components";
import React from "react";

export default function WriteButton({ setIsWriteButtonClicked }) {
    return (
        <StyledButton
            onClick={() => {
                setIsWriteButtonClicked(true);
            }}
        >
            <Img src={process.env.PUBLIC_URL + "/img/Button.jpg"}></Img>
        </StyledButton>
    );
}
const Img = styled.img`
    padding: none;
    border-radius: 15px;
    box-shadow: 5px 5px 5px grey;
`;

const StyledButton = styled.button`
    position: absolute;
    bottom: 10px;
    right: 15px;

    padding: 0;
    z-index: 1;

    border: none;
    border-radius: 15px;

    &:hover {
        transform: scale(1.1, 1.1);
    }

    cursor: pointer;
`;
