var db = require('../index')

var projectSelectByUid = function(uid, callback) {
  var sql = `SELECT * FROM project where uids like "%${uid}%"`
  db.operate(sql, [], function(result, fields) {
    callback && callback(result, fields)
  })
}

var projectAddItem = function(params, callback) {
  var sql = 'INSERT INTO project (name,uids,description,ctime,utime) VALUES(?,?,?,?,?)'
  var arr = [params.name, params.uids, params.description, params.ctime, params.utime]

  db.operate(sql, arr, function(result, fields) {
    callback && callback(result, fields)
  })
}

module.exports = {
  projectSelectByUid,
  projectAddItem
}
