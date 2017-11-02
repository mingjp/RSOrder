/* 
* @Author: Marte
* @Date:   2017-11-01 13:57:55
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-01 16:03:07
*/

var db = require('../db.js');


module.exports = {
    Register: function(app){

        app.get('/user', function(request, response){
            db.selects('select * from user ', function(rows){
                response.send(rows);
            })
            
        })
        app.get('/login', function(request, response){
            var userName = request.query.userName;
            db.selects('select * from user where userName="'+userName+'"', function(rows){
                response.send(rows);
            })
        })
        app.get('/user_modify', function(request, response){
            var id = request.query.userId;
            var str = '';
            var userModSql_Params = [];
            for(var attr in request.query){
                str+= attr+'=?,';
                userModSql_Params.push(request.query[attr]);
            }
            str = str.slice(0,-1);
            userModSql_Params.push(id);
            var userModSql = 'UPDATE user SET '+ str +' WHERE userId =?';
            db.update(userModSql, userModSql_Params, function(rows){
                response.send(rows);
            })
        })

        app.get('/user_delete', function(request, response){
            var id = request.query.userId;
            var userModSql = 'DELETE FROM user WHERE userId ='+id;
            db.update(userModSql, function(rows){
                response.send('true');
            })
        })

        app.get('/user_add', function(request, response){
            var id = request.query.userId;
            var str = '';
            var params = '';
            for(var attr in request.query){
                str+= attr+',';
                params+='"'+request.query[attr]+'",';
            }
            str = str.slice(0,-1);
            params = params.slice(0,-1);
            var userModSql = 'insert into user ('+str+') values ('+params+')';
            db.insert(userModSql, function(rows){
                response.send(rows);
            })
        })
    }
}