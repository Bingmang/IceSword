module.exports = function (req, res) {
  db.PersonalInformation.find({}, function (err, docs) {
    if (err) {
      res.status(500).send()
      return
    }
    res.json(docs)
  })
}

const db = require('../../conf').db
