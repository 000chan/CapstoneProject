import { Avatar, Button, Card, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { TopMenu } from '../../components/common';
import axios from "axios";
import man from '../../assets/images/man.png';

const { Meta } = Card;

// get 요청 params
let params;
if(localStorage.getItem("user")){
    params=localStorage.getItem("user");
}

const Mypage = () => {
    const [mypageData, setMypageData] = useState([]);   // 회원정보를 위한 상태
    const [modify, setModify] = useState(0);            // 회원정보 수정을 위한 상태

    // axios 통신
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/user/getmypage/", {params:{params}})
            .then((response) => {
                setMypageData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    // axios response data 가져오는 부분
    let username;
    let usercontent = [];
    let targetcontent = [];

    if(mypageData.length!=0) {
        username = mypageData["user"][0]["username"];

        let tmpArrU = Object.entries(mypageData["user"][0]);
        let tmpStrU = [];
        tmpArrU.forEach(function(items){
            tmpStrU.push(items[0] + " : " + items[1] + "\n");
        });
        usercontent = tmpStrU.join('');

        let tmpArrT = Object.entries(mypageData["target"][0]);
        let tmpStrT = [];
        tmpArrT.forEach(function(items){
            tmpStrT.push(items[0] + " : " + items[1] + "\n");
        });
        targetcontent = tmpStrT.join('');
    }

    // 회원정보 탭 생성
    let labels = [];
    let label1 = "내 정보";
    let label2 = "보호대상 정보";
    labels.push(label1);
    labels.push(label2);
    
    let contents = []
    let userDataContent = usercontent;
    let targetDataContent = targetcontent;
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
                        avatar={<Avatar src={man}/>}
                        title={username + " 님, 환영합니다!"}
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
