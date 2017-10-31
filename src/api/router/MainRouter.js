var path = require('path');
var bodyParser = require('body-parser');
var orderRouter = require('./orderRouter.js');
<<<<<<< HEAD
var menuRouter = require('./menuRouter.js');
var express = require('express');
=======
>>>>>>> 5fbf827b87f02403e7026eb4aee9326f644bf47b
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
		app.listen(5555);
<<<<<<< HEAD
		app.use(express.static('temp'));
		orderRouter.order(app);
		menuRouter.menuRouter(app);
=======
		// app.use(express.static(path.join(__dirname,  '../../client')));
		// putawayRouter.Register(app);
		// userRouter.Register(app);
		// app.use('/goods', goodsRouter);
		// app.use('/producer', producerRouter);
		// app.use(bodyParser.urlencoded({extended: false}));
		// WSRouter();
		orderRouter.order(app);
>>>>>>> 5fbf827b87f02403e7026eb4aee9326f644bf47b
	}
}