"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  get(no, successFn, errorFn) {
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
  add(title, text, successFn, errorFn) {
    this.connection.query(
      'insert into post(title, text)\
       values(?,?)',
      [title, text],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  update(title, text, no, successFn, errorFn) {
    this.connection.query(
      'update post set title = ?, text = ? where no = ?',
      [title, text, no],
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