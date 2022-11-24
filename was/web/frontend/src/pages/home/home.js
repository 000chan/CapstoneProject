import React from 'react';
// import 'antd/dist/antd.css';
import {TopMenu} from '../../components/common'
import './home.css'
import image from '../../assets/images/home_background.jpg'



const Footer = () => {
    return (
        <p className="footer" style={ FooterStyle }>Copyright &copy; Elderly <br></br>
        김영찬  |  백수연  |  신재현  |  안영훈
        </p>
        
    )
}

const Main = () => {
  return (
	<>
		<TopMenu></TopMenu>
			<div className="main-content"
      style={{ backgroundImage:`url(${image})` }}>
				<h1 className="main-title">치매 환자 추적 서비스</h1>
			</div>
         <Footer></Footer>
	</>
  );
}



const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#fff",
    position: "fixed",
    bottom: 0,
    padding: ".8rem",
    margin: 0,
    width: "100%",
    opacity: ".5"

}

export default Main;
