import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
    Checkbox,
} from 'antd';
import { TopMenu } from '../../components/common';
import axios from "axios";
import './register.css'


function RegisterForm() {
    // [상태] 개인정보 수집 동의 버튼
    const [acceptTerms, setAcceptTerms] = useState(false);
    const buttonChange = ({ disabled }) => {
        setAcceptTerms(disabled);
    };

    // registerForm input value 검사
    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post("http://127.0.0.1:8000/user/register/", values).then(function(response){console.log(response);}).catch(function(error){console.log(error);})
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                size="large"
                layout="horizontal"
                style={{
                    width: "100%",
                    margin: "3% 0 0 0",
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="아이디"
                    name="registerid"
                    rules={[
                        {required:true, message:"아이디를 입력해주세요"}
                    ]}
                >
                    <Input placeholder="아이디를 입력해주세요"/>
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="registerpw"
                    rules={[
                        {required:true, message:"비밀번호를 입력해주세요"}
                    ]}
                >
                    <Input placeholder="비밀번호를 입력해주세요"/>
                </Form.Item>

                <Form.Item
                    label="비밀번호 확인"
                    name="registerpwconfirm"
                    rules={[
                        {required:true, message:"동일한 비밀번호를 입력해주세요"}
                    ]}
                >
                    <Input placeholder="동일한 비밀번호를 입력해주세요"/>
                </Form.Item>

                <Form.Item
                    label="이름"
                    name="registername"
                    rules={[
                        {required:true, message:"이름을 입력해주세요"}
                    ]}
                >
                    <Input placeholder="이름을 입력해주세요"/>
                </Form.Item>

                <Form.Item
                    label="핸드폰 번호"
                    name="registerphonenumber"
                    rules={[
                        {required:true, message:"핸드폰 번호를 입력해주세요"}
                    ]}
                >
                    <Input placeholder="핸드폰 번호를 입력해주세요"/>
                </Form.Item>

                <Form.Item
                    label="생년월일"
                    name="registerbirthdate"
                    rules={[
                        {required:true, message:"생년월일을 입력해주세요"}
                    ]}>
                    <DatePicker placeholder="생년월일을 입력해주세요" style={{width:"100%"}}/>
                </Form.Item>

                <Form.Item
                    label="이메일"
                    name="registeremail"
                    rules={[
                        {required:true, message:"이메일을 입력해주세요"}
                    ]}>
                    <Input placeholder="이메일을 입력해주세요"/>
                </Form.Item>

                <Form.Item
                   label=""  
                    name="checkTerms"
                     align="center"
                     style={{textAlign:"center", }}>
                    <Checkbox
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                    >
                        개인정보 수집에 동의합니다.
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    label=""
                    name="register"
                    align="center"
                    style={{textAlign:"center"}}>
                    <Button
                        onValuesChange={buttonChange}
                        disabled={!acceptTerms}
                        type="primary"
                        htmlType="submit"
                    >
                        가입하기
                    </Button>
                </Form.Item>
            </Form>
        </>


 
    )
}

const Register = () => {

    return (
        <>
            <TopMenu />
            <h1 style={{textAlign:"center", marginTop:"3%"}}>환영합니다</h1>
            <RegisterForm />
        </>
    );
};
export default Register;