const express = require('express');
const productDB = require('../db/productDB')
const datasource = require('../util/datasource')
const multiparty = require('multiparty');
const sharp = require('sharp');
const connection = datasource.getConnection()
productDB.setConnection(connection)

const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + "/../config/awsconfig.json");
const s3 = new aws.S3();

const multer = require('multer');
const multerS3 = require('multer-s3');
const memorystorage = multer.memoryStorage()
const upload = multer({ storage: memorystorage })

const router = express.Router();

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
  

  
  sharp(req.file.buffer)
  .resize(400, 200)
  .max()
  .toFormat(req.file.mimetype.split('/')[1])
  .toBuffer()
  .then(function(outputBuffer) {
    // outputBuffer contains JPEG image data no wider than 200 pixels and no higher
    // than 200 pixels regardless of the inputBuffer image dimensions
    let i_name = new Date().getTime()+'.'+req.file.mimetype.split('/')[1]
    var s3_params = {
      Bucket: 'phone.sel',
      Key: i_name,
    };
    
    var s3obj = new aws.S3({ params: s3_params });
    s3obj.upload({ Body: outputBuffer })
    .on('httpUploadProgress',function(progress) {
      console.log(Math.round(progress.loaded/progress.total*100)+ '% done');
      }).
      send(function (err, data) {
        //S3 File URL
        var img_path = data.Location
        console.log(img_path)
        var imageName = i_name
        var name = req.body.p_name
        var price = req.body.p_price
        var price1 = req.body.p_price1
        // 어디에서나 브라우저를 통해 접근할 수 있는 파일 URL을 얻었습니다.
        productDB.add(name, price, price1,imageName, img_path, (result) => {
          res.json(result)
        }, (error) => {
          res.status(200)
                  .set('Content-Type', 'text/plain;charset=UTF-8')
                  .end('error')
        })
      })
  });



  
  
  
  // res.json('1')
})

router.post('/update',
upload.single('file'), 
function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  sharp(req.file.buffer)
  .resize(400, 200)
  .max()
  .toFormat(req.file.mimetype.split('/')[1])
  .toBuffer()
  .then(function(outputBuffer) {
    let i_name = new Date().getTime()+'.'+req.file.mimetype.split('/')[1]
    var s3_params = {
      Bucket: 'phone.sel',
      Key: i_name,
    };
    
    var s3obj = new aws.S3({ params: s3_params });
      s3obj.upload({ Body: outputBuffer })
      .on('httpUploadProgress',function(progress) {
        console.log(Math.round(progress.loaded/progress.total*100)+ '% done');
        }).
        send(function (err, data) {
          //S3 File URL
          var img_path = data.Location

          var imageName = i_name
          var name = req.body.p_name
          var price = req.body.p_price
          var price1 = req.body.p_price1
          var orgName = req.body.orgName
          console.log(orgName)
          var no = req.body.no

          //어디에서나 브라우저를 통해 접근할 수 있는 파일 URL을 얻었습니다.
          
          var delete_params = {
            Bucket: 'phone.sel',
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
})

router.post('/delete', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
  res.setHeader("Access-Control-Max-Age", "3600")
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with")
  res.setHeader("Access-Control-Allow-Origin", "*")

  var s3_params = {
    Bucket: 'phone.sel',
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
