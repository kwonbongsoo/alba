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
  },
  add(name, price, img_path, successFn, errorFn) {
    this.connection.query(
      'insert into product(name, price, img_path)\
       values(?,?,?)',
      [name, price, img_path],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  update(name, price, img_path, successFn, errorFn) {
    
  }
  
} // module