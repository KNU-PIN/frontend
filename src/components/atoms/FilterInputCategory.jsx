import { React, useRef } from "react";
import styled, { css } from "styled-components";
import { BiSearch } from "react-icons/bi";
import { darken, lighten } from "polished";

export default function FilterInputCategory({ type, setType, setKeyword }) {
    const inputTag = useRef();

    //버튼을 누르면 type이 변경됩니다.
    const handleButton = (e) => {
        type.indexOf(e.target.value) > -1
            ? setType(type.filter((item) => item !== e.target.value))
            : setType([...type, e.target.value]);
    };
    //버튼을 누르면 input의 value가 keyword에 담깁니다.
    const handleInput = () => {
        setKeyword(inputTag.current.value || "");
    };

    let typeButtonInfo = [
        { value: "free", color: "#ff6868", text: "자유글" },
        { value: "gathering", color: "#e2ff08", text: "구인구직" },
        { value: "buy", color: "#6ee36e", text: "장터" },
    ];

    return (
        <FilterDiv>
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
                {typeButtonInfo.map((e, i) => {
                    return (
                        <TypeButton
                            key={i}
                            value={e.value}
                            onClick={handleButton}
                            color={e.color}
                            type={type}
                        >
                            {e.text}
                        </TypeButton>
                    );
                })}
            </CategoryDiv>
        </FilterDiv>
    );
}

const FilterDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;
//inputLabel css입니다.
const InputDiv = styled.div`
    //필요 없음.
    display: flex;
    border-radius: 2em;
    background-color: white;
    width: 50%;
    height: 2em;
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
    padding-left: 5%;
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
    width: 50%;
    justify-content: space-between;

    z-index: 1;
    position: absolute;
    top: 70px;
`;

//버튼
const TypeButton = styled.button`
    color: black;
    width: 30%;
    height: 25px;
    font-size: 12px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    //background-color: ${(props) => props.color ?? "#fff"};
    letter-spacing: 0.5px;
    ${(props) => {
        const selected = props.color;
        return css`
            background: ${selected};
            &:hover {
                background: ${lighten(0.1, selected)};
            }
            &:active {
                background: ${darken(0.1, selected)};
            }
        `;
    }}
    ${(props) => {
        if (props.type.includes(props.value))
            return css`
                border: 2px solid black;
            `;
    }}
`;
