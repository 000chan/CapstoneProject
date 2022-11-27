/*global kakao*/
import React, { useEffect } from 'react'
import { TopMenu, MapSideMenu } from '../../components/common';
import axios from "axios";

function makeMap(containerId, position) {
    var container = document.getElementById(containerId);
    
    var options = {
        center: new kakao.maps.LatLng(position[0], position[1]),
        level: 3
    };
    
    var map = new kakao.maps.Map(container, options);
    // 지도타입 컨트롤(일반 지도, 스카이뷰)
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    return map;
}

const Map = () => {
    let container = "map";
    let position = [33.450701, 126.570667];

    useEffect(() => {
        makeMap(container, position);
    }, [])
    
    return (
        <>
            <TopMenu/>
            <div id="map" style={{ width: "100%", height: "400px", margin: "10px 0 0 0" }}/>
            <br/>
            <div style={{display: "flex"}}>
                <MapSideMenu/>
                <button
                    onClick={() => {
                        axios
                            .get("http://127.0.0.1:8000/service/map/")  // url 마지막에 "/" 생략 시, 301 error 발생하니 유의
                            .then((response) => {
                                console.log(response.data);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}
                    style={{height: 30}}
                >
                    GET
                </button>
            </div>
        </>
    );
}

export default Map;