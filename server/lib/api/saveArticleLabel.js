/**
 * 文章标签保存路由
 */

module.exports = function (req, res) {
  db.TagList.find({}, function (err, docs) {
    if (err) return
    let isExist = false
    docs.forEach(function (item) {
      if (item.tagName == req.body.tagList.tagName) {
        isExist = true
      }
    })
    if (isExist) {
      res.json({ error: true, msg: '标签已存在' })
    } else {
      new db.TagList(req.body.tagList).save(function (error) {
        if (error) {
          res.send('保存失败')
          return
        }
        res.send()
      })
    }
  })
}

const db = require('../../conf').db
