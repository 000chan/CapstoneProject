import React from 'react';
import {Button, Result} from 'antd';

const Noneaccess = () => (
    <Result
        status="403"
        title="403"
        subTitle="죄송합니다, 현재 페이지에 대한 권한이 없습니다.\n로그인 후, 사용해주세요"
        extra={<Button type="primary" onClick={window.location.replace("/login")}>로그인 페이지로
            이동</Button>} // redirect to first page
    />
);
export default Noneaccess;