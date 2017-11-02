<template>
	<div id="menu">
		<div>
			<datagrid :api="baseUrl+'getMsg'" :modify="baseUrl+'updateMenu'" 
			:delete="baseUrl+'deleteMenu'" :selects="baseUrl+'selectMenu'"></datagrid>
		</div>
		<div class="menu_Masked added" v-if="addShow">
			<div class="menu_prop"></div>
			<div class="menu_box">
				<div class="form-inline">
					<p>
						<div class="form-group">
					  		<label for="exampleInputName2">菜品名称</label>
					  		<input type="text" class="form-control" id="exampleInputName2" v-model="menuName">
						</div>
						<div class="form-group">
					  		<label for="exampleInputEmail2">菜品类型</label>
					  		<select class="form-control" v-on:change="otherMenuType">
					  			<option v-for="(value, index) in menuType" :value="value">{{value}}</option>
					  		  	<option value="其它">其它</option>
					  		</select>
					  		<input type="text" v-show="showNewMenuType" class="form-control" id="exampleInputAmount" v-model="otherType">
						</div>
					</p>
				  	<p>
			  			<div class="form-group">
			  		  		<label for="exampleInputName2">菜品价钱</label>
			  		  		<input type="text" class="form-control" id="exampleInputName2" v-model="menuPrice">
			  			</div>
			  			<div class="form-group">
			  		  		<label for="exampleInputEmail2">菜品描述</label>
			  		  		<textarea class="form-control" rows="3" v-model="menuDescribe"></textarea>
			  			</div>
				  	</p>
			  		<p>
		  				<form class="form-group" id="formImg">
		  			  		<label for="exampleInputName2">菜品图片</label>
		  			  		<input type="file" class="form-control" v-on:change="s" name="photos" id="fileImg" multiple>
		  				</form>
		  				<div id="showImg"></div>
			  		</p>
			  		<p>
			  			<button type="submit" class="btn btn-default btn_sure" @click="postNewOneMsg">确定</button>
			  			<button class="btn btn-default btn_sure" @click="cancelPostNewOneMsg">取消</button>
			  		</p>
				  	
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import $ from 'jquery'  
	import 'bootstrap/dist/css/bootstrap.min.css'
	import 'jquery-form/dist/jquery.form.min.js'
	import datagrid from '../../common/datagrid.vue'
	export default{
		data:function(){
			return {
				urls:[],
				menuType:[],
				showNewMenuType:false,
				type:"",
				menuName:'',
				menuPrice:'',
				menuDescribe:'',
				otherType:'',
				addShow:false,
				baseUrl:'http://10.3.131.26:5555/'
			}
		},
		methods:{
			handleAdd:function(){
				this.addShow = true;
				var self = this;
				$.post(this.baseUrl+'getType', {}, function(result){
					self.menuType = [];
					for(var i=0; i<result.length; i++){
						self.menuType.push(result[i].menuType);
					}
				})
			},
			s:function(){
				var $this = $('#fileImg')[0];
				var urls = this.urls;
				urls = new Array();
				var len = $this.files.length;
				var num = 0;
				for(var i=0; i< len; i++){
					var file = $this.files[i];
					var reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(){
						num += 1;
						urls.push(this.result);
						if(num == len){
							$('#showImg').empty();
							$.each(urls, function(idx, item){
								$('<img/>').attr({'src':item}).appendTo('#showImg');
							})
						}
					}
				}
			},
			otherMenuType:function(){
				this.showNewMenuType = $('select').val() == '其它'? true :false;
			},
			postNewOneMsg:function(){
				var self = this;
				var msg = new Object();
				msg.menuName = self.menuName;
				msg.menuPrice = self.menuPrice;
				msg.menuDescribe = self.menuDescribe;
				self.type = self.showNewMenuType == true ? self.otherType : $('select').val();
				msg.menuType = self.type;
				self.showNewMenuType = false;
					var options = {
						url: self.baseUrl+'addOne',
						target: "#result",
						type:'post',
						data:msg,
						dataType:'json',
						success:function(result){
							console.log(result);
							if(result.status){
								self.addShow = false;
								self.menuName = '';
								self.menuPrice = '';
								self.menuDescribe = '';
								self.type = '';
							}
						}

					}
				 	$('#formImg').ajaxSubmit(options);
				 	return false;			
			},
			cancelPostNewOneMsg:function(){
				this.addShow = false;
			}
		},
		components:{
			datagrid:datagrid
		}
	}
</script>
<style lang="scss">
	.menu_header{
		height:45px;
		background-color:#ddd;
		.btn_added{
			float:right;
		}
	}
	.added{
		.menu_prop{
			width:100%;
			height:100%;
			position:fixed;
			top:0;
			left:0;
			background-color:#fff;
			opacity:0.8;
		}
		.menu_box{
			padding:10px;
			background-color:#e7e7e7;
			position:absolute;
			top:50%;
			left:50%;
			transform:translate(-50%, -50%);
			p{
				margin:20px;
			}
			#showImg{
				img{
					width:50px;
					height:50px;
					margin:5px;
				}
			}
		}
		
		
	}
</style>