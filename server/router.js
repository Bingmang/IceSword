let express = require('express')
let router = express.Router()
let db = require('./conf').db
let server = require('.')

// 登录接口
router.post('/api/login', server.api.login)
// 查询文章列表路由 用于博客前端展示数据不包含草稿内容
router.get('/api/articleList', server.api.articleList.get)
// 按标签ID查询文章列表路由 用于博客前端展示数据不包含草稿内容
router.post('/api/articleList', server.api.articleList.post)
// 查询文章列表路由 用于博客后端管理系统包含草稿和已发布文章数据
router.get('/api/admin/articleList', server.api.admin.articleList.get)
// 查询文章列表路由(根据标签返回对应的文章列表) 用于博客后端管理系统包含草稿和已发布文章数据
router.post('/api/admin/articleList', server.api.admin.articleList.post)
// 查询文章详情路由
router.get('/api/articleDetails/:id', server.api.articleDetails.get)
router.post('/api/articleDetails', server.api.articleDetails.post)
// 文章保存路由
router.post('/api/saveArticle', server.api.saveArticle)

// 文章更新路由
router.post('/api/updateArticle', server.api.updateArticle)

// 删除文章
router.post('/api/delect/article', server.api.delect.article)

// 文章标签查询路由
router.get('/api/getArticleLabel', server.api.getArticleLabel)
// 文章标签保存路由
router.post('/api/saveArticleLabel', server.api.saveArticleLabel)
// 博客信息路由
router.post('/api/save/personalInformation', server.api.save.personalInformation)

router.get('/api/personalInformation', server.api.personalInformation)

module.exports = router
