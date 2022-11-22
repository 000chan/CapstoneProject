import React from 'react';
// import 'antd/dist/antd.css';
import {TopMenu} from '../../components/common'
import './home.css'
import image from '../../../../../static/images/home_background.jpg'


const Main = () => {
  return (
	<>
		<TopMenu></TopMenu>
			{/* <header style={ HeaderStyle }>   */}
			<div className="main-content"
      style={{ backgroundImage:`url(${image})` }}>
				<h1 className="main-title">치매 환자 추적 서비스</h1>
			</div>
            {/* <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button" id="login_btn">로그인</button>
                </Link>
                <Link to="/register">
                    <button className="primary-button" id="reg_btn"><span>회원가입</span></button>
                </Link>
            </div>
         </header> */}
	</>
  );
}

// const HeaderStyle = {
//     width: "100%",
//     height: "100vh",
//     background: `url(../)`,
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover"
// }

export default Main;
