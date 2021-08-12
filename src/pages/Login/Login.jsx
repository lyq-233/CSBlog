import React, { Component } from 'react'

import './Login.css'
import { Route, Switch, Redirect } from 'react-router-dom'

import Log from './pages/Log/Log.jsx'
import Register from './pages/Register/Register.jsx'


export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-header">
                    <div className="box1">C</div>
                    <div className="box2">S</div>
                    <div className="box3">B</div>
                    <div className="box4">l</div>
                    <div className="box5">o</div>
                    <div className="box6">g</div>
                </div>
                <div className="login-region">
                    <Switch>
                        <Route path='/login/log' component={Log} />
                        <Route path='/login/register' component={Register} />
                        <Redirect to='/login/log' />
                    </Switch>
                </div>
            </div >
        )

    }
}
