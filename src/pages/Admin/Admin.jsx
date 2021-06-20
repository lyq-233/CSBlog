import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import store from '../../utils/storageUtils.js'
import { Layout } from 'antd';
import TopHeader from '../../components/TopHeader/TopHeader.jsx'
import LeftNav from '../../components/LeftNav/LeftNav.jsx'
import ArticleList from './pages/ArticleList/ArticleList.jsx'
import ArticleLuru from './pages/ArticleLuru/ArticleLuru.jsx'
import InfoChange from './pages/InfoChange/InfoChange.jsx'
import MyCollect from './pages/MyCollect/MyCollect.jsx'
import Home from './pages/Home/Home.jsx'
import GoodList from './pages/GoodList/GoodList.jsx'
import BadList from './pages/BadList/BadList.jsx'
import CommentList from './pages/CommentList/CommentList.jsx'
import FanList from './pages/FanList/FanList.jsx'
import GiveAdvise from './pages/GiveAdvise/GiveAdvise.jsx'

import './Admin.css'

const { Header, Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    componentWillUnmount() {
        store.removeArticle()
    }
    render() {
        const nickname = store.getUser().nickname
        if (nickname) {
            return (
                <Layout style={{ height: '100%' }}>
                    <Header style={{ backgroundColor: 'white' }}><TopHeader /></Header>
                    <Layout>
                        <Sider style={{ backgroundColor: 'white' }}><LeftNav /></Sider>
                        <Content className="content-region">
                            <div className="sanjiaoxing"></div>
                            <Switch>
                                <Route path='/admin/home' component={Home} />
                                <Route path='/admin/list' component={ArticleList} />
                                <Route path='/admin/luru/:ie' component={ArticleLuru} />
                                <Route path='/admin/info' component={InfoChange} />
                                <Route path='/admin/mycollect' component={MyCollect} />
                                <Route path='/admin/good' component={GoodList} />
                                <Route path='/admin/bad' component={BadList} />
                                <Route path='/admin/comment' component={CommentList} />
                                <Route path='/admin/fan' component={FanList} />
                                <Route path='/admin/advise' component={GiveAdvise} />
                                <Redirect to='/admin/home' />
                            </Switch>
                        </Content>
                    </Layout>
                    <Footer style={{ textAlign: 'center', color: 'grey', backgroundColor: 'white' }}>推荐使用Chrome浏览器打开</Footer>
                </Layout>
            )
        }
        return (
            <Redirect to='/login/log' />
        )

    }
}
