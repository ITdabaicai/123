
import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import { Layout, Menu, Avatar, Icon, Dropdown, Form, Input, Button, } from 'antd';
import http from '../../api/http.js'
import './login.css';
import { islogin, userlogin } from '../../api/request.js'
import routes from '../../routes/index.js';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ds: '',
            islogin: false
        };
    }
    componentWillMount() {
        console.log('1')
        islogin().then(res => {
            this.setState({
                islogin: res.isLogin
            })
        })
    }
    componentDidMount() {
        let finalNum = "";
        for (let i = 0; i < 8; i++) {
            finalNum += Math.floor(Math.random() * 10);
        }
        this.setState({
            ds: finalNum
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                values.ds = this.state.ds
                userlogin({
                    ...values
                }).then(res => {
                    localStorage.setItem('Token', res.token)
                    this.setState({
                        islogin: true
                    })
                })

            }
        });
    };
    changeCode = e => {
        let finalNum = "";
        for (let i = 0; i < 8; i++) {
            finalNum += Math.floor(Math.random() * 10);
        }
        this.setState({
            ds: finalNum
        });
        e.target.src = http.baseURL + `/kaptcha/${finalNum}`
    }
    render() {
        const menu = (
            <Menu  >
                <Menu.Item key="0">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" disabled>
                    3rd menu item（disabled）
                 </Menu.Item>
            </Menu>
        );
        const { getFieldDecorator } = this.props.form;
        if (this.state.islogin) {
            return (
                <Router>
                    <div>
                        <Header style={{ minWidth: '100%' }} className="header">
                            <div className="logo" >
                                <img style={{ width: '120px' }} src={require("../../assets/images/logo.png")}></img>
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
                        {
                            routes.map((route, key) => {
                                if (!route.exact) {
                                    return <Route key={key} path={route.path}
                                        // route.component     value.component   <User  {...props}  routes={route.routes} />
                                        render={props => (
                                            // pass the sub-routes down to keep nesting
                                            <route.component {...props} routes={route.routes} />
                                        )}
                                    />
                                }
                            })
                        }
                    </div>
                </Router>
            )
        } else {
            return (
                <div className='centerform'>
                    <div className='welcome'>欢迎登录</div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('taxpayId', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>

                        <Form.Item>

                            {getFieldDecorator('verify', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    style={{ width: '50%' }}
                                    placeholder="验证码"
                                />
                            )}
                            < img style={{ float: 'right' }} src={http.baseURL + `/kaptcha/${this.state.ds}`} alt='暂无图片' onClick={this.changeCode} />
                        </Form.Item>
                        <Form.Item>
                            {/* {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)} */}
                            {/* <a className="login-form-forgot" href=""> Forgot password</a> */}
                            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                            {/* Or <a href="">register now!</a> */}
                        </Form.Item>
                    </Form>
                </div>
            );
        }

    }
}
login = Form.create({})(login)
export default login;