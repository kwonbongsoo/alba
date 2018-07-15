var express = require('express');
var productDB = require('../db/productDB')
var datasource = require('../util/datasource')
var connection = datasource.getConnection()
productDB.setConnection(connection)

let AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json");
let s3 = new AWS.S3();

let multer = require('multer');
let multerS3 = require('multer-s3');
let upload = multer ({
  storage: multerS3({
    s3: s3,
    bucket: "dev.img.majesttybbong.com",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension)
    },
    acl: 'public-read-write',
  })
})
var router = express.Router();

/* GET home page. */
router.get('/list/', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  
  productDB.get(function(result) {
    console.log(result);

    res.json(result)
  }, function(error) {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
     console.log(error)
  });
});

router.get('/add_proudct', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let name = req.body.name;
  let price = req.body.price;
  let img_path = req.body.img_path;

  //s3 파일 업로드 해야함

  productDB.add(name, price, img_path, (result) => {
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
  })
})

router.get('/update_proudct', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  let name = req.body.name;
  let price = req.body.price;
  let img_path = req.body.img_path;

  //s3 파일 업로드 해야함

  productDB.update(name, price, img_path, (result) => {
    res.json(result)
  }, (error) => {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
  })
})

module.exports = router;
