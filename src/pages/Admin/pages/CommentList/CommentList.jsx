import React, { Component } from 'react'
import { Card, Avatar, Empty, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { deleteNewBadge, requireComment, deleteComment } from '../../../../api/index.js'
import store from '../../../../utils/storageUtils.js'
import changeDateFormat from '../../../../utils/dateUtils.js'
import './CommentList.css'
export default class CommentList extends Component {
    state = {
        commentList: []
    }
    deletebadge = async () => {
        await deleteNewBadge(store.getUser().nickname, 'comment')
        // console.log(result)
    }
    getcomment = async () => {
        const result = await requireComment(store.getUser().nickname)
        //console.log(result)
        if (result.err_code === 0) {
            this.setState({ commentList: result.result }, () => {
                this.deletebadge();
            })
        }
    }
    deletecomment = async (id) => {
        let hide = message.loading('正在删除该评论，请稍等', 0);
        const result = await deleteComment(id)
        // console.log(result)
        if (result.err_code === 0) {
            hide();
            message.success("评论删除成功", 1)
            const commentList = [...this.state.commentList]
            let commentList2 = commentList.filter((commentObj) => {
                return commentObj._id !== id
            })
            this.setState({ commentList: commentList2 })
        }
        else {
            hide();
            message.error("评论删除失败", 1)
        }
    }


    componentDidMount() {
        this.getcomment();
    }
    render() {
        const { commentList } = this.state
        return (
            <Card headStyle={{ color: 'orange', fontSize: "17px" }} title="评论管理" className="card" >
                <ul className="comment-box-bd li clearfix">
                    {
                        (commentList === undefined || commentList.length === 0) ? <div className="empty-blog"><Empty description="暂无" /></div> :
                            commentList.map((commentObj) => {
                                return (
                                    <li key={`${commentObj._id}`}>
                                        <div className="comment-box-bd-tname">
                                            <div>
                                                <Avatar icon={<UserOutlined />} src={commentObj.commenteravatar} />
                                                <span style={{ marginLeft: '5px' }}>
                                                    {commentObj.commentername}&nbsp;评论了你的文章：{commentObj.commentedartname}
                                                </span>
                                            </div>
                                            {commentObj.have_read === 0 ? <span className="collect-new">new</span> : ''}
                                        </div>
                                        <div >
                                            <span className="comment-box-bd-content"> 评论内容：{commentObj.content}</span>
                                            <div onClick={() => this.deletecomment(commentObj._id)} className="comment-box-bd-delete">
                                                删除评论
                                            </div>
                                            <div onClick={() => { this.props.history.push(`/viewblog/${commentObj.commentedartId}`) }} className="comment-box-bd-delete">
                                                查看博客
                                            </div>
                                            <div className="comment-box-bd-time">
                                                评论时间：{changeDateFormat(commentObj.createdAt)}
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
