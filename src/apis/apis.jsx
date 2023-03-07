import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = `/api/v1/pinboard`;

export async function getPinData(types, keyword) {
    try {
        const response = await axios.get(`${BASE_URL}/searchpin`, {
            params: {
                types: types,
                keyword: keyword,
            },
        });
        return response.data;
    } catch (e) {
        console.log("안됐음");
        // e.request 서버에 성공적으로 요청했을 때 설정됨
        // e.response 서버에 성공적으로 응답을 받았을 때 설정됨
        alert(e.response.data);
    }
}

export async function getBoard(type, latitude, longitude, keyword) {
    try {
        const response = await axios.get(`${BASE_URL}/searchboard`, {
            params: {
                type: type,
                keyword: keyword,
                latitude: latitude,
                longitude: longitude,
            },
        });
        return response.data;
    } catch (e) {
        console.log("getBoard실패");
        console.log(e.response);
    }
}

export async function createPin(formData) {
    //Post 기능
    let response = await axios.post("/api/v1/pinboard/createpin", formData);
    console.log(response.status);
    console.log(response.data);
}

//게시글 상세 페이지(postDetail.jsx)
//게시글 내용 API
export async function getBoardInfo(pinId){
    try{
        const response = await axios.get(`/api/v1/pinboard/${pinId}`);
        return response.data;
    }catch(e){
        console.log(e)
    }
}

//게시글 댓글 정보 API
export async function getBoardComments(pinId){
    try{
        const response = await axios.get(`/api/v1/comment/${pinId}`);
        return response.data;
    }catch(e){
        console.log(e)
    }
}

//게시글 공감 클릭 API
export async function postClickHeart(pinId){
    try{
        const response = await axios.post('/api/v1/pinboard/ddabong',JSON.stringify({
            pinId:pinId
          }),
          {
            headers:{
            "Content-Type":`application/json`,
            "Conte":"applic",
          }
        })
        return response.data
    }catch(e){
        console.log(e)
    }
}


export async function deletePost(pinId,password,navigate){
    await axios.delete(`/api/v1/pinboard/${pinId}`,{
        data:{
          pw:password
        }
      })
      .then(res => alert('게시글이 삭제되었습니다.'))
      .then(res => navigate(-1))
      .catch(e => alert('비밀번호가 틀립니다.'))
}

export async function postComments(pinId, inputComment){
    try{
        axios.post('/api/v1/comment/create',JSON.stringify({
            pinId:pinId,
            contents:inputComment
          }),
          {
            headers:{
            "Content-Type":`application/json`,
            "Conte":"applic",
          }
        })
    }catch(e){
        console.log(e)
    }
   
}