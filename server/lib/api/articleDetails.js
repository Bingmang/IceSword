module.exports = {

get: function (req, res) {
  db.Article.findOne({ _id: req.params.id }, (err, docs) => {
    if (err) {
      return
    }
    res.send(docs)
  })
},

post: function (req, res) {
  db.Article.findOne({ _id: req.body.id }, (err, docs) => {
    if (err) {
      return
    }
    res.send(docs)
  })
},

}

const db = require('../../conf').db
