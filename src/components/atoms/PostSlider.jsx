import React from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slide = styled.img`
    border-radius: 15%;
    object-fit: cover;
`

const SliderDiv=styled.div`
    width:90%;
    margin-top: 5%;
    margin-bottom: 5%;
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
            {images.map((img)=>{return(
                <Slide key={img.sequence} src={img.pictureSrc} alt={img.sequence}/>
            )})}
		</Slider>
        </SliderDiv>
    );
}

export default PostSlider;