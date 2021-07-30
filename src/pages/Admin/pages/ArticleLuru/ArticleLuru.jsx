import React, { Component } from 'react';
import { Form, Input, Card, Button, Select, message, Spin } from 'antd';
import store from '../../../../utils/storageUtils.js'
import articletypelist from '../../../../config/articleTypeConfig.js'
import { submitArt, changeContent } from '../../../../api/index.js'
import RichTextEditor from '../../../../components/RichTextEditor/RichTextEditor.jsx'
import PictureWall from '../../../../components/PictureWall/PictureWall.jsx'
import './ArticleLuru.css'

const { TextArea } = Input;


export default class ArticleLuru extends Component {
    formRef = React.createRef();
    state = {
        title: "博客录入",
        toEditArticle: {},
        showloading: false
    }
    picw = React.createRef()
    //存放文本框组件的ref狂气
    textAreaRef = React.createRef()
    onFinish = async (values) => {
        //  console.log(values)
        const { title_name, type, keyword } = values
        const title_img = this.picw.current.getImgUrl()[0]
        if (this.state.title === '博客录入') {
            const content = this.textAreaRef.current.getHTMLfromtext()
            const nickname = store.getUser().nickname
            const username = store.getUser().username
            this.setState({ showloading: true })
            const result = await submitArt(nickname, username, title_name, content, type, keyword, title_img)
            if (result.err_code === 0) {
                this.setState({ showloading: false })
                message.success('博客上传成功', 1)

            } else {
                this.setState({ showloading: false })
                message.error('博客上传失败', 1)
            }
        } else {
            const { title_name, type } = values
            const { _id } = this.state.toEditArticle
            const content = this.textAreaRef.current.getHTMLfromtext()
            this.setState({ showloading: true })
            const result = await changeContent(_id, title_name, content, type, keyword, title_img)
            // console.log(result)
            if (result.err_code === 0) {
                this.setState({ showloading: false })
                message.success('博客修改成功', 1)

            } else {
                this.setState({ showloading: false })
                message.error('博客修改失败', 1)
            }
        }

    };
    changeToEdit = () => {
        const { ie } = this.props.match.params
        // console.log(this.props.match.params)
        if (ie === "input") {
            this.setState({ title: "博客录入" })
        } else {
            //从localStorage里拿到要编辑的图片信息
            const catchArticle = store.getArticle()
            this.setState({ title: "修改博客", toEditArticle: catchArticle })
        }
    }

    UNSAFE_componentWillMount() {
        //  console.log('willmount')
        this.changeToEdit()
    }
    validateKey = (rule, value, callback) => {
        if (value.trim().split(/\s+/).length > 5) {
            return Promise.reject('最多5个关键字')
        } else if(value.trim().split(/\s+/).length < 2){
            return Promise.reject('最少2个关键字')
        }else {
            return Promise.resolve() //验证通过
        }
    }

    render() {
        const { title_name, type, content, keyword, title_img } = this.state.toEditArticle
        return (
            <Card headStyle={{ color: 'orange', fontSize: "17px" }} title={this.state.title} className="luru-card" >
                <Form
                    ref={this.formRef}
                    name="submitarticle"
                    onFinish={this.onFinish}
                    scrollToFirstError
                >

                    <Form.Item
                        style={{ width: '88%' }}
                        name="title_name"
                        initialValue={title_name || ''}
                        label="标题："
                        rules={[
                            {
                                required: true,
                                message: '请输入标题',
                                whitespace: true,
                            }, {
                                type: 'string',
                                message: ' '
                            }, {
                                min: 5,
                                message: '最小标题长度为5个字'
                            }, {
                                max: 60,
                                message: '最大标题长度为60个字'
                            }
                        ]}
                    >
                        <TextArea
                            className="article-title"
                            showCount
                            maxLength={60}
                            placeholder="请输入博客标题（5-60字）"
                            autoSize
                        />
                    </Form.Item>

                    <Form.Item
                        style={{ width: '30%' }}
                        initialValue={type || 'Python'}
                        name="type"
                        label="类型："
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >
                        <Select>
                            {
                                articletypelist.map((typeObj) => {
                                    return (
                                        <Select.Option key={typeObj.value} value={typeObj.type}>{typeObj.type}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        style={{ width: '88%' }}
                        name="content"
                        label="内容："
                        hasFeedback
                    >
                        <RichTextEditor ref={this.textAreaRef} HTMLtext={this.state.title === '修改博客' ? content : ''} />
                    </Form.Item>

                    <Form.Item
                        style={{ width: '88%' }}
                        name="keyword"
                        label="关键字"
                        initialValue={keyword || ''}
                        rules={[
                            {
                                validator: this.validateKey
                            },
                            {
                                type: 'string'
                            }, {
                                required: true,
                                message: '请输入关键字',
                                whitespace: true,
                            }
                        ]}
                    >
                        <TextArea
                            className="article-keyword"
                            showCount
                            placeholder="请输入2-5个关键字 (以空格分隔开)"
                            autoSize
                        />
                    </Form.Item>

                    <Form.Item
                        label="标题图片（非必选）："
                    >
                        <PictureWall maxpic={1} initialImg={title_img} ref={this.picw} />
                    </Form.Item>


                    <Form.Item >
                        <Button type="default" htmlType="submit" className="submit-article-btn">
                            录入
                        </Button>
                    </Form.Item>
                    <div style={{ textAlign: 'center' }}>
                        <Spin spinning={this.state.showloading} />
                    </div>
                </Form>
            </Card >

        )
    }
}


