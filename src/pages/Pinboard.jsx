import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import { THEME } from "../constants/colors";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { showPins } from "../components/atoms/showpins";
import Map from "../components/atoms/Map";

const { kakao } = window;

const FormWrapper = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function Pinboard() {
    //지도 및 핀 표시
    useEffect(() => {
        showPins();
    }, []);

    //목데이터를 받아서

    //가공해서 ()
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <Layout title="Main Page">
                {/* 지도 틀 */}
                <Map></Map>
            </Layout>
        </>
    );
}
