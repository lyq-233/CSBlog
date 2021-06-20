import ajax from './ajax'
//验证登录的API
export const reqLogin = (nickname, password) => ajax('https://qckozf.fn.thelarkcloud.com/login', { nickname, password }, 'POST')
//提交注册信息的API
export const submitReg = (nickname, username, password, email) => ajax('https://qckozf.fn.thelarkcloud.com/register', { nickname, username, password, email }, 'POST')
//获取用户信息
export const getUserinfo = (_id) => ajax('https://qckozf.fn.thelarkcloud.com/getUserinfo', { _id }, 'GET')
//提交文章的API
export const submitArt = (nickname, username, title_name, content, type, keyword, title_img) => ajax('https://qckozf.fn.thelarkcloud.com/articleInput', { nickname, username, title_name, content, type, keyword, title_img }, 'POST')
//获取文章的API
export const getArt = (nickname) => ajax('https://qckozf.fn.thelarkcloud.com/getYourArticle', { nickname }, 'GET')
//修改文章内容的API
export const changeContent = (_id, title_name, content, type, keyword, title_img) => ajax('https://qckozf.fn.thelarkcloud.com/articleEdit', { title_id: _id, title_name, content, type, keyword, title_img }, 'POST')
//修改文章状态的API
export const changeLine = (_id, linestatus) => ajax('https://qckozf.fn.thelarkcloud.com/changeLine', { title_id: _id, status: linestatus }, 'POST')
//删除文章
export const deleteArt = (_id) => ajax('https://qckozf.fn.thelarkcloud.com/articleDelete', { id: _id }, 'POST')
//修改个人资料
export const changeNick = (_id, username) => ajax('https://qckozf.fn.thelarkcloud.com/changeNick', { id: _id, username }, 'POST')
export const changePWD = (_id, password) => ajax('https://qckozf.fn.thelarkcloud.com/changePWD', { id: _id, password }, 'POST')
export const changeGender = (_id, gender) => ajax('https://qckozf.fn.thelarkcloud.com/changeGender', { id: _id, gender }, 'POST')
export const changeEmail = (_id, email) => ajax('https://qckozf.fn.thelarkcloud.com/changeEmail', { id: _id, email }, 'POST')
export const changeAvatar = (_id, avatar) => ajax('https://qckozf.fn.thelarkcloud.com/changeAvatar', { id: _id, avatar }, 'POST')
export const changeIntro = (_id, intro) => ajax('https://qckozf.fn.thelarkcloud.com/changeIntro', { id: _id, intro }, 'POST')
//注销用户
export const deleteUser = (id) => ajax('https://qckozf.fn.thelarkcloud.com/deleteUser', { id }, 'POST')
//获取推荐文章
export const getRecommendedArt = () => ajax('https://qckozf.fn.thelarkcloud.com/getRecommendedArt', {}, 'GET')
//获取每种类型点赞前三的文章
export const getThreeGoodArt = () => ajax('https://qckozf.fn.thelarkcloud.com/getThreeArticleByType', {}, 'GET')
//根据id获取文章
export const getArtById = (_id) => ajax('https://qckozf.fn.thelarkcloud.com/getArticleById', { _id }, 'GET')
//根据作者获取文章
export const getArtByAuthor = (nickname) => ajax('https://qckozf.fn.thelarkcloud.com/getArticleByAuthor', { nickname }, 'GET')
//存评论
export const saveComment = (commenter, commentername, commentedartId, commentee, commenteename, content) => ajax('https://qckozf.fn.thelarkcloud.com/addComment', { commenter, commentername, commentedartId, commentee, commenteename, content }, 'POST')
//获取评论
export const getComment = (commentedartId) => ajax('https://qckozf.fn.thelarkcloud.com/getComment', { commentedartId }, 'GET')
//关注或者取消关注
export const changeConcern = (status, fan, fanname, fanee, faneename) => ajax('https://qckozf.fn.thelarkcloud.com/concernPerson', { status, fan, fanname, fanee, faneename }, 'POST')
//查看是否关注
export const getConcern = (fan, fanee) => ajax('https://qckozf.fn.thelarkcloud.com/getConcern', { fan, fanee }, 'GET')
//点赞，点踩和收藏
export const changeGBC = (status, reader, gbcedartId, author, date, tobechanged) => ajax('https://qckozf.fn.thelarkcloud.com/changeGBC', { status, reader, gbcedartId, author, date, tobechanged }, 'POST')
//获取是否点赞，点踩和收藏
export const getGBC = (reader, gbcedartId) => ajax('https://qckozf.fn.thelarkcloud.com/getGBC', { reader, gbcedartId }, 'GET')
//增加阅读量
export const changeRead = (reader, readedartId, author) => ajax('https://qckozf.fn.thelarkcloud.com/addReads', { reader, readedartId, author }, 'POST')
//请求收藏的文章
export const getCollect = (nickname) => ajax('https://qckozf.fn.thelarkcloud.com/getCollect', { nickname }, 'GET')
//获取新增的点赞，点踩，评论和关注
export const getNewBadge = (nickname) => ajax('https://qckozf.fn.thelarkcloud.com/newBadge', { nickname }, 'GET')
//已查看点赞，点踩，评论和关注
export const deleteNewBadge = (badgee, operate) => ajax('https://qckozf.fn.thelarkcloud.com/deleteBadge', { badgee, operate }, 'POST')
//获取我的评论
export const requireComment = (nickname) => ajax('https://qckozf.fn.thelarkcloud.com/requireComment', { nickname }, 'GET')
//获取我的点赞和踩
export const requireGB = (nickname, requiretype) => ajax('https://qckozf.fn.thelarkcloud.com/requireGB', { nickname, requiretype }, 'GET')
//获取我的粉丝
export const requireFan = (nickname) => ajax('https://qckozf.fn.thelarkcloud.com/requireFan', { nickname }, 'GET')
//删除评论
export const deleteComment = (id) => ajax('https://qckozf.fn.thelarkcloud.com/deleteComment', { id }, 'POST')
//关注的人和粉丝
export const getFanLists = (nickname) => ajax('https://qckozf.fn.thelarkcloud.com/getFanLists', { nickname }, 'GET')
//提交建议
export const giveAdvise = (nickname, username, problem, imgs) => ajax('https://qckozf.fn.thelarkcloud.com/submitAdvise', { nickname, username, problem, imgs }, 'POST')
//根据类型获取文章（最多20个）
export const getBlogByType = (type) => ajax('https://qckozf.fn.thelarkcloud.com/searchBlogByType', { type }, 'GET')
//根据关键字获取文章（最多15个）
export const getBlogBySearch = (content) => ajax('https://qckozf.fn.thelarkcloud.com/searchBlogByKeywords', { content }, 'GET')