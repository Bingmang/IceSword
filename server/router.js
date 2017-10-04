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
router.post('/api/saveArticle', function (req, res) {
  new db.Article(req.body.articleInformation).save(function (error) {
    if (error) {
      res.status(500).send()
      return
    }
    if (req.body.articleInformation.state != 'draft') {
      db.Article.find({ label: req.body.articleInformation.label }, function (err, ArticleList) {
        if (err) {
          return
        }
        db.TagList.find({ tagName: req.body.articleInformation.label }, function (err, docs) {
          if (docs.length > 0) {
            docs[0].tagNumber = ArticleList.length
            db.TagList(docs[0]).save(function (error) { })
          }
        })
      })
    }
    res.send()
  })
})

// 文章更新路由
router.post('/api/updateArticle', function (req, res) {
  db.Article.find({ _id: req.body.obj._id }, function (err, docs) {
    if (err) {
      return
    }
    docs[0].title = req.body.obj.title
    docs[0].articleContent = req.body.obj.articleContent
    // 不更新文章更改时间
    docs[0].date = docs[0].date
    docs[0].state = req.body.obj.state
    docs[0].label = req.body.obj.label
    db.Article(docs[0]).save(function (err) {
      if (err) {
        res.status(500).send()
        return
      }
      res.send()
    })
  })
})

// 删除文章
router.post('/api/delect/article', function (req, res) {
  db.Article.remove({ _id: req.body._id }, function (err, docs) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
})

// 文章标签查询路由
router.get('/api/getArticleLabel', function (req, res) {
  // db.Article.find({},function(err, docs){
  //     if (err) {
  //         return
  //     }
  //     let tagList = []
  //     let tagObj = {}
  //     for (let i=0 i<docs.length i++){
  //         let item = docs[i]
  //         if (tagObj[item.label] === undefined){
  //             tagObj[item.label] = tagList.length
  //             tagList.push({
  //                 tagName: item.label,
  //                 tagNumber: 1
  //             })
  //         }else{
  //             tagList[tagObj[item.label]].tagNumber++
  //         }
  //     }
  //     db.TagList.find({}, function(err, docs){
  //         if(err)return
  //         let resultTagList = []
  //         for (let j=0 j<docs.length j++){
  //             for (let i=0 i<tagList.length i++){
  //                 if (tagList[i].tagName == docs[j].tagName){
  //                     resultTagList.push(tagList[i])
  //                 }else if (docs[j].tagNumber==0){
  //                     resultTagList.push(docs[j])
  //                     break
  //                 }
  //             }
  //         }
  //         res.json(resultTagList)
  //     })
  // })
  db.TagList.find({}, function (err, docs) {
    if (err) return
    res.json(docs)
  })
})
// 文章标签保存路由
router.post('/api/saveArticleLabel', function (req, res) {
  db.TagList.find({}, function (err, docs) {
    if (err) return
    let isExist = false
    docs.forEach(function (item) {
      if (item.tagName == req.body.tagList.tagName) {
        isExist = true
      }
    })
    if (isExist) {
      res.json({ error: true, msg: '标签已存在' })
    } else {
      new db.TagList(req.body.tagList).save(function (error) {
        if (error) {
          res.send('保存失败')
          return
        }
        res.send()
      })
    }
  })
})
// 博客信息路由
router.post('/api/save/personalInformation', function (req, res) {
  db.PersonalInformation.find({}, function (err, docs) {
    if (err) {
      res.status(500).send()
      return
    }
    if (docs.length > 0) {
      docs[0].name = req.body.form.name
      docs[0].individualitySignature = req.body.form.individualitySignature
      docs[0].introduce = req.body.form.introduce
      db.PersonalInformation(docs[0]).save(function (err) {
        if (err) {
          res.status(500).send()
          return
        }
        res.send()
      })
    } else {
      new db.PersonalInformation(req.body.from).save(function (err) {
        if (err) {
          res.status(500).send()
          return
        }
        res.send()
      })
    }
  })
})

router.get('/api/personalInformation', function (req, res) {
  db.PersonalInformation.find({}, function (err, docs) {
    if (err) {
      res.status(500).send()
      return
    }
    res.json(docs)
  })
})

module.exports = router
