import React from "react";
import { BiCommentDots } from "react-icons/bi";
import { BsSuitHeart } from "react-icons/bs";
import styled, { keyframes, css } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const slideUp = keyframes`
  from {
    transform: translateY(500px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(500px);
  }
`;

const Container = styled.div`
    border-top-left-radius: 4em;
    border-top-right-radius: 4em;
    width: 100%;
    height: 60%;

    background-color: white;

    z-index: 2;
    overflow: scroll;
    //아래에서
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 스랄이드 업 */
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;

    /* 슬라이드 다운 */
    ${(props) =>
        props.disappear &&
        css`
            animation-name: ${slideDown};
        `}
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
`;
const PinTitle = styled.div`
    font-size: 2em;
    margin-left: 1em;
`;
const Select = styled.select`
    margin-right: 2em;
    width: 10em;
    border-radius: 2em;
`;

const Ul = styled.ul`
    padding: 0;
    width: 90%;
`;

const Li = styled.div`
    :not(:last-of-type) {
        border-bottom: 1px dashed #c5c5c5;
    }
    margin-bottom: 10px;
    margin-right: 0;
    display: flex;

    //이미지(자식)에만 height를 주고 여기는 주지말자.
    height: 100px;
    /* align-items: center; */
    padding: 10px 10px 20px 10px;
`;

const Image = styled.img`
    border: solid 3px red;
    border-radius: 1em;

    /* 수정 필요 : 세로에 맞는 가로 사이즈 구해야함 */
    width: 95px;

    /* height: 95%; */
    object-fit: cover;
    margin-right: 20px;
`;

const ContentDiv = styled.div`
    width: 80%;
    text-align: left;
    position: relative;
`;
const Title = styled.div`
    font-size: 1.5em;
    margin-bottom: 0.5em;
`;
const Content = styled.div`
    font-size: 1em;
    margin-bottom: 0.5em;
`;
const Other = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
`;
const FirstDiv = styled.div`
    display: flex;
`;

const ItemDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;
const HeartDiv = styled.div``;
const CommentDiv = styled.div``;
const CreateDateDiv = styled.div``;

function formatData(value) {
    if (value.length >= 26) return value.substring(0, 26) + ",,";
    else return value;
}

//pin_id,title,contents,like_cnt,comment_cnt,create_date,img_src}
function Item({ pin }) {
    const navigate = useNavigate();
    return (
        <ItemDiv
            onClick={() => {
                navigate(`/PostDetail/${pin.pinId}`);
            }}
        >
            {/* 게시물 대표 이미지 */}
            <Image src={pin.imgSrc} alt={pin.title}></Image>
            {/* 나머지 div */}
            <ContentDiv>
                <Title>{pin.title}</Title>
                <Content>{formatData(pin.contents)}</Content>
                <Other>
                    <FirstDiv>
                        {/* 좋아요 개수 */}
                        <HeartDiv>
                            <BsSuitHeart />
                            {pin.likeCnt}
                        </HeartDiv>
                        {/* 댓글 개수 */}
                        <CommentDiv>
                            <BiCommentDots />
                            {pin.commentCnt}
                        </CommentDiv>
                    </FirstDiv>
                    {/* 게시물 생성 날짜 */}
                    <CreateDateDiv>{pin.createdAt}</CreateDateDiv>
                </Other>
            </ContentDiv>
        </ItemDiv>
    );
}

export default function Modal({ visible, boardData }) {
    //좋아요 순, 댓글 순, 최신 순
    const [order, setOrder] = useState("likeCnt");
    const sortedBoardDatas = boardData.sort((a, b) => b[order] - a[order]);

    //현재 트랜지션 효과를 보여주고 있는 중이라는 상태를 의미하는 animate입니다.
    const [animate, setAnimate] = useState(false);
    //실제로 컴포넌트가 사라지는 시점을 지연시키기 위한 localVisible 값입니다.
    const [localVisible, setLocalVisible] = useState(visible);

    //visible 값이 true 에서 false 로 바뀌는 시점을 감지하여 animate 값을 true 로 바꿔주고
    //setTimeout 함수를 사용하여 250ms 이후 false로 바꿔줍니다.
    useEffect(() => {
        // visible 값이 true -> false 가 되는 것을 감지
        if (localVisible && !visible) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 250);
        }
        setLocalVisible(visible);
    }, [localVisible, visible]);

    const handleSelect = (e) => {
        console.log(e.target.value);
        setOrder(e.target.value);
    };
    if (!animate && !localVisible) return null;
    return (
        <Container disappear={!visible}>
            <Header>
                <PinTitle>PIN 게시글</PinTitle>
                <Select name="order" onChange={handleSelect}>
                    <option value="likeCnt"> 좋아요 순</option>
                    <option value="commentCnt"> 댓글 순</option>
                    <option value="CreateDate"> 최신 순</option>
                </Select>
            </Header>
            <Ul>
                {sortedBoardDatas.map((pin) => {
                    return (
                        <Li style={{ listStyle: "none" }}>
                            <Item pin={pin} />
                        </Li>
                    );
                })}
            </Ul>
        </Container>
    );
}
