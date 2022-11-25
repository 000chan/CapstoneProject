import React from 'react'
// import { Carousel } from 'antd';
// import 'antd/dist/antd.css';
import { TopMenu } from '../../components/common'
import fast from '../../assets/images/fast.png'
import easy from '../../assets/images/easy.png'
import accurate from '../../assets/images/accurate.png'
import './about.css'

// carousel 설정
// const contentStyle = {
//     height: '160px',
//     color: '#fff',
//     lineHeight: '160px',
//     textAlign: 'center',
//     background: '#364d79',
// };

const About = () => {
    return (
        <>
            <TopMenu></TopMenu>
            {/* <h1>AboutPage</h1> */}
            {/*  본문  */}
            {/* <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>안영훈</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>김영찬</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>백수연</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>신재현</h3>
                </div>
            </Carousel>
            <h5 style={{textAlign:"center"}}>(마우스 올리면 멈춤)</h5>  */}
            <div className="service-content">
                <div className="service-content-title"><strong>치매 환자 추적 서비스</strong>가 추구하는 목표는</div>
                <div className="service-content-card">
                    <div className="service-content-card-fast">
                    <img src={fast} style={cardIcon}/>
                    <h2>빠른 속도</h2>
                    <h3>보다 빠른 추적 프로세스를 목표로 합니다</h3></div>
                    <div className="service-content-card-easy">
                    <img src={easy} style={cardIcon}/>
                    <h2>편리함</h2>
                    <h3>누구나 사용하기 쉬운 서비스를 목표로 합니다</h3></div>
                    <div className="service-content-card-accurate">
                    <img src={accurate} style={cardIcon}/>
                    <h2>높은 정확성</h2>
                    <h3>보다 높은 정확성을 목표로 합니다</h3></div>
                    </div>
                </div>

       

        </>


    )
}

const cardIcon = {
    height: "200px",
    marginBottom: "40px",
    pointer: "cursor"
    
};

export default About