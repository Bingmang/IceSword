/**
 * 文章标签保存路由
 */

module.exports = function (req, res) {
  db.TagList.find({}, (err, docs) => {
    if (err) {
      return
    }
    let isExist = false
    docs.forEach((item) => {
      if (item.tagName == req.body.tagList.tagName) {
        isExist = true
      }
    })
    if (isExist) {
      res.json({ error: true, msg: '标签已存在' })
    } else {
      new db.TagList(req.body.tagList).save((err) => {
        if (err) {
          res.send('保存失败')
          return
        }
        res.send()
      })
    }
  })
}

const db = require('../../conf').db
