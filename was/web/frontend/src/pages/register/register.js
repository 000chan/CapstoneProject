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
        axios
            .post("http://127.0.0.1:8000/user/register/", values)
            .then(function (response) {
                window.location.replace("/user/login");
            })
            .catch(function (response) {
                console.log(response);
            })
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
                    name="id"
                    rules={[
                        { required: true, message: "아이디를 입력해주세요" }
                    ]}
                >
                    <Input placeholder="아이디를 입력해주세요" />
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="pass_field"
                    rules={[
                        { required: true, message: "8자리 이상의 비밀번호를 입력해주세요", min: 8 }
                    ]}
                >
                    <Input.Password placeholder="비밀번호를 입력해주세요" />
                </Form.Item>

                <Form.Item
                    label="비밀번호 확인"
                    name="pass_field_check"
                    rules={[
                        { required: true, message: "동일한 비밀번호를 입력해주세요" }
                    ]}
                >
                    <Input.Password placeholder="비밀번호를 입력해주세요" />
                </Form.Item>

                <Form.Item
                    label="이름"
                    name="username"
                    rules={[
                        { required: true, message: "이름을 입력해주세요" }
                    ]}
                >
                    <Input placeholder="이름을 입력해주세요" />
                </Form.Item>

                <Form.Item
                    label="핸드폰 번호"
                    name="userphonenum"
                    rules={[
                        { required: true, message: "핸드폰 번호를 입력해주세요" }
                    ]}
                >
                    <Input placeholder="핸드폰 번호를 입력해주세요" />
                </Form.Item>

                <Form.Item
                    label="생년월일"
                    name="birthdate"
                    rules={[
                        { required: true, message: "생년월일을 입력해주세요" }
                    ]}>
                    <DatePicker placeholder="생년월일을 입력해주세요" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="이메일"
                    name="e_mail"
                    rules={[
                        { required: true, message: "이메일을 입력해주세요" }
                    ]}>
                    <Input placeholder="이메일을 입력해주세요" />
                </Form.Item>

                <Form.Item
                    label=""
                    name="checkTerms"
                    align="center"
                    style={{ textAlign: "center", }}>
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
                    style={{ textAlign: "center" }}>
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
            <h1 style={{ textAlign: "center", marginTop: "3%" }}>환영합니다</h1>
            <RegisterForm />
        </>
    );
};
export default Register;