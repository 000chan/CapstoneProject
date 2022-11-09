import React from 'react';
// import antd
import { Button, Result } from 'antd';
import 'antd/dist/antd.css';

const nonePage = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back to "AKBS" Home</Button>}
    />
);
export default nonePage;