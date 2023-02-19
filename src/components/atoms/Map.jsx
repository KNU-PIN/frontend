import styled from "styled-components";
import { useEffect } from "react";
import Input from "./Input";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Modal from "./Modal";

const { kakao } = window;

//pin데이터에 카카오 위도 경도 추가
function addKakaoLatLng(pinData) {
    pinData.map(function (pin) {
        pin.latlng = new kakao.maps.LatLng(pin.latitude, pin.longitude);
        return pin;
    });
}

function Map({ pinData }) {
    //검색 내용
    const [keyword, setKeyword] = useState("");
    //핀을 클릭하면 모달이 오픈됩니다.
    const [modalOpen, setModalOpen] = useState(false);
    const [pinclicked, setPinClicked] = useState("false");

    //핀데이터를 맵에 표시하기 위해 위도, 경도를 가공합니다.
    addKakaoLatLng(pinData);

    // const [is_write, setWrite] = useState(false);
    // const normalMarker = useSelector((state) => state.marker.normal);
    // const hotMarker = useSelector((state) => state.marker.hot);

    //핀을 클릭하면 모달이 오픈됩니다.
    function showModal() {
        setModalOpen(true);
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

        //지도에 핀 표시
        for (let i = 0; i < pinData.length; i++) {
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

            //클릭이벤트
            //선택된 핀은 백엔드로 정보를 보내주고, 주변의 핀 정보들을 받아와서 보여준다.
            kakao.maps.event.addListener(marker, "click", function () {
                showModal();
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
            {/* 검색창 Input 컴포넌트 재활용을 위한 props 사용 */}
            <InputDiv>
                <Input
                    type="text"
                    value={keyword}
                    setValue={setKeyword}
                    placeholder="  검색 내용을 입력하세요"
                    Styled={KeywordInputStyle}
                ></Input>
                <SubmitButton>
                    <BiSearch></BiSearch>
                </SubmitButton>
            </InputDiv>
            {/* 카테고리 버튼 */}
            <Category>
                <FreeButton onclick="">자유글</FreeButton>
                <WantedButton onclick="">구인구직</WantedButton>
                <MarketButton onclick="">장터</MarketButton>
            </Category>
            {/* 모달창을 끌 수 있게 하기 위해 props로 setModalOpen을 내려줍니다. */}
            {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </MapWrap>
    );
}

const MapWrap = styled.button`
    //카테고리 버튼들의 absolute 정렬을 위해 realtive 필요함.
    position: relative;

    //자식 요소 가운데 정렬
    display: flex;
    justify-content: center;

    overflow: hidden;
    width: 100%;
    height: 100%;
`;

//inputLabel css입니다.
const InputDiv = styled.div`
    //필요 없음.
    display: flex;
    border-radius: 2em;
    background-color: white;
    width: 50%;
    height: 5%;
    //지도 위에 보이기 위한 설정입니다.
    z-index: 1;
    //지도 위에 고정하기 위한 설정입니다.
    position: absolute;
    top: 30px;
`;

//input css 입니다.
const KeywordInputStyle = styled.input`
    font-size: 0.5rem;
    line-height: 1.7rem;
    height: 100%;
    width: 90%;
    background-color: transparent;
    border: none;
    letter-spacing: 1px;
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
`;

//input 안에 있는 button css입니다.
const SubmitButton = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    background-color: white;
    position: absolute;
    right: 13px;
    font-size: 1.2rem;
`;

const Category = styled.div`
    display: flex;

    //자식 요소 가운데 정렬을 위해 가로 100을 주고 justify-content설정 해줍니다.
    //justify-conetnet에는 space-envenly, space-around, space-between등의 설정도 있습니다.
    width: 100%;
    justify-content: center;

    z-index: 1;
    position: absolute;
    top: 70px;
`;

//버튼 태그는 content 자동 중앙 정렬 해줍니다.
const FreeButton = styled.button`
    color: black;
    width: 75px;
    height: 25px;

    margin-right: 1em;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    background-color: #ff6868;
    letter-spacing: 0.5px;
`;

const WantedButton = styled.button`
    color: black;
    width: 75px;
    height: 25px;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    background-color: #e2ff08;
    letter-spacing: 0.5px;
`;

const MarketButton = styled.button`
    color: black;
    width: 75px;
    height: 25px;
    margin-left: 1em;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    background-color: #6ee36e;
    letter-spacing: 0.5px;
`;

export default Map;
