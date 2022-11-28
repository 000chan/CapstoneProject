// 404 Page

import React from 'react';
// import antd
import { Button, Result } from 'antd';

const Nonepage = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back to "AKBS" Home</Button>} // redirect to login page
    />
);
export default Nonepage;
