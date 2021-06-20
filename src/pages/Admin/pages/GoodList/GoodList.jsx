import React, { Component } from 'react'
import { Card, Avatar, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import store from '../../../../utils/storageUtils.js'
import changeDateFormat from '../../../../utils/dateUtils.js'
import { deleteNewBadge, requireGB } from '../../../../api/index.js'
import './GoodList.css'
export default class GoodList extends Component {
    state = {
        goodList: []
    }

    getgood = async () => {
        const result = await requireGB(store.getUser().nickname, 'good')
        //console.log(result)
        if (result.err_code === 0) {
            this.setState({ goodList: result.result }, () => {
                this.deletebadge();
            })
        }
    }

    deletebadge = async () => {
        await deleteNewBadge(store.getUser().nickname, 'good')
        // console.log(result)
    }
    componentDidMount() {
        this.getgood()
    }
    render() {
        const { goodList } = this.state
        return (
            <Card headStyle={{ color: 'orange', fontSize: "17px" }} title="点赞管理" hoverable className="card" >
                <ul className="comment-box-bd li clearfix">
                    {
                        (goodList === undefined || goodList.length === 0) ? <div className="empty-blog"><Empty description="暂无" /></div> :
                            goodList.map((goodObj) => {
                                return (
                                    <li key={`${goodObj._id}`} onClick={() => { this.props.history.push(`/viewblog/${goodObj.gbcedartId}`) }}>
                                        <div className="comment-box-bd-tname">
                                            <div>
                                                <Avatar icon={<UserOutlined />} src={goodObj.readeravatar} />
                                                <span style={{ marginLeft: '5px' }}>
                                                    {goodObj.readername}&nbsp;赞了你的文章：{goodObj.gbcedartname}
                                                </span>
                                            </div>
                                            {goodObj.haveread_good === 0 ? <span className="collect-new">new</span> : ''}
                                        </div>
                                        <div style={{ height: '40px' }}>
                                            <div className="comment-box-bd-time">
                                                点赞时间：{changeDateFormat(goodObj.gooddate)}
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                    }
                </ul>
            </Card>
        )
    }
}
