import React, { Component } from 'react'
import { Form, Avatar, Button, Tooltip, AutoComplete, Badge } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom'
import store from '../../utils/storageUtils.js'
import { getNewBadge } from '../../api/index.js'
import ShowSquare from '../../components/ShowSquare/ShowSquare.jsx'
import './HomepageHeader.css'


class HomepageHeader extends Component {
    state = {
        show: 'none',
        badgeshow: 'none',
        badge_count: {}
    }
    searchRef = React.createRef();
    //跳转至请求博客页面
    reqBog = () => {
        const { search } = this.searchRef.current.getFieldsValue()
        //console.log(search)
        this.props.history.push(`/search/${encodeURI(encodeURI(search))}/1`)  //1参数代表传来的是搜索内容而不是类型
        this.props.history.go(0) //刷新页面显示
    }
    reqBog1 = (e) => {
        if (e.keyCode && e.keyCode === 13) {
            this.reqBog();
        }
    }
    showSquare = () => {
        this.setState({ show: 'block' })
    }
    hideSquare = () => {
        this.setState({ show: 'none' })
    }
    //获取徽标数
    getnewBadge = async () => {
        const result = await getNewBadge(store.getUser().nickname)
        //console.log(result)
        if (result.err_code === 0) {
            this.setState({ badge_count: result.result })
        }
    }
    clickBadge = (path) => {
        this.props.history.push(path)
    }
    componentDidMount() {
        this.getnewBadge()
    }
    render() {
        const { badge_count, badgeshow } = this.state
        let flag = store.getUser().username
        return (
            <div id="mainpage-top" className="home-header">
                <div className="item">
                    <Link to='/homepage' ><span className="home-biaoti">CSBlog</span></Link>
                    <div className="home-nav">
                        <ul>
                            <li onClick={() => this.props.history.push('/homepage')} ><span>首页</span></li>
                            <Link to='/admin' ><li style={{ color: 'black' }}>个人主页</li></Link>
                        </ul>
                    </div>
                </div>
                <div className="item">
                    <div className="home-search">
                        <Form ref={this.searchRef} name="search-form" >
                            <Form.Item
                                name="search"
                                rules={[
                                    {
                                        type: 'string'
                                    }
                                ]}
                            >
                                <AutoComplete placeholder='请输入您要搜索的内容' onKeyDown={(e) => this.reqBog1(e)} />
                            </Form.Item>
                        </Form>
                    </div>
                    <Tooltip title="search" className="search-button">
                        <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={() => this.reqBog()} />
                    </Tooltip>
                </div>

                <div className="item">
                    <div className="home-nav">
                        <ul>
                            <Link to='/admin/mycollect' ><li><span>我的收藏</span></li></Link>
                            <Link to='/admin/luru/input' ><li style={{ color: 'black' }}>创作</li></Link>
                            <li onMouseOver={() => this.setState({ badgeshow: 'block' })} onMouseLeave={() => this.setState({ badgeshow: 'none' })} style={{ width: '80px' }}>
                                <span>消息&nbsp;</span>
                                {badge_count.total === 0 || badge_count.total === undefined ? '' : <Badge style={{ backgroundColor: 'orange' }} dot />}
                                <div className="badge-show" style={{ display: badgeshow }}>
                                    <h3 onClick={() => this.clickBadge('/admin/good')} >点赞&emsp;<Badge overflowCount={99} className="site-badge-count" size="small" count={badge_count.good} /></h3>
                                    <h3 onClick={() => this.clickBadge('/admin/bad')} >被踩&emsp;<Badge overflowCount={99} className="site-badge-count" size="small" count={badge_count.bad} /></h3>
                                    <h3 onClick={() => this.clickBadge('/admin/fan')} >粉丝&emsp;<Badge overflowCount={99} className="site-badge-count" size="small" count={badge_count.fan} /></h3>
                                    <h3 onClick={() => this.clickBadge('/admin/comment')} >评论&emsp;<Badge overflowCount={99} className="site-badge-count" size="small" count={badge_count.comment} /></h3>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div onMouseOver={this.showSquare} onMouseOut={this.hideSquare} className="avatar2">
                        <div style={{ display: 'flex', marginLeft: '51px' }}>
                            <Avatar style={{ marginTop: '10px' }} icon={<UserOutlined />} onClick={() => this.props.history.push('/admin/home')} src={store.getUser().avatar} />
                        </div>

                        <div style={{ display: this.state.show }}>
                            {flag ? <ShowSquare /> : ''}
                        </div>
                    </div>

                </div>
            </div >
        )
    }
}
export default withRouter(HomepageHeader)