import React, { Component } from 'react'
import { Form, Input, Tooltip, Button, message, Spin } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { submitReg } from '../../api/index.js'
import './RegistrationForm.css'

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default class RegistrationForm extends Component {
    state = { isloading: false }

    onFinish = async (values) => {
        //console.log('Received values: ', values);
        const { nickname, username, password, email } = values
        this.setState({ isloading: true })
        const result = await submitReg(nickname, username, password, email)
        // console.log(result)
        if (result.err_code === 0) {
            // 提示注册成功
            message.success('注册成功', 2)
            this.setState({ isloading: false })
        } else {
            //提示注册失败
            message.error('该账号已被占用，换个账号试试吧^ ^', 1)
            this.setState({ isloading: false })
        }
    }
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
    render() {
        return (
            <Form
                {...formItemLayout}
                name="register"
                onFinish={this.onFinish}
                scrollToFirstError
            >

                <Form.Item
                    name="nickname"
                    label={
                        <span>
                            账号&nbsp;
                             <Tooltip title="您需要记住此账号以便进行登录">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: '请输入您的账号!',
                            whitespace: true,
                        }, {
                            type: 'string',
                            message: ' '
                        }, {
                            validator: this.validateNick
                        }
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>

                <Form.Item
                    name="username"
                    label={
                        <span>
                            昵称&nbsp;
                             <Tooltip title="为自己起个好听的名字吧！">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: '请输入您的昵称!',
                            whitespace: true,
                        }, {
                            type: 'string',
                            message: ' '
                        }, {
                            max: 8,
                            message: '最大昵称长度为8'
                        }
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>


                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: '请输入合法格式的E-mail',
                        },
                        {
                            required: true,
                            message: '请输入E-mail!',
                        },
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>


                <Form.Item
                    name="password"
                    label="密码："
                    rules={[
                        {
                            required: true,
                            message: '请输入您的密码 ',
                        }, {
                            type: 'string',
                            message: ''
                        }, {
                            min: 6,
                            message: '最小密码长度为6 '
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码："
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再次确认您的密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('请确保您输入的两次密码相同');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout} className="submitreg" >
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                    <Spin spinning={this.state.isloading} />
                </div>
            </Form>
        )
    }

}
