"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  get(successFn, errorFn) {
    this.connection.query(
        'select title, text, no from post',
      function (error, result) {
        if (error) {
            console.log(error)
          errorFn(error)
        } else {
            successFn(result)
        }
      })
  },
  add(title, text, android_text, successFn, errorFn) {
    this.connection.query(
      'insert into post(title, text, android_text)\
       values(?,?,?)',
      [title, text, android_text],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  update(title, text, android_text, no, successFn, errorFn) {
    this.connection.query(
      'update post set title = ?, text = ?, android_text = ? where no = ?',
      [title, text, android_text, no],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  deletePost(no, successFn, errorFn) {
    this.connection.query(
      'delete from post where no = ?',
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