var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '10.3.131.14',
  user     : 'myuser',
  password : '123',
  database : 'rsorder'
});
 
connection.connect();

module.exports = {
    insert: function(statement, callback){
      connection.query(statement, function(error, results){
        if(error) throw error;
        callback(results);
      });
      connection.end();
    },
    deletes: function(statement, callback){
      connection.query(statement, function(error, results){
        if(error) throw error;
        callback(results);
      });
      connection.end();
    },
    selects: function(statement, callback){
      connection.query(statement, function(error, results){
          if(error) throw error;
          callback(results);
      });
      connection.end();
    },
    update: function(statement, callback){
      connection.query(statement, function(error, results){
        if(error) throw error;
        callback(results);
      });
      connection.end();
    }
}