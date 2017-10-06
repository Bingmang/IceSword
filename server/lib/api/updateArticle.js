/**
 * 文章更新路由
 */

module.exports = function (req, res) {
  db.Article.find({ _id: req.body.obj._id }, (err, docs) => {
    if (err) {
      return
    }
    docs[0].title = req.body.obj.title
    docs[0].articleContent = req.body.obj.articleContent
    // 不更新文章更改时间
    docs[0].date = docs[0].date
    docs[0].state = req.body.obj.state
    docs[0].label = req.body.obj.label
    db.Article(docs[0]).save((err) => {
      if (err) {
        res.status(500).send()
        return
      }
      res.send()
    })
  })
}

const db = require('../../conf').db
