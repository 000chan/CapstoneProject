import React from 'react'
import {Button, Form, Input} from 'antd';
import 'antd/dist/antd.css';
import {TopMenu} from '../../components/common';
import axios from "axios";

function LoginForm() {
    // loginForm input value 검사
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(typeof(values));
        axios.post("http://127.0.0.1:8000/user/login/", values).then(function(response){console.log(response);}).catch(function(error){console.log(error);})
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        console.log(typeof(values));
    };

    return (
        // <>
        //     <Form
        //         name="basic"
        //         size="large"
        //         labelCol={{
        //             span: 8,
        //         }}
        //         wrapperCol={{
        //             span: 8,
        //         }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
        //         autoComplete="off"
        //         style={{
        //             margin: "5% 0 0 0"
        //         }}
        //     >
        //         <Form.Item
        //             label="아이디"
        //             name="testid"
        //             rules={[
        //                 {
        //                     required: true,
        //                     message: '아이디를 입력해주세요',
        //                 },
        //             ]}
        //         >
        //             <Input/>
        //         </Form.Item>

        //         <Form.Item
        //             label="비밀번호"
        //             name="testpw"
        //             rules={[
        //                 {
        //                     required: true,
        //                     message: '비밀번호를 입력해주세요',
        //                 },
        //             ]}
        //         >
        //             <Input.Password/>
        //         </Form.Item>

        //         <Form.Item
        //             wrapperCol={{
        //                 offset: 11,
        //                 span: 11,
        //             }}
        //         >
        //             <Button type="primary" htmlType="submit">
        //                 Submit
        //             </Button>
        //         </Form.Item>
        //     </Form>
        // </>

        <div className="text-center m-5-auto">
        <h2>로그인</h2>
        <form action="/home">
            <p>
                <label>아이디</label><br/>
                <input type="id" name="testid"
                 autoComplete="off"
                 onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                 onChange={(e) => setUser(e.target.value)}
                placeholder="아이디"  required />
            </p>
            <p>
                <label>비밀번호</label>
                <br/>
                <input type="password" name="testpw" 
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="비밀번호" required />
            </p>
            <p>
                <button id="sub_btn" type="submit">LOGIN</button>
            </p>
        </form>
        {/* <footer> */}
            <p>계정이 없으신가요? <Link to="/register">회원가입</Link></p>
            <p><Link to="/">Back to Homepage</Link></p>
        {/* </footer> */}
    </div>

    );
}

const Login = () => {

    return (
        <>
            <TopMenu/>
            <h1 style={{textAlign:"center", margin:"10% 0 0 0"}}>로그인</h1>
            <LoginForm/>
        </>
    );
}

export default Login;
