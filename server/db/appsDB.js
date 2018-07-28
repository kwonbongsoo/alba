"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  getPost(successFn, errorFn) {
    this.connection.query(
        'select title, android_text as text, no from post',
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