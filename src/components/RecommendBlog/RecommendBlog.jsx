import React, { Component } from 'react'
import { getRecommendedArt } from '../../api/index.js'
import { withRouter } from 'react-router-dom'
// import store from '../../utils/storageUtils.js'
import { Spin } from 'antd';
import { ThunderboltTwoTone, SyncOutlined, EyeTwoTone, LikeTwoTone, LoadingOutlined } from '@ant-design/icons';
import './RecommendBlog.css'


class RecommendBlog extends Component {
    state = {
        change_spinning: false,
        loading_blog: true,
        recommendBlogList: []
    }

    changeOtherBlog = () => {
        const { recommendBlogList } = this.state;
        if (recommendBlogList.length > 4) {
            //循环移位
            const recblogsafterROL = recommendBlogList.slice(-4).concat(recommendBlogList.slice(0, -4));//循环移动4位
            this.setState({ recommendBlogList: recblogsafterROL })
            //console.log(recblogsafterROL)
        }
    }

    getRecommendedarticle = async () => {
        const result = await getRecommendedArt();
        if (result.err_code === 0) {
            const recommendedblogList = result.result;
            //console.log(recommendedblogList)
            this.setState({
                recommendBlogList: recommendedblogList,
                loading_blog: false
            })
        }
    }
    componentDidMount() {
        this.getRecommendedarticle();
    }

    render() {
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        const { recommendBlogList } = this.state;
        const showedrecblogs = recommendBlogList.slice(0, 4);
        //console.log(showedrecblogs)
        return (
            <div>
                <div className="homepage-box-hd">
                    <div className="recommend-icon"><ThunderboltTwoTone twoToneColor="orange" /></div>
                    <h3>推荐博客</h3>
                    <div className="changeotherblog" onClick={this.changeOtherBlog} onMouseLeave={() => this.setState({ change_spinning: false })} onMouseOver={() => this.setState({ change_spinning: true })} >
                        <SyncOutlined style={{ marginRight: '2px' }} spin={this.state.change_spinning} />换一批
                    </div>
                </div>
                <div className="homepage-box-bd clearfix">
                    <Spin indicator={antIcon} spinning={this.state.loading_blog}>
                        <ul className="clearfix">
                            {
                                showedrecblogs.map((blogObj) => {
                                    return (
                                        <li key={`${blogObj._id}`} onClick={() => { this.props.history.push(`/viewblog/${blogObj._id}`) }} >
                                            <div className="mask"></div>
                                            <div className="recommend-box-img">
                                                <img src={blogObj.title_img} alt="图片加载失败" />
                                            </div>
                                            <h4>
                                                {blogObj.title_name}
                                            </h4>
                                            <div className="homepage-box-info">
                                                <div><EyeTwoTone twoToneColor="orange" style={{ marginRight: '2px' }} /><span>{blogObj.read_num}</span>阅读</div>
                                                <div><LikeTwoTone twoToneColor="orange" style={{ marginRight: '2px' }} /><span>{blogObj.good_num}</span>点赞</div>
                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </Spin>
                </div>
            </div>
        )
    }
}
export default withRouter(RecommendBlog)