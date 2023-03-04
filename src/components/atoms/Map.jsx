import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "./Modal";
import FilterInputCategory from "./FilterInputCategory";
import "./Image.css";
import WriteButton from "./WriteButton";
import { getBoard, getPinData } from "../../apis/apis";
import WriteModal from "./WriteModal";

const { kakao } = window;

function Map() {
    const [modalOpen, setModalOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("free, gathering, buy");
    const [pinData, setPinData] = useState([]);
    const [boardData, setBoardData] = useState([]);
    const [isWriteButotnClicked, setIsWriteButtonClicked] = useState(false);
    const [location, setLocation] = useState(false);
    const [myLat, setMyLat] = useState();
    const [myLng, setMyLng] = useState();

    //초기 화면에 핀을 뿌려줍니다.
    const LoadPin = async (type, keyword) => {
        const pinData = await getPinData(type, keyword);
        setPinData(Object.values(pinData));
    };

    useEffect(() => {
        LoadPin(type, keyword);
        console.log(keyword);
    }, [type, keyword]);

    //핀을 클릭했을 때 주위의 보드 데이터를 가져옵니다.
    const LoadBoard = async (type, latitude, longitude, keyword) => {
        console.log(type, keyword);
        const boardList = await getBoard(type, latitude, longitude, keyword);
        setBoardData(boardList);
    };

    //모달 open
    function showModal() {
        setModalOpen(true);
    }
    //모달 close
    function closeModal() {
        setModalOpen(false);
    }

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

        //글 작성 버튼을 클릭하면 핀을 생성할 위치를 선택합니다.
        function setPin() {
            var marker = new kakao.maps.Marker({
                // 지도 중심좌표에 마커를 생성합니다
                position: map.getCenter(),
            });
            // 지도에 마커를 표시합니다
            marker.setMap(map);

            kakao.maps.event.addListener(map, "click", function (mouseEvent) {
                // 클릭한 위도, 경도 정보를 가져옵니다
                var latlng = mouseEvent.latLng;

                // 마커 위치를 클릭한 위치로 옮깁니다
                marker.setPosition(latlng);

                setMyLat(latlng.getLat());
                setMyLng(latlng.getLng());
                setLocation(true);

                console.log(myLat, myLng);
            });
        }

        if (isWriteButotnClicked) {
            setPin();
        }

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
                pinData[i].img_src,
                new kakao.maps.Size(20, 20),
                {
                    offset: new kakao.maps.Point(9, 37),
                }
            );

            //이미지 핀 표시
            const imageMarker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(
                    pinData[i].latitude,
                    pinData[i].longitude
                ), // 마커를 표시할 위치
                //title: pinData[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: Image, // 마커 이미지
                //마커를 클릭할 수 있게 해주며 지도가 클리되지 않게 해줍니다.
                clickable: true,
            });

            imageMarker.setMap(map);

            //핀 이미지 클릭 하면 모달이 올라옵니다.
            kakao.maps.event.addListener(marker, "click", function () {
                //근처 핀들을 불러옵니다.
                LoadBoard(
                    type,
                    pinData[i].latitude,
                    pinData[i].longitude,
                    keyword
                );
                //모달을 켜줍니다.
                showModal();
            });

            kakao.maps.event.addListener(imageMarker, "click", function () {
                //근처 핀들을 불러옵니다.
                LoadBoard(
                    type,
                    pinData[i].latitude,
                    pinData[i].longitude,
                    keyword
                );
                console.log(boardData);
                //모달을 켜줍니다.
                showModal();
            });

            //지도를 클릭하면 모달이 닫힙니다.
            kakao.maps.event.addListener(map, "click", function () {
                closeModal();
            });
        }

        // 마커가 생성될때 바로 화면상에 새로생성된 마커를 보여주기 위해 배열안에 props를 넣어놨습니다.
    }, [pinData, type, keyword, boardData, isWriteButotnClicked, myLat, myLng]);
    return (
        <MapWrap>
            <div
                id="map"
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    margin: 0,
                    padding: 0,
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
                <Modal visible={modalOpen} boardData={boardData}></Modal>
            )}
            <WriteButton
                setIsWriteButtonClicked={setIsWriteButtonClicked}
            ></WriteButton>
            {location && (
                <WriteModal
                    setLocation={setLocation}
                    setIsWriteButtonClicked={setIsWriteButtonClicked}
                    myLat={myLat}
                    myLng={myLng}
                ></WriteModal>
            )}
        </MapWrap>
    );
}

const MapWrap = styled.div`
    //카테고리 버튼들의 absolute 정렬을 위해 realtive 필요함.
    /* position: relative; */

    //자식 요소 가운데 정렬
    display: flex;
    justify-content: center;

    overflow: hidden;
    width: 100vw;
    height: 100vh;
`;

export default Map;
