import React, { Component } from 'react'
import './ReturnToTop.css'
export default class ReturnToTop extends Component {
    state = { showgotoTop: 'none' }
    gotoTop = () => {
        document.querySelector('#mainpage-top').scrollIntoView(true);
    }
    handleShow = () => {
        if (window.scrollY > 800) {
            this.setState({ showgotoTop: 'block' })
        }
        else {
            this.setState({ showgotoTop: 'none' })
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleShow)
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        const { showgotoTop } = this.state
        return (
            <div className="gototop" style={{ display: showgotoTop }} onClick={this.gotoTop}>
                <div className="gototop-triangle"></div>
                <div className="gototop-square">
                    <div style={{ paddingTop: '5px' }}>返回</div>
                    <div>顶部</div>
                </div>
            </div>
        )
    }
}

