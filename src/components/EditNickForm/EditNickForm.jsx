import React, { Component } from 'react'
import { Form, Input } from 'antd';
import store from '../../utils/storageUtils.js'

export default class EditNickForm extends Component {
    formRef = React.createRef();

    componentDidMount() {
        this.props.getEditNickForm(this.formRef)
    }
    render() {
        // console.log(this.props.getEditNameForm)
        return (
            <Form ref={this.formRef} name="editnick-ref" >
                <Form.Item
                    name="username"
                    label="昵称"
                    initialValue={store.getUser().username}
                    rules={[
                        {
                            type: 'string'
                        }, {
                            max: 8,
                            message: '最大昵称长度为8'
                        }
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>

            </Form>
        )
    }
}


