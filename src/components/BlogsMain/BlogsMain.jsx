import React, { Component, Fragment } from 'react'
import BlogsTypeSelect from '../BlogsTypeSelect/BlogsTypeSelect.jsx'
import articletypelist from '../../config/articleTypeConfig.js'
import { getThreeGoodArt } from '../../api/index.js'
import './BlogsMain.css'
export default class BlogsMain extends Component {
    state = {
        threeGoodBlogByType: [],
        spinning: true
    }
    getThreearticle = async () => {
        const result = await getThreeGoodArt();
        if (result.err_code === 0) {
            const goodblogList = result.result;
            //console.log(goodblogList[0])
            this.setState({
                threeGoodBlogByType: goodblogList,
                spinning: false
            })
        }
    }
    componentDidMount() {
        this.getThreearticle();
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { spinning, threeGoodBlogByType } = this.state
        return (
            <Fragment>
                {
                    articletypelist.map((typeObj, index) => {
                        return <BlogsTypeSelect key={index} path={typeObj.path} href={typeObj.href} spinning={spinning} type={typeObj.type} neededBlog={threeGoodBlogByType[index]} />
                    })
                }
            </Fragment>
        )
    }
}
