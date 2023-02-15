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

        // 마커를 생성합니다
        switch (pinData[i].type) {
            case "red":
                // 핀 이미지를 생성합니다
                var markerImage = new kakao.maps.MarkerImage(
                    redImage,
                    imageSize
                );
                //핀 표시
                var marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: pinData[i].latlng, // 마커를 표시할 위치
                    //title: pinData[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image: markerImage, // 마커 이미지
                });
                break;
            case "green":
                //핀 이미지
                markerImage = new kakao.maps.MarkerImage(greenImage, imageSize);
                //핀 표시
                marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: pinData[i].latlng, // 마커를 표시할 위치
                    //title: pinData[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image: markerImage, // 마커 이미지
                });
                break;
            default:
                //핀 이미지
                markerImage = new kakao.maps.MarkerImage(
                    yellowImage,
                    imageSize
                );
                //핀 표시
                marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: pinData[i].latlng, // 마커를 표시할 위치
                    //title: pinData[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image: markerImage, // 마커 이미지
                });
        }

        marker.setMap(map);
    }
};
