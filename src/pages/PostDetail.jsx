import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { THEME } from "../constants/colors";

import styled,{keyframes} from "styled-components";
import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs"
import {RiSendPlane2Fill} from "react-icons/ri"
import {MdOutlineCancel} from "react-icons/md"
import PostSlider from '../components/atoms/PostSlider';
import { getBoardInfo, getBoardComments, postClickHeart, deletePost, postComments} from '../apis/apis';

function PostDetail() {
    const [inputComment, setInputComment] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [password, setPassword] = useState("");
    const [postData, setPostData] = useState({
        latitude: "",
        longitude: "",
        title: "",
        contents: "",
        type: "",
        images: [],
        createdAt: "",
        like: 0,
        isliked: false,
    });
    const [commentsData, setCommentsData] = useState([]);
    const [heart, setHeart] = useState({
        count: 0,
        isliked: false,
    });
    const navigate = useNavigate();
    const { pinId } = useParams();

  useEffect(()=>{
    //게시글 정보 
    getBoardInfo(pinId)
    .then(data=>{
      setPostData({...postData, 
        latitude:data.latitude,
        longitude:data.longitude,
        title:data.title,
        contents:data.contents,
        type:data.type,
        images:data.images,
        createdAt:data.createdAt,
        like:data.like,
        isliked:data.isliked
      });
      setHeart({...heart, count:data.like, isliked:data.isliked})
      ;}
    );
  //게시글 댓글 정보
  getBoardComments(pinId)
  .then(data=>{
    setCommentsData(data.comments)
  })
  },[inputComment])

  const onClickHeart=()=>{
    postClickHeart(pinId)
    .then(data=>setHeart({...heart, count:data, isliked:true}))
  }

  const onClickDeleteModal=()=>{
     setDeleteModal(true)
  }
  const onClickCancelDelete=()=>{
    setDeleteModal(false)
  }
  const onClickDeletePost=()=>{
      deletePost(pinId, password,navigate)
    }
  
  const onClickCommentsSubmit=()=>{
    if (inputComment===""){
      alert("내용을 입력해주세요.");
      return;
    }

    try{
     postComments(pinId, inputComment)
    .then(setInputComment(''))
    }catch(e){
      console.log(e)
    }
  }

    return (
        <Div>
            <Back onClick={() => navigate(-1)}>X</Back>
            {deleteModal ? (
                <DeleteDiv visible={deleteModal}>
                    <PasswordTitle>비밀번호</PasswordTitle>
                    <PasswordInput
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="게시글을 삭제하려면 비밀번호를 입력하세요."
                    ></PasswordInput>
                    <PasswordButton onClick={onClickDeletePost}>
                        삭제
                    </PasswordButton>
                    <CancelButton onClick={onClickCancelDelete}>
                        <MdOutlineCancel />
                    </CancelButton>
                </DeleteDiv>
            ) : (
                <></>
            )}
            <PostSlider images={postData?.images}></PostSlider>
            <PostTitleButtonsDiv>
                <PostTitle>{postData?.title}</PostTitle>
                <PostButtonsDiv>
                    <PostButtonHeart>
                        {heart?.isliked ? (
                            <BsSuitHeartFill />
                        ) : (
                            <BsSuitHeart onClick={onClickHeart} />
                        )}
                        {heart?.count}
                    </PostButtonHeart>
                    <Buttons>신고</Buttons>
                    <Buttons onClick={onClickDeleteModal}>글 삭제</Buttons>
                </PostButtonsDiv>
            </PostTitleButtonsDiv>
            <PostContent>{postData?.contents}</PostContent>
            <CommentsDiv>
                {commentsData?.map((data, index) => {
                    return (
                        <Comment key={index}>
                            <CommentWriter>{data.name}</CommentWriter>
                            {data.contents}
                        </Comment>
                    );
                })}
            </CommentsDiv>
            <InputCommentDiv>
                <InputCommentWriter>
                    익명{commentsData?.length}
                </InputCommentWriter>
                <InputComment
                    placeholder="댓글을 입력하세요."
                    value={inputComment}
                    onChange={(e) => {
                        setInputComment(e.target.value);
                    }}
                ></InputComment>
                <SendIconWrap onClick={onClickCommentsSubmit}>
                    <RiSendPlane2Fill />
                </SendIconWrap>
            </InputCommentDiv>
        </Div>
    );
}

export default PostDetail;

const Div = styled.div`
    width: 100vw;
    height: 100vh;
    padding-top: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Back = styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    padding: 0;
    position: absolute;
    top: 3%;
    right: 7%;
`;

const PostTitleButtonsDiv = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //margin-top:20px;
`;
const PostTitle = styled.h1``;
const PostButtonsDiv = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-around;
`;
const PostButtonHeart = styled.div`
    svg {
        font-size: 2rem;
    }
`;
const Buttons = styled.button`
    font-size: 1rem;
    background-color: ${THEME.primary};
    border: 2px solid ${THEME.primary};
    color: white;
    border-radius: 8px;
    font-weight: 500;
`;
const PostContent = styled.p`
    width: 90%;
    padding-bottom: 5%;
    font-size: 1.2rem;
    margin-top: 0;
`;
const CommentsDiv = styled.div`
    width: 90%;
    padding-bottom: 20%;
`;
const Comment = styled.div`
    border-bottom: 1px solid lightgray;
    padding: 2%;
`;
const CommentWriter = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 2%;
`;
const InputCommentDiv = styled.div`
    width: 90%;
    position: fixed;
    bottom: 1rem;
    background-color: #f5f6fc;
    border: none;
    border-radius: 10px;
    padding: 13px 13px;
    display: flex;
`;
const InputComment = styled.input`
    &:focus {
        outline: none;
    }
    border: none;
    background-color: transparent;
    font-size: 1.2rem;
    width: 80%;
`;

const InputCommentWriter = styled.span`
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    margin-right: 5px;
`;
const SendIconWrap = styled.div`
    svg {
        font-size: 1.5rem;
        color: ${THEME.primary};
    }
    position: absolute;
    right: 13px;
`;
const modalSlideUp = keyframes`
  0%{
    bottom:-25%;
  }
  100%{
    bottom:0;
  }
`;

const DeleteDiv = styled.div`
    width: 100%;
    height: 25%;
    background-color: white;
    position: fixed;
    z-index: 110;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px -0.2em 5em lightgray;
    animation: ${modalSlideUp} 0.5s;
`;

const PasswordInput = styled.input`
    &:focus {
        outline: none;
    }
    border: none;
    background-color: #f1efef;
    height: 25%;
    width: 80%;
    border-radius: 8px;
    display: block;
    padding-left: 2%;
`;
const PasswordTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 10px;
    width: 82%;
`;
const PasswordButton = styled.button`
    width: 82%;
    height: 25%;
    border: none;
    border-radius: 8px;
    background-color: #6569d1;
    color: white;
    font-size: 1em;
    margin-top: 8px;
    letter-spacing: 1px;
`;
const CancelButton = styled.span`
    font-size: 1.5em;
    position: absolute;
    top: 10%;
    right: 3%;
`;
