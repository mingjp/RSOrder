<template>
  <div id="app">

    <div class="container">
        <header>
            
            <input type="text" id="serach"></input>
            <i class="el-icon-search" @click="serach" ></i>
            
        </header>
        <div class="main">

        <router-view></router-view>

        </div>

     <footer >
        <ul class="clearfix">
            <li :class="{active:1==show}" @click="shouye">首页</li>
            <li :class="{active:2==show}"@click="goodslist">点餐</li>
            <li :class="{active:3==show}"@click="orders">订单</li>
            <li :class="{active:4==show}"@click="my">我的</li>
        </ul>
            
    </footer>
    </div>

  </div>
</template>

<script>
    import  router from './router/'
    
    import $ from 'jquery'
    export default {

        data:function(){
            return {
                dataset:[],
                show:1

            }
        },
        mounted:function(){
            var params = location.hash;
            var idx = params.indexOf('/');
            var url = params.substr(idx);
            if(url == '/'){
                this.show = 1;
            }else if(url == '/goodsList'){
                this.show = 2;
            }else if(url == '/orders'){
                this.show = 3;
            }else{
                this.show = 4;
            }
        },
        methods: {
                shouye:function(){
                    this.show = 1;
                    router.push({name:'Home'})
                },
                goodslist:function(){
                    this.show = 2;
                    router.push({name:'goodsList'})
                },
                orders:function(){
                    this.show = 3;
                    router.push({name:'orders'})
                },
                my:function(){
                    this.show = 4;
                    router.push({name:'my'})
                },
                serach:function(){
                    var key = $('#serach').val();
                    this.$store.state.searchkey = key;
                    console.log(this.$store.state.searchkey)
                    $('#serach').val('');
                    
                    router.push({name:'serach'});

                    
                    
                    
                }
                
            }
           
    }
</script>

<style lang="scss">
</style>
