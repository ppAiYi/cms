var express = require('express')
var router = express.Router()

var db = require('../database')

router.get('/', function(req, res) {
  var sql = 'SELECT * FROM mould'
  db.operate(sql, function(err, result) {
    if (err) {
      console.log('[SELECT ERROR]:', err.message)
    }
    str = JSON.stringify(result)
    var data = {
      code: 0,
      data: result,
      msg: '请求成功'
    }
    res.json(data)
  })
})

module.exports = router
