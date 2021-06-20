import React, { Component } from 'react'
import { Form, Input } from 'antd';
import store from '../../utils/storageUtils.js'
const { TextArea } = Input;
export default class EditIntroForm extends Component {
    formRef = React.createRef();

    componentDidMount() {
        this.props.getEditIntroForm(this.formRef)
    }
    render() {
        // console.log(this.props.getEditNameForm)
        return (
            <Form ref={this.formRef} name="editintro-ref" >
                <Form.Item
                    name="intro"
                    label="个人简介"
                    initialValue={store.getUser().intro}
                    rules={[
                        {
                            type: 'string'
                        }, {
                            max: 15,
                            message: '最大简介长度为15'
                        }
                    ]}
                >
                    <TextArea
                        showCount
                        maxLength={15}
                        placeholder="请输入个人简介（最大15字）"
                        autoSize
                    />
                </Form.Item>

            </Form>
        )
    }
}


