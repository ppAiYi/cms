var db = require('../index')

var recordSelectById = function(id, callback) {
  var sql = `SELECT * FROM record where id = ${id}`
  db.operate(sql, [], function(result, fields) {
    callback && callback(result, fields)
  })
}

var recordSelectByPid = function(pid, callback) {
  var sql = `SELECT * FROM record where pid = ${pid}`
  db.operate(sql, [], function(result, fields) {
    callback && callback(result, fields)
  })
}

var recordAddItem = function(params, callback) {
  var sql =
    'INSERT INTO record (name,description,uri,pid,uid,mid,struct,ctime,utime) VALUES(?,?,?,?,?,?,?,?,?)'
  var arr = [
    params.name,
    params.description,
    params.uri,
    params.pid,
    params.uid,
    params.mid,
    params.struct,
    params.ctime,
    params.utime
  ]

  db.operate(sql, arr, function(result, fields) {
    callback && callback(result, fields)
  })
}

var recordUpdateById = function(id, params, callback) {
  var sql =
    'UPDATE record SET name = ?,uid = ?,uri = ?,description = ?,mid = ?,utime = ? WHERE Id = ?'
  var arr = [params.name, params.uid, params.uri, params.description, params.mid, params.utime, id]

  db.operate(sql, arr, function(result, fields) {
    callback && callback(result, fields)
  })
}

var recordUpdateStructById = function(id, params, callback) {
  var sql =
    'UPDATE record SET name = ?,uid = ?,params.uri = ?,description = ?,utime = ? WHERE Id = ?'
  var arr = [params.name, params.uid, params.uri, params.description, params.utime, id]

  db.operate(sql, arr, function(result, fields) {
    callback && callback(result, fields)
  })
}

var recordDeleteById = function(id, callback) {
  var sql = `DELETE FROM record where id=${id}`;

  db.operate(sql, [], function(result, fields) {
    callback && callback(result, fields)
  })
}

module.exports = {
  recordSelectById,
  recordSelectByPid,
  recordAddItem,
  recordUpdateById,
  recordUpdateStructById,
  recordDeleteById
}
