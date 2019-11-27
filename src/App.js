import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Avatar, Icon, Dropdown, Form, Input, Button, } from 'antd';
import './App.css';
import './assets/icon/iconfont.css';
import routes from './routes/index.js'
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
class App extends React.Component {
  // constructor() {

  // }
  handleMenuClick = (e) => {
    // message.info('Click on menu item.');
    console.log('click', e);
  }
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="0">
          1st menu item
        </Menu.Item>
        <Menu.Item key="1">
          退出登录
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" disabled>
          3rd menu item（disabled）
       </Menu.Item>
      </Menu>
    );
    return (
      <Router>
        <div>
          <Header style={{ minWidth: '100%' }} className="header">
            <div className="logo" >
              <img style={{ width: '120px' }} src={require("./assets/images/logo.png")}></img>
            </div>
            <div className="topmenu">
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item className='topmenuitem' key="1"> <Link to="/home"><Icon type="home" /> 首页</Link></Menu.Item>
                <Menu.Item className='topmenuitem' key="2"> <Link to="/user"><Icon type="desktop" />工作</Link></Menu.Item>
                <Menu.Item className='topmenuitem' key="3"> <Link to="/shop"><Icon type="setting" />管理</Link></Menu.Item>
              </Menu>
            </div>
            <div className="topmsg" >
              <Dropdown overlay={menu}>
                <Avatar size={32} icon="user" />
              </Dropdown>,
            </div>
          </Header>
        </div>
        {
          routes.map((route, key) => {
            if (route.exact) {
              return <Route key={key} exact path={route.path}
                // route.component     value.component   <User  {...props}  routes={route.routes} />
                render={props => (
                  // pass the sub-routes down to keep nesting
                  <route.component {...props} routes={route.routes} />
                )}
              />
            } else {
              return <Route key={key} path={route.path}
                render={props => (
                  // pass the sub-routes down to keep nesting
                  <route.component {...props} routes={route.routes} />
                )}
              />

            }
          })
        }
      </Router>

    );
  }
}
export default App;