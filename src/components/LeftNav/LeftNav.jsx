import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig.js' //用于遍历对象数组生成导航栏

const { SubMenu } = Menu;

class LeftNav extends Component {

    //该方法给定一个导航栏对象数组，生成对应的导航栏节点数组
    getMenuNodes = (menuList) => {
        return menuList.map((menuObj) => {
            //一级导航栏没有children属性
            if (!menuObj.children) {
                return (
                    <Menu.Item key={menuObj.key} icon={menuObj.icon}>
                        <Link to={menuObj.path}>
                            {menuObj.title}
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={menuObj.key} icon={menuObj.icon} title={menuObj.title}>
                        {this.getMenuNodes(menuObj.children)}
                    </SubMenu>
                )
            }
        })
    }
    getKey = (list) => {
        let pathname = this.props.location.pathname
        for (let i = 0; i < list.length; i++) {
            if (!list[i].children) {
                if (pathname === list[i].path) {
                    return list[i].key;
                }
            }
            else {
                for (let j = 0; j < list[i].children.length; j++) {
                    if (pathname === list[i].children[j].path) {
                        return list[i].children[j].key;
                    } else if (pathname.substr(0, 16) === '/admin/luru/edit') {
                        return 'article-luru'
                    }
                }
            }
        }
    }

    render() {
        //根据路径得到导航栏组件当前选中项的key
        const selected_key = this.getKey(menuList)
        return (
            <div className="nav" style={{ width: '100 %', height: '100%' }}>
                <Menu
                    defaultOpenKeys={['article', 'message']}
                    selectedKeys={[selected_key]}
                    mode="inline"
                    theme="light"
                >
                    {
                        this.getMenuNodes(menuList)
                    }
                </Menu>
            </div>
        );
    }
}

export default withRouter(LeftNav)