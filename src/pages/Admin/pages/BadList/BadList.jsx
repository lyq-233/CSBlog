import React, { Component } from 'react'
import { Card, Avatar, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import changeDateFormat from '../../../../utils/dateUtils.js'
import { deleteNewBadge, requireGB } from '../../../../api/index.js'
import store from '../../../../utils/storageUtils.js'
import './BadList.css'
export default class BadList extends Component {

    state = {
        badList: []
    }

    getbad = async () => {
        const result = await requireGB(store.getUser().nickname, 'bad')
        //console.log(result)
        if (result.err_code === 0) {
            this.setState({ badList: result.result }, () => {
                this.deletebadge();
            })
        }
    }

    deletebadge = async () => {
        await deleteNewBadge(store.getUser().nickname, 'bad')
        //console.log(result)
    }
    componentDidMount() {
        this.getbad()
    }
    render() {
        const { badList } = this.state
        return (
            <Card headStyle={{ color: 'orange', fontSize: "17px" }} title="点踩管理" hoverable className="card" >
                <ul className="comment-box-bd li clearfix">
                    {
                        (badList === undefined || badList.length === 0) ? <div className="empty-blog"><Empty description="暂无" /></div> :
                            badList.map((badObj) => {
                                return (
                                    <li key={`${badObj._id}`} onClick={() => { this.props.history.push(`/viewblog/${badObj.gbcedartId}`) }}>
                                        <div className="comment-box-bd-tname">
                                            <div>
                                                <Avatar icon={<UserOutlined />} src={badObj.readeravatar} />
                                                <span style={{ marginLeft: '5px' }}>
                                                    {badObj.readername}&nbsp;踩了你的文章：{badObj.gbcedartname}
                                                </span>
                                            </div>
                                            {badObj.haveread_bad === 0 ? <span className="collect-new">new</span> : ''}
                                        </div>
                                        <div style={{ height: '40px' }}>
                                            <div className="comment-box-bd-time">
                                                点踩时间：{changeDateFormat(badObj.baddate)}
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
