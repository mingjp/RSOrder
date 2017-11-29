/* 
* @Author: Marte
* @Date:   2017-10-30 22:37:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-03 15:00:37
*/
var db = require('../db.js');

module.exports={
    goodslist:function(app){
        app.get('/soup', function(request, response){
            var type = request.query.type;
            
            db.selects("select * from menu where menuType='"+type+"' ", function(rows){
                
                response.send(rows);
            })
            
        })

        app.post('/getType', function(request, response){
            var sql = 'select menuType from menu group by menuType';
            db.selects(sql, function(result){
                response.send(result);
            })
        })
        app.get('/serach', function(request, response){
            var key = request.query.key;
           
            db.selects("select * from menu where menuType like '%"+key+"%' or menuName like '%"+key+"%' or menuPrice like '%"+key+"%'", function(rows){
                response.send(rows);
            })
            
        })

        app.get('/review', function(request, response){
            db.selects("select * from review", function(rows){
                response.send(rows);
            })
            
        })
  
    }
}
