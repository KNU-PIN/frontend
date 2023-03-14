import axios from "axios";
import swal from "sweetalert";

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
    let modifiedType = type.join();

    if (type.length === 0) {
        modifiedType = "free,gathering,buy";
    }
    try {
        const response = await axios.get(`${BASE_URL}/searchboard`, {
            params: {
                type: modifiedType,
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

//게시글 상세 페이지(postDetail.jsx)
//게시글 내용을 불러오는 API입니다.
export async function getBoardInfo(pinId) {
    try {
        const response = await axios.get(`/api/v1/pinboard/${pinId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

//게시글 댓글 정보를 불러오는 API입니다.
export async function getBoardComments(pinId) {
    try {
        const response = await axios.get(`/api/v1/comment/${pinId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

//게시글 공감을 누르는 API입니다.
export async function postClickHeart(pinId) {
    try {
        const response = await axios.post(
            "/api/v1/pinboard/ddabong",
            JSON.stringify({
                pinId: pinId,
            }),
            {
                headers: {
                    "Content-Type": `application/json`,
                    Conte: "applic",
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

//게시글을 삭제하는 API입니다.
export async function deletePost(pinId, password, navigate) {
    await axios
        .delete(`/api/v1/pinboard/${pinId}`, {
            data: {
                pw: password,
            },
        })
        .then((res) =>
            swal("삭제 완료!", "게시글이 삭제되었습니다.", "success")
        )
        .then((res) => navigate(-1))
        .catch((e) => swal("오류!", "비밀번호가 맞지 않습니다.", "warning"));
}

//게시글 댓글다는 API입니다.
export async function postComments(pinId, inputComment) {
    try {
        axios.post(
            "/api/v1/comment/create",
            JSON.stringify({
                pinId: pinId,
                contents: inputComment,
            }),
            {
                headers: {
                    "Content-Type": `application/json`,
                    Conte: "applic",
                },
            }
        );
    } catch (e) {
        console.log(e);
    }
}
