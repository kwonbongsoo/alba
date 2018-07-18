var express = require('express');
var productDB = require('../db/productDB')
var datasource = require('../util/datasource')
var multiparty = require('multiparty');

var connection = datasource.getConnection()
productDB.setConnection(connection)

let aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + "/../config/awsconfig.json");
let s3 = new aws.S3();

let multer = require('multer');
let multerS3 = require('multer-s3');
let memorystorage = multer.memoryStorage()
let upload = multer({ storage: memorystorage })

var router = express.Router();

/* GET home page. */
router.get('/list/', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")
  
  productDB.get(function(result) {
    // console.log(result);

    res.json(result)
  }, function(error) {
    res.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
     console.log(error)
  });
});

router.post('/add', 
upload.single('file'), 
function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  


  var s3_params = {
    Bucket: 'dev.img.majesttybbong.com',
    Key: req.file.originalname,
  };
  
  var s3obj = new aws.S3({ params: s3_params });
    s3obj.upload({ Body: req.file.buffer })
    .on('httpUploadProgress',function(progress) {
      console.log(Math.round(progress.loaded/progress.total*100)+ '% done');
      }).
      send(function (err, data) {
        //S3 File URL
        var img_path = data.Location
        console.log(img_path)
        var imageName = req.body.imageName
        var name = req.body.p_name
        var price = req.body.p_price
        var price1 = req.body.p_price1
        //어디에서나 브라우저를 통해 접근할 수 있는 파일 URL을 얻었습니다.
        productDB.add(name, price, price1,imageName, img_path, (result) => {
          res.json(result)
        }, (error) => {
          res.status(200)
                  .set('Content-Type', 'text/plain;charset=UTF-8')
                  .end('error')
        })
      })
})

router.post('/update',
upload.single('file'), 
function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  var s3_params = {
    Bucket: 'dev.img.majesttybbong.com',
    Key: req.file.originalname,
  };
  
  var s3obj = new aws.S3({ params: s3_params });
    s3obj.upload({ Body: req.file.buffer })
    .on('httpUploadProgress',function(progress) {
      console.log(Math.round(progress.loaded/progress.total*100)+ '% done');
      }).
      send(function (err, data) {
        //S3 File URL
        var img_path = data.Location

        var imageName = req.body.imageName
        var name = req.body.p_name
        var price = req.body.p_price
        var price1 = req.body.p_price1
        var orgName = req.body.orgName
        var no = req.body.no

        //어디에서나 브라우저를 통해 접근할 수 있는 파일 URL을 얻었습니다.
        
        var delete_params = {
          Bucket: 'dev.img.majesttybbong.com',
          Key: orgName
        };
      
        //db 삭제 처리
      
        var deleteObj = new aws.S3();
        deleteObj.deleteObject(delete_params, (err, data) => {
          productDB.update(name, price, price1, imageName, img_path, no, (result) => {
            res.json(result)
          }, (error) => {
            res.status(200)
                    .set('Content-Type', 'text/plain;charset=UTF-8')
                    .end('error')
          })
        })
      })
})

router.post('/delete', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  var s3_params = {
    Bucket: 'dev.img.majesttybbong.com',
    Key: req.query.orgName,
  };

  // //db 삭제 처리

  var s3obj = new aws.S3();
  s3obj.deleteObject(s3_params, (err, data) => {
    let no = req.query.no
    productDB.delete(no, (result) => {
      res.json(result)
    }, (error) => {
      res.status(200)
              .set('Content-Type', 'text/plain;charset=UTF-8')
              .end('error')
    })
  })
})

module.exports = router;
