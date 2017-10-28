var db = require('../db.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports={
    order:function(app){
        app.get("/order_getAll", function(request, response){
            db.selectAll('user', function(result){
                response.send(result);
            });
        });
        app.post('/order_getSome', urlencode, function(req, res){
            var statement = '';
            for(var key in req.body){
                console.log(key);
                statement = `select * from user where ${key}  = "${req.body[key]}"`;
            }
            db.selectSome(statement, function(result){
                res.send(result);
            })
        })
    }
}