import React from 'react'
import { Layout, Menu, Avatar, Icon, Dropdown } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, } from "react-router-dom";
import './home.css';
import routes from '../../routes/index.js';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class home extends React.Component {
    state = {
        collapsed: false,
    };
    render() {
        return (
            <div>w shi home</div>
        );
    }
}

export default home;