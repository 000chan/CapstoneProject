import { Select, Space, Tooltip, Typography, Avatar, Button, Card, Tabs, Form, Input, DatePicker, Checkbox, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { TopMenu } from '../../components/common';
import axios from "axios";
import man from '../../assets/images/man.png';
import './mypage.css';

const { Meta } = Card;

// get 요청 params
let params;
if (localStorage.getItem("user")) {
    params = localStorage.getItem("user");
}

function modifyInfo(state, setState) {
    if (state == 0) { setState(1) }
    else if (state == 1) { setState(0) }
    console.log(state)
}

function ModifyForm(id, data) {
    // user form
    if (id == 1) {
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
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="아이디"
                        name="id"
                        initialValue={data["user"][0]["id"]}
                        rules={[
                            { required: true, message: "아이디를 입력해주세요" }
                        ]}
                    >
                        <Input placeholder="아이디를 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                        label="이름"
                        name="username"
                        initialValue={data["user"][0]["username"]}
                        rules={[
                            { required: true, message: "이름을 입력해주세요" }
                        ]}
                    >
                        <Input placeholder="이름을 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                        label="핸드폰 번호"
                        name="userphonenum"
                        initialValue={data["user"][0]["userphonenum"]}
                        rules={[
                            { required: true, message: "핸드폰 번호를 입력해주세요" }
                        ]}
                    >
                        <Input placeholder="핸드폰 번호를 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                        label="이메일"
                        name="e_mail"
                        initialValue={data["user"][0]["e_mail"]}
                        rules={[
                            { required: true, message: "이메일을 입력해주세요" }
                        ]}>
                        <Input placeholder="이메일을 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="register"
                        align="center"
                        style={{ textAlign: "center" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            저장하기
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
    // target form
    else if (id == 2) {
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
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="이름"
                        name="targetname"
                        initialValue={data["target"][0]["targetname"]}
                        rules={[
                            { required: true, message: "이름을 입력해주세요" }
                        ]}
                    >
                        <Input placeholder="이름을 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                        label="성별"
                        name="gender"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Radio.Group>
                            <Radio value={"male"}>남</Radio>
                            <Radio value={"female"}>여</Radio>
                        </Radio.Group>
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
                        label="실종 유무"
                        name="missingornot"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Radio.Group>
                            <Radio value={"missing"}>실종</Radio>
                            <Radio value={"nomissing"}>미실종</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="긴급 연락처"
                        name="urgentnum"
                        initialValue={data["target"][0]["urgentnum"]}
                        rules={[
                            { required: true, message: "긴급 연락처를 입력해주세요" }
                        ]}
                    >
                        <Input placeholder="긴급 연락처를 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                        label=""
                        name="register"
                        align="center"
                        style={{ textAlign: "center" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            저장하기
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

const Mypage = () => {
    const [mypageData, setMypageData] = useState([]);   // 회원정보를 위한 상태
    const [modifyData, setModifyData] = useState(0);   // 회원정보를 위한 상태

    // axios 통신
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/user/getmypage/", { params: { params } })
            .then((response) => {
                setMypageData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // axios response data 가져오기
    let username;
    let usercontent = [];
    let targetcontent = [];

    if (mypageData.length != 0) {
        username = mypageData["user"][0]["username"];

        let tmpArrU = Object.entries(mypageData["user"][0]);
        let tmpStrU = [];
        tmpArrU.forEach(function (items) {
            tmpStrU.push(items[0] + " : " + items[1] + "\n\n");
        });
        usercontent = tmpStrU.join('');

        let tmpArrT = Object.entries(mypageData["target"][0]);
        let tmpStrT = [];
        tmpArrT.forEach(function (items) {
            tmpStrT.push(items[0] + " : " + items[1] + "\n\n");
        });
        targetcontent = tmpStrT.join('');
    }

    // 탭 라벨 생성
    let labels = ["내 정보", "보호대상 정보"];

    // 탭 내용 생성
    let contents = [];
    contents.push(usercontent);
    contents.push(targetcontent);

    const items = new Array(labels.length).fill(null).map((_, i) => {
        let id = String(i + 1);
        return {
            label: labels[id - 1],
            key: id,
            children: (
                <>
                    <div style={{ textAlign: "right" }}>
                        <Button
                            modifyData={modifyData}
                            mypageData={mypageData}
                            onClick={() => modifyInfo(modifyData, setModifyData)}
                        >
                            {
                                modifyData == 0 ?
                                    '수정하기' : '돌아가기'
                            }
                        </Button>
                    </div>
                    {modifyData == 0 ?
                        <div style={{ marginLeft: "3%" }}>
                            {contents[id - 1]}
                        </div>
                        :
                        ModifyForm(id, mypageData)
                    }
                </>
            ),
        };
    });

    return (
        <>
            <TopMenu />
            <div>
                <Card
                    style={{
                        width: "300px",
                        float: "left",
                        margin: "6% 0 0 4%"
                    }}
                    cover={
                        <img
                            alt="example"
                            src={man}
                        />
                    }
                >
                    <Meta
                        avatar={<Avatar src={man} />}
                        title={username + " 님, 환영합니다!"}
                    />
                </Card>
                <Tabs type="card"
                    items={items}
                    style={{ width: "900px", float: "right", margin: "3% 5% 0 0", whiteSpace: "pre-line" }}
                />
            </div>
        </>
    );
}

export default Mypage;