module.exports = {

get: function (req, res) {
  db.Article.find({}, function (err, docs) {
    if (err) {
      console.log('出错' + err)
      return
    }
    res.json(docs)
  })
},

post: function (req, res) {
  db.Article.find({ label: req.body.label }, function (err, docs) {
    if (err) {
      console.log('出错' + err)
      return
    }
    res.json(docs)
  })
},

}

const db = require('../../../conf').db
