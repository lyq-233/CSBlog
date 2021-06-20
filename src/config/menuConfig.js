/*该文件用于遍历生成导航栏*/
import {
    ReadOutlined,
    IdcardOutlined,
    TableOutlined,
    UploadOutlined,
    HomeOutlined,
    StarOutlined,
    LikeOutlined,
    DislikeOutlined,
    UserAddOutlined,
    MessageOutlined,
    CommentOutlined,
    BugOutlined
} from '@ant-design/icons';

const menuList = [{
    title: '我的主页',
    key: 'home',
    path: '/admin/home',
    icon: <HomeOutlined />
},
{
    title: '我的博客',
    key: 'article',     //SubMenu节点不需要路由的路径path
    icon: <ReadOutlined />,
    children: [
        {
            title: '博客列表',
            key: 'article-list',
            path: '/admin/list',
            icon: <TableOutlined />
        }, {
            title: '博客录入',
            key: 'article-luru',
            path: '/admin/luru/input',
            icon: <UploadOutlined />
        }]
},
{
    title: '我的收藏',
    key: 'mycollect',
    path: '/admin/mycollect',
    icon: <StarOutlined />
},
{
    title: '消息管理',
    key: 'message',     //SubMenu节点不需要路由的路径path
    icon: <MessageOutlined />,
    children: [
        {
            title: '收到的赞',
            key: 'message-good',
            path: '/admin/good',
            icon: <LikeOutlined />
        }, {
            title: '收到的踩',
            key: 'message-bad',
            path: '/admin/bad',
            icon: <DislikeOutlined />
        }, {
            title: '我的粉丝',
            key: 'message-fan',
            path: '/admin/fan',
            icon: <UserAddOutlined />
        }, {
            title: '评论管理',
            key: 'message-comment',
            path: '/admin/comment',
            icon: <CommentOutlined />
        }]
},
{
    title: 'Bug反馈',
    key: 'advise',
    path: '/admin/advise',
    icon: <BugOutlined />
},
{
    title: '个人资料',
    key: 'information',
    path: '/admin/info',
    icon: <IdcardOutlined />
}
]
export default menuList