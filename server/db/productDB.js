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
  add(name, price, price1, imageName, img_path, successFn, errorFn) {
    this.connection.query(
      'insert into product(name, price, price1,imageName, img_path)\
       values(?,?,?,?,?)',
      [name, price, price1, imageName, img_path],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  update(name, price, price1, imageName, img_path, no, successFn, errorFn) {
    this.connection.query(
      'update product set name = ?, price = ?, price1 = ?, imageName = ?, img_path = ? where no = ?',
      [name, price, price1, imageName, img_path, no],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  delete(no, successFn, errorFn) {
    this.connection.query(
      'delete from product where no = ?',
      [no],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  }
  
} // module