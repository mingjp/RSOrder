<template>
    <div class="container">
        <el-header class="header">
            <el-col :span="4" class="logo">{{sysName}}</el-col>
            <el-col :span="15">

              <el-button :label="true" @click.prevent="collapse" class="tools"><i class="fa fa-align-justify"></i></el-button>

            </el-col>   
            <el-col :span="5" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-header>
        <el-aside class="aside">
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-picture"></i>
                  <span slot="title">Charts</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="echart1">销售额</el-menu-item>
                  <el-menu-item index="echart2">用户</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="menutable">
                <i class="el-icon-menu"></i>
                <span slot="title">菜单</span>
              </el-menu-item>
              <el-menu-item index="user">
                <i class="el-icon-phone"></i>
                <span slot="title">用户</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-star-on"></i>
                <span slot="title">评论</span>
              </el-menu-item>
              <el-menu-item index="order_part">
                <i class="el-icon-goods"></i>
                <span slot="title">收银</span>
              </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="main">
            <section class="content-container">

                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item in $route.matched" :to="{ path:item.path}">
                        {{ item.name }}
                    </el-breadcrumb-item>
                </el-breadcrumb>

            </section>
            <router-view></router-view>
        </el-main>
    </div>

</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                sysName:'RSOrder',
                sysUserName: 'Admin',
                sysUserAvatar: './src/assets/img/a8.jpg',
                isCollapse: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
         methods: {
            //折叠导航栏
            collapse:function(){
                this.isCollapse=!this.isCollapse;
            }
        }
    }
</script>
<style lang="scss">
    html,body,#app{
        height: 100%;
    }
    .container{
        width: 100%;
        height: 100%;
        .header{
            background-color: #409EFF;
            color:#fff;
            line-height: 60px;
        }
        .aside{
            width:22% !important;
        }
        .userinfo{
            text-align: right;
            padding-right: 35px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }   
            }
        }
        .aside{
            float: left;
        }
        .main{
            width:78%;
            float: right;
            .content-container {
                background: #f1f2f7;
                padding: 20px;
            }
        }
    }
</style>