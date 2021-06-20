let store = {
    //登录时调用
    saveUser(user) {
        localStorage.setItem('user_key', JSON.stringify(user))
        //console.log(localStorage.getItem('user_key'))
    },
    //进入管理页面时调用
    getUser() {
        return JSON.parse(localStorage.getItem('user_key') || '{}')
    },
    //退出登录时调用
    removeUser() {
        localStorage.removeItem('user_key')
    },
    saveArticle(article) {
        localStorage.setItem('article_key', JSON.stringify(article))
    },
    //进入管理页面时调用
    getArticle() {
        return JSON.parse(localStorage.getItem('article_key') || '{}')
    },
    //退出登录时调用
    removeArticle() {
        localStorage.removeItem('article_key')
    }
}
export default store