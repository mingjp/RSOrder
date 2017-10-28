<template>
    <div id="app">
        <div class="container">
            <el-header class="header">
                <el-col :span="5" class="logo">{{sysName}}</el-col>
                <el-col :span="14">

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
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                      <span slot="title">分组一</span>
                      <el-menu-item index="1-1"><a href="#/echart">选项1</a></el-menu-item>
                      <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                      <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                      <span slot="title">选项4</span>
                      <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                  <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                  </el-menu-item>
                  <el-menu-item index="3">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航三</span>
                  </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <section class="content-container">
                    <div class="grid-content bg-purple-light">
                        <el-col :span="24" class="breadcrumb-container">
                            <strong class="title">{{$route.name}}</strong>
                            <el-breadcrumb separator="/" class="breadcrumb-inner">
                                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                    {{ item.name }}
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                    </div>
                </section>
                <div>
                    <router-view></router-view>
                </div>
            </el-main>
        </div>
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
    .container{
        width: 100%;
        height: 100%;
        .header{
            background-color: #409EFF;
            color:#fff;
            line-height: 60px;
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
            width: 963px;
            float: right;
            .content-container {
                background: #f1f2f7;
                padding: 20px;
                .breadcrumb-container {
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        float: right;
                    }
                }
                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>