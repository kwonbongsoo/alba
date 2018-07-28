const express = require('express');
const router = express.Router();
const appsDB = require('../db/appsDB')
const datasource = require('../util/datasource')
const connection = datasource.getConnection()
appsDB.setConnection(connection)

/* GET users listing. */
router.get('/product', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  appsDB.getProduct(function(result) {
    // console.log(result);
    res.json(result)
  }, function(error) {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
     console.log(error)
  });
});

router.get('/post', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // console.log(req)

    appsDB.getPost((result) => {
        for (var i = 0; i < result.length; i++) 
            result[i].text = result[i].text.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/gi, '\n');
        res.json(result)
    }, (error) => {
        res.status(200)
                  .set('Content-Type', 'text/plain;charset=UTF-8')
                  .end('error')
    })
});

module.exports = router;
