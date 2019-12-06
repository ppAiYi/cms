var express = require('express')
var moment = require('moment')
var router = express.Router()
var dbProject = require('../database/project')

router.get('/', function(req, res) {
  var reqData = req.query
  dbProject.projectSelectByUid(reqData.uid, function(result) {
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
    uids: reqData.uids,
    ctime: currentTime,
    utime: currentTime
  }
  dbProject.projectAddItem(params, function(result) {
    dbProject.projectSelectById(result.insertId, function(innerResult) {
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
    uids: reqData.uids,
    utime: currentTime
  }
  dbProject.projectUpdateById(reqData.id, params, function() {
    dbProject.projectSelectById(reqData.id, function(innerResult) {
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
  dbProject.projectDeleteById(reqData.id, function() {
    var data = {
      code: 0,
      data: {},
      msg: '请求成功'
    }
    res.json(data)
  })
})

module.exports = router
