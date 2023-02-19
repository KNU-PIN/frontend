import React from "react";
import { BiCommentDots } from "react-icons/bi";
import { BsSuitHeart } from "react-icons/bs";
import styled from "styled-components";
import pins from "../../mockData.json";

const Container = styled.div`
    width: 100%;
    height: 60%;

    background-color: white;

    z-index: 1;
    overflow: scroll;
    //아래에서
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.div`
    display: flex;
    width: 100%;
`;
const PinTitle = styled.div``;
const Select = styled.select``;

const Ul = styled.ul`
    width: 90%;
    padding: 0;
`;

const ItemDiv = styled.div`
    background-color: yellow;
    margin-bottom: 10px;
    display: flex;

    //이미지(자식)에만 height를 주고 여기는 주지말자.
    height: 10%;
    align-items: center;
    padding: 10px;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
`;

const ContentDiv = styled.div`
    text-align: left;
`;
const Title = styled.div``;
const Content = styled.div``;
const Other = styled.div``;
const HeartDiv = styled.div``;
const CommentDiv = styled.div``;
const CreateDateDiv = styled.div``;

function formatData(value) {
    return value.substring(0, 10);
}

//pin_id,title,contents,like_cnt,comment_cnt,create_date,img_src}
function Item({ pin }) {
    return (
        <ItemDiv>
            {/* 게시물 대표 이미지 */}
            <Image src={pin.imgSrc} alt={pin.title}></Image>
            {/* 나머지 div */}
            <ContentDiv>
                <Title>{pin.title}</Title>
                <Content>{formatData(pin.content)}</Content>
                <Other>
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
                    {/* 게시물 생성 날짜 */}
                    <CreateDateDiv>{pin.CreateDate}</CreateDateDiv>
                </Other>
            </ContentDiv>
        </ItemDiv>
    );
}

export default function Modal({ setModalOpen }) {
    //모달창 끄기
    const closeModal = () => {
        setModalOpen(false);
    };

    function handleOnChange(e) {
        // 선택된 데이터 가져오기
        const value = e.target.value;
    }

    return (
        <Container>
            <Header>
                <PinTitle>핀 게시글</PinTitle>
                <Select name="language" onchange={() => handleOnChange()}>
                    <option value="like">좋아요 순</option>
                    <option value="comment">댓글 순</option>
                    <option value="created">최신 순</option>
                </Select>
            </Header>
            <Ul>
                {pins.map((pin) => {
                    return (
                        <li style={{ listStyle: "none" }}>
                            <Item pin={pin} />
                        </li>
                    );
                })}
            </Ul>
        </Container>
    );
}
