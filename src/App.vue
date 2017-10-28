<template>
    <div id="app">
        <el-container class="container">
            <el-header class="header">
                <el-col :span="4" class="logo">{{sysName}}</el-col>
                <el-col :span="15">
                    <el-radio-group v-model="isCollapse" class="tools">
                      <el-radio-button :label="false"><i class="fa fa-align-justify"></i></el-radio-button>
                    </el-radio-group>
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
            <el-aside>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapsed="isCollapse">
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                      <span slot="title">分组一</span>
                      <el-menu-item index="1-1">选项1</el-menu-item>
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
            <el-main>

            </el-main>
        </el-container>
    </div>
</template>

<script type="text/javascript">
    import axios from 'axios'
    import http from './utils/httpClient.js'
    export default {
        data() {
            return {
                sysName:'RSOrder',
                collapsed:false,
                sysUserName: 'Admin',
                sysUserAvatar: './src/assets/img/a8.jpg',
                isCollapse: 'true',
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
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        mounted: function(){
            http.post({
                url: '/order_getSome',
                params: {userName: '李四'}
            }).then(function(result){
                console.log(result);
            })
        }
    }
</script>
<style lang="scss">
    .container{
        width: 100%;
        height: 100%;
        .header{
            height: 60px;
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
    }
</style>