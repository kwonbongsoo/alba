const express = require('express');
const router = express.Router();
const postDB = require('../db/postDB')
const datasource = require('../util/datasource')
const connection = datasource.getConnection()
postDB.setConnection(connection)



router.get('/get',
function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    let no = req.query.no
    console.log(req.query.no)
    postDB.get(no, (result) => {
        console.log(result)
        res.json(result)
    }, (error) => {
        res.status(200)
                  .set('Content-Type', 'text/plain;charset=UTF-8')
                  .end('error')
    })
});


router.post('/add',
function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    let title = req.query.title
    let text = req.query.text
    
    postDB.add(title, text, (result) => {
        res.json(result)
    }, (error) => {
        res.status(200)
                  .set('Content-Type', 'text/plain;charset=UTF-8')
                  .end('error')
    })
});

router.post('/update',
function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    let title = req.query.title
    let text = req.query.text
    let no = parseInt(req.query.no)
    
    postDB.update(title, text, no, (result) => {
        res.json(result)
    }, (error) => {
        res.status(200)
                  .set('Content-Type', 'text/plain;charset=UTF-8')
                  .end('error')
    })
});

module.exports = router;
