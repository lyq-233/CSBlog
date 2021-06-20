import React, { Component } from 'react'
import { Form, Select } from 'antd';
import store from '../../utils/storageUtils.js'

export default class EditGenderForm extends Component {
    formRef = React.createRef();

    componentDidMount() {
        this.props.getEditGenderForm(this.formRef)
    }
    render() {
        return (
            <Form ref={this.formRef} name="editgender-ref">
                <Form.Item
                    name="gender"
                    label="性别"
                    initialValue={store.getUser().gender}
                >
                    <Select>
                        <Select.Option value={0}>男</Select.Option>
                        <Select.Option value={1}>女</Select.Option>
                    </Select>
                </Form.Item>

            </Form>
        )
    }
}


