// connection 객체 준비
"use strict"

const mysql = require('mysql')
const connection = mysql.createConnection({
  database: 'alba',
  user: 'alba',
  password: 'alba1234'
})
connection.connect()

/*
module.exports.getConnection = function() {
  return con
}
*/
module.exports = {
  getConnection() {
    return connection
  }
}