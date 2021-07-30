import React, { Component } from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/zh-cn';
import store from '../../utils/storageUtils.js'
import { saveComment, getComment } from '../../api/index.js'
import PubSub from 'pubsub-js'
import './CommentList.css'


const { TextArea } = Input;

const Commentlist = ({ comments }) => (
    <List
        dataSource={comments}
        header={`共 ${comments.length} 条评论`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} style={{ resize: "none" }} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                {store.getUser().nickname ? '评论' : '登录后评论'}
            </Button>
        </Form.Item>
    </>
);

class CommentList extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
    };
    //点击评论按钮的回调
    handleSubmit = async () => {
        const { nickname, username, avatar } = store.getUser()
        if (!nickname) {
            //用户没有登录---点击评论按钮进入登录页
            this.props.history.push('/login')
        }
        const { commentee, commenteename, addcomments } = this.props
        const { value } = this.state
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });
        const result = await saveComment(nickname, username, this.commentedId, commentee, commenteename, value)
        //console.log(result)
        if (result.err_code === 0) {
            addcomments();            //更新作者的评论量显示
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    ...this.state.comments,
                    {
                        author: username,
                        avatar: avatar,
                        content: <p>{value}</p>,
                        datetime: moment().fromNow(),
                    }
                ],
            });
        }
    };
    //输入框内容改变的回调
    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    //获取评论
    getcomment = async (commentedId) => {
        const result = await getComment(commentedId)
        //console.log(result)
        if (result.err_code === 0) {
            let commentlist = result.result
            //console.log(commentlist)
            const comments = commentlist.map((commentObj) => {
                return ({
                    author: commentObj.commentername,
                    avatar: commentObj.commenteravatar,
                    content: <p>{commentObj.content}</p>,
                    datetime: moment(commentObj.createdAt).fromNow()
                })
            })
            // console.log(comments)
            this.setState({ comments })
        }
    }

    componentDidMount() {
        this.token = PubSub.subscribe('CID', (_, data) => {
            this.commentedId = data
            this.getcomment(data)
        });
    }
    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }


    render() {
        // console.log('render---comment')
        const { avatar, username } = store.getUser()
        const { comments, submitting, value } = this.state;

        return (
            < >
                {comments.length > 0 && <Commentlist comments={comments} />}
                <Comment
                    avatar={
                        <Avatar
                            src={avatar}
                            alt={username}
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </>
        );
    }
}
export default withRouter(CommentList)