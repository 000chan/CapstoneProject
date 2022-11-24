import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import React from 'react';
import { TopMenu } from '../../components/common';
import axios from "axios";

const { Meta } = Card;

const Mypage = () => {
    return (
        <>
            <TopMenu></TopMenu>
            <h1>MyPage</h1>
            <Card
                style={{
                    width: 300,
                }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
            <button
                onClick={() => {
                    axios
                        .get("http://127.0.0.1:8000/service/mypage/")   // url 마지막에 "/" 생략 시, 301 error 발생하니 유의
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }}
            >
                GET
            </button>
        </>
    );
}

export default Mypage;
