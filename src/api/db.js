var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '10.3.131.14',
  user     : 'myuser',
  password : '123',
  database : 'rsorder'
});
 
connection.connect();
 
// connection.query('select * from user', function (error, results) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0]);
// });
// connection.end();

module.exports = {
    selectAll: function(table, callback){
        connection.query('select * from ' + table, function(error, results){
            if(error) throw error;
            callback(results);
        });
        connection.end();
    },
    selectSome: function(statement, callback){
      // select * from table 条件 改变的信息 where 条件（可不写，自动匹配全部字段）
      connection.query(statement, function(error, results){
          if(error) throw error;
          callback(results);
      });
      connection.end();
    },
    updata: function(statement, callback){
      // update table set 改变的信息 where 条件（可不写，自动匹配全部字段）
      connection.query(statement, function(error, results){
        if(error) throw error;
        callback(results);
      });
      connection.end();
    }
}