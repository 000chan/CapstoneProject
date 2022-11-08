/*global kakao*/
import React, { useEffect } from 'react'

function makeMap(latitude, longitude) {
    let container = document.getElementById('map');
    let options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 3
    };
    let map = new kakao.maps.Map(container, options);
    return map;
}

const Map=()=>{

    // 위도
    let latitude = 37.552308561482235;
    // 경도
    let longitude = 126.94784341756501;

    useEffect(() => {
        makeMap(latitude, longitude);
    }, []);

    // 컴포넌트 렌더링 시, 특정 작업을 실행시키는 Hook
    // useEffect(()=>{
    //     let container = document.getElementById('map');
    //     let options = {
    //         center: new kakao.maps.LatLng(37.552308561482235, 126.94784341756501),
    //         level: 3
    //     };
    //     let map = new kakao.maps.Map(container, options);
    // }, []);

    return (
        <div>
            <div id="map" style={{width:"500px", height:"400px"}}/>
        </div>
    )
}

export default Map;