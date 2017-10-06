/**
 * 博客信息路由
 */

module.exports = {
  
personalInformation: function (req, res) {
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
},

}

const db = require('../../conf').db
