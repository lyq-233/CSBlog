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
                    <span>C</span> <span>S</span> <span>B</span> <span>l</span> <span>o</span> <span>g</span>
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
