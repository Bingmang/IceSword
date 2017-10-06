module.exports = function (req, res) {
  db.PersonalInformation.find({}, (err, docs) => {
    if (err) {
      res.status(500).send()
      return
    }
    res.json(docs)
  })
}

const db = require('../../conf').db
