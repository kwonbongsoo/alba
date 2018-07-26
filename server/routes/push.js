var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');

var message = new gcm.Message({  
    collapseKey: 'demo',
    delayWhileIdle: false,
    timeToLive: 3,
    data: {
        key: 'push Test',
    }
});

// install한 gcm 모듈을 선언하고, message라는 변수에  gcm.Message 를 초기화 합니다.
// 이 Message라는 메서드에 전송 될 푸시에 대한 설정 정보가 json 형식으로 들어가게 됩니다.
// 간단하게 Message에 대한 설정들을 알아보면, collapseKey는 푸시할 유사 메시지별로 동일한 collapse_key를 주면, 각 메시지에 대한 동일한 메시지가 발생되는 것을 막을 수 있다.
// delayWhileIdle은 true면, device가 잠들어있는 상황에서는 메시지를 곧바로 전달하지 않고, device가 active 될 때까지 기다리고 푸시를 전달하는 설정이다. Default값은 false.
// timeToLive는 Device가 offLine일 때 메시지를 GCM 저장소에 보관하고 있어야 하는 시간을 말한다. 단위는 (초)이며, Default값은 4주이다. data는 실제로 푸시가 전송 될 메시지 데이터를 말한다.

var server_api_key ='AAAARDbOnvY:APA91bGz9-M82aGix4siK3ZE7e2EacHvgr_6nYXvV7dDNH4KUOxAWW4w4Y-NHU6fkmCXTMbxgrnweDc7Pz56BKW8ohOUSYPc14iN9zJI4loAb2x9D6B-G9dY1vhsoBtfkbvzKv2_Y5kNQWazY7p1YozwWycsDDjcbQ';
var sender = new gcm.Sender(server_api_key);
var registrationIds = [];
 
// 이제 실제 푸시를 send 하기 위해서 개발자 콘솔에서 발급받은 API Key를 server_api_key에 입력합니다.  그리고 아래 token값에는 위에서 공유한 링크에서 Android 프로젝트에서 발급받은 token값을 넣어줍니다.

// 여기까지 android에서 푸시를 보내기 위한 모든 준비가 끝났습니다. 그렇다면 이제 실제 푸시를 전송하는 부분에 대해서 확인해보겠습니다.

/* GET users listing. */
router.get('/', function(req, res, next) {
// var token = 'Token';
// registrationIds.push(token);

// sender.send(message, registrationIds, 4, function (err, result) {
//     console.log(result);
// });

// 실제 전송부분입니다. sender는 new gcm.Sender(API_Key)를 가리키고 있는데요. 이 sender가 send메서드를 통해 실제로 푸시를 전송하게 됩니다. send에 대한 파라미터로는 위에서 설정한 message 정보, token정보를 담은 registrationsId, 4는 푸시 전송에 실패하였을 경우 재전송하는 횟수를 의미하고, 마지막 파라미터는 그에 대한 콜백값을 핸들링해주는 부분입니다.

// 이렇게 총 3번의 포스팅에 걸쳐 푸시기능과 apns, gcm에 대해서 알아보았습니다. 이번 포스팅을 통해서 nodejs를 이용하여 푸시기능을 구현하려고 하는 분들에게 작은 도움이 되었기를 바라겠습니다. 감사합니다.
  res.send('respond with a resource');
});

router.post('/add', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req)
    res.send('respond with a resource');
});

router.post('/delete', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req)
    res.send('respond with a resource');
});


module.exports = router;