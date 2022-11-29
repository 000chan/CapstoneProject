/*global kakao*/
import React, { useEffect, useState } from 'react'
import { TopMenu } from '../../components/common';
import axios from "axios";
import { FloatButton } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

// get request params
let logindata;
if(localStorage.getItem("user")){
    logindata = localStorage.getItem("user");
}

function getUserData(params, responseState) {
    axios
        .get("http://127.0.0.1:8000/service/user/", {params:{params}})
        .then((response) => {
            console.log('getUserData');
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getMapData(params, responseState) {
    axios
        .get("http://127.0.0.1:8000/service/map/", {params:{params}})
        .then((response) => {
            responseState(response.data);
        })
        .catch(function (error) {
            alert(error.response.data["message"]);
        });
}

// map
function makeMap(containerId, target) {
    var container = document.getElementById(containerId);
    
    var options = {
        center: new kakao.maps.LatLng(target[0], target[1]),
        level: 3
    };
    
    var map = new kakao.maps.Map(container, options);
    
    var mapTypeControl = new kakao.maps.MapTypeControl();                       // 지도타입 컨트롤(일반 지도, 스카이뷰)

    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);        // 컨트롤이 표시될 위치

    var zoomControl = new kakao.maps.ZoomControl();                             // 줌 컨트롤
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    var markerPosition  = new kakao.maps.LatLng(target[0], target[1]);          // 마커 표시

    var marker = new kakao.maps.Marker({                                        // 마커 생성
        position: markerPosition
    });

    marker.setMap(map);

    return map;
}

const Map = () => {
    let container = "map";
    let position = [33.450701, 126.570667];
    
    const [user, setUser] = useState([]);   // 회원정보를 위한 상태
    const [mapdata, setMap] = useState([]);     // 위치정보를 위한 상태

    useEffect(() => {
        makeMap(container, position);
        getUserData(logindata, setUser);
        getMapData(logindata, setMap);
    }, [])


    return (
        <>
            <TopMenu/>
            <div id="map" style={{ width: "100%", height: "500px", margin: "10px 0 0 0" }}/>
            <FloatButton
                icon={<SyncOutlined/>}
                tooltip={<div>위치정보를 새로고침합니다.</div>}
                mapdata={mapdata}
                onClick={() => {
                    getMapData(logindata, setMap);
                    try {
                        makeMap(container, [mapdata[0]["latitude"], mapdata[0]["longitude"]]);
                        alert("신호시간 : "+mapdata[0]["signaledtime"])
                    } catch {
                        makeMap(container, position);
                    }
                }}
            />
        </>
    );
}

export default Map;