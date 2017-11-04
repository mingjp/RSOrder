var path = require('path');
var goodslistRouter = require('./goodslistRouter.js');
var orderRouter = require('./orderRouter.js');
module.exports = {
	Register: function(express){
		var app = express();
		app.all('*', function(req, res, next) {
		    // res.writeHead(200, {"Content-Type"})
		    res.header("Access-Control-Allow-Origin", "*");
		    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
		    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		    res.header("X-Powered-By",' 3.2.1')
		    if(req.method=="OPTIONS") {
		      res.send(200);/*让options请求快速返回*/
		    } else{
		      next();
		    }
		});

		goodslistRouter.goodslist(app);
		orderRouter.order(app,http)

		var http = require('http').Server(app);
		var io = require('socket.io')(http);
		http.listen(5544);

		io.on("connection", function(client){

				
			client.on("account", function(data){
				io.emit("showMsg",data)
				console.log(data)
			});


		})

	}
}