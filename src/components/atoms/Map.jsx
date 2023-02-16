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
    width: 100%;
    justify-content:space-evenly;
    z-index: 1;
    position: absolute;
    top:50px;
`;

const Free = styled.button`
    color: black;
    width: 130px;
    height: 30px;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    background-color: #f06363;
`;


const Wanted = styled.button`
    color: black;  
    width: 130px;
    height: 30px;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    background-color: #e2ff08;
`;
const Market = styled.button`
    color: black;
    width: 130px;
    height: 30px;
    font-size: 12px;
    border: none;
    border-radius: 5px;
    background-color: green;
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
            <Category>
                <Free onclick="">자유글</Free>
                <Wanted onclick="">구인구직</Wanted>
                <Market onclick="">장터</Market>  
            </Category>
        </MapWrap>
    );
}

export default Map;
