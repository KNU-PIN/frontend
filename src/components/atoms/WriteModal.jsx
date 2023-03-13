import styled, { keyframes, css } from "styled-components";
import { THEME } from "../../constants/colors";
import React, { useState } from "react";
import FileInput from "./FileInput";
import { createPin } from "../../apis/apis";
import { darken, lighten } from "polished";
import { useEffect } from "react";
import swal from "sweetalert";

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
    //현재 트랜지션 효과를 보여주고 있는 중이라는 상태를 의미하는 animate입니다.
    const [animate, setAnimate] = useState(false);
    //실제로 컴포넌트가 사라지는 시점을 지연시키기 위한 localVisible 값입니다.
    const [localVisible, setLocalVisible] = useState(props.visible);

    const typeButtonInfo = [
        { value: "free", name: "type", color: "#ff6868", text: "자유글" },
        {
            value: "gathering",
            name: "type",
            color: "#f3ec65",
            text: "구인구직",
        },
        { value: "buy", name: "type", color: "#6ee36e", text: "장터" },
    ];

    const [values, setValues] = useState({
        title: "",
        contents: "",
        pw: "",
        type: "",
        latitude: props.myLat,
        longitude: props.myLng,
        images: null,
    });
    const { title, contents, pw, type, images } = values;

    const isValidPassword = pw.length >= 1;
    const isValidType = type.length >= 1;
    const isValidInput = title.length >= 1 && contents.length >= 1;

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
        if (images != null) {
            // 이미지가 있어야만 폼데이터에 append
            for (let i = 0; i < values.images.length; i++) {
                formData.append("images[]", values.images[i]);
            }
        }
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
        //전송합니다.
        if (!isValidInput || !isValidPassword || !isValidType) {
            // 빈칸이 존재할 경우 alert창 띄우기
            swal(
                "작성 오류!",
                "태그를 선택하지 않았거나 제목, 내용이 비어있어요.",
                "warning"
            );
        } else {
            try {
                // 게시글 작성 성공
                swal("작성 완료!", "앞으로도 계속 작성해주세요 :)", "success");
                setSubmittingError(null);
                setIsSubmitting(true);
                props.setWriteComplete(true);
                await createPin(formData);
            } catch (error) {
                setSubmittingError(error);
                return;
            } finally {
                setIsSubmitting(false);
                props.setLocation(false);
                props.setIsWriteButtonClicked(false);
                props.setWriteComplete(false);
            }
            //모든 값을 초기화해줍니다.
            setValues(INITIAL_VALUES);
        }
    };

    //취소 핸들러입니다.
    const handleCancel = () => {
        // 게시글 작성창을 닫고 열었을때 초기화되어야 함.
        setValues(INITIAL_VALUES);
        props.setWriteComplete(true);
        props.setLocation(false);
        props.setIsWriteButtonClicked(false);
    };

    //visible 값이 true 에서 false 로 바뀌는 시점을 감지하여 animate 값을 true 로 바꿔주고
    //setTimeout 함수를 사용하여 250ms 이후 false로 바꿔줍니다.
    useEffect(() => {
        // visible 값이 true -> false 가 되는 것을 감지
        if (localVisible && !props.visible) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 500);
        }
        setLocalVisible(props.visible);
        setValues((prevValues) => ({
            ...prevValues,
            latitude: props.myLat,
            longitude: props.myLng,
        }));
    }, [localVisible, props.visible, props.myLat, props.myLng]);

    // const navigate = useNavigate();
    if (!animate && !localVisible) return null;

    return (
        <Container disappear={!props.visible}>
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
                    {/*  name="type"
                        value="free"
                        onClick={handleInputChange} */}
                    {typeButtonInfo.map((e, i) => {
                        return (
                            <TypeButton
                                name={e.name}
                                key={i}
                                value={e.value}
                                onClick={handleInputChange}
                                color={e.color}
                                values={values}
                            >
                                {e.text}
                            </TypeButton>
                        );
                    })}
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
                    <StyledButton
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
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

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(800px);
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

    /* 슬라이드 다운 */
    ${(props) =>
        props.disappear &&
        css`
            animation-name: ${slideDown};
        `}
`;

const TypeButton = styled.button`
    color: black;
    font-weight: bold;
    width: 30%;
    height: 3rem;
    font-size: 20px;
    border: none;
    border-radius: 0.5em;
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
        if (props.values.type === props.value)
            return css`
                border: 3px solid black;
            `;
    }}
`;
const Category = styled.div`
    display: flex;
    //자식 요소 가운데 정렬을 위해 가로 100을 주고 justify-content설정 해줍니다.
    //justify-conetnet에는 space-envenly, space-around, space-between등의 설정도 있습니다.
    margin-top: 2em;
    width: 93%;
    justify-content: space-between;
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
