import { Select, Space, Tooltip, Typography, Avatar, Button, Card, Tabs, Form, Input, DatePicker, Checkbox } from 'antd';
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

function ModifyUserInfo({ mypageData }) {
    let userData = mypageData["user"][0]
    let targetData = mypageData["target"][0]
    // registerForm input value 검사
    const onFinish = (values) => {
        axios
            .put("http://127.0.0.1:8000/user/mypage/", values)
            .then(function (response) {
                console.log(response);
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
        </>
    );
}

const Mypage = () => {
    const [mypageData, setMypageData] = useState([]);   // 회원정보를 위한 상태
    // const [modify, setModify] = useState(0);            // 회원정보 수정을 위한 상태

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
            tmpStrU.push(items[0] + " : " + items[1] + "\n");
        });
        usercontent = tmpStrU.join('');

        let tmpArrT = Object.entries(mypageData["target"][0]);
        let tmpStrT = [];
        tmpArrT.forEach(function (items) {
            tmpStrT.push(items[0] + " : " + items[1] + "\n");
        });
        targetcontent = tmpStrT.join('');
    }

    // 탭 라벨 생성
    let labels = [];
    let label1 = "내 정보";
    let label2 = "보호대상 정보";
    labels.push(label1);
    labels.push(label2);

    // 탭 내용 생성
    let contents = []
    let userDataContent = usercontent;
    let targetDataContent = targetcontent;
    contents.push(userDataContent);
    contents.push(targetDataContent);

    const items = new Array(contents.length).fill(null).map((_, i) => {
        let id = String(i + 1);
        return {
            label: labels[id - 1],
            key: id,
            children: (
                <>
                    <div style={{ marginLeft: "3%" }}>
                        {contents[id - 1]}
                    </div>
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

                <div className='usersetting-content-container-box'>
                    <div className='usersetting-content-obj' id='username'>
                        <div className='usersetting-content-obj-subject'>아이디</div>
                        <div className='usersetting-content-obj-data'><input id="username" name="username" placeholder="아이디" type="text" /></div>
                    </div>
                    <div className='usersetting-content-obj' id='setting-password'>
                        <div className='usersetting-content-obj-subject'>비밀번호 변경</div>
                        <div className='usersetting-content-obj-data'><input type="password" id="pass_field" name="pass_field" placeholder="*****" /></div>
                    </div>
                    <div className='usersetting-content-obj'>
                        <div className='usersetting-content-obj-subject'>비밀번호 확인</div>
                        <div className='usersetting-content-obj-data'><input id="pass_field_check" name="pass_field_check" placeholder="비밀번호 확인" type="password" autoComplete="off" /></div>
                    </div>
                    <div className='usersetting-content-btn'>
                        <div className='usersetting-content-submit'>
                            <button>수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Mypage;