import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import { THEME } from "../constants/colors";
import { useState } from "react";
import React from "react";
import Map from "../components/atoms/Map";

// 나중에 여기서 타입을 선택하든, 검색하든 백엔드에서 핀 정보 받아와서 그 핀을 showPins로 넘겨줘야 할 듯

export default function Pinboard() {
    return (
        <>
            {/* 지도 틀 */}
            <Map></Map>
        </>
    );
}
