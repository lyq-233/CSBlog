import React, { Component } from 'react'
import { Card, Avatar } from 'antd';
import { EyeTwoTone, LikeTwoTone, UserOutlined, MessageTwoTone } from '@ant-design/icons';
import store from '../../../../utils/storageUtils.js'
import { getCollect } from '../../../../api/index.js'
import './MyCollect.css'

export default class MyCollect extends Component {
    state = { collectblogs: [], spinning: true }
    getcollect = async () => {
        const result = await getCollect(store.getUser().nickname)
        //console.log(result)
        if (result.err_code === 0) {
            this.setState({ collectblogs: result.result, spinning: false })
        }
    }
    componentDidMount() {
        this.getcollect()
    }

    render() {
        const { collectblogs, spinning } = this.state
        return (
            <Card loading={spinning} headStyle={{ color: 'orange', fontSize: "17px" }} title="我的收藏" hoverable className="collect-card" >
                <div className="blogtype-box-bd clearfix">
                    <ul className="clearfix">
                        {
                            collectblogs.map((blogObj, index) => {
                                return blogObj ? (
                                    <li key={`${blogObj._id}`} onClick={() => { this.props.history.push(`/viewblog/${blogObj._id}`) }}>
                                        <div className="blogtype-box-bd-tname">
                                            <span>{blogObj.title_name}</span>
                                            {index === 0 ? <span className="collect-new">newest</span> : ''}
                                        </div>
                                        <div className="blogtype-box-bd-content">
                                            <div className="blogtype-box-bd-avatar">
                                                <Avatar icon={<UserOutlined />} src={blogObj.avatar} /><span style={{ marginLeft: '5px' }}>{blogObj.author}</span>
                                            </div>
                                            <div className="blogtype-box-bd-info">
                                                <div><EyeTwoTone twoToneColor="orange" style={{ marginRight: '2px' }} /><span>{blogObj.read_num}</span>阅读</div>
                                                <div><LikeTwoTone twoToneColor="orange" style={{ marginRight: '2px' }} /><span>{blogObj.good_num}</span>点赞</div>
                                                <div><MessageTwoTone twoToneColor="orange" style={{ marginRight: '2px' }} /><span>{blogObj.comment_num}</span>评论</div>
                                            </div>
                                        </div>
                                    </li>
                                ) : ""
                            })
                        }
                    </ul>
                </div>
            </Card>
        )
    }
}
