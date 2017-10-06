module.exports = {

/**
 * 删除文章
 */
article: function (req, res) {
  db.Article.remove({ _id: req.body._id }, (err, docs) => {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
},

}

const db = require('../../conf').db
