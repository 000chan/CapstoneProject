import { TopMenu } from '../../components/common';
import { Divider, List, Typography } from 'antd';
import React from 'react';

const serverData = [
    '테스트',
    '테스트',
    '테스트',
];

const wasData = [
    '테스트',
    '테스트',
    '테스트',
];

const Tech = () => (
    <>
        <TopMenu />
        <div style={{ width: "70", margin: "3% 15% 0 15%" }}>
            <Divider orientation="left">Server</Divider>
            <List
                header={<div>Tech Stack</div>}
                bordered
                dataSource={serverData}
                renderItem={(content) => (
                    <List.Item>
                        <Typography.Text mark>[{content}]</Typography.Text> {content}
                    </List.Item>
                )}
            />
            <Divider orientation="left">Was</Divider>
            <List
                header={<div>Tech Stack</div>}
                bordered
                dataSource={wasData}
                renderItem={(content) => (
                    <List.Item>
                        <Typography.Text mark>[{content}]</Typography.Text> {content}
                    </List.Item>
                )}
            />
        </div>
    </>
);
export default Tech;