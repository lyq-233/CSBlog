import React, { Component } from 'react'
import { Avatar, Button, Tag } from 'antd';
import { UserOutlined, PlusOutlined, EyeTwoTone, LikeTwoTone, DislikeTwoTone, StarTwoTone } from '@ant-design/icons';
import HomepageHeader from '../../components/HomepageHeader/HomepageHeader.jsx'
import CommentList from '../../components/CommentList/CommentList.jsx'
import { getArtById, getArtByAuthor, changeConcern, getConcern, changeGBC, getGBC, changeRead } from '../../api/index.js'
import store from '../../utils/storageUtils.js'
import changeDateFormat from '../../utils/dateUtils.js'
import PubSub from 'pubsub-js'
import './ViewBlog.css'

export default class ViewBlog extends Component {

    state = {
        concerned: 0,
        viewedblog: {},
        userinfo: {},
        authorblogs: [],
        canconcern: true,
        cangood: true,
        canbad: true,
        cancollect: true,
        good: 0,
        bad: 0,
        collect: 0
    }
    createMarkup = () => {
        return { __html: this.state.viewedblog.content };
    }
    getViewedArticle = async (id) => {
        const result = await getArtById(id);
        //console.log(result)
        if (result.err_code === 0) {
            const viewedblog = result.result[0]
            //给评论组件传文章ID供 评论组件获取相应评论
            PubSub.publish('CID', viewedblog._id)
            const userinfo = result.result[1]
            viewedblog.createdAt = changeDateFormat(viewedblog.createdAt)
            this.setState({
                viewedblog: viewedblog,
                userinfo: userinfo,
            }, async () => {
                const result2 = await getArtByAuthor(this.state.userinfo.nickname);
                //console.log(viewedblog.updatedAt)
                if (result2.err_code === 0) {
                    const authorblogs = result2.result
                    this.setState({
                        authorblogs
                    }, () => {
                        this.checkConcern();
                        this.getgbc();
                    })
                }
            })
        }
    }
    checkConcern = async () => {
        const result = await getConcern(store.getUser().nickname, this.state.userinfo.nickname)
        //console.log(result)
        if (result.err_code === 0 && result.result === 1) {
            this.setState({ concerned: 1 })
        } else if (result.err_code === 0 && result.result === 0) {
            this.setState({ concerned: 0 })
        }
    }
    getgbc = async () => {
        const result = await getGBC(store.getUser().nickname, this.state.viewedblog._id)
        //console.log(result)
        if (result.err_code === 0) {
            const { good, bad, collect } = result.result
            this.setState({ good, bad, collect })
        }
    }
    changeconcern = async () => {
        let { concerned, userinfo } = this.state;
        const { nickname, username } = store.getUser();
        this.setState({ canconcern: false })
        const result = await changeConcern(concerned, nickname, username, this.state.userinfo.nickname, this.state.userinfo.username);
        //console.log(result)
        if (result.err_code === 0) {
            if (concerned === 0) {
                concerned = 1;
                userinfo.fans += 1
            } else if (concerned === 1) {
                concerned = 0;
                userinfo.fans -= 1
            }
            this.setState({ concerned, userinfo, canconcern: true })
        }
    }
    changeGood = async () => {
        let d = new Date()
        let { good, viewedblog, userinfo } = this.state;
        const { nickname } = store.getUser();
        this.setState({ cangood: false })
        const result = await changeGBC(good, nickname, viewedblog._id, this.state.userinfo.nickname, d, 'good');
        if (result.err_code === 0) {
            if (good === 0) {
                good = 1;
                viewedblog.good_num += 1;
                userinfo.goods += 1
            } else if (good === 1) {
                good = 0;
                viewedblog.good_num -= 1
                userinfo.goods -= 1
            }
            this.setState({ good, viewedblog, userinfo, cangood: true })
        }
    }
    changeBad = async () => {
        let d = new Date()
        let { bad, viewedblog, userinfo } = this.state;
        const { nickname } = store.getUser();
        this.setState({ canbad: false })
        const result = await changeGBC(bad, nickname, viewedblog._id, this.state.userinfo.nickname, d, 'bad');
        if (result.err_code === 0) {
            if (bad === 0) {
                bad = 1;
                viewedblog.bad_num += 1;
                userinfo.bads += 1
            } else if (bad === 1) {
                bad = 0;
                viewedblog.bad_num -= 1;
                userinfo.bads -= 1
            }
            this.setState({ bad, viewedblog, userinfo, canbad: true })
        }
    }
    changeCollect = async () => {
        let d = new Date()
        let { collect, viewedblog } = this.state;
        const { nickname } = store.getUser();
        this.setState({ cancollect: false })
        const result = await changeGBC(collect, nickname, viewedblog._id, this.state.userinfo.nickname, d, 'collect');
        // console.log(result)
        if (result.err_code === 0) {
            collect === 0 ? collect = 1 : collect = 0
            this.setState({ collect, cancollect: true })
        }
    }
    addcomments = async () => {
        const { userinfo } = this.state
        userinfo.comments += 1
        this.setState({ userinfo })
    }
    changeread = async () => {
        const { userinfo, viewedblog } = this.state
        const result = await changeRead(store.getUser().nickname, viewedblog._id, viewedblog.nickname)
        //console.log(result)
        if (result.err_code === 0) {
            userinfo.reads += 1
            this.setState({ userinfo })
        }
    }
    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        this.getViewedArticle(this.props.match.params.id);
        //设置一个定时器，在30秒后增加一次阅读量
        this.readtimer = setTimeout(async () => { this.changeread() }, 30000)
    }
    componentWillUnmount() {
        clearTimeout(this.readtimer);
    }
    render() {
        const { viewedblog, userinfo, authorblogs, good, bad, collect, canconcern, cangood, canbad, cancollect } = this.state
        return (
            < div className="viewedblog-bgc" >
                <HomepageHeader />
                <div style={{ marginTop: '8px' }}>
                    <div className="viewblog-left">
                        <div className="viewblog-left-authorinfo">
                            <div className="viewblog-left-authorinfo-avatar">
                                <Avatar icon={<UserOutlined />} src={viewedblog.avatar} />
                                <span style={{ marginLeft: '10px' }}>{viewedblog.author}</span>
                            </div>
                            <div className="viewblog-left-authorinfo-num">
                                <div className="viewblog-left-authorinfo-num-block"><div style={{ height: '35px' }}>{userinfo.blogs}</div><div>原创</div></div>
                                <div className="viewblog-left-authorinfo-num-block"><div style={{ height: '35px' }}>{userinfo.fans}</div><div>粉丝</div></div>
                                <div className="viewblog-left-authorinfo-num-block"><div style={{ height: '35px' }}>{userinfo.goods}</div><div>点赞</div></div>
                                <div className="viewblog-left-authorinfo-num-block"><div style={{ height: '35px' }}>{userinfo.comments}</div><div>评论</div></div>
                                <div className="viewblog-left-authorinfo-num-block"><div style={{ height: '35px' }}>{userinfo.reads}</div><div>阅读</div></div>
                            </div>
                            <div style={{ marginLeft: '10px', marginTop: '15px' }}>
                                <Button style={{ textAlign: 'center', verticalAlign: 'middle' }} onClick={
                                    canconcern ? this.changeconcern : () => { }
                                } type="primary" shape="round" icon={this.state.concerned === 1 ? '' : <PlusOutlined />} size='middle'>
                                    {this.state.concerned === 1 ? '已关注' : '关注'}
                                </Button>
                            </div>
                        </div>
                        <div className="viewblog-left-authorblog">
                            <div className="viewblog-left-authorblog-header">
                                作者发表过的博客
                            </div>
                            {
                                authorblogs.length === 0 ? <div></div> :
                                    authorblogs.map((blogObj) => {
                                        return (
                                            <div onClick={() => { this.props.history.push(`/viewblog/${blogObj._id}`); this.props.history.go(0) }} className="viewblog-left-authorblog-block clearfix" key={blogObj._id}>
                                                <h3>{blogObj.title_name}</h3>
                                                <div style={{ color: 'grey' }}><EyeTwoTone twoToneColor='orange' /><span>{blogObj.read_num}</span>阅读</div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </div>
                    <div className="viewblog-right">
                        <div>
                            <h1 className="viewblog-right-title">
                                {viewedblog.title_name}
                            </h1>
                            <div className="viewblog-right-tag">
                                <div className="viewblog-right-tag-type" >分类: <Tag color="volcano">{viewedblog.type}</Tag></div>
                                <div className="viewblog-right-tag-tag" >关键字:{
                                    viewedblog.keyword === undefined ? " " :
                                        (viewedblog.keyword.trim().split(/\s+/).map((key, index) => {
                                            return <Tag style={{ marginLeft: ' 3px' }} key={index} color="lime">{`#${key}`}</Tag>
                                        }))
                                }</div>
                                <div className="viewblog-right-tag-time" >发布于: {viewedblog.createdAt}</div>
                            </div>
                            <div className="viewblog-right-blogcontent">
                                <div dangerouslySetInnerHTML={this.createMarkup()}></div>;
                            </div>
                            <div className="viewblog-right-goodarea">
                                <h1 onClick={cangood ? this.changeGood : () => { }}>
                                    <LikeTwoTone twoToneColor={good === 0 ? "grey" : "orange"} /><span>{good === 0 ? "点赞" : "已赞"}&nbsp;{viewedblog.good_num}</span>
                                </h1>
                                <h1 onClick={canbad ? this.changeBad : () => { }}>
                                    <DislikeTwoTone twoToneColor={bad === 0 ? "grey" : "orange"} /><span>{bad === 0 ? "点踩" : "已踩"}&nbsp;{viewedblog.bad_num}</span>
                                </h1>
                                <h1 onClick={cancollect ? this.changeCollect : () => { }}>
                                    <StarTwoTone twoToneColor={collect === 0 ? "grey" : "orange"} /><span>{collect === 0 ? "收藏" : "已收藏"}</span>
                                </h1>
                            </div>
                            <div className="viewblog-right-commentarea clearfix">
                                <div>
                                    <CommentList addcomments={this.addcomments} commentee={viewedblog.nickname} commenteename={viewedblog.author} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ div>
        )
    }
}
