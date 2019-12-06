var express = require('express')
var moment = require('moment')
var router = express.Router()
var dbMould = require('../database/mould')

router.get('/', function(req, res) {
  var reqData = req.query
  dbMould.mouldSelectByPid(reqData.pid, function(result) {
    var data = {
      code: 0,
      data: result,
      msg: '请求成功'
    }
    res.json(data)
  })
})

router.get('/item', function(req, res) {
  var reqData = req.query
  dbMould.mouldSelectById(reqData.id, function(result) {
    var data = {
      code: 0,
      data: result,
      msg: '请求成功'
    }
    res.json(data)
  })
})

router.post('/add', function(req, res) {
  var reqData = req.body
  var currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  var params = {
    name: reqData.name,
    description: reqData.description,
    pid: reqData.pid,
    struct: reqData.struct,
    ctime: currentTime,
    utime: currentTime
  }
  dbMould.mouldAddItem(params, function(result) {
    dbMould.mouldSelectById(result.insertId, function(innerResult) {
      var data = {
        code: 0,
        data: innerResult.length && innerResult[0],
        msg: '请求成功'
      }
      res.json(data)
    })
  })
})

router.post('/update', function(req, res) {
  var reqData = req.body
  var currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  var params = {
    name: reqData.name,
    description: reqData.description,
    struct: reqData.struct,
    utime: currentTime
  }
  dbMould.mouldUpdateById(reqData.id, params, function() {
    dbMould.mouldSelectById(reqData.id, function(innerResult) {
      var data = {
        code: 0,
        data: innerResult.length && innerResult[0],
        msg: '请求成功'
      }
      res.json(data)
    })
  })
})

router.get('/delete', function(req, res) {
  var reqData = req.query
  dbMould.mouldDeleteById(reqData.id, function() {
    var data = {
      code: 0,
      data: {},
      msg: '请求成功'
    }
    res.json(data)
  })
})

module.exports = router
