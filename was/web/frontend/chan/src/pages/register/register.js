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
import axios from "axios";


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
        // <>
        //     <Form
        //         labelCol={{
        //             span: 8,
        //         }}
        //         wrapperCol={{
        //             span: 8,
        //         }}
        //         size="large"
        //         layout="horizontal"
        //         style={{
        //             width: "100%",
        //             margin: "3% 0 0 0",
        //         }}
        //         onFinish={onFinish}
        //         onFinishFailed={onFinishFailed}
        //         autoComplete="off"
        //     >
        //         <Form.Item
        //             label="아이디"
        //             name="registerid"
        //             rules={[
        //                 {required:true, message:"아이디를 입력해주세요"}
        //             ]}
        //         >
        //             <Input placeholder=""/>
        //         </Form.Item>

        //         <Form.Item
        //             label="비밀번호"
        //             name="registerpw"
        //             rules={[
        //                 {required:true, message:"비밀번호를 입력해주세요"}
        //             ]}
        //         >
        //             <Input placeholder=""/>
        //         </Form.Item>

        //         <Form.Item
        //             label="비밀번호 확인"
        //             name="registerpwconfirm"
        //             rules={[
        //                 {required:true, message:"동일한 비밀번호를 입력해주세요"}
        //             ]}
        //         >
        //             <Input placeholder="동일한 비밀번호를 입력해주세요"/>
        //         </Form.Item>

        //         <Form.Item
        //             label="이름"
        //             name="registername"
        //             rules={[
        //                 {required:true, message:"이름을 입력해주세요"}
        //             ]}
        //         >
        //             <Input placeholder=""/>
        //         </Form.Item>

        //         <Form.Item
        //             label="핸드폰 번호"
        //             name="registerphonenumber"
        //             rules={[
        //                 {required:true, message:"핸드폰 번호를 입력해주세요"}
        //             ]}
        //         >
        //             <Input placeholder=""/>
        //         </Form.Item>

        //         <Form.Item
        //             label="생년월일"
        //             name="registerbirthdate"
        //             rules={[
        //                 {required:true, message:"생년월일을 입력해주세요"}
        //             ]}>
        //             <DatePicker placeholder="" style={{width:"100%"}}/>
        //         </Form.Item>

        //         <Form.Item
        //             label="이메일"
        //             name="registeremail"
        //             rules={[
        //                 {required:true, message:"이메일을 입력해주세요"}
        //             ]}>
        //             <Input placeholder=""/>
        //         </Form.Item>

        //         <Form.Item
        //             label="null"
        //             name="checkTerms"
        //             style={{textAlign:"center"}}>
        //             <Checkbox
        //                 checked={acceptTerms}
        //                 onChange={(e) => setAcceptTerms(e.target.checked)}
        //             >
        //                 개인정보 수집에 동의합니다.
        //             </Checkbox>
        //         </Form.Item>

        //         <Form.Item
        //             label="null"
        //             name="register"
        //             style={{textAlign:"center"}}>
        //             <Button
        //                 onValuesChange={buttonChange}
        //                 disabled={!acceptTerms}
        //                 type="primary"
        //                 htmlType="submit"
        //             >
        //                 가입하기
        //             </Button>
        //         </Form.Item>
        //     </Form>
        // </>


 <div className="register-content">
<h2>회원가입</h2>
<h5>Create your personal account</h5>
<form action="/home"> 
    <p>
        <label>아이디</label><br/>
        <input type="registerid" name ="registerid" 
        placeholder="아이디를 입력해주세요" required />
    </p>
    <p>
        <label>비밀번호</label><br/>
        <input type="password" name="registerpw"
       placeholder="비밀번호를 입력해주세요" required />
    </p>
    <p>
        <label>비밀번호 확인</label><br/>
        <input type="password" name="registerpwconfirm"
        placeholder="동일한 비밀번호를 입력해주세요" required />
    </p>
    <p>
        <label>보호자 이름</label><br/>
        <input type="guardian" name="registername"  placeholder="이름을 입력해주세요" required />
    </p>
    <p>
        <label>보호자 연락처</label><br/>
        <input type="phone" name=" registerphonenumber" placeholder="핸드폰 번호를 입력해주세요" required />
    </p>
    <p>
        <label>보호자 비상연락처</label><br/>
        <input type="emergency" placeholder="생년월일을 입력해주세요" required />
    </p>
    <p>
        <label>보호자 이메일</label><br/>
        <input type="email" name="registeremail"
        placeholder="이메일을 입력해주세요" required />
    </p>
    <p>
        <label>보호자 주소</label><br/>
        <input type="checkbox" placeholder="보호자 주소" required />
    </p>
   
    <p>
        <button id="sub_btn" type="submit"  onValuesChange={buttonChange}
        onChange={(e) => setAcceptTerms(e.target.checked)}
        >회원가입</button>
    </p>
</form>
 <footer> 
    {/* <p><Link to="/">Back to Homepage</Link></p> */}
 </footer> 
<footer></footer>
</div>  



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