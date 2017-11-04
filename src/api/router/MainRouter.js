var userRouter = require('./userRouter.js');
var rateRouter = require('./rateRouter.js');
var orderRouter = require('./orderRouter.js');
var menuRouter = require('./menuRouter.js');
var shouyinRouter = require('./shouyinRouter.js');
var express = require('express');
module.exports = {
	Register: function(express){
		var app = express();
		app.all('*', function(req, res, next) {
		    // res.writeHead(200, {"Content-Type"})
		    res.header("Access-Control-Allow-Origin", "*");
		    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
		    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		    res.header("X-Powered-By",' 3.2.1');
		    res.header("Content-type", "text/plain;charset=UTF-8");
		    if(req.method=="OPTIONS") {
		      res.send(200);/*让options请求快速返回*/
		    } else{
		      next();
		    }
		});


		var http = require('http').Server(app);
		var io = require('socket.io')(http);
		http.listen(5555,'10.3.131.26');
		var clientName = new Array();
		var orderDatas = new Array();
		io.on("connection", function(client){
			client.on('addMsg', function(data){
				var str = decodeURI(data);
				var data1 =JSON.parse(str);
				if(orderDatas.length >0){
					for(var i=0; i<orderDatas.length; i++){
						if(orderDatas[i].orderId == data1.orderId){
							io.emit('errMsg', 'error');
							break;
						}
						if(i == orderDatas.length-1){
							orderDatas.push(data1);
							break;
						}
					}
				}else{
					orderDatas.push(data1);
				}
				io.emit("showMsg", JSON.stringify(orderDatas));
			});
			client.on('cn', function(){
				io.emit("showMsg", JSON.stringify(orderDatas));	
			})
			client.on('delteMsg', function(num){
				for(var i=0; i<orderDatas.length; i++){
						console.log(orderDatas[i].orderId, num);
					if(orderDatas[i].orderId == num){
						orderDatas.splice(i,1);
						break;
					}
				}
				io.emit('showMsg', JSON.stringify(orderDatas));
			})
		})


		app.use(express.static('temp'));
		orderRouter.order(app);
		menuRouter.menuRouter(app);
		shouyinRouter.shouyinRouter(app);
		userRouter.Register(app);
		orderRouter.order(app);
		rateRouter.rate(app);
	}
}