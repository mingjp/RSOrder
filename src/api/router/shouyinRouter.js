var db = require('../db.js');
var multer = require('multer');
var url = require('url');
var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({extended: false});
var upload = multer({dest: './temp/'});
var fs = require('fs');
module.exports = {
	shouyinRouter:function(app){
		app.post('/shouyinGetMsg', urlencoded, function(request, response){
			var name = request.body.name;
			var sql = `select * from menu where menuType= '${name}';`;
			db.selects(sql, function(result){
				response.send(result);
			})
		})
	}
}