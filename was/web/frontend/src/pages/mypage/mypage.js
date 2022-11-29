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

function modifyInfo() {
    console.log('test')
    document.getElementsByClassName("contents")[0].innerHTML = ''
}

const Mypage = () => {
    const [mypageData, setMypageData] = useState([]);   // 회원정보를 위한 상태

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

    const items = new Array(labels.length).fill(null).map((_, i) => {
        let id = String(i + 1);
        return {
            label: labels[id - 1],
            key: id,
            children: (
                <>
                    <div style={{textAlign:"right"}}>
                        <Button
                            onClick={modifyInfo}
                        >수정하기</Button>
                    </div>
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
            </div>
        </>
    );
}

export default Mypage;