import { Avatar, Button, Card, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { TopMenu } from '../../components/common';
import axios from "axios";
import man from '../../assets/images/man.png';

const { Meta } = Card;

// get request params
let params;
if(localStorage.getItem("user")){
    params=localStorage.getItem("user");
}

const MakeInfoTab = ({ user }) => {
    let labels = [];
    let label1 = "내 정보";
    let label2 = "보호대상 정보";
    labels.push(label1);
    labels.push(label2);

    let contents = []
    let userDataContent = "user";
    let targetDataContent = "보호대상 정보";
    contents.push(userDataContent);
    contents.push(targetDataContent);

    const items = new Array(contents.length).fill(null).map((_, i) => {
        let id = String(i + 1);
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
            <Tabs type="card"
                items={items}
                style={{width: "900px", float: "right", margin: "3% 5% 0 0", whiteSpace:"pre-line"}}
            />
        </>
    );
};

const Mypage = () => {
    // response data
    const [user, setUser] = useState([]);
    // 유저 정보 수정
    const [modify, setModify] = useState(0);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/user/getmypage/", {params:{params}})
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

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
                        modify==0 ?
                        <Button
                            modify={modify}
                            onClick={() => {
                                if(modify==0){
                                    setModify(modify+1);
                                } else {
                                    setModify(modify-1);
                                }
                            }}
                        >
                            개인정보 변경하기
                        </Button>
                        :
                        <Button
                            modify={modify}
                            onClick={() => {
                                if(modify==0){
                                    setModify(modify+1);
                                } else {
                                    setModify(modify-1);
                                }
                            }}
                        >
                            개인정보 저장하기
                        </Button>
                    ]}
                >
                    <Meta
                        user={user}
                        avatar={<Avatar src={man}/>}
                        title={user.username + " 님, 환영합니다!"}
                    />
                </Card>
                <MakeInfoTab user={user}/>
                {/* <Tabs type="card"
                    items={items}
                    style={{width: "900px", float: "right", margin: "3% 5% 0 0", whiteSpace:"pre-line"}}
                /> */}
            </div>
        </>
    );
}

export default Mypage;
