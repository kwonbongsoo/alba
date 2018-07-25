var express = require('express');
var router = express.Router();
const usersDB = require('../db/usersDB')
const datasource = require('../util/datasource')
const connection = datasource.getConnection()
usersDB.setConnection(connection)
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  let id = req.query.id
  let pwd = req.query.pwd

  usersDB.login(id, pwd, bcrypt, (result) => {

    res.json(result)
    }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    })
})

router.get('/join', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  let id = req.query.id
  let pwd = req.query.pwd

  usersDB.join(id, pwd, bcrypt, (result) => {
    res.json(result)
    }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    })
})

module.exports = router;
