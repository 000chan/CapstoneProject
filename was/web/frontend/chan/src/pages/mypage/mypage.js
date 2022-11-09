import React, {useState} from 'react'
import {
    BarsOutlined,
    CompassOutlined,
    HomeOutlined,
    SettingOutlined,
    SolutionOutlined,
    ToolOutlined,
    TeamOutlined
} from '@ant-design/icons';
import {Menu, Switch} from 'antd';
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";

const Mypage = () => {
    return (
        <>
            {/*상단 메뉴*/}
            <Menu mode="horizontal" defaultSelectedKeys={['topMenu']}>
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
            <h1>MyPage</h1>
        </>
    );
}

export default Mypage
