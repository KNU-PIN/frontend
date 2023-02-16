import styled from "styled-components";

const MapWrap = styled.button`
    //카테고리 버튼들의 absolute 정렬을 위해 realtive 필요함.
    position: relative;

    //안에 있는 아이템 가운데 정렬?
    display: flex;
    justify-content: center;

    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const Category = styled.div`
    display: flex;
    z-index: 1;
`;

const Free = styled.button`
    color: white;
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

// Wanted 랑 Market은 아직 건드리지 않았어

// const Wanted = styled.button`
//     color: white;
//     position: absolute;
//     //글씨 중간 정렬
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     top: 50px;
//     left: 10px;
//     /* overflow: hidden; */
//     width: 130px;
//     height: 30px;
//     /* margin: 0;
//     padding: 0; */
//     z-index: 1;
//     font-size: 12px;
//     border: none;
//     border-radius: 5px;
//     background-color: #f06363;
// `;
// const Market = styled.button`
//     color: white;
//     position: absolute;
//     //글씨 중간 정렬
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     top: 50px;
//     left: 10px;
//     /* overflow: hidden; */
//     width: 130px;
//     height: 30px;
//     /* margin: 0;
//     padding: 0; */
//     z-index: 1;
//     font-size: 12px;
//     border: none;
//     border-radius: 5px;
//     background-color: #f06363;
// `;

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
            <Category>
                <Free onclick="">자유글</Free>
                {/* <Wanted onclick="">구인구직글</Wanted>
                <Market onclick="">지도</Market> */}
                ㄴ
            </Category>
        </MapWrap>
    );
}

export default Map;
