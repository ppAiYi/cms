var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/user')
var productRouter = require('./routes/project')
var productItemRouter = require('./routes/record')
var mouldRouter = require('./routes/mould')

var app = express()

app.use(
  cors({
    orgin: ['http://localhost:8080'], // 允许这个域访问
    methods: ['GET', 'POST'], // 只允许get和post请求
    alloweHeaders: ['Conten-Type', 'Authorization'] // 只允许带这两种请求头的连接访问
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 路由配置
app.use('/', indexRouter)
app.use('/user', usersRouter)
app.use('/project', productRouter)
app.use('/record', productItemRouter)
app.use('/mould', mouldRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
