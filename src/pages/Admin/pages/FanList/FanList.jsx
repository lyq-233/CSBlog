import React, { Component } from 'react'
import { Card, Avatar, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import changeDateFormat from '../../../../utils/dateUtils.js'
import { deleteNewBadge, requireFan } from '../../../../api/index.js'
import store from '../../../../utils/storageUtils.js'
import './FanList.css'
export default class FanList extends Component {
    state = {
        fanList: []
    }

    getfan = async () => {
        const result = await requireFan(store.getUser().nickname)
        //console.log(result)
        if (result.err_code === 0) {
            this.setState({ fanList: result.result }, () => {
                this.deletebadge();
            })
        }
    }

    deletebadge = async () => {
        await deleteNewBadge(store.getUser().nickname, 'fan')
        //console.log(result)
    }

    componentDidMount() {
        this.getfan()
    }
    render() {
        const { fanList } = this.state
        return (
            <Card headStyle={{ color: 'orange', fontSize: "17px" }} title="关注管理" hoverable className="card" >
                <ul className="comment-box-bd li clearfix">
                    {
                        (fanList === undefined || fanList.length === 0) ? <div className="empty-blog"><Empty description="暂无" /></div> :
                            fanList.map((fanObj) => {
                                return (
                                    <li key={`${fanObj._id}`}>
                                        <div className="comment-box-bd-tname">
                                            <div>
                                                <Avatar icon={<UserOutlined />} src={fanObj.fanavatar} />
                                                <span style={{ marginLeft: '5px' }}>
                                                    {fanObj.fanname}&nbsp;关注了你
                                                </span>
                                            </div>
                                            {fanObj.have_read === 0 ? <span className="collect-new">new</span> : ''}
                                        </div>
                                        <div style={{ height: '40px' }}>
                                            <div className="comment-box-bd-time">
                                                关注时间：{changeDateFormat(fanObj.createdAt)}
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
