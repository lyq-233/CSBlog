import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { HomeTwoTone, FireTwoTone } from '@ant-design/icons';
import articletypelist from '../../config/articleTypeConfig.js'
import './HomepageNav.css'


class HomepageNav extends Component {

    //保证锚点跳转时页面不刷新
    goTo = (href) => {
        document.querySelector(href).scrollIntoView(true);
    }

    render() {
        return (
            <div className="homepage-topnav">
                <div className="homepage-topnav-left">
                    <div className="homepage-topnav-left-obj">
                        <div onClick={() => this.props.history.go(0)} style={{ borderRight: '2px solid red' }}  >
                            <FireTwoTone twoToneColor="orange" style={{ fontSize: '30px' }} />
                            <div>首页</div>
                        </div>
                    </div>
                    <div onClick={() => this.props.history.replace('/admin/home')} className="homepage-topnav-left-obj">
                        <div style={{ borderRight: '2px solid red' }} >
                            <HomeTwoTone twoToneColor="orange" style={{ fontSize: '30px' }} />
                            <div>我的主页</div>
                        </div>
                    </div>
                </div>

                <div className="homepage-topnav-right">
                    {articletypelist.map((typeObj) => {
                        return (
                            <div key={typeObj.value} onClick={() => this.goTo(`#${typeObj.href}`)} className="homepage-topnav-right-obj" >
                                <div>{typeObj.type}</div>
                            </div>
                        )
                    })}
                </div>
            </div >
        )
    }
}
export default withRouter(HomepageNav)