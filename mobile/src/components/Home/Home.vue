<template>
   
        <div class="main_shouye">

            <el-carousel :interval="2000" arrow="always">
                <el-carousel-item v-for="item in imgary">
                <img :src='item'>
                </el-carousel-item>
            </el-carousel>

            <div class="main_c clearfix">
                <h3>本店招牌(人气招牌菜)</h3>
                <figure>
                    <img src="src/assets/menuImg/1.jpg">
                    <figcaption>
                        <p>牡丹花开</p>
                        <h4>49.90</h4>
                        <button @click="addOrder($event)">立即下单</button>
                    </figcaption>
                </figure>
                
                <figure>
                    <img src="src/assets/menuImg/2.jpg" >
                    <figcaption>
                        <p>豆腐香片</p>
                        <h4>69.90</h4>
                        <button @click="addOrder($event)">立即下单</button>
                    </figcaption>
                </figure>

            </div>
            <div class="main_rem">
                <h3>今日推荐</h3>
                <img src="src/assets/menuImg/4.jpg" price="33" name="凉拌豆芽" @click="detalis($event)">
                <img src="src/assets/menuImg/5.jpg" price="33" name="凉拌粉丝"@click="detalis($event)">

            </div>

            <div class="main_pin">
                <h3>客户评论</h3>
                <ul>
                    <li v-for="(obj,index) in reviewData">
                        <p>
                            <i class="el-icon-edit-outline"></i>
                            <el-rate
                            v-model="obj.reviewGrade"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                            </el-rate>
                            <i class="time">{{obj.reviewTime}}</i>
                        </p>
                        
                        <p>{{obj.reviewContent}}</p>
                    </li>
                </ul>
                
            </div>
            
        
            
        </div>
        
       
        
    </div>
</template>

<script type="text/javascript">
    import './Home.scss'
    import  router from '../../router/'
    import http from '../../utils/httpClient.js';
    import $ from 'jquery'
    
    export default {
        data:function(){
            return{
                imgary:['src/assets/menuImg/1.jpg','src/assets/menuImg/2.jpg','src/assets/menuImg/3.jpg','src/assets/menuImg/4.jpg','src/assets/menuImg/5.jpg'],
                reviewData:[],
                dataset:[],

            }
        },
        mounted:function(){
            var self = this;
                http.get({
                    url: 'review',
                }).then(res => {
                    self.reviewData = res.data.reverse();
            })
        },
        methods:{
            detalis($event) {
            
                if($event.target.tagName =='I'){
                    return
                }
                var res = $event.currentTarget;
                var src = $(res).attr('src');
                
                var price = $(res).attr('price');
                var menuName = $(res).attr('name');
                this.$alert('<img src='+src+'><h4>'+menuName+'</h4><p>'+price+'</p>', {
                  dangerouslyUseHTMLString: true,
                  closeOnClickModal:true,
                  confirmButtonText:'加入订单'
                }).then((comfirm)=>{
                    var obj = new Object();
                    obj.menuName = menuName;
                    obj.menuPrice = price;
                    obj.menuImg = src;
                    obj.count = 1;
                    this.dataset.push(obj);
                    this.$store.state.Order = this.dataset;
                    
                });
            },
            addOrder($event){
                var res1 = $event.currentTarget.parentNode.parentNode;
                var src = $(res1).attr('src');
                var price = $(res1).find('h4').text();
                var menuName = $(res1).find('p').text();
                var obj1 = new Object();
                obj1.menuName = menuName;
                obj1.menuPrice = price;
                obj1.menuImg = src ;
                obj1.count = 1;
                this.dataset.push(obj1)
                this.$store.state.Order = this.$store.state.Order.concat(this.dataset);
                this.$message({
                        type: 'success',
                        message: '已加入订单!'
                    });
            }
        }
        
    }
</script>