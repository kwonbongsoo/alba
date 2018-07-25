"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  login(id, pwd, bcrypt, successFn, errorFn) {
    this.connection.query(
        'select no from users where id = ? and pwd = ?',
        [id, pwd],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn({result: 'SUCCESS'})
          // if (result.length === 0) {
          //   successFn({success: false, msg: '해당 유저가 존재하지 않습니다.'})
          // } else {
          //   if (!bcrypt.compareSync(pwd, result[0].pwd)) {
          //     successFn({success: false, msg: '비밀번호가 일치하지 않습니다.'})
          //   } else {
          //     successFn({success: true})
          //   }
          // }
        }
    })
  },
  join(id, pwd, bcrypt, successFn, errorFn) {
    pwd = bcrypt.hashSync(pwd)
    this.connection.query(
        'insert into users values(?, ?)',
        [id, pwd],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          if(result)
            successFn(result)
        }
    })
  }

  
} // module