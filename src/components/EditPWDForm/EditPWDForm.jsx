import React, { Component } from 'react'
import { Form, Input } from 'antd';
import store from '../../utils/storageUtils.js'

export default class EditPWDForm extends Component {
    formRef = React.createRef();

    componentDidMount() {
        this.props.getEditPWDForm(this.formRef)
    }
    render() {
        // console.log(this.props.getEditNameForm)
        return (
            <Form ref={this.formRef} name="editpwd-ref" >
                <Form.Item
                    name="password"
                    label="密码"
                    initialValue={store.getUser().password}
                    rules={[
                        {
                            type: 'string'
                        }, {
                            min: 6,
                            message: '最小密码长度为6 '
                        }
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>

            </Form>
        )
    }
}


