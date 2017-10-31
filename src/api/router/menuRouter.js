var db = require('../db.js');
var multer = require('multer');
var url = require('url');
var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({extended: false});
var upload = multer({dest: './temp/'});
var fs = require('fs');
module.exports = {
	menuRouter:function(app){
		app.post('/addOne', upload.array('photos',20),function(request, response){
			var arr = new Array();
			var str_url = '';
			var str = '';
			for(var i=0; i<request.files.length; i++){
				console.log(request.files[i]);
				fs.rename(request.files[i].path, './temp/'+request.files[i].filename+'.jpg', function(err){
					if(err){
						throw err;
					}
				})
				str_url += request.files[i].filename+'.jpg,';
			}
			str_url = str_url.slice(0,-1);
			str = `'${request.body.menuName}','${request.body.menuType}','${str_url}',
			'${request.body.menuPrice}','${request.body.menuDescribe}'`;
			;
			var sql = `insert into menu (menuName, menuType, menuImg, menuPrice, menuDescribe) values(${str})`;
			db.insert(sql, function(result){
				var resultObj = {status:true, data: result};
				var resultStr = JSON.stringify(resultObj);
				response.end(resultStr);
			}) 
		} );
		app.get('/getMsg',  function(request, response){
			var sql = 'select * from menu';
			db.selects(sql, function(result){
				response.send(result);
			})
		});
		app.post('/getType', function(request, response){
			var sql = 'select menuType from menu group by menuType';
			db.selects(sql, function(result){
				response.send(result);
			})
		});
		app.get('/updateMenu', function(request, response){
			var queryObj = request.query;
			var sql = `update menu set menuName=${queryObj.menuName},
			menuType=${queryObj.menuType},menuImg=${queryObj.menuPrice},
			menuDescribe=${queryObj.menuDescribe} where id=${queryObj.menuId}`;
			db.update(sql, function(result){
				var resultObj = {status:true, data: result};
				var resultStr = JSON.stringify(resultObj);
				response.end(resultStr);
			})
		})
		app.get('/deleteMenu', function(request, response){
			console.log(request.query);
			var sql = `delete from menu where menuId=${request.query.menuId}`;
			response.end();
		});
		app.get('/selectMenu', function(request, response){
			console.log(request.query);

			var sql = `select * from menu where menuName = regexp`;
			reponse.end();
		})

	}
}