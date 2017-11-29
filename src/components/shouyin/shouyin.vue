<template>
	<div id="shouyin">
		<div></div>
		<div class="shouyin_left">
			<p @click = "shouyin">收银</p>
			<p @click="order">订单</p>
			<p @click="upOrder">挂单</p>
		</div>
		<div class="shouyin_right">
			<div class="right_content">
				<div v-if="shouyinshow">
					<div class="shouyin_order">
						<div class="tables">
							<table>
								<thead>
									<tr>
										<th class="name">品名</th>
										<th class="price">价钱</th>
										<th class="num">数量</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(obj, index) in orderData">
										<td v-for="(value, key) in obj" :class="key">{{value}}</td>
									</tr>
								</tbody>
							</table>
							<p>总计{{total}}元</p>
						</div>
						<button @click="delScr">清空</button>
						<button @click="uporder">挂单</button>
						<h3 @click="pay">结算</h3>
					</div>
					<div class="shouyin_menu">
						<div class="shouyin_menu_left">
							<p v-for="(value, index) in menuTypeData"  @click="getMenu($event, value.menuType)">{{value.menuType}}</p>
						</div>
						<div class="shouyin_menu_content">
							<div class="box" v-for="(obj,index) in datas" :name = "obj.menuName" @click="book($event,obj.menuName,obj.menuPrice)">
								<img v-for="(value, key) in obj" name="2" v-if="key == 'menuImg'" :src="baseUrl+value" />
								<div class="cover">
									<p class="menuName" v-for="(value, key) in obj" v-if="key == 'menuName'" >{{value}}</p>
									<p class="menuPrice" v-for="(value, key) in obj" v-if="key == 'menuPrice'" >{{value}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="ordershow">
					<order_part></order_part>
				</div>
				<div v-if="upOrdershow">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery'  
	import 'bootstrap/dist/css/bootstrap.min.css'
	import 'jquery-form/dist/jquery.form.min.js'
	import order_part from '../order_part.vue'
	import io from '../../utils/socket.io.min.js';
	import common from '../../common/common.js'
	var socket = io.connect(common.baseUrl);
	export default {
		data:function(){
			return {
				ordershow:false,
				shouyinshow:true,
				upOrdershow:false,
				orderData:[],
				menuTypeData:[],
				baseUrl:common.baseUrl,
				datas:[],
				total:0,
				upOrderData:[]
			
			}
		},
		props:['name'],
		components: {
			order_part
		},
		created:function(){
			var self = this;
			$.post(self.baseUrl+'getType', {}, function(result){
				self.menuTypeData = result;
				$.post(self.baseUrl+'shouyinGetMsg', {name:self.menuTypeData[0].menuType}, function(result){
					self.datas = JSON.parse(result);
					for(var i=0; i<result.length; i++){
					
					}
				})
			},'json')
		},
		methods:{
			getMenu:function($event, name){
				var self = this;
				$.post(self.baseUrl+'shouyinGetMsg', {name:name}, function(result){
					self.datas = JSON.parse(result);
				})
			},
			book:function($event, name, price){
				this.orderShow = true;
				var obj = new Object();
				obj.menuName = name;
				obj.menuPrice = price;
				obj.count = 1;
				if(this.orderData.length>0){
					for(var i=0;i< this.orderData.length; i++){
						if(this.orderData[i].menuName === name){
							this.orderData[i].count +=1;
							this.total +=  obj.menuPrice*1;
							break;
						}
						if(i == this.orderData.length-1){
							this.orderData.push(obj);
						this.total +=  obj.menuPrice*1;
							break;
						}
					}
				}else{
					this.orderData.push(obj);
					this.total +=  obj.menuPrice*1;
				}
			},
			delScr:function(){
				this.orderData = [];
				this.total = 0;
			},
			pay:function(){
				var params = new Object();
				params.orderId = parseInt(Math.random()*10000);
				params.orderContent = JSON.stringify(this.orderData);
				var date = new Date().toLocaleString();
				params.orderStatus = 0;
				params.orderTime = date;
				params.orderPrice = this.total;
				var obj = {
					'orderId':params.orderId,
					'orderContent':this.orderData
				}
				console.log(obj);
				var str = encodeURI(JSON.stringify(obj));
				$.post(this.baseUrl+'shouyinInsert', params, function(){
						socket.emit('addMsg',str);
						socket.on('errMsg', function(data){
							alert('此订单已存在');
					})
				});
			}	,
			shouyin:function(){
				this.shouyinshow = true; 
				this.ordershow = !this.shouyinshow;
				this.upOrdershow = !this.shouyinshow;
			},
			order:function(){
				this.ordershow = true;
				this.shouyinshow = !this.ordershow;
				this.upOrderShow = !this.ordershow;
			},
			upOrder:function(){
				this.upOrdershow = true;
				this.shouyinshow = !this.upOrdershow;
				this.ordershow = !this.upOrdershow;
			},
			uporder:function(){
				this.upOrderData.push(this.orderData);
				this.orderData = new Array();
			}
		}
	}
</script>
<style lang="scss">
	html,body{
		height:100%;
	}
	#shouyin{
		$mainColor:#EC8004;
		$color:#984907;
		.shouyin_left{
			height:100%;
			padding:80px 50px;
			background-color:$color;
			float:left;
			p{
				width:188px;
				height:60px;
				background-color:$mainColor;
				line-height:60px;
				text-align:center;
				border-radius:10px 10px;
				color:#fff;
				font-size:20px;
				font-weight:blod;
				margin:20px;
			}
		}
		.shouyin_right{
			overflow:hidden;
			background-color:#FFFFFF;
			.right_content{
				.shouyin_order{
					float:left;
					width:280px;
					border-right:2px solid #ddd;
					.tables{
						min-height:350px;
					}
					tr{
						height:40px;
					}
					.name{
						width:140px;
					}
					.price{
						width:80px;
					}
					.num{
						width:50px;
					}
					p{
						line-height:24px;
						color:$mainColor;
						text-align:center;
					}
					button{
						display:inline-block;
						width:136px;
						margin:0;
						height:70px;
						background-color:#ddd;
						text-align:center;
						line-hieght:80px;
					}
					h3{
						margin:0;
						background-color:$mainColor;
						text-align:center;
						line-height:80px;
						color:#000;
					}
				}
				.shouyin_menu{
					overflow:hidden;
					.shouyin_menu_left{
						float:left;
						width:152px;
						p{
							margin:0;
							text-align:center;
							background-color:$mainColor;
							line-height:30px;
							border-bottom:1px solid #fff;
						}
					}
					.shouyin_menu_content{
						overflow:hidden;
						.box{
							margin:5px;
							position:relative;
							float:left;
							border:1px solid $mainColor;
							border-radius:5px 5px;
							img{
								width:140px;
								height:140px;
							}
							.cover{
								width:100%;
								opacity:0.8;
								position:absolute;
								bottom:0;
								left:0;
								background-color:#666;
								.menuName{
									font-size:16px;
									line-height:24px;
									color:#fff;
									margin:0;
								}
								.menuPrice{
									margin:0;
									font-size:16px;
									color:#fff;
									line-height:20px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>