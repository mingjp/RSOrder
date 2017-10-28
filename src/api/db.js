var mysql = require('mysql');

//创建连接池
var pool  = mysql.createPool({
  host     : '10.3.131.14',
  user     : 'myuser',
  password : '123',
  port: 3306,
  database: 'rsorder'
});


module.exports = {
	select: function(tsql, callback){
		pool.query(tsql, function(error, rows){
			callback(rows);
		})
	}
}