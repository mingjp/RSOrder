/* 
* @Author: Marte
* @Date:   2017-11-02 15:15:04
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-03 17:59:21
*/
var db = require('../db.js');
var bodyparser = require('body-parser');
var url = require('url');
var urlencode = bodyparser.urlencoded({extended: true});

module.exports={
    order:function(app){
       
        app.post('/order_insert', urlencode, function(request, response){
            str = `'${request.body.orderId}','${request.body.orderContent}','${request.body.orderPrice}','${request.body.orderStatus}','${request.body.orderTime}'`;
            ;
            var sql = `insert into orders (orderId,orderContent, orderPrice, orderStatus, orderTime) values(${str});`;
            
            db.insert(sql, function(result){
                response.send(sql);
            })
        })

        app.get('/pay', function(request, response){
            var params = request.query.orderId;
            
            db.selects("select * from orders where orderId="+params, function(rows){
                
                response.send(rows);
            })
            
        })

        app.get('/pay_update', function(request, response){
            var params = request.query.orderId;
            
            db.update("update orders set orderStatus=1 where orderId="+params, function(rows){
                
                response.send(rows);
            })
            
        })

        app.get('/rate_add',function(request,response){
           
            var str = '';
            var params = '';
            for(var attr in request.query){
                str+= attr+',';
                params+='"'+request.query[attr]+'",';
            }
            str = str.slice(0,-1);
            params = params.slice(0,-1);
            var userModSql = 'insert into review ('+str+') values ('+params+')';
          
            db.insert(userModSql, function(rows){
                response.send(rows);
            })


        })
    }
}