/**
 * 登陆接口
 * {method} POST
 */

module.exports = function (req, res) {
  let sess = req.session
  let user = common.findUser(req.body.name, req.body.pwd)

  if (user) {
    req.session.regenerate(function (err) {
      if (err) {
        return res.json({ code: 2, msg: '登录失败' })
      }
      req.session.loginUser = user.name
      res.json({ code: 0, msg: '登录成功' })
    })
  } else {
    res.json({ code: 1, msg: '账号或密码错误' })
  }
}

const common = require('../_common')