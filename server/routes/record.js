var express = require('express')
var moment = require('moment')
var router = express.Router()
var dbRecord = require('../database/record')

router.get('/', function(req, res) {
  var reqData = req.query
  dbRecord.recordSelectByPid(reqData.pid, function(result) {
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
  dbRecord.recordSelectById(reqData.id, function(result) {
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
    uri: reqData.uri,
    pid: reqData.pid,
    mid: reqData.mid,
    uid: reqData.uid,
    struct: reqData.struct || '[]',
    ctime: currentTime,
    utime: currentTime
  }
  dbRecord.recordAddItem(params, function(result) {
    dbRecord.recordSelectById(result.insertId, function(innerResult) {
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
    uri: reqData.uri,
    mid: reqData.mid,
    uid: reqData.uid,
    utime: currentTime
  }
  dbRecord.recordUpdateById(reqData.id, params, function() {
    dbRecord.recordSelectById(reqData.id, function(innerResult) {
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
  dbRecord.recordDeleteById(reqData.id, function() {
    var data = {
      code: 0,
      data: {},
      msg: '请求成功'
    }
    res.json(data)
  })
})

module.exports = router
