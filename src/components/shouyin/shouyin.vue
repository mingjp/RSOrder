<template>
	<div id="shouyin">
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
						<button>清空</button>
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
					<table class="table table-hover">
					 	<thead>
					 		<th></th>
					 		<th>订单号</th>
					 		<th>订单详情</th>
					 		<th>订单状态</th>
					 		<th>订单总价</th>
					 	</thead>
					 	<tbody>
					 		<tr v-for="(value, index) in upOrderData">
					 		</tr>
					 	</tbody>
					</table>
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
	export default {
		data:function(){
			return {
				ordershow:false,
				shouyinshow:true,
				upOrdershow:false,
				orderData:[],
				menuTypeData:[],
				baseUrl:'http://10.3.131.26:5555/',
				datas:[],
				total:0,
				upOrderData:[]
			
			}
		},
		props:['name'],
		created:function(){
			var self = this;
			$.post(self.baseUrl+'getType', {}, function(result){
				self.menuTypeData = result;
				$.post(self.baseUrl+'shouyinGetMsg', {name:self.menuTypeData[0].menuType}, function(result){
					self.datas = result;
				})
			},'json')
		},
		methods:{
			getMenu:function($event, name){
				var self = this;
				$.post(self.baseUrl+'shouyinGetMsg', {name:name}, function(result){
					self.datas = result;
				})
			},
			book:function($event, name, price){
				this.orderShow = true;
				var obj = new Object();
				obj.name = name;
				obj.price = price;
				obj.num = 1;
				if(this.orderData.length>0){
					for(var i=0;i< this.orderData.length; i++){
						if(this.orderData[i].name === name){
							console.log(i,this.orderData[i].name, name);
							this.orderData[i].num +=1;
							this.total += obj.price;
							break;
						}
						if(i == this.orderData.length-1){
							this.orderData.push(obj);
							this.total += obj.price;
							break;
						}
					}
				}else{
					this.orderData.push(obj);
					this.total += obj.price;
				}
			},
			pay:function(){
				this.orderShow = true;
			},
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
	#shouyin{
		$mainColor:#EC8004;
		$color:#984907;
		.shouyin_left{
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
						width:137px;
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