<template>
<div class="menu">
    <div class="menu_top">
        <h3>分类</h3>
        <h3>菜单</h3>
    </div>
    
    <div class="goodslist">

            <div class="g_left">
                
                <ul class="type" >

                <li v-for="(obj,index) in dataType" :class="{active:index==aa}" @click="soup(obj.menuType,index)">{{obj.menuType}}</li>

                </ul>

            </div>

            <div class="g_right">    

                <ul class="cuisine">

                    <li v-for="(obj,idx) in dataset">

                        <figure class="clearfix" @click="detalis($event)">
                            <img :src="baseUrl+obj.menuImg">
                            <figcaption>
                                <h4>{{obj.menuName}}</h4>
                                <p>{{obj.menuDescribe}}</p>
                                <p>
                                    <span>￥{{obj.menuPrice}}</span>
                                    
                                </p>

                            </figcaption>
                        </figure>
                        
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

            </div>

        </div>
        <loading v-show="loadingShow"></loading> 

</div> 
        
 
    
</template>

<script>
    import './goodsList.scss'
    import  router from '../../router/'
    import http from '../../utils/httpClient.js'
    import $ from 'jquery'
    import Vue from 'vue'
    import loading from '../loading/loading.vue'
    import common from '../../../../src/common/common.js'
    export default{
        data:function(){
            return {
                dataset:[],
                dataType:[],
                aa:0,
                Order:[],
                loadingShow:false,
                baseUrl:common.baseUrl

            }
        },

        components:{
            loading
        },

        mounted:function(){
            var self = this;
            http.post({
                url: 'getType',
                vm:self
            }).then(res => {
                
                self.dataType = res.data
                this.soup(self.dataType[0].menuType);
                
            })
        },
     
        methods:{
           
            soup:function(type,index){

                
                this.aa=index; 
                var self = this;
                http.get({
                    url: 'soup',
                    vm:self,
                    params:{type:type}
                }).then(res => {
                    res.data.forEach(function(item){
                        item.count = 0;
                    })
                    self.dataset = res.data
                })
            },

            detalis($event) {
            
                if($event.target.tagName =='I'){
                    return
                }
                var res = $event.currentTarget;
                var src = $(res).find('img').attr('src');
                var goodsName = $(res).find('h4').text();
                var price = $(res).find('span').text();
                this.$alert('<img src='+src+'><h4>'+goodsName+'</h4><p>'+price+'</p>', {
                  dangerouslyUseHTMLString: true,
                  closeOnClickModal:true,
                  confirmButtonText:'加入订单'
                });
            },

            addCart(idx) {
                
                this.dataset[idx].count +=1;
                var self = this;
                for(var i=0;i<this.Order.length;i++){

                    if(this.dataset[idx].menuId == this.Order[i].menuId){
                        this.Order[i].count +=1;                     
                        return;
                    }
                    
                }
                var order = JSON.parse(JSON.stringify(this.dataset[idx]))
               
                this.Order.push(order);
                
                this.$store.state.dataset=this.Order;

            },

            decreaseCart(idx) {
                
                if (this.dataset[idx].count) {
                    this.dataset[idx].count--;

                    for(var i=0;i<this.Order.length;i++){

                        if(this.dataset[idx].menuId == this.Order[i].menuId){
                            this.Order[i].count --;                     
                            return;
                        }
                    
                    }
                    
                }
            }
           
        }
    }
    
</script>

