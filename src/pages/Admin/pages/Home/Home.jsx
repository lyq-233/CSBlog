import React, { Component } from 'react'
import { Avatar, Statistic, Card } from 'antd';
import { UsergroupAddOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { getFanLists } from '../../../../api/index.js'
import store from '../../../../utils/storageUtils.js'

import './Home.css'

export default class Home extends Component {
    state = {
        fanList: [],
        faneeList: [],
        showfan: 'none',
        showfanee: 'none'
    }
    getfanlists = async () => {
        const result = await getFanLists(store.getUser().nickname)
        //console.log(result)
        if (result.err_code === 0) {
            this.setState({
                fanList: result.result.fanList,
                faneeList: result.result.faneeList
            })
        }
    }
    showfan = () => {
        this.setState((state, props) => { return { showfan: state.showfan === 'none' ? 'block' : 'none' } })
    }
    showfanee = () => {
        this.setState((state, props) => { return { showfanee: state.showfanee === 'none' ? 'block' : 'none' } })
    }
    componentDidMount() {
        this.getfanlists()
    }
    render() {
        const { fanList, faneeList, showfan, showfanee } = this.state
        return (
            <Card headStyle={{ color: 'orange', fontSize: "17px" }} title="我的主页" className="card" >
                <div className="home-region-fan">
                    <div onClick={this.showfan} className="home-region-fan-title">
                        <Statistic title="关注我的" value={fanList.length} prefix={<UsergroupAddOutlined />} />
                    </div>
                    <div style={{ display: showfan }}>
                        {
                            fanList.map((fanObj) => {
                                return (
                                    <div className="home-region-fan-body" style={{ paddingTop: '10px' }} key={fanObj._id}>
                                        <Avatar icon={<UserOutlined />} src={fanObj.fanavatar} />
                                        <span style={{ marginLeft: '10px', fontSize: '17px', color: 'grey' }} >{fanObj.fanname}</span>
                                        <div style={{ height: '50px', lineHeight: '50px' }}>个人简介：{fanObj.fanintro}</div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
                <div className="home-region-fan">
                    <div onClick={this.showfanee} className="home-region-fan-title">
                        <Statistic title="我关注的" value={faneeList.length} prefix={<UserAddOutlined />} />
                    </div>
                    <div style={{ display: showfanee }}>
                        {
                            faneeList.map((faneeObj) => {
                                return (
                                    <div className="home-region-fan-body" style={{ marginTop: '10px' }} key={faneeObj._id}>
                                        <Avatar icon={<UserOutlined />} src={faneeObj.faneeavatar} />
                                        <span style={{ marginLeft: '10px', fontSize: '17px', color: 'grey' }} >{faneeObj.faneename}</span>
                                        <div style={{ height: '50px', lineHeight: '50px' }}>个人简介：{faneeObj.faneeintro}</div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </Card>
        )
    }
}
