import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import { THEME } from "../constants/colors";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import pins from "../pinData";
import { getMap } from "../components/atoms/getMap";
import Map from "../components/atoms/Map";

const { kakao } = window;

export default function Pinboard() {
    //지도
    useEffect(() => {
        getMap();
    }, []);

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <Layout title="Main Page">
                <FormWrapper>
                    <Map></Map>
                </FormWrapper>
            </Layout>
        </>
    );
}

const FormWrapper = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
