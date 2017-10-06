let express = require('express')
let fs = require('fs')
let path = require('path')
let bodyParser = require('body-parser')
let mime = require('mime')
let router = require('./server/router')
let compression = require('compression')
let session = require('express-session')
let FileStore = require('session-file-store')(session)
let app = express()

let resolve = file => path.resolve(__dirname, file)
app.use(compression())
app.use('/.dist', express.static(resolve('./.dist')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let identityKey = 'skey'

app.use(session({
  name: identityKey,
  secret: 'chyingp',  // 用来对session id相关的cookie进行签名
  store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 15 * 60 * 1000  // 有效期，单位是毫秒, 这里设置的是15分钟
  }
}))

app.use(router)

// 后台管理页
app.get('/admin', (req, res) => {
  let sess = req.session
  let loginUser = sess.loginUser
  let isLogined = !!loginUser
  let html = null
  if (isLogined) {
    console.log('已登录')
    html = fs.readFileSync(resolve('./' + 'admin.html'), 'utf-8')
  } else {
    console.log('未登录')
    html = fs.readFileSync(resolve('./' + 'login.html'), 'utf-8')
  }
  res.send(html)
})

// 博客首页
app.get('*', (req, res) => {
  let html = fs.readFileSync(resolve('./' + 'index.html'), 'utf-8')
  res.send(html)
})

let port = process.env.PORT || 19031

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Listening on http://localhost:' + port)
})
