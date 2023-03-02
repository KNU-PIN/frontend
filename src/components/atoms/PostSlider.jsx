import React from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slide = styled.img`
    border-radius: 15%;
    width:100%;
`

const SliderDiv=styled.div`
    width:90%;
    margin-top: 5%;
`

function PostSlider({images}) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    return (
        <SliderDiv>
        <Slider {...settings}>
            {images.map((img,index)=>{return(
                <Slide key={index} src={process.env.PUBLIC_URL+img} alt={index}/>
            )})}
		</Slider>
        </SliderDiv>
    );
}

export default PostSlider;