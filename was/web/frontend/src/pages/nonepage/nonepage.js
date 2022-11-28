// 404 Page

import React from 'react';
// import antd
import { Button, Result } from 'antd';

const Nonepage = () => (
    <Result
        status="404"
        title="404"
        subTitle="죄송합니다, 존재하지 않는 페이지입니다."
        extra={<Button type="primary" onClick={window.location.replace("/home")}>홈으로 돌아가기</Button>} // redirect to login page
    />
);
export default Nonepage;
