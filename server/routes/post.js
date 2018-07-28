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
    
    postDB.get((result) => {
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
    let android_text = req.query.text.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/gi, '\n');
    
    postDB.add(title, text, android_text, (result) => {
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
    let android_text = req.query.text.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/gi, '\n');
    let no = parseInt(req.query.no)
    
    postDB.update(title, text, android_text, no, (result) => {
        res.json(result)
    }, (error) => {
        res.status(200)
                .set('Content-Type', 'text/plain;charset=UTF-8')
                .end('error')
    })
});

router.get('/deletePost', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    res.setHeader("Access-Control-Max-Age", "3600")
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
    res.setHeader("Access-Control-Allow-Origin", "*")

    let no = parseInt(req.query.no)
    postDB.deletePost(no, (result) => {
    res.json(result)
    }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    })
  })

module.exports = router;
