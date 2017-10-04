
/**
 * 查找用户
 */

module.exports = function (name, password) {
  return users.find(function (item) {
    return item.name === name && item.password === password
  })
}

const users = require('../../conf').user.items
