const pool = require("../config/database");

module.exports = {
    createUser: function(data,callBack){
        console.log("Inside service block");
        pool.query(
            `insert into registration(firstName,lastName,gender,email,password,number)
            values(?,?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            function(error,results,fields){
                if(error){
                  return callBack(error);
                }
                return callBack(null,results)
            }

        );
    },
    getUsers: function(callBack) {
        pool.query(
          `select id,firstName,lastName,gender,password,email,number from registration`,
          [],
          function(error, results, fields) {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      getUsersByUserId: function(id,callBack) {
        pool.query(
          `select id,firstName,lastName,gender,email,number from registration where id=?`,
          [id],
          function(error, results, fields) {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      updateUser: function(data,callBack){
          pool.query('update registration set firstName=?,lastName=?,gender=?,email=?,number=? where id=?',
          [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
          ],function(error, results, fields) {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
      deleteUser: function(data,callBack){
          pool.query(`delete from registration where id= ?`,
          [data.id],
        function(error, results, fields) {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results);
          }
        );
    },
    getUserByUserEmail: function(email,callBack){
        pool.query(`select * from registration where email= ?`,
        [email],
      function(error, results, fields) {
          if (error) {
           return callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
  }
}