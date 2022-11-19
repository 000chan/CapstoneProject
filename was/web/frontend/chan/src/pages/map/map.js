/*global kakao*/
import React, { useEffect } from 'react'
import 'antd/dist/antd.css';
import { TopMenu, MapSideMenu } from '../../components/common';

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
            <TopMenu></TopMenu>
            <br/>
            <div id="map" style={{width: "90%", height: "90%"}}>
                <MapSideMenu></MapSideMenu>
            </div>
        </>
    );
}

export default Map;