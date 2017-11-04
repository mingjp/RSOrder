<template>
    <el-container>
        <el-header height='100px'>订单
        </el-header>
        <el-main>
            <ul class="cuisine">

                <li v-for="(obj,idx) in ordersList">
                    <figure class="clearfix">
                        <img :src="'http://10.3.131.26:5555/'+obj.menuImg">
                        <figcaption>
                            <h4>{{obj.menuName}}</h4>
                            <p>{{obj.menuDescribe}}</p>
                            <p>
                                <span>￥{{obj.menuPrice}}</span>
                                
                            </p>

                        </figcaption>
                    </figure>
                    <div class="delete" @click.stop.prevent="orderDelete(idx)"><span class="inner el-icon-delete"></span></div>
                    <div class="cartcontrol" >
                        <transition name="move">
                            <div class="cart-decrease "  v-show="obj.count>0" @click.stop.prevent="decreaseCart(idx)">
                                <span class="inner el-icon-remove"></span>
                            </div>
                        </transition>
                        <div class="cart-count"  v-show="obj.count>0">{{obj.count}}</div>
                        <div class="cart-add el-icon-circle-plus" @click.stop.prevent="addCart(idx)"></div>
                    </div>
                    
                </li>
            </ul>
            <div style="position:fixed;bottom:200px;right:20px;font-size:50px;">
            总价：￥<span>{{totalPrice}}</span>
                <el-button type="success" style="width:220px;height:120px;border-radius:13px;" @click.stop.prevent="account">下单</el-button>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import './orders.scss'
    import http from '../../utils/httpClient.js'
    import router from '../../router'
    import io from '../../utils/socket.io.min.js';
    var socket = io.connect('http://localhost:5544');
    export default {
        data:function(){
            return{
                ordersList:[],
                totalPrice: 0
            }
        },
        methods:{

            orderView:function(){
                var dataset = this.$store.state.dataset.concat(this.$store.state.Order)
                this.ordersList = dataset;
                var _this = this; 
                this.ordersList.forEach(function(item,idx){
                    _this.totalPrice += item.menuPrice*item.count;

                })

                
            },

            addCart(idx) {

                this.ordersList[idx].count++;

                this.totalPrice += this.ordersList[idx].menuPrice*1;


                
            },

            decreaseCart(idx) {
                this.ordersList[idx].count--;
                if(this.ordersList[idx].count <= 0){
                    this.ordersList[idx].count = 1;
                    return;
                }
                this.totalPrice -= this.ordersList[idx].menuPrice*1;
                
            },

            orderDelete(idx) {
                this.$confirm('是否删除?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).then(() => {
                    this.totalPrice -= this.ordersList[idx].menuPrice*this.ordersList[idx].count;
                    this.ordersList.splice(idx,1);
                })
                
            },

            account(){
                if(this.ordersList.length == 0){
                    return;
                }
                var arr = [];
                var params = new Object();
                params.orderId = parseInt(Math.random()*10000);
                
                this.ordersList.forEach(function(item){
                    var res = new Object();
                    res.count = item.count;
                    res.menuName = item.menuName;   
                    res.menuPrice = item.menuPrice;
                    arr.push(res)
                })
                params.orderContent = JSON.stringify(arr);
                params.orderPrice = this.totalPrice;
                params.orderStatus = 0;
                params.orderTime = new Date().toLocaleString();
                params.orderRemark = '';
                var self = this;
                socket.emit('account',JSON.stringify({params: params}));
                http.post({
                    vm: this,
                    url: 'order_insert',
                    params: params
                }).then(res => {
                    self.$parent.show =4;
                    self.$store.state.orderId = params.orderId;
                    router.push({name:'my'})
                })
                
            }
        },
        mounted:function(){
            this.orderView();
        }
        
    }
</script>

<style>
    
</style>