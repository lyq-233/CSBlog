import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { reqLogin } from '../../api/index.js'

import { Form, Input, Button, message, Spin } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import store from '../../utils/storageUtils.js'
import PubSub from 'pubsub-js'
import {
    succeed,
    fail,
    move,
    reset
} from '../../redux/actions/verifylogin'
import { show, offshow } from '../../redux/actions/showverify'
//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

import './NormalLoginForm.css'


class NormalLoginForm extends Component {
    state = { showloading: false }

    onFinish = (values) => {
        this.props.show()
        var that = this
        const { succeed, offshow, reset } = this.props
        PubSub.subscribe('verify', function (data) {
            PubSub.unsubscribe('verify')
            succeed()
            setTimeout(async () => {
                reset()
                offshow()
                const { nickname, password } = values
                that.setState({ showloading: true })
                const result = await reqLogin(nickname, password)
                if (result.err_code === 0) {
                    that.setState({ showloading: false })
                    // 提示登录成功
                    message.success('登录成功', 2)
                    //在本地存储中存储用户信息
                    store.saveUser(result.user)
                    //跳转到主页面
                    that.props.jumpToHomepage()
                } else {
                    that.setState({ showloading: false })
                    message.error('用户名或密码错误')
                }
            }, 300)
        });
    };
    validateNick = (rule, value, callback) => {
        if (!/^[0-9a-zA-Z_]+$/.test(value)) {
            return Promise.reject('账号只能由字母，数字以及下划线组成')
        } else if (value.length < 3) {
            return Promise.reject('账号长度不能小于3位')
        } else if (value.length > 32) {
            return Promise.reject('账号长度不能大于32位')
        } else {
            return Promise.resolve() //验证通过
        }
    }
    componentWillUnmount() {
        PubSub.unsubscribe('verify')
    }
    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                //点击提交按钮且通过验证规则时的回调函数
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="nickname"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的用户名!',
                        }, {
                            validator: this.validateNick
                        }
                    ]}
                >
                    <Input className="input" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="nickname" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的密码',
                        },
                    ]}
                >
                    <Input
                        className="input"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <Link className="register" to="/login/register">没有账号？立即注册</Link>
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                    <Spin spinning={this.state.showloading} />
                </div>
            </Form>
        );
    }
}

//使用connect()()创建并暴露一个容器组件
export default connect(
    state => ({
        ifshow: state.ifshow
    }),
    { succeed, fail, move, reset, show, offshow }
)(NormalLoginForm)