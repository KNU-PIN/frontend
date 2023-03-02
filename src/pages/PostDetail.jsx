import React,{useState} from 'react';
import Layout from "../components/layout/Layout";
import { THEME } from "../constants/colors";
import styled,{keyframes} from "styled-components";
import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs"
import {RiSendPlane2Fill} from "react-icons/ri"
import {MdOutlineCancel} from "react-icons/md"
import PostSlider from '../components/atoms/PostSlider';


const PostTitleButtonsDiv=styled.div`
  width:90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top:20px;
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
  margin-top:0;
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
const modalSlideUp=keyframes`
  0%{
    bottom:-25%;
  }
  100%{
    bottom:0;
  }
`

const DeleteDiv=styled.div`
  width:100%;
  height: 25%;
  background-color: white;
  position: fixed;
  z-index: 110;
  bottom:0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -0.2em 5em lightgray;
  animation:${modalSlideUp} 0.5s;
`

const PasswordInput=styled.input`
  &:focus{
    outline: none;
  }
  border: none;
  background-color: #f1efef;
  height: 25%;
  width:80%;
  border-radius: 8px;
  display: block;
  padding-left: 2%;
`
const PasswordTitle=styled.div`
  font-size:1.2rem;
  font-weight: 500;
  margin-bottom: 10px;
  width: 82%;
`
const PasswordButton=styled.button`
  width: 82%;
  height: 25%;
  border: none;
  border-radius: 8px;
  background-color: #6569d1;
  color:white;
  font-size:1em;
  margin-top:8px;
  letter-spacing: 1px;
`
const CancelButton=styled.span`
  font-size: 1.5em;
  position: absolute;
  top:10%;
  right:3%;
`
function PostDetail() {
  const [heart,setHeart]=useState(
    {
      count:0,
      able:true
    }
  )
  const [inputComment,setInputComment]=useState('')
  const [deleteModal, setDeleteModal]=useState(false)
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
  const onClickDeleteModal=()=>{
     setDeleteModal(true)
  }
  const onClickCancelDelete=()=>{
    setDeleteModal(false)
  }
    return (
      <Layout title="게시글 상세보기" hasBackButton>
        {deleteModal?<DeleteDiv visible={deleteModal}>
          <PasswordTitle>비밀번호</PasswordTitle>
          <PasswordInput type="password" placeholder='게시글을 삭제하려면 비밀번호를 입력하세요.'></PasswordInput>
          <PasswordButton>삭제</PasswordButton>
          <CancelButton onClick={onClickCancelDelete}><MdOutlineCancel/></CancelButton>
        </DeleteDiv>:<></>}
        <PostSlider images={images}></PostSlider>
        <PostTitleButtonsDiv>
          <PostTitle>상세보기 예시_제목</PostTitle>
          <PostButtonsDiv>
            <PostButtonHeart>
              {heart.able?<BsSuitHeart onClick={onClickHeart}/>:<BsSuitHeartFill onClick={onUnclickHeart}/>}
            {heart.count}
            </PostButtonHeart>
              <Buttons>신고</Buttons>
              <Buttons onClick={onClickDeleteModal}>글 삭제</Buttons>
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

const images=[
  {
    id:1,
    src:"/img/postDetail_example.png"
  },
  {
    id:2,
    src:"/img/postDetail_example.png"
  },
  {
    id:3,
    src:"/img/postDetail_example.png"
  },
  {
    id:4,
    src:"/img/postDetail_example.png"
  },
  {
    id:5,
    src:"/img/postDetail_example.png"
  },
]

const CommentsData=[
  {writer:"익명1", content:"댓글 예시1"},
  {writer:"익명2", content:"댓글 예시2"},
  {writer:"익명3", content:"댓글 예시3"},
]
export default PostDetail;