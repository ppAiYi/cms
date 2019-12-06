var db = require('../index')

var mouldSelectById = function(id, callback) {
  var sql = `SELECT * FROM mould where id = ${id}`
  db.operate(sql, [], function(result, fields) {
    callback && callback(result, fields)
  })
}

var mouldSelectByPid = function(pid, callback) {
  var sql = `SELECT * FROM mould where pid = ${pid}`
  db.operate(sql, [], function(result, fields) {
    callback && callback(result, fields)
  })
}

var mouldAddItem = function(params, callback) {
  var sql =
    'INSERT INTO mould (name,pid,description,`struct`,ctime,utime) VALUES(?,?,?,?,?,?)'
  var arr = [
    params.name,
    parseInt(params.pid, 10),
    params.description,
    params.struct,
    params.ctime,
    params.utime
  ]

  db.operate(sql, arr, function(result, fields) {
    callback && callback(result, fields)
  })
}

var mouldUpdateById = function(id, params, callback) {
  var sql =
    'UPDATE mould SET name = ?,description = ?,struct = ?,utime = ? WHERE Id = ?'
  var arr = [params.name, params.description, params.struct, params.utime, id]

  db.operate(sql, arr, function(result, fields) {
    callback && callback(result, fields)
  })
}

var mouldDeleteById = function(id, callback) {
  var sql = `DELETE FROM mould where id=${id}`

  db.operate(sql, [], function(result, fields) {
    callback && callback(result, fields)
  })
}

module.exports = {
  mouldSelectById,
  mouldSelectByPid,
  mouldAddItem,
  mouldUpdateById,
  mouldDeleteById
}
