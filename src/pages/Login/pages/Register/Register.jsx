import React, { Component } from 'react'
import RegistrationForm from '../../../../components/RegistrationForm/RegistrationForm.jsx'
import './Register.css'


export default class Register extends Component {
    render() {
        return (
            <div className="login-body">
                <div className="login-region-title">用户注册</div>
                <div className="login-region-main">
                    <RegistrationForm />
                </div>
            </div>
        )
    }
}
