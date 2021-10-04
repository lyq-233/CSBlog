import React, { Component } from 'react'
import HomepageHeader from '../../components/HomepageHeader/HomepageHeader.jsx'
import HomepageNav from '../../components/HomepageNav/HomepageNav.jsx'
import HomepageMain from '../../components/HomepageMain/HomepageMain.jsx'
import FeedBack from '../../components/FeedBack/FeedBack.jsx'
import ReturnToTop from '../../components/ReturnToTop/ReturnToTop.jsx'
import HomepageFooter from '../../components/HomepageFooter/HomepageFooter.jsx'
import './Homepage.css'

export default class Homepage extends Component {
    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        return (
            <div style={{ width: '100%', backgroundColor: 'rgb(246, 246, 246)', minHeight: '100%' }}>
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
