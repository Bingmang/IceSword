/**
 * 文章保存路由
 */

module.exports = function (req, res) {
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
}

const db = require('../../conf').db
