import axios from "axios";

export async function getPinData(types, keyword) {
    try {
        console.log(keyword, types);
        const response = await axios.get(`/api/v1/pinboard/searchpin`, {
            params: {
                types: types,
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

// export const getPinData = async () => {
//     // 국토교통부 xml
//     const baseurl = "/api/v1/pinboard/searchpin";
//     // const key = "발급받은키";
//     const params = {
//         // 필요한 query params를 {} 형태에 담아준다.
//         // serviceKey: key,
//         types: ["gathering", "buy"],
//         keyword: "",
//     };

//     const queryString = new URLSearchParams(params).toString(); // url에 쓰기 적합한 querySting으로 return 해준다.
//     const requrl = `${baseurl}?${queryString}`; // 완성된 요청 url.

//     try {
//         const response = await fetch(requrl);
//         const body = await response.text(); // 해석할 xml문자열.
//         const js = JSON.parse(body);
//         return js;
//     } catch (error) {
//         console.log(error);
//     }
// };
