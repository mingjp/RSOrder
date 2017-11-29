<template>
    <div class="serach">
        <ul>
            <li v-for="(obj,idx) in dataset" >
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
                    <div class="cart-add el-icon-circle-plus"  @click.stop.prevent="addCart(idx)"></div>
                </div>
            </li>
        </ul>
        <loading v-show="loadingShow"></loading>
    </div>
</template>

<script>
    import './serach.scss'
    import  router from '../../router/'
    import http from '../../utils/httpClient.js'
    import $ from 'jquery'
    import Vue from 'vue'
    import loading from '../../components/loading/loading.vue'
    import common from '../../../../src/common/common.js'
    export default{
        data:function(){
            

            return {
                dataset:[],
                searchOrder:[],
                loadingShow:false,
                baseUrl:common.baseUrl
            }
        },
        components:{
            loading,
        },
        methods:{
            

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
               console.log(this.dataset)
                var self = this;
                for(var i=0;i<this.searchOrder.length;i++){

                    if(this.dataset[idx].menuId == this.searchOrder[i].menuId){
                        this.searchOrder[i].count +=1;                     
                        return;
                    }
                    
                }
                var res = JSON.parse(JSON.stringify(this.dataset[idx]))
               
                this.searchOrder.push(res);
                
                this.$store.state.dataset=this.searchOrder;
            },

            decreaseCart(idx) {
                
                if (this.dataset.count ) {
                    this.dataset.count --;

                    for(var i=0;i<this.searchsearchOrder.length;i++){

                        if(this.dataset[idx].menuId == this.searchsearchOrder[i].menuId){
                            this.searchsearchOrder[i].count --;                 
                            return;
                        }
                    
                    }
                    
                }
            }

        },
        
        mounted:function(){
            var key = this.$store.state.searchkey;
            var self = this;
                http.get({
                url: 'serach',
                vm:self,
                params:{key:key}
                }).then(res => {
                    
                    self.dataset = res.data;
                    
                    self.dataset.forEach(function(item){
                        item.count = 0;
                    })
                    console.log(self.dataset)
                    this.$store.state.searchDataset=self.dataset;

                    console.log(this.$store.state.searchDataset)
                })
        }

    }
    
    
</script>