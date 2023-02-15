import styled from "styled-components";

const FreeButton = styled.button`
    position: absolute;
    z-index: 100;
`;

function Map() {
    return (
        <div id="map" style={{ width: "500px", height: "600px" }}>
            <FreeButton> 내 위치 찾기</FreeButton>
        </div>
    );
}

export default Map;
