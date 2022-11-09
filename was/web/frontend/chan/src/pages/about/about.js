import React from 'react'
// import antd
import {Menu, Carousel} from 'antd';
import {
    AppstoreOutlined,
    SettingOutlined,
    CompassOutlined,
    SolutionOutlined,
    HomeOutlined,
    BarsOutlined,
    ToolOutlined,
    TeamOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';

// carousel 설정
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const About = () => {
    return (
        <>
            {/*상단 메뉴*/}
            <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
                <Menu.Item key="menu" icon={<HomeOutlined/>}>
                    Home
                </Menu.Item>
                <Menu.SubMenu key="SubMenu" title="About" icon={<SolutionOutlined/>}>
                    <Menu.Item key="three" icon={<BarsOutlined/>}>
                        Introduce
                    </Menu.Item>
                    <Menu.Item key="two" icon={<TeamOutlined/>}>
                        Members
                    </Menu.Item>
                    <Menu.Item key="four" icon={<ToolOutlined/>}>
                        Tech Stack
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="menu2" icon={<CompassOutlined/>}>
                    Map
                </Menu.Item>
                <Menu.Item key="menu3" icon={<SettingOutlined/>}>
                    Mypage
                </Menu.Item>
            </Menu>
            <h1>AboutPage</h1>
            {/*  본문  */}
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>안영훈</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>김영찬</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>백수연</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>신재현</h3>
                </div>
            </Carousel>
        </>
    )
}

export default About
