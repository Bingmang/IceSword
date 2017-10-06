module.exports = {

get: function (req, res) {
  db.Article.find({
    state: 'publish',
  }, (err, docs) => {
    if (err) {
      console.log('出错' + err)
      return
    }
    res.json(docs)
  })
},

post: function (req, res) {
  db.TagList.find({
    _id: req.body.tagId,
  }, (err, docs) => {
    if (err) {
      res.status(500).send()
      return
    }
    db.Article.find({
      label: docs[0].tagName,
      state: 'publish',
    }, (err, docs) => {
      if (err) {
        res.status(500).send()
        return
      }
      res.json(docs)
    })
  })
},

}

const db = require('../../conf').db
