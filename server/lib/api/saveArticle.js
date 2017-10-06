/**
 * 文章保存路由
 */

module.exports = function (req, res) {
  new db.Article(req.body.articleInformation).save((err) => {
    if (err) {
      res.status(500).send()
      return
    }
    if (req.body.articleInformation.state != 'draft') {
      db.Article.find({ label: req.body.articleInformation.label }, (err, ArticleList) => {
        if (err) {
          return
        }
        db.TagList.find({ tagName: req.body.articleInformation.label }, (err, docs) => {
          if (docs.length > 0) {
            docs[0].tagNumber = ArticleList.length
            db.TagList(docs[0]).save((err) => {
              console.error(err)
            })
          }
        })
      })
    }
    res.send()
  })
}

const db = require('../../conf').db
