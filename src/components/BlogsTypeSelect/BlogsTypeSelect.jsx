import React, { Component } from 'react'
import { Spin, Avatar, Empty } from 'antd';
import { withRouter } from 'react-router-dom'
import { UnorderedListOutlined, EyeTwoTone, LikeTwoTone, LoadingOutlined, UserOutlined, MessageTwoTone } from '@ant-design/icons';

import './BlogsTypeSelect.css'

class BlogsTypeSelect extends Component {

    gotoView = (path) => {
        //console.log(type)
        this.props.history.push(`/search/${path}/0`)
    }
    render() {
        const { type, neededBlog, spinning, href, path } = this.props
        // console.log(neededBlog)
        const antIcon2 = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        return (
            <div id={href}>
                <div className="blogtype-box-hd ">
                    <div className="blogtype-box-hd-icon"><UnorderedListOutlined /></div>
                    <h3>{type}</h3>
                </div>
                <div className="blogtype-box-bd clearfix">
                    <Spin indicator={antIcon2} spinning={spinning}>
                        <ul className="clearfix">
                            {
                                (neededBlog === undefined || neededBlog.length === 0) ? <div className="empty-blog"><Empty description="该模块暂无博客发布" /></div> :
                                    neededBlog.map((blogObj) => {
                                        return (
                                            <li key={`${blogObj._id}`} onClick={() => { this.props.history.push(`/viewblog/${blogObj._id}`) }}>
                                                <div className="blogtype-box-bd-tname">
                                                    <div>{blogObj.title_name}</div>
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
                                        )
                                    })
                            }
                        </ul>
                    </Spin>
                </div>
                <div onClick={() => this.gotoView(path)} className="blogtype-box-foot">
                    <div>查看全部&nbsp;&gt;</div>
                </div>
            </div>
        )
    }
}
export default withRouter(BlogsTypeSelect)