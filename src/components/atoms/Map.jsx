import styled from "styled-components";

const MapWrap = styled.button`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const Div = styled.div`
    position: absolute;
    //글씨 중간 정렬
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50px;
    left: 10px;
    /* overflow: hidden; */
    width: 130px;
    height: 30px;
    /* margin: 0;
    padding: 0; */
    z-index: 1;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    background-color: #f06363;
`;

const HI = styled.span`
    color: #fff;
`;

function Map() {
    return (
        <MapWrap>
            <div
                id="map"
                style={{
                    width: "500px",
                    height: "600px",
                    position: "relative",
                    overflow: "hidden",
                }}
            ></div>
            <Div>
                <HI onclick="">지도</HI>
            </Div>
        </MapWrap>
    );
}

export default Map;
