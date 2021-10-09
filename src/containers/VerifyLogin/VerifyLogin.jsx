import React, { Component, Fragment } from 'react'
import PubSub from 'pubsub-js'
import {
    succeed,
    fail,
    move
} from '../../redux/actions/verifylogin'
import { show, offshow } from '../../redux/actions/showverify'
//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'


import './VerifyLogin.css'

class VerifyLogin extends Component {
    move = (e) => {
        const { fail, move } = this.props
        const dv = this.dv
        const sm = this.sm
        const bigLeft = dv.offsetLeft
        const bigTop = dv.offsetTop
        const smLeft = e.pageX - bigLeft - sm.offsetLeft
        const smTop = e.pageY - bigTop - sm.offsetTop

        function moving(ev) {
            let left = ev.pageX - bigLeft - smLeft + 'px'
            let top = ev.pageY - bigTop - smTop + 'px'

            let width = parseInt(getComputedStyle(dv).width) - parseInt(getComputedStyle(sm).width)
            let height = parseInt(getComputedStyle(dv).height) - 50 - parseInt(getComputedStyle(sm).height)
            if (ev.pageX - bigLeft - smLeft < 0) {
                left = 0 + 'px'
            } else if (ev.pageX - bigLeft - smLeft > width) {
                left = width + 'px'
            }
            if (ev.pageY - bigTop - smTop < 0) {
                top = 0 + 'px'
            } else if (ev.pageY - bigTop - smTop > height) {
                top = height + 'px'
            }
            move({ top: top, left: left })
        }
        document.addEventListener('mousemove', moving, false)

        sm.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', moving, false)
            if (sm.offsetLeft > 124 && sm.offsetLeft < 134 && sm.offsetTop > 128 && sm.offsetTop < 138) {
                PubSub.publish('verify', 'success')
            } else {
                fail({ top: '20px', left: '20px' })
            }
        }, false)
    }
    render() {
        const { verify, ifshow } = this.props
        return (
            <Fragment>
                <div className="verify-all" style={{ visibility: ifshow }}>
                    <div className="verify-box" ref={e => (this.dv = e)}>
                        <h1 className="verify-title" style={{ color: verify.color }}>{verify.text}</h1>
                        <div className="verify-container">
                            <img className="verify-big" draggable="false" src={require('../../imgs/big.png').default} alt="" />
                            <img className="verify-small"
                                ref={e => (this.sm = e)}
                                style={{ left: verify.left, top: verify.top }}
                                onMouseDown={this.move}
                                draggable="false"
                                src={require('../../imgs/small.png').default}
                                alt="" />
                        </div>
                    </div>
                </div>
            </Fragment >
        )
    }
}

//使用connect()()创建并暴露一个容器组件
export default connect(
    state => ({
        verify: state.verify,
        ifshow: state.ifshow
    }),
    { succeed, fail, move, show, offshow }
)(VerifyLogin)

