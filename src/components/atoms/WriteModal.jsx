import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { THEME } from "../../constants/colors";
import React, { useState, useRef } from "react";
import FileInput from "./FileInput";
import { createPin } from "../../apis/apis";

const INITIAL_VALUES = {
    title: "",
    contents: "",
    pw: "",
    type: "",
    latitude: null,
    longitude: null,
    images: null,
};

export default function WriteModal(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittingError, setSubmittingError] = useState(null);

    const [values, setValues] = useState({
        title: "",
        contents: "",
        pw: "",
        type: "",
        latitude: props.myLat,
        longitude: props.myLng,
        images: null,
    });

    console.log(values.latitude, values.longitude);

    const handleChange = (name, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        handleChange(name, value);
    };

    //완료 버튼 클릭 시 일어나는 Submit입니다.
    const handleSubmit = async (e) => {
        e.preventDefault();

        //폼데이터에 모든 데이터들을 담습니다.
        const formData = new FormData();
        for (let key in values) {
            if (key === "images") continue;
            formData.append(key, values[key]);
        }
        for (let i = 0; i < values.images.length; i++) {
            formData.append("images[]", values.images[i]);
        }
        //전송합니다.
        try {
            setSubmittingError(null);
            setIsSubmitting(true);
            await createPin(formData);
        } catch (error) {
            setSubmittingError(error);
            return;
        } finally {
            setIsSubmitting(false);
            props.setLocation(false);
            props.setIsWriteButtonClicked(false);
        }
        //모든 값을 초기화해줍니다.
        setValues(INITIAL_VALUES);
    };

    //취소 핸들러입니다.
    const handleCancel = () => {
        props.setLocation(false);
        props.setIsWriteButtonClicked(false);
    };

    // const navigate = useNavigate();
    return (
        <Container>
            <Header>
                <PinTitle>
                    PIN 카테고리 선택&nbsp;
                    <PinImg
                        src={
                            "https://cdn-icons-png.flaticon.com/512/1201/1201684.png"
                        }
                    ></PinImg>
                    <PinCancel onClick={handleCancel}>
                        게시글 작성 취소 X
                    </PinCancel>
                </PinTitle>
            </Header>
            <FormWrapper>
                <Category>
                    <FreeButton
                        name="type"
                        value="free"
                        onClick={handleInputChange}
                    >
                        자유
                    </FreeButton>
                    <GatheringButton
                        name="type"
                        value="gathering"
                        onClick={handleInputChange}
                    >
                        구인구직
                    </GatheringButton>
                    <BuyButton
                        name="type"
                        value="buy"
                        onClick={handleInputChange}
                    >
                        장터
                    </BuyButton>
                </Category>
                <FileInput
                    name="images"
                    value={values.images}
                    onChange={handleChange}
                    accept="image/jpg,image/jpeg,image/jpe,image/png"
                ></FileInput>
                <Wrapper>
                    <Type>게시글 작성 ✒️</Type>
                    <br />
                    <StyledInput
                        name="title"
                        value={values.title}
                        onChange={handleInputChange}
                        placeholder="제목을 입력하세요."
                    />
                    <br />
                    <StyledTextarea
                        name="contents"
                        value={values.contents}
                        onChange={handleInputChange}
                        placeholder="내용을 입력하세요."
                    />
                </Wrapper>
                <Wrapper>
                    <Type>비번번호 🔒︎</Type>
                    <StyledInput2
                        name="pw"
                        value={values.pw}
                        onChange={handleInputChange}
                    />
                </Wrapper>
                <Wrapper>
                    <br />
                    <StyledButton onClick={handleSubmit} diabled={isSubmitting}>
                        완료
                    </StyledButton>
                    {submittingError?.message && (
                        <div>{submittingError.message}</div>
                    )}
                    <br />
                </Wrapper>
            </FormWrapper>
        </Container>
    );
}
const PinCancel = styled.button`
    display: inline-block;
    margin: auto 0 0 auto;
    font-size: 1em;
    border: none;
    background-color: white;
    width: 10em;
    text-align: right;
`;
const PinImg = styled.img`
    width: 1em;
    height: 1em;
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    width: 90%;
`;
const PinTitle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    font-size: 1em;
    margin-left: 1.5em;
    margin-bottom: 1em;
`;
const modalSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(200px);
  }
  100% {
    opacity: 1;
    transform: none;
  }
`;
const Container = styled.div`
    border-radius: 4em 4em 0 0;
    width: 100%;
    height: 100%;

    background-color: white;

    z-index: 1;
    overflow: scroll;
    //아래에서
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${modalSlideUp} 0.5s ease-out;
`;

const FreeButton = styled.button`
    color: white;
    width: 30%;
    height: 3rem;
    margin-right: 0.5em;
    font-size: 20px;
    border: none;
    border-radius: 0.5em;
    background-color: #ff6868;
    letter-spacing: 0.5px;
    &:focus {
        outline: none;
        border: 4px solid ${THEME.primary};
    }
`;

const GatheringButton = styled.button`
    color: white;
    width: 30%;
    height: 3rem;
    font-size: 20px;
    border: none;
    border-radius: 0.5em;
    background-color: #ffdb5b;
    letter-spacing: 0.5px;
    &:focus {
        outline: none;
        border: 4px solid ${THEME.primary};
    }
`;

const BuyButton = styled.button`
    color: white;
    width: 30%;
    height: 3rem;
    margin-left: 0.5em;
    font-size: 20px;
    border: none;
    border-radius: 0.5em;
    background-color: #6ee36e;
    letter-spacing: 0.5px;
    &:focus {
        outline: none;
        border: 4px solid ${THEME.primary};
    }
`;
const Category = styled.div`
    display: flex;
    //자식 요소 가운데 정렬을 위해 가로 100을 주고 justify-content설정 해줍니다.
    //justify-conetnet에는 space-envenly, space-around, space-between등의 설정도 있습니다.
    margin-top: 2em;
    width: 100%;
    justify-content: center;
`;

const FormWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    /* margin: auto; */
    flex-direction: column;
    background-color: white;
    gap: 0.5rem;
`;
const Type = styled.span`
    font-family: "GangwonEduPowerExtraBoldA";
    font-size: 1rem;
    margin-left: 5%;
    text-align: left;
`;
const Wrapper = styled.div`
    width: 100%;
`;
const StyledInput = styled.input`
    font-size: 1rem;
    line-height: 2rem;
    color: black;
    text-align: left;
    border: 2px solid ${THEME.black400};
    border-radius: 0.5em;
    padding: 0.5rem;
    width: 90%;
    transition: 0.5s;
    ::placeholder {
        color: black;
        text-align: left;
    }
    &:focus {
        outline: none;
        border: 2px solid ${THEME.primary};
    }
    display: flex;
    margin: auto;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
`;
const StyledInput2 = styled.input`
    font-size: 1rem;
    line-height: 1rem;
    color: black;
    background-color: ${THEME.black400};
    text-align: left;
    border: 2px solid ${THEME.black400};
    border-radius: 0.5em;
    padding: 0.5rem;
    width: 90%;
    display: flex;
    margin: auto;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
`;
const StyledButton = styled.button`
    font-size: 1.2rem;
    line-height: 2rem;
    background-color: #7a84db;
    border: 2px solid #7a84db;
    color: white;
    border-radius: 0.5em;
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: flex;
    margin: auto;
    width: 40%;
    justify-content: center;
    align-items: center;
`;
const StyledTextarea = styled.textarea`
    font-size: 1rem;
    line-height: 2rem;
    color: black;
    text-align: left;
    border: 2px solid ${THEME.black400};
    border-radius: 0.5em;
    padding: 0.5rem;
    width: 90%;
    height: 9rem;
    transition: 0.5s;
    ::placeholder {
        color: black;
        text-align: left;
    }
    &:focus {
        outline: none;
        border: 2px solid ${THEME.primary};
    }
    display: flex;
    margin: auto;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
`;
