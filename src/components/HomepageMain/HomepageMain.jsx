import React, { Component } from 'react'
import RecommendBlog from '../RecommendBlog/RecommendBlog.jsx'
import BlogsMain from '../BlogsMain/BlogsMain.jsx'
import './HomepageMain.css'
export default class HomepageMain extends Component {

    render() {
        return (
            <div className="homepage-main clearfix">
                <RecommendBlog />
                <BlogsMain />
            </div>
        )
    }
}
