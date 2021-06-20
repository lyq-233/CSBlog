import React, { Component } from 'react'
import { Card, Button, Table, message } from 'antd';
import { getArt, changeLine, deleteArt } from '../../../../api/index.js'
import store from '../../../../utils/storageUtils.js'
import changeDateFormat from '../../../../utils/dateUtils.js'

import {
    PlusOutlined
} from '@ant-design/icons';

import './ArticleList.css'
//用于深拷贝对象数组
const _ = require('lodash');

let articlelist = [];
export default class ArticleList extends Component {

    state = {
        loading: true,
        articleList: []
    }
    jumpToLuru = () => {
        this.props.history.push('/admin/luru/input')
    }
    jumpToEdit = (article) => {
        let seletedId = article._id
        const catchArticle = articlelist.find((articleObj) => {
            if (articleObj._id === seletedId) {
                return true
            }
            return false
        })
        store.saveArticle(catchArticle)
        this.props.history.push('/admin/luru/edit')
    }
    checkStatus(article) {
        if (article.status === '线上') {
            return '下线'
        } else {
            return '上线'
        }
    }
    changeArticleStatus = async (article) => {
        let result = {}
        let hide
        if (article.status === '线上') {
            hide = message.loading('正在下线博客，请稍等', 0);
            result = await changeLine(article._id, 1)

        } else {
            hide = message.loading('正在上线博客，请稍等', 0);
            result = await changeLine(article._id, 0)
        }
        if (result) {
            //   console.log(result)
            hide();
            if (result.err_code === 0) {
                message.success("博客状态修改成功", 1)
                // 深拷贝获取对象列表并修改再赋值，才会引起更新
                const articleList = [...this.state.articleList]
                for (let i = 0; i < articleList.length; i++) {
                    if (articleList[i]._id === article._id) {
                        articleList[i] = { ...article, status: (article.status === '线上' ? '线下' : '线上') }
                        this.setState({ articleList: articleList })
                    }
                }

            } else {
                message.error("修改失败", 1)
            }
        }
    }

    deleteArticle = async (article) => {
        let hide = message.loading('正在删除博客，请稍等', 0);
        let result = await deleteArt(article._id)
        //console.log(result)
        if (result) {
            hide();
            if (result.err_code === 0) {
                message.success("博客删除成功", 1)
                // 深拷贝获取对象列表并修改再赋值，才会引起更新
                const articleList = [...this.state.articleList]
                let articleList2 = articleList.filter((articleObj) => {
                    return articleObj._id !== article._id
                })
                this.setState({ articleList: articleList2 })

            } else {
                message.error("博客删除失败", 1)
            }
        }
    }

    initColumns = () => {

        this.columns = [
            {
                title: '标题',
                dataIndex: 'title_name',
                ellipsis: true,
                width: 180,
                defaultSortOrder: 'descend',
                align: 'center',
            },
            {
                title: '类型',
                width: 100,
                dataIndex: 'type',
                align: 'center',
            },
            {
                title: '发布日期',
                dataIndex: 'createdAt',
                width: 200,
                align: 'center',
                sorter: (a, b) => (+new Date(a.createdAt)) - (+new Date(b.createdAt)),
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: '状态',
                width: 80,
                dataIndex: 'status',
                align: 'center',
            },
            {
                title: '阅读量',
                dataIndex: 'read_num',
                align: 'center',
                width: 100,
                sorter: (a, b) => a.read_num - b.read_num,
                sortDirections: ['descend'],
            },
            {
                title: '评论量',
                dataIndex: 'comment_num',
                align: 'center',
                width: 100,
                sorter: (a, b) => a.comment_num - b.comment_num,
                sortDirections: ['descend'],
            },
            {
                title: '点赞量',
                dataIndex: 'good_num',
                align: 'center',
                width: 100,
                sorter: (a, b) => a.good_num - b.good_num,
                sortDirections: ['descend'],
            },
            {
                title: '被踩量',
                dataIndex: 'bad_num',
                align: 'center',
                width: 100,
                sorter: (a, b) => a.bad_num - b.bad_num,
                sortDirections: ['descend'],
            },
            {
                title: '关键字',
                dataIndex: 'keyword',
                ellipsis: true,
                width: 160,
                defaultSortOrder: 'descend',
                align: 'center',
            },
            {
                title: '操作',
                key: 'operation',
                width: 130,
                align: 'center',
                render: (article) => {
                    return (
                        <span>
                            <span className="bianji" onClick={() => { this.jumpToEdit(article) }}>编辑</span>&nbsp;
                            <span className="bianji" onClick={() => { this.changeArticleStatus(article) }} >{this.checkStatus(article)}</span>&nbsp;
                            <span className="bianji" onClick={() => { this.deleteArticle(article) }} >删除</span>
                        </span>
                    )
                }
            },
        ];
    }
    getAllArticle = async () => {
        const nickname = store.getUser().nickname
        const result = await getArt(nickname)
        //console.log(result)
        articlelist = result.result
        if (result) {
            let myarticle = _.cloneDeep(result.result);

            //更改状态和日期格式
            for (let i = 0; i < myarticle.length; i++) {
                myarticle[i].status = myarticle[i].status === 0 ? '线下' : '线上'
                myarticle[i].createdAt = changeDateFormat(myarticle[i].createdAt)
            }
            // 一定在async函数里setState，因为异步函数总是最后调用的
            this.setState({ articleList: myarticle, loading: false })
        }
    }

    componentDidMount() {
        this.initColumns()
        //请求我的博客
        this.getAllArticle()
    }
    componentWillUnmount() {
        this.setState = () => false;
    }

    render() {
        const extra = (
            <Button type="primary" style={{ borderRadius: '5px' }} onClick={this.jumpToLuru}>
                <PlusOutlined /> 录入
            </Button>)

        return (
            <Card headStyle={{ color: 'orange', fontSize: "17px" }} title="博客管理" extra={extra} className="card" >
                <Table className="article-table"
                    bordered
                    columns={this.columns}
                    loading={this.state.loading}
                    rowKey="_id"
                    dataSource={this.state.articleList}
                    pagination={{ disabled: false, defaultPageSize: 6, responsive: true, showQuickJumper: true }}
                />
            </Card>
        )
    }

}
