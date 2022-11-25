import React from 'react'
// import { Carousel } from 'antd';
import { TopMenu } from '../../components/common'
import './project.css'
import man from '../../assets/images/man.png'
import woman from '../../assets/images/woman.png'

// carousel 설정
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Project = () => {
    return (
        <>
             <TopMenu></TopMenu>
             <div className="member-content-title">멤버 구성</div>
             <div className="member-content">
                <div className="member-card">
                    <img src={man} style={profile} />
                    <h2>김영찬</h2>
                    <span>@gmail.com</span>
                    <h3>웹 백엔드</h3>
                </div>
                <div className="member-card">
                    <img src={woman} style={profile}/>
                    <h2>백수연</h2>
                    <span>@gmail.com</span>
                    <h3>웹 프론트</h3>
                </div>
                <div className="member-card">
                    <img src={man} style={profile} />
                    <h2>신재현</h2>
                    <span>@gmail.com</span>
                    <h3>머신러닝</h3>
                </div>
                <div className="member-card">
                    <img src={man} style={profile} />
                    <h2>안영훈</h2>
                    <span>@gmail.com</span>
                    <h3>추적 디바이스 관련</h3>
                </div>
                </div>
           
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
            <h5 style={{textAlign:"center"}}>(마우스 올리면 멈춤)</h5> */}
        </>
    )
}

const profile = {
    width: "150px",
    height: "150px",
    backgroundColor: "rgba(224, 224, 224, 0.5)",
    padding: "5px",
    borderRadius : "50%",
    marginBottom: "10px"
}

export default Project
