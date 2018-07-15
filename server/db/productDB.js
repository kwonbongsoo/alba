"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  get(successFn, errorFn) {
    this.connection.query(
        'select * from product',
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  }
//   add(type, othername, mymno, kinds, othermno, successFn, errorFn) {
//     this.connection.query(
//       'insert into alert(othername, mymno, kinds, date, \
//       confirm, type, othermno) values(?,?,?,now(),0,?,?)',
//       [othername, mymno, kinds, type, othermno],
//       function (error, result) {
//         if (error) {
//           errorFn(error)
//         } else {
//           successFn(result)
//         }
//       })
//   },
  
} // module