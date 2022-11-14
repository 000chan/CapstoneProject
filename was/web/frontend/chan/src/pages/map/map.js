/*global kakao*/
import React, { useEffect, useState } from 'react'
import {
    AppstoreOutlined, BarsOutlined, CompassOutlined, HomeOutlined, MailOutlined, SettingOutlined, SolutionOutlined, ToolOutlined, TeamOutlined
} from '@ant-design/icons';
import { Menu, Switch } from 'antd';
import 'antd/dist/antd.css';

function makeMap(containerId, position) {
    var container = document.getElementById(containerId);
    var options = {
        center: new kakao.maps.LatLng(position[0], position[1]),
        level: 3
    };
    var map = new kakao.maps.Map(container, options);
    return map;
}

function TopMenu() {
    return (
        <Menu mode="horizontal" defaultSelectedKeys={['topMenu']}>
            <Menu.Item key="menu" icon={<HomeOutlined />}>
                Home
            </Menu.Item>
            <Menu.SubMenu key="SubMenu" title="About" icon={<SolutionOutlined />}>
                <Menu.Item key="three" icon={<BarsOutlined />}>
                    Introduce
                </Menu.Item>
                <Menu.Item key="two" icon={<TeamOutlined />}>
                    Members
                </Menu.Item>
                <Menu.Item key="four" icon={<ToolOutlined />}>
                    Tech Stack
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="menu2" icon={<CompassOutlined />}>
                Map
            </Menu.Item>
            <Menu.Item key="menu3" icon={<SettingOutlined />}>
                Mypage
            </Menu.Item>
        </Menu>
    );
}

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

function MapSideMenu() {
    const items = [
        getItem('메뉴 1', 'sub1', <MailOutlined />, [
            getItem('소메뉴 1', '1'),
            getItem('소메뉴 2', '2'),
            getItem('소메뉴 3', '3'),
            getItem('소메뉴 4', '4'),
        ]),
        getItem('메뉴 2', 'sub2', <AppstoreOutlined />, [
            getItem('소메뉴 5', '5'),
            getItem('소메뉴 6', '6'),
            getItem('서브메뉴', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        ]),
        getItem('메뉴 3', 'sub4', <SettingOutlined />, [
            getItem('소메뉴 9', '9'),
            getItem('소메뉴 10', '10'),
            getItem('소메뉴 11', '11'),
            getItem('소메뉴 12', '12'),
        ]),
    ];
    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('1');
    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <>
            <Switch
                checked={theme === 'dark'}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
                style={{
                    zIndex: 2
                }}
            />
            <br /><br />
            <Menu
                theme={theme}
                onClick={onClick}
                style={{
                    width: 256,
                    position: "relative",
                    zIndex: 2
                }}
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline"
                items={items}
            />
        </>
    );
}

const Map = () => {
    let container = "map";
    let position = [33.450701, 126.570667]

    useEffect(() => {
        makeMap(container, position);
    }, [])

    return (
        <>
            <TopMenu></TopMenu>
            <div id="map" style={{ width: "500px", height: "400px" }}>
                <MapSideMenu></MapSideMenu>
            </div>
        </>
    );
}

export default Map;