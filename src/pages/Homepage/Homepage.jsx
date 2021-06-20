import React, { Component } from 'react'
//import { Redirect, Route, Switch } from 'react-router-dom'
import HomepageHeader from '../../components/HomepageHeader/HomepageHeader.jsx'
import HomepageNav from '../../components/HomepageNav/HomepageNav.jsx'
import HomepageMain from '../../components/HomepageMain/HomepageMain.jsx'
import FeedBack from '../../components/FeedBack/FeedBack.jsx'
import ReturnToTop from '../../components/ReturnToTop/ReturnToTop.jsx'
import HomepageFooter from '../../components/HomepageFooter/HomepageFooter.jsx'
import './Homepage.css'

export default class Homepage extends Component {
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: 'rgb(246, 246, 246)', minHeight: '100%' }}>
                <HomepageHeader />
                <HomepageNav />
                <HomepageMain />
                <FeedBack />
                <ReturnToTop />
                <HomepageFooter />
            </div>
        )
    }
}
