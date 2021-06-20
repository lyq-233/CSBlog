import React, { Component } from 'react'
import { Empty, Tag } from 'antd';
import { EyeTwoTone, LikeTwoTone, MessageTwoTone } from '@ant-design/icons';
import articleTypeConfig from '../../config/articleTypeConfig.js'
import HomepageHeader from '../../components/HomepageHeader/HomepageHeader.jsx'
import { getBlogByType, getBlogBySearch } from '../../api/index.js'
import HomepageFooter from '../../components/HomepageFooter/HomepageFooter.jsx'
import changeDateFormat from '../../utils/dateUtils.js'
import './SearchResult.css'

export default class SearchResult extends Component {
    state = {
        search_content: '',
        searched_blogs: []
    }

    //从路由里取出参数用来搜索博客
    getTypefromPath = () => {
        if (this.props.match.params.flag === '0') {
            for (let i in articleTypeConfig) {
                if (articleTypeConfig[i].path === this.props.match.params.path) {
                    return articleTypeConfig[i].type
                }
            }
        } else if (this.props.match.params.flag === '1') {
            return decodeURI(decodeURI(this.props.match.params.path))
        }
    }
    //搜索博客
    getblogs = async () => {
        if (this.props.match.params.flag === '0') {
            const result = await getBlogByType(this.state.search_content)
            // console.log(result)
            if (result.err_code === 0) {
                this.setState({ searched_blogs: result.result })
            }
        } else if (this.props.match.params.flag === '1') {
            const result = await getBlogBySearch(this.state.search_content)
            //console.log(result)
            if (result.err_code === 0) {
                this.setState({ searched_blogs: result.result })
            }
        }
    }

    componentDidMount() {
        this.setState({ search_content: this.getTypefromPath() }, () => {
            this.getblogs()
        });
    }


    componentWillUnmount() {

    }

    render() {
        const { search_content, searched_blogs } = this.state
        return (
            <div style={{ backgroundColor: 'rgb(246, 246, 246)', minHeight: '100%' }}>
                <HomepageHeader />
                <div className="search-result-header"><span style={{ color: 'black', fontWeight: '500' }}>搜索结果&gt;&gt;</span>{search_content}</div>
                <ul className="search-result-body">
                    {
                        (searched_blogs === undefined || searched_blogs.length === 0) ?
                            <div className="empty-blog"><Empty imageStyle={{ paddingTop: '40px' }} description="未查询到相关内容哦" /></div> :
                            searched_blogs.map((blogObj, index) => {
                                return (
                                    <li onClick={() => this.props.history.push(`/viewblog/${blogObj._id}`)} key={index}>
                                        <h3 dangerouslySetInnerHTML={{ __html: blogObj.title_name }}></h3>
                                        <div className="search-result-body-info">
                                            <div><EyeTwoTone twoToneColor="orange" style={{ marginRight: '2px' }} /><span>{blogObj.read_num}</span>阅读</div>
                                            <div><LikeTwoTone twoToneColor="orange" style={{ marginRight: '2px' }} /><span>{blogObj.good_num}</span>点赞</div>
                                            <div><MessageTwoTone twoToneColor="orange" style={{ marginRight: '2px' }} /><span>{blogObj.comment_num}</span>评论</div>
                                        </div>
                                        <div className="search-result-body-time" style={{ color: 'grey ' }} >发布于: {changeDateFormat(blogObj.createdAt)}</div>
                                        <div className="search-result-body-tag" >{
                                            blogObj.keyword === undefined ? " " :
                                                (blogObj.keyword.trim().split(/\s+/).map((key, index) => {
                                                    return <Tag style={{ marginLeft: ' 3px' }} key={index} color="volcano">{`#${key}`}</Tag>
                                                }))
                                        }</div>
                                    </li>
                                )
                            })
                    }
                </ul>
                <HomepageFooter />
            </div>
        )
    }
}
