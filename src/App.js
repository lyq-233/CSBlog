import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'


import Admin from './pages/Admin/Admin.jsx'
import Login from './pages/Login/Login.jsx'
import Homepage from './pages/Homepage/Homepage.jsx'
import ViewBlog from './pages/ViewBlog/ViewBlog.jsx'
import SearchResult from './pages/SearchResult/SearchResult.jsx'

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/admin' component={Admin} />
                    <Route path='/login' component={Login} />
                    <Route path='/homepage' component={Homepage} />
                    <Route path='/search/:path/:flag' component={SearchResult} />
                    <Route path='/viewblog/:id' component={ViewBlog} />
                    <Redirect to='/homepage' />
                </Switch>
            </HashRouter>
        )
    }
}
