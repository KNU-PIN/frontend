import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import aroundPins from "../../mockData.json";
import FilterInputCategory from "./FilterInputCategory";
import startData from "../../startData.json";
import "./Image.css";
import { getPinData } from "../../apis/apis";

const { kakao } = window;

//pin데이터에 카카오 위도 경도 추가

//pinData는 지도에 띄어지는 pinData입니다.
//pin하나를 클릭했을 때 백엔드에서 받아오는 pin데이터는 aroundPins입니다.
function Map() {
    //초기 pinData를 1개 설정해놨습니다.
    //핀을 클릭하면 모달이 오픈됩니다.
    const [modalOpen, setModalOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("free, gathering, buy");
    const [pinData, setPinData] = useState([]);

    useEffect(() => {
        const response = getPinData(type, keyword).then((res) =>
            setPinData(Object.values(res))
        );
    }, [type, keyword]);

    // for (var prop in pinData) {
    //     console.log(prop, pinData[prop]);
    // }
    //const [pinclicked, setPinClicked] = useState("false");

    // const [is_write, setWrite] = useState(false);
    // const normalMarker = useSelector((state) => state.marker.normal);
    // const hotMarker = useSelector((state) => state.marker.hot);

    //모달 open
    function showModal() {
        setModalOpen(true);
    }
    //모달 close
    function closeModal() {
        setModalOpen(false);
    }

    // function addKakaoLatLng(pinData) {
    //     const pinDataLatlng = pinData.map((pin) => {
    //         pin.latlng = new kakao.maps.LatLng(pin.latitude, pin.longitude);
    //         return pin;
    //     });
    // }

    //핀데이터를 맵에 표시하기 위해 위도, 경도를 가공합니다.
    // if (pinData.length) {
    //     addKakaoLatLng(pinData);
    // }

    useEffect(() => {
        //지도 표시할 div
        const container = document.getElementById("map");
        const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(35.890264, 128.610712), //지도의 중심좌표.
            level: 5, //지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options); //지도를 생성합니다.

        //핀의 색깔 이미지 주소입니다.
        var redImage = process.env.PUBLIC_URL + "img/red.png";
        var greenImage = process.env.PUBLIC_URL + "img/green.png";
        var yellowImage = process.env.PUBLIC_URL + "img/yellow.png";

        //지도에 핀 표시
        for (let i = 0; i < pinData.length; i++) {
            // 핀 이미지의 이미지 크기 입니다

            //이미지 주소를 넣어줍니다.
            var pinSrc = "";

            //핀 색깔을 설정합니다.
            switch (pinData[i].type) {
                case "free":
                    pinSrc = redImage;
                    break;
                case "buy":
                    pinSrc = greenImage;
                    break;
                default:
                    pinSrc = yellowImage;
            }

            //핀 이미지 생성
            var markerImage = new kakao.maps.MarkerImage(
                pinSrc,
                new kakao.maps.Size(50, 50)
            );

            //핀 표시
            const marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(
                    pinData[i].latitude,
                    pinData[i].longitude
                ), // 마커를 표시할 위치
                //title: pinData[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지
                //마커를 클릭할 수 있게 해주며 지도가 클리되지 않게 해줍니다.
                clickable: true,
            });

            marker.setMap(map);

            //핀 위의 이미지 핀
            var Image = new kakao.maps.MarkerImage(
                pinData[i].img,
                new kakao.maps.Size(20, 20),
                {
                    offset: new kakao.maps.Point(9, 37),
                }
            );

            //이미지 핀 표시
            const imageMarker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: pinData[i].latlng, // 마커를 표시할 위치
                //title: pinData[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: Image, // 마커 이미지
                //마커를 클릭할 수 있게 해주며 지도가 클리되지 않게 해줍니다.
                clickable: true,
            });

            imageMarker.setMap(map);

            //핀 이미지 클릭 하면 모달이 올라옵니다.
            kakao.maps.event.addListener(marker, "click", function () {
                //근처 핀들을 불러오는 함수 추가해야 하고 모달 컴포넌트에 핀 데이터 내려줘야 한다.
                showModal();
            });

            kakao.maps.event.addListener(imageMarker, "click", function () {
                //근처 핀들을 불러오는 함수 추가해야 하고 모달 컴포넌트에 핀 데이터 내려줘야 한다.
                showModal();
            });

            //지도를 클릭하면 모달이 닫힙니다.
            kakao.maps.event.addListener(map, "click", function () {
                closeModal();
            });
        }
        // 마커가 생성될때 바로 화면상에 새로생성된 마커를 보여주기 위해 배열안에 props를 넣어놨습니다.
    }, [pinData]);

    return (
        <MapWrap>
            <div
                id="map"
                style={{
                    width: "100%",
                    height: "600px",
                    position: "relative",
                    overflow: "hidden",
                }}
            ></div>
            {/* 키워드 검색 */}
            <FilterInputCategory
                setKeyword={setKeyword}
                setType={setType}
            ></FilterInputCategory>
            {/* 모달창을 끌 수 있게 하기 위해 props로 setModalOpen을 내려줍니다. */}
            {modalOpen && (
                <Modal visible={modalOpen} aroundPins={aroundPins}></Modal>
            )}
        </MapWrap>
    );
}

const MapWrap = styled.div`
    //카테고리 버튼들의 absolute 정렬을 위해 realtive 필요함.
    position: relative;

    //자식 요소 가운데 정렬
    display: flex;
    justify-content: center;

    overflow: hidden;
    width: 100%;
    height: 100%;
`;

export default Map;
