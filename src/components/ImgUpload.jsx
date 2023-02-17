import { useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { THEME } from "../constants/colors";

const ImgPreview = styled.img`
  width: 250px;
  height: 250px;
  margin: 30px;
  position: relative;
  border: 2px solid ${THEME.black400};
  border-radius: .5em;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
`;

const UploadImage = styled.input`
  height: 30px;
  position: absolute;
  left: 45%;
  margin-top: 300px;
`

const ViewImage = styled.button`
  height: 30px;
  position: absolute;
  left: 50%;
  right: 35%;
  margin-top: 350px;
`;

const Wrapper = styled.div`
  padding: 0.2rem 3rem;
`;
export default function ImgUpload() {


  const [img, setImg] = useState('')

  const formSubmit = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);
    //Post 기능
     axios.post("이미지 요청 주소", formData).then(res => {
      setImg(res.data.location)
      alert('성공')
    }).catch(err => {
      alert('실패')
    })
}

  return (
    <>
        <Wrapper className="img-preview">
          <ImgPreview id="img-preview" src={process.env.PUBLIC_URL+"/img/CreatePin_sampleimg.png"} />
          <UploadImage type='file' 
              accept='image/*' 
              id='img' 
              onChange={formSubmit}>
          </UploadImage>
        </Wrapper>
    </>
  );
}
