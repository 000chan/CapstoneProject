import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
    Checkbox,
} from 'antd';
import 'antd/dist/antd.css';
import { TopMenu } from '../../components/common';


function RegisterForm() {
    const [acceptTerms, setAcceptTerms] = useState(false);
    const buttonChange = ({ disabled }) => {
        setAcceptTerms(disabled);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
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
            >
                <Form.Item label="아이디" rules={[{required:true, message:"hi"}]}>
                    <Input placeholder="아이디"/>
                </Form.Item>

                <Form.Item label="비밀번호">
                    <Input placeholder="비밀번호"/>
                </Form.Item>

                <Form.Item label="이름">
                    <Input placeholder="이름"/>
                </Form.Item>

                <Form.Item label="핸드폰 번호">
                    <Input placeholder="핸드폰 번호"/>
                </Form.Item>

                <Form.Item label="생년월일">
                    <DatePicker placeholder="생년월일" style={{width:"100%"}}/>
                </Form.Item>

                <Form.Item label="이메일">
                    <Input placeholder="이메일"/>
                </Form.Item>

                <Form.Item label="null" style={{textAlign:"center"}}>
                    <Checkbox
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                    >
                        개인정보 수집에 동의합니다.
                    </Checkbox>
                </Form.Item>

                <Form.Item label="null" style={{textAlign:"center"}}>
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