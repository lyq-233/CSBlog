import React, { Component } from 'react'
import { Form, Input } from 'antd';
import store from '../../utils/storageUtils.js'

export default class EditPWDForm extends Component {
    formRef = React.createRef();

    componentDidMount() {
        this.props.getEditEmailForm(this.formRef)
    }
    render() {
        return (
            <Form ref={this.formRef} name="editemail-ref" >
                <Form.Item
                    name="email"
                    label="邮箱"
                    initialValue={store.getUser().email}
                    rules={[
                        {
                            type: 'email',
                            message: '请输入合法格式的E-mail',
                        }
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>

            </Form>
        )
    }
}


