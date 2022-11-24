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
    return map;
}

const Map = () => {
    let container = "map";
    let position = [33.450701, 126.570667]

    useEffect(() => {
        makeMap(container, position);
    }, [])

    return (
        <>
            <TopMenu/>
            <br/>
            <div id="map" style={{ width: "100%", height: "50%" }}/>
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