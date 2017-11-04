<template>
    <div class="my">
    <ul class="details" v-show="show">
        <li v-for="(obj,index) in dataset">

            <p>订单号：{{obj.orderId}}</p>

            <ul v-for="(item,idx) in contents"> 
                <li v-for="(val,key) in item">
                    <p>{{key | zh_cn}}<span>：{{val}}</span></p>
                    
                </li>
            </ul>
            <p>总价格：{{obj.orderPrice}}</p>
            <p>下单时间：{{obj.orderTime}}</p>
        </li>
    </ul>

        
        <div class="topay" v-show="show">
            <button class="topay" @click="pay">立即支付</button>
        </div>

        <div class="review" v-show="show_r">
            <p><i class="el-icon-success"></i>支付成功</p>
            <p class="rate_x">
                <el-rate
                    v-model="value5"
                    show-score
                    text-color="#ff9900"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  score-template="{value}">
            </el-rate>
            </p>
            

            <textarea name="" v-model="text">
                
            </textarea>
            <div class="rate">
                <button @click="rate">评论</button>
                <button @click="rate_cancel">取消</button>
            </div>
            
        </div>

    </div>
</template>

<script type="text/javascript">
    import './my.scss'
    import http from '../../utils/httpClient.js'
    import zh_cn from '../../assets/zh_cn.js'
    import router from '../../router/'
    export default {
        data:function(){
            return{
                dataset:[],
                value5: 5,
                show:true,
                show_r:false,
                text:'',
                contents:[]
            }
            
        },
        methods:{
            pay:function(){
                console.log(this.dataset);
                if(this.dataset.length == 0){
                    return;
                }
                this.show = false;
                this.show_r = true;
                var params = this.$store.state.orderId
                http.get({
                    url: 'pay_update',
                    params:{orderId:params}
                }).then(res => {
                    this.$store.state.dataset=[];
                    this.$store.state.orderId='';
                    console.log(res.data)
                })

            },
            rate:function(){
                var params = new Object();
                params.reviewContent = this.text;
                params.reviewGrade = this.value5;
                params.reviewTime = new Date().toLocaleString();
                params.reviewId = parseInt(Math.random()*10000);
                http.get({
                    url: 'rate_add',
                    params:params
                }).then(res => {
                    
                    console.log(res.data)
                }).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '评论成功!'
                    });
                    router.push({name:'Home'});
                    this.$store.state.orderId = ''
                    this.$parent.show = 1;
                })

                this.text = '';

            },
            rate_cancel:function(){
                router.push({name:'Home'});
                this.$store.state.orderId = ''
                this.$parent.show = 1;
            }
        },
        mounted:function(){
           if(this.$store.state.orderId == ''){
                return;
           }
            var params = this.$store.state.orderId
            console.log(params)
            http.get({
                vm: this,
                url: 'pay',
                params: {orderId:params}
            }).then(res => {
                 this.dataset = res.data;
                 console.log(this.dataset)
                 this.contents = JSON.parse(this.dataset[0].orderContent);
            })
            
        },
        filters:{
            zh_cn: function(value){
                return zh_cn[value];
            }
        }
    }


</script>