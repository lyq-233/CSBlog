DEMO
===========================

###########启动项目
此项目已经通过轻服务部署完成可直接用浏览器打开运行,可访问[](https://s6-lc.thelarkcloud.com/obj/larkcloud-mgcloud/baas/qckozf/610f8ce8c803af29_1621688279898.html#/)

###########后端函数
所有后端函数可通过访问（https://qingfuwu.cn/share/qckozf3fzeoxz58c9o）进行查看


###########前端目录结构描述
react-admin-client			//React工作区
	├── node_modules			//存放用包管理工具下载的包
	├── public					//存放静态文件的文件夹
	|   └── index.html			//给出root节点，用于渲染App组件
    src
    │  App.js                          //App组件
    │  index.js                        //渲染App组件到页面
    │  
    ├─api                                //请求后端的接口  
    │      ajax.js
    │      index.js
    │      
    ├─assets
    ├─components                            //组件文件夹
    │  ├─BlogsMain                               //主页面博客主模块，由BlogsTypeSelect组成
    │  │      BlogsMain.css
    │  │      BlogsMain.jsx
    │  │      
    │  ├─BlogsTypeSelect                        //主页面分类的博客模块
    │  │      BlogsTypeSelect.css
    │  │      BlogsTypeSelect.jsx
    │  │      
    │  ├─CommentList                            //评论组件
    │  │      CommentList.css
    │  │      CommentList.jsx
    │  │      
    │  ├─EditEmailForm                          //编辑邮件表单
    │  │      EditEmailForm.jsx
    │  │      
    │  ├─EditGenderForm                         //编辑性别表单
    │  │      EditGenderForm.jsx
    │  │      
    │  ├─EditIntroForm                          //编辑个人简介表单
    │  │      EditIntroForm.jsx
    │  │      
    │  ├─EditNickForm                           //编辑昵称表单
    │  │      EditNickForm.jsx
    │  │      
    │  ├─EditPWDForm                            //编辑密码表单
    │  │      EditPWDForm.jsx
    │  │      
    │  ├─FeedBack                               //反馈Bug小组件
    │  │      FeedBack.css
    │  │      FeedBack.jsx
    │  │      
    │  ├─HomepageFooter                         //页面Footer组件
    │  │      HomepageFooter.css
    │  │      HomepageFooter.jsx
    │  │      
    │  ├─HomepageHeader                         //页面头header组件
    │  │      HomepageHeader.css
    │  │      HomepageHeader.jsx
    │  │      
    │  ├─HomepageMain                           //包含推荐博客模块和博客主模块
    │  │      HomepageMain.css
    │  │      HomepageMain.jsx
    │  │      
    │  ├─HomepageNav                                //主页面导航区
    │  │      HomepageNav.css
    │  │      HomepageNav.jsx
    │  │      
    │  ├─LeftNav                                //后台管理页面导航区
    │  │      LeftNav.css
    │  │      LeftNav.jsx
    │  │      
    │  ├─NormalLoginForm                            //登录表单
    │  │      NormalLoginForm.css
    │  │      NormalLoginForm.jsx
    │  │      
    │  ├─PictureWall                                //照片墙组件
    │  │      PictureWall.jsx
    │  │      
    │  ├─RecommendBlog                              //推荐博客模块
    │  │      RecommendBlog.css
    │  │      RecommendBlog.jsx
    │  │      
    │  ├─RegistrationForm                           //注册用户表单
    │  │      RegistrationForm.css
    │  │      RegistrationForm.jsx
    │  │      
    │  ├─ReturnToTop                                //返回顶部小组件
    │  │      ReturnToTop.css
    │  │      ReturnToTop.jsx
    │  │      
    │  ├─RichTextEditor                             //富文本编辑框
    │  │      RichTextEditor.jsx
    │  │      
    │  ├─ShowSquare                                 //弹出下拉菜单
    │  │      ShowSquare.css
    │  │      ShowSquare.jsx
    │  │      
    │  └─TopHeader                                  //后台管理页Header
    │          TopHeader.css
    │          TopHeader.jsx
    │          
    ├─config                                        //配置文件夹（包含后台管理页面导航区菜单以及主页面导航区菜单）
    │      articleTypeConfig.js
    │      menuConfig.js
    │      
    ├─pages                                         //路由（页面）文件夹
    │  ├─Admin                                       //管理页面
    │  │  │  Admin.css
    │  │  │  Admin.jsx
    │  │  │  
    │  │  └─pages                       
    │  │      ├─ArticleList                             //博客列表
    │  │      │      ArticleList.css
    │  │      │      ArticleList.jsx
    │  │      │      
    │  │      ├─ArticleLuru                             //博客录入
    │  │      │      ArticleLuru.css
    │  │      │      ArticleLuru.jsx
    │  │      │      
    │  │      ├─BadList                                 //被踩管理
    │  │      │      BadList.css
    │  │      │      BadList.jsx
    │  │      │      
    │  │      ├─CommentList                             //评论管理
    │  │      │      CommentList.css
    │  │      │      CommentList.jsx
    │  │      │      
    │  │      ├─FanList                                 //关注管理
    │  │      │      FanList.css
    │  │      │      FanList.jsx
    │  │      │      
    │  │      ├─GiveAdvise                              //反馈意见
    │  │      │      GiveAdvise.css
    │  │      │      GiveAdvise.jsx
    │  │      │      
    │  │      ├─GoodList                                //点赞管理
    │  │      │      GoodList.css
    │  │      │      GoodList.jsx
    │  │      │      
    │  │      ├─Home                                    //个人主页
    │  │      │      Home.css
    │  │      │      Home.jsx
    │  │      │      
    │  │      ├─InfoChange                              //更改资料
    │  │      │      InfoChange.css
    │  │      │      InfoChange.jsx
    │  │      │      
    │  │      └─MyCollect                               //我的收藏
    │  │              MyCollect.css
    │  │              MyCollect.jsx
    │  │              
    │  ├─Homepage                                     //主页面
    │  │      Homepage.css
    │  │      Homepage.jsx
    │  │      
    │  ├─Login                                        //登录页面
    │  │  │  Login.css
    │  │  │  Login.jsx
    │  │  │             
    │  │  │     
    │  │  │      
    │  │  └─pages
    │  │      ├─Log                                       //登录
    │  │      │      Log.css
    │  │      │      Log.jsx
    │  │      │      
    │  │      └─Register                                   //注册
    │  │              Register.css
    │  │              Register.jsx
    │  │              
    │  ├─SearchResult                                //搜索结果页面
    │  │      SearchResult.css
    │  │      SearchResult.jsx
    │  │        
    │  └─ViewBlog                                   //查看博客内容页面        
    │          ViewBlog.css
    │          ViewBlog.jsx
    │           
    └─utils                                     //工具文件夹，封装了一些函数
            dateUtils.js                               //此函数转换GMT+8日期格式为便于阅读的格式
            storageUtils.js                            //封装了一些本地存储的函数
            
