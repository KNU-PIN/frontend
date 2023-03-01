import { React, useRef } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import pinData from "../../pinData.json";
import axios from "axios";

export default function FilterInputCategory({ setType, setKeyword }) {
    const inputTag = useRef();

    //버튼을 누르면 type이 변경됩니다.
    const handleButton = (e) => {
        setType(e.target.value);
    };
    //버튼을 누르면 input의 value가 keyword에 담깁니다.
    const handleInput = () => {
        setKeyword(inputTag.current.value || "");
    };

    // 1. 위에서 초기 데이터를 가지고 와서 뿌려주고, 만약 FilterInputCategory가 실행이 되면
    // 즉, input이나 type button을 클릭하면 그 값을 부모로 전달해서 다시 뿌려준다.
    // 즉, 부모에서 통신 하는 방법이다.

    // 2. 여기서 통신하면,, 첫 화면을 띄울 방법이 필요한데,,

    // 3. 둘다 걸자! 부모에서도 초기 데이터 받아오고, 자식에서도 핸들링되면 다시 받아오면 되는거 아니야?

    return (
        <>
            <InputDiv>
                {/* 검색창 Input 컴포넌트 재활용을 위한 props 사용 */}
                <Input
                    type="text"
                    name="keyword"
                    placeholder="  검색 내용을 입력하세요"
                    ref={inputTag}
                ></Input>
                <SubmitButton onClick={handleInput}>
                    <BiSearch></BiSearch>
                </SubmitButton>
            </InputDiv>
            <CategoryDiv>
                <FreeButton value="free" onClick={handleButton}>
                    자유글
                </FreeButton>
                <GatheringButton value="gathering" onClick={handleButton}>
                    구인구직
                </GatheringButton>
                <BuyButton value="buy" onClick={handleButton}>
                    장터
                </BuyButton>
            </CategoryDiv>
        </>
    );
}
//inputLabel css입니다.
const InputDiv = styled.div`
    //필요 없음.
    display: flex;
    border-radius: 2em;
    background-color: white;
    width: 50%;
    height: 5%;
    //지도 위에 보이기 위한 설정입니다.
    z-index: 1;
    //지도 위에 고정하기 위한 설정입니다.
    position: absolute;
    top: 30px;
`;

//input css 입니다.
const Input = styled.input`
    font-size: 0.5rem;
    line-height: 1.7rem;
    height: 100%;
    width: 90%;
    background-color: transparent;
    border: none;
    letter-spacing: 1px;
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
`;

//input 안에 있는 button css입니다.
const SubmitButton = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    background-color: white;
    position: absolute;
    right: 13px;
    font-size: 1.2rem;
`;

const CategoryDiv = styled.div`
    display: flex;

    //자식 요소 가운데 정렬을 위해 가로 100을 주고 justify-content설정 해줍니다.
    //justify-conetnet에는 space-envenly, space-around, space-between등의 설정도 있습니다.
    width: 100%;
    justify-content: center;

    z-index: 1;
    position: absolute;
    top: 70px;
`;

//버튼 태그는 content 자동 중앙 정렬 해줍니다.
const FreeButton = styled.button`
    color: black;
    width: 75px;
    height: 25px;

    margin-right: 1em;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    background-color: #ff6868;
    letter-spacing: 0.5px;
`;

const GatheringButton = styled.button`
    color: black;
    width: 75px;
    height: 25px;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    background-color: #e2ff08;
    letter-spacing: 0.5px;
`;

const BuyButton = styled.button`
    color: black;
    width: 75px;
    height: 25px;
    margin-left: 1em;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    background-color: #6ee36e;
    letter-spacing: 0.5px;
`;
