import React from "react";
import {Menu} from "antd";
import {
    BarsOutlined,
    CompassOutlined,
    HomeOutlined,
    SettingOutlined,
    SolutionOutlined,
    TeamOutlined,
    ToolOutlined
} from "@ant-design/icons";

// 공통 컴포넌트

function TopMenu() {
    return (
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
    );
}

export {TopMenu};
