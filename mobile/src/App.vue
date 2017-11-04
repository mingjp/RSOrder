<template>
  <div id="app">

    <div class="container">
        <header>
            <i class="el-icon-arrow-left"></i>
            <input type="text" id="serach"></input>
            <i class="el-icon-search" @click="serach" ></i>
            <i class="el-icon-arrow-right"></i>
        </header>

        <router-view></router-view>

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

        methods: {
                goodslist:function(){
                    this.show = 2;
                    router.push({name:'goodsList'})
                },
                shouye:function(){
                    this.show = 1;
                    router.push({name:'Home'})
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
