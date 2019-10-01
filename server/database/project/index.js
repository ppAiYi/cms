var db = require('../index')

var projectSelectById = function(id, callback) {
  var sql = `SELECT * FROM project where id = ${id}`
  db.operate(sql, [], function(result, fields) {
    callback && callback(result, fields)
  })
}

var projectSelectByUid = function(uid, callback) {
  var sql = `SELECT * FROM project where uids like "%${uid}%"`
  db.operate(sql, [], function(result, fields) {
    callback && callback(result, fields)
  })
}

var projectAddItem = function(params, callback) {
  var sql =
    'INSERT INTO project (name,uids,description,ctime,utime) VALUES(?,?,?,?,?)'
  var arr = [
    params.name,
    params.uids,
    params.description,
    params.ctime,
    params.utime
  ]

  db.operate(sql, arr, function(result, fields) {
    callback && callback(result, fields)
  })
}

var projectUpdateById = function(id, params, callback) {
  var sql =
    'UPDATE project SET name = ?,uids = ?,description = ?,utime = ? WHERE Id = ?'
  var arr = [params.name, params.uids, params.description, params.utime, id]

  db.operate(sql, arr, function(result, fields) {
    callback && callback(result, fields)
  })
}

var projectDeleteById = function(id, callback) {
  var sql = `DELETE FROM project where id=${id}`;

  db.operate(sql, [], function(result, fields) {
    callback && callback(result, fields)
  })
}

module.exports = {
  projectSelectById,
  projectSelectByUid,
  projectAddItem,
  projectUpdateById,
  projectDeleteById
}
