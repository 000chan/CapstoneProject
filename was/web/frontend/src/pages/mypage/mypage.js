import { SettingOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { TopMenu } from '../../components/common';
import axios from "axios";
import man from '../../assets/images/man.png';

const { Meta } = Card;

const Mypage = () => {
    let data;
    if(localStorage.getItem("user")){
        data=localStorage.getItem("user");
    }

    const [user, setUser] = useState([]);
    const [target, setTarget] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/user/getmypage/", {params:{data}})
            .then((response) => {
                setUser(response.data["user"][0]);
                setTarget(response.data["target"][0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const labels = ['내 정보', '보호대상 정보'];
    const contents = [
        "[테스트] django로 부터 username data 받아 출력중" + "\n" + user.username,
        "[테스트] django로 부터 targetname data 받아 출력중" + "\n" + target.targetname,
    ];

    const items = new Array(2).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
            label: labels[id-1],
            key: id,
            children: (
                <>
                    <div style={{marginLeft:"3%"}}>
                        {contents[id-1]}
                    </div>
                </>
            ),
        };
    });

    return (
        <>
            <TopMenu/>
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
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                    ]}
                >
                    <Meta
                        user={user}
                        avatar={<Avatar src={man}/>}
                        title={user.username + " 유저님, 환영합니다!"}
                    />
                </Card>
                <Tabs type="card"
                    items={items}
                    style={{width: "900px", float: "right", margin: "3% 5% 0 0", whiteSpace:"pre-line"}}
                />
            </div>
        </>
    );
}

export default Mypage;
