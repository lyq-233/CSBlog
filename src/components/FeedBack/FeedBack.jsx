import React, { Component } from 'react'
import {
    BugOutlined
} from '@ant-design/icons';
import './FeedBack.css'
import { withRouter } from 'react-router';

class FeedBack extends Component {
    //缓动函数
    move = (obj, distance, callback) => {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (distance - obj.offsetLeft) / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft === distance) {
                clearInterval(obj.timer);
                if (callback) {
                    callback();
                }
            } else {
                obj.style.left = obj.offsetLeft + step + 'px';
            }
        }, 35)
    }
    //侧边弹出
    movout = () => {
        let son = document.querySelector('.fedbk-son');
        this.move(son, -80, function () {

        });
    }
    //侧边滑入
    movin = () => {
        let son = document.querySelector('.fedbk-son');
        this.move(son, 0, function () {
        })
    }
    //跳转到反馈页面
    jmpToAdvise = () => {
        this.props.history.push('/admin/advise')
    }

    render() {
        return (
            <div className="fedbk-father">
                <div className="fedbk-son" onClick={this.jmpToAdvise} onMouseOver={this.movout} onMouseLeave={this.movin}> &nbsp;&nbsp;&nbsp;&nbsp;<BugOutlined />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报个Bug</div>
            </div>
        )
    }
}
export default withRouter(FeedBack)