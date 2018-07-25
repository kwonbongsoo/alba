"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  getPost(no, successFn, errorFn) {
    no = parseInt(no)
    this.connection.query(
        'select title, text, no from post limit ?, 80;',
        [no],
      function (error, result) {
        if (error) {
            console.log(error)
          errorFn(error)
        } else {
            successFn(result)
        }
    })
  },

  getProduct(successFn, errorFn) {
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

  
} // module