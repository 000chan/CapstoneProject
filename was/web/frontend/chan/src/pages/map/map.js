/*global kakao*/
import React, { useEffect } from 'react'

const Map=()=>{
    // 컴포넌트 렌더링 시, 특정 작업을 실행시키는 Hook
    useEffect(()=>{
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.552308561482235, 126.94784341756501),
            level: 3
        };
        var map = new kakao.maps.Map(container, options);
    }, [])


    return (
        <div>
            <div id="map" style={{width:"500px", height:"400px"}}></div>
        </div>
    )
}

export default Map;