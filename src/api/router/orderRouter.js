var db = require('../db.js');
var bodyparser = require('body-parser');
var url = require('url');
var urlencode = bodyparser.urlencoded({extended: true});

module.exports={
    order:function(app){
        app.get("/order_getAll", function(request, response){
           var obj = request.query;
           var pagNo = obj.pagNo || 1;
           var qty = obj.qty || 10;
           var skip = (pagNo-1)*qty;
           var len = obj.len || 1;
           var limits = qty*len;
            var statement = `select * from orders limit ${skip},${limits}`;
            console.log(statement);
            db.selects(statement, function(result){
                for(var idx in result){
                    console.log(idx);
                    var res = JSON.parse(result[idx].orderContent);
                    result[idx].orderContent = '';
                    for(var i=0; i<res.length; i++){
                        result[idx].orderContent += `${res[i].menuName}*${res[i].count},`;
                    }
                    result[idx].orderContent.slice(0,-1);
                }
                response.send(result);
            });
        });
        app.get('/order_update', function(req, res){
            var sql = `update orders set `;
            for(var key in req.query){
                if(key =='orderId'){
                    continue;
                }else if(key == 'orderTime' || key == 'orderContent'){
                    sql+=`${key}='${req.query[key]}', `;
                    continue;
                }
                sql += `${key}=${req.query[key]}, `;
            }
            sql = sql.slice(0,-2);
            sql+=`  where orderId=${req.query.orderId};`;
            db.update(sql, function(result){
                res.send(result)
            })
        });
        app.get('/order_del', function(req, res){
            db.deletes('delete from orders where orderId='+req.query.orderId, function(result){
                res.send(result);
            })
        })
        app.post('/order_selectSome', urlencode, function(req, res){
            var statement = '';
            for(var key in req.body){
                statement = `select * from orders where ${key}  like "%${req.body[key]}%"`;
            }
            db.selects(statement, function(result){
                res.send(result);
            })
        });
        app.post('/order_insert', urlencode, function(req, res){
            var statement = `insert into orders values (`;
            for(var key in req.body){
                statement += `${req.body[key]},`;
            }
            statement = statement.slice(0, -1);
            statement += `)`;
            db.insert(statement, function(result){
                res.send(result);
            })
        })
    }
}