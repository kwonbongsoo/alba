"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  confirm(token, successFn, errorFn) {
    this.connection.query(
        'select chk from push where token= ?',
        [token],
      function (error, result) {
        if (error) {
            console.log(error)
          errorFn(error)
        } else {
            successFn(result)
        }
      })
  },
  add(token, successFn, errorFn) {
    this.connection.query(
      'insert into push(token, chk)\
       values(?,"have")',
      [token],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn('SUCCESS')
        }
      })
  },
  list(successFn, errorFn) {
    this.connection.query(
      'select token from push',
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
    })
  }

  // deletePost(no, successFn, errorFn) {
  //   this.connection.query(
  //     'delete from post where no = ?',
  //     [no],
  //     function (error, result) {
  //       if (error) {
  //         errorFn(error)
  //       } else {
  //         successFn(result)
  //       }
  //   })
  // }
  
} // module