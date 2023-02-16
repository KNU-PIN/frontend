import pinData from "../../pinData.json";

import { useState } from "react";

const { kakao } = window;
// const { pin, setPin } = useState("");

//pin데이터에 카카오 위도 경도 추가
function addKakaoLatLng() {
    pinData.map(function (pin) {
        pin.latlng = new kakao.maps.LatLng(pin.latitude, pin.longitude);
        return pin;
    });
}

export const showPins = () => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(35.890264, 128.610712), //지도의 중심좌표.
        level: 5, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    var redImage = process.env.PUBLIC_URL + "img/red.png";
    var greenImage = process.env.PUBLIC_URL + "img/green.png";
    var yellowImage = process.env.PUBLIC_URL + "img/yellow.png";

    //카카오 위도 경도 추가
    addKakaoLatLng();

    //지도에 핀 표시
    for (var i = 0; i < pinData.length; i++) {
        // 핀 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(30, 30);

        // 핀 색깔을 설정합니다.
        var ImageSrc = "";
        switch (pinData[i].type) {
            case "red":
                ImageSrc = redImage;
                break;
            case "green":
                ImageSrc = greenImage;
                break;
            default:
                ImageSrc = yellowImage;
        }

        //핀 이미지 생성
        var markerImage = new kakao.maps.MarkerImage(ImageSrc, imageSize);

        //핀 표시
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: pinData[i].latlng, // 마커를 표시할 위치
            //title: pinData[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
            //마커를 클릭할 수 있게 해주며 지도가 클리되지 않게 해줍니다.
            clickable: true,
        });

        marker.setMap(map);
    }
};
