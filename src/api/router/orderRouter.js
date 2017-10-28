var db = require('../db.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports={
    order:function(app){
        app.get("/order_getAll", function(request, response){
            console.log(app)
            db.selectAll('user', function(result){
                response.send(result);
            });
        });
    }
}