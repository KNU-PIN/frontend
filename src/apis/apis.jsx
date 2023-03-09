import axios from "axios";

const BASE_URL = `/api/v1/pinboard`;

export async function getPinData(types, keyword) {
    let modifiedTypes = types.join();

    if (types.length === 0) {
        modifiedTypes = "free,gathering,buy";
    }

    console.log(modifiedTypes);
    try {
        const response = await axios.get(`${BASE_URL}/searchpin`, {
            params: {
                types: modifiedTypes,
                keyword: keyword,
            },
        });
        return response.data;
    } catch (e) {
        console.log("안됐음");
        // e.request 서버에 성공적으로 요청했을 때 설정됨
        // e.response 서버에 성공적으로 응답을 받았을 때 설정됨
        alert(e.response.data);
    }
}

export async function getBoard(type, latitude, longitude, keyword) {
    try {
        const response = await axios.get(`${BASE_URL}/searchboard`, {
            params: {
                type: type,
                keyword: keyword,
                latitude: latitude,
                longitude: longitude,
            },
        });
        return response.data;
    } catch (e) {
        console.log("getBoard실패");
        console.log(e.response);
    }
}

export async function createPin(formData) {
    //Post 기능
    let response = await axios.post("/api/v1/pinboard/createpin", formData);
    console.log(response.status);
    console.log(response.data);
}
