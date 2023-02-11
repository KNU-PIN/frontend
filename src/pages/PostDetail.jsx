import React,{useState} from 'react';
import Layout from "../components/layout/Layout";
import { THEME } from "../constants/colors";
import styled from "styled-components";
import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs"
import {RiSendPlane2Fill} from "react-icons/ri"

const PostImage=styled.img`
  width:90%;
  border-radius:15%;
`
const PostTitleButtonsDiv=styled.div`
  width:90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const PostTitle=styled.h1`

`
const PostButtonsDiv=styled.div`
 width:40%;
 display: flex;
 justify-content: space-around;
`
const PostButtonHeart=styled.div`
svg{
    font-size:2rem;
  }
`
const Buttons=styled.button`
  font-size:1rem;
  background-color:${THEME.primary};
  border:2px solid ${THEME.primary};
  color:white;
  border-radius: 8px;
  font-weight: 500;
`
const PostContent=styled.p`
  width: 90%;
  padding-bottom:5%;
  font-size:1.2rem;
`
const CommentsDiv=styled.div`
  width:90%;
  padding-bottom:20%;
`
const Comment=styled.div`
  border-bottom: 1px solid lightgray;
  padding:2%;
`
const CommentWriter=styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom:2%;
`
const InputCommentDiv=styled.div`
  width:90%;
  position: fixed;
  bottom:6rem;
  background-color: #F5F6FC;
  border: none;
  border-radius: 10px;
  padding:13px 13px;
  display: flex;
`
const InputComment=styled.input`
  &:focus{
    outline: none;
  }
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
`

const InputCommentWriter=styled.span`
   display: flex;
   align-items: center;
   font-size:1.2rem;
   margin-right: 5px;

`
const SendIconWrap=styled.div`
  svg{
    font-size: 1.5rem;
    color:${THEME.primary}
  }
  position:absolute;
  right: 13px;

`
function PostDetail() {
  const [heart,setHeart]=useState(
    {
      count:0,
      able:true
    }
  )
  const [inputComment,setInputComment]=useState('')
  const onClickHeart=()=>{
     setHeart((prevState)=>{
      return{
        ...prevState,
      count:heart.count+1,
      able:!heart.able
      }
     })
    
  }
  const onUnclickHeart=()=>{
    setHeart((prevState)=>{
      return{
        ...prevState,
      count:heart.count-1,
      able:!heart.able
      }
     })
  }
    return (
      <Layout title="게시글 상세보기" hasBackButton>
        <PostImage src={process.env.PUBLIC_URL+"/img/postDetail_example.png"} ></PostImage>
        <PostTitleButtonsDiv>
          <PostTitle>상세보기 예시_제목</PostTitle>
          <PostButtonsDiv>
            <PostButtonHeart>
              {heart.able?<BsSuitHeart onClick={onClickHeart}/>:<BsSuitHeartFill onClick={onUnclickHeart}/>}
            {heart.count}
            </PostButtonHeart>
              <Buttons>신고</Buttons>
              <Buttons>글 삭제</Buttons>
          </PostButtonsDiv>
        </PostTitleButtonsDiv>
        <PostContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione doloremque, eius architecto consequuntur accusamus nulla cupiditate porro eveniet adipisci, illo delectus eos, perspiciatis sunt. Quidem sint nemo iusto eius eligendi?</PostContent>
        <CommentsDiv>
          {CommentsData.map((data,index)=>{
            return(
              <Comment key={index}><CommentWriter>{data.writer}</CommentWriter>{data.content}</Comment>
            )
          })}
        </CommentsDiv>
        <InputCommentDiv>
          <InputCommentWriter>익명{CommentsData.length+1}</InputCommentWriter>
          <InputComment placeholder='댓글을 입력하세요.' onChange={(e)=>{setInputComment(e.target.value)}}></InputComment>
          <SendIconWrap>
            <RiSendPlane2Fill/>
          </SendIconWrap>
        </InputCommentDiv>
      </Layout> 
    );
}

const CommentsData=[
  {writer:"익명1", content:"댓글 예시1"},
  {writer:"익명2", content:"댓글 예시2"},
  {writer:"익명3", content:"댓글 예시3"},
]
export default PostDetail;