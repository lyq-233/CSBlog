import React, { Component } from 'react'
import { Card, Form, Input, Button, Spin, message } from 'antd'
import store from '../../../../utils/storageUtils.js'
import PictureWall from '../../../../components/PictureWall/PictureWall.jsx'
import { giveAdvise } from '../../../../api/index.js'
import './GiveAdvise.css'

export default class GiveAdvise extends Component {
    state = { isloading: false }
    picw = React.createRef()

    onFinish = async (values) => {
        // console.log(values)
        const { advise } = values
        const imgs = this.picw.current.getImgUrl()
        // console.log(imgs)
        const nickname = store.getUser().nickname
        const username = store.getUser().username
        this.setState({ isloading: true })
        const result = await giveAdvise(nickname, username, advise, imgs)
        //console.log(result)
        if (result.err_code === 0) {
            this.setState({ isloading: false })
            message.success('您的反馈已被提交', 1)

        } else {
            this.setState({ isloading: false })
            message.error('提交失败', 1)
        }
    };

    render() {
        return (
            <Card headStyle={{ color: 'orange', fontSize: "17px" }} title="Bug/意见反馈" className="card" >
                <Form
                    name="feedback"
                    onFinish={this.onFinish}
                >
                    <h4 style={{ fontSize: '20px' }}>请描述你遇到的问题（300字以内）：</h4>
                    <Form.Item
                        name="advise"
                        rules={[
                            {
                                type: 'string'
                            }, {
                                max: 300,
                                message: '最大长度为300字'
                            }, {
                                required: true,
                                message: '请输入内容!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={4}
                            showCount
                            autoSize={{ minRows: 5 }}
                        />
                    </Form.Item>
                    <h4 style={{ fontSize: '20px' }}>添加最多三张图片帮助我们更好地判断问题：</h4>
                    <Form.Item
                    >
                        <PictureWall maxpic={3} ref={this.picw} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                         </Button>
                    </Form.Item>
                    <div style={{ textAlign: 'center' }}>
                        <Spin spinning={this.state.isloading} />
                    </div>
                </Form>
            </Card>
        )
    }
}
