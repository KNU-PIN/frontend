import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function WriteButton() {
    const navigate = useNavigate();

    return (
        <StyledButton
            onClick={() => {
                navigate("/CreatePin");
            }}
        >
            게시글 작성
        </StyledButton>
    );
}

const StyledButton = styled.button`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    background-color: transparent;
    justify-content: center;
`;
