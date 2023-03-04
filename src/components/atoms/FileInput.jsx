import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

function FileInput({ name, value, onChange }) {
    const [preview, setPreview] = useState();

    const inputRef = useRef();

    //인풋 핸들러입니다.
    const handleChange = (e) => {
        const nextValue = e.target.files;
        console.log(nextValue);
        onChange(name, nextValue);
    };

    //이미지 삭제 처리입니다.
    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputRef) return;
        inputNode.value = "";
        onChange(name, null);
        setPreview(null);
    };

    //이미지 미리보기 기능입니다.
    useEffect(() => {
        if (!value) return;
        const nextPreview = URL.createObjectURL(value[0]);
        setPreview(nextPreview);
        return () => {
            setPreview();
            URL.revokeObjectURL(nextPreview);
        };
    }, [value]);

    const placeholderImage = process.env.PUBLIC_URL + "img/imageInput.png";

    return (
        <Div>
            <Img
                preview
                src={preview || placeholderImage}
                alt="이미지 미리보기"
            />
            <Input
                type="file"
                onChange={handleChange}
                ref={inputRef}
                multiple={true}
            ></Input>
            {value && (
                <ClearButton onClick={handleClearClick}>
                    <ClearButtonImg
                        src={process.env.PUBLIC_URL + "img/reset.png"}
                        alt="선택해제"
                    ></ClearButtonImg>
                </ClearButton>
            )}
        </Div>
    );
}
const Div = styled.div`
    position: relative;
    width: 400px;
    height: 400px;
    border-radius: 0.5em;
    background-color: #f6f6f6;
    border: 1px solid #dae7e3;

    overflow: hidden;
    /* justify-content: center; */
`;

const Img = styled.img`
    display: block;
    //들어오는 사진 틀에 맞게
    object-position: center;
    object-fit: cover;

    height: 100%;
    width: 100%;
    opacity: ${(props) => (props.preview ? "0.8" : "0")};
`;
const Input = styled.input`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

const ClearButton = styled.button`
    position: absolute;
    top: 8px;
    right: 9px;
    width: 26px;
    height: 26px;
    padding: 7px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
`;
const ClearButtonImg = styled.img`
    position: relative;
    bottom: 13px;
    right: 12px;
`;
export default FileInput;
