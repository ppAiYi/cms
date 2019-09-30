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
    description: reqData.desc,
    uids: reqData.uids,
    ctime: currentTime,
    utime: currentTime
  }
  dbProject.projectAddItem(params, function(result) {
    var data = {
      code: 0,
      data: result,
      msg: '请求成功'
    }
    res.json(data)
  })
})

module.exports = router
