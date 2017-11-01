<template>
    <div>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option  v-for="(value, key) in tableData[0]" v-if="(colsArray[0] && colsArray.indexOf(key) > -1) || !colsArray[0]" :label="key | zh_cn" :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters" placeholder="请输入..."></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSelect">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="tableData" v-model="tableData" stripe border v-loading="loading" height="480" style="width: 100%">
            <el-table-column sortable v-for="(value, key) in tableData[0]" v-if="(colsArray[0] && colsArray.indexOf(key) > -1) || !colsArray[0]" :prop="key" :label="key | zh_cn" >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" size="small" icon="el-icon-edit" ></el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" size="small" icon="el-icon-delete" ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--编辑界面-->
        <el-dialog :title="handleType" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px">
                <el-form-item v-for="(value, key) in editForm" v-if="(colsArray[0] && colsArray.indexOf(key) > -1) || !colsArray[0]" :prop="key" :label="key">
                    <el-input v-model="editForm[key]" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
        <!--loading界面-->
        <loading v-show="loadingShow"></loading>
    </div>
</template>

<script type="text/javascript">
    import http from '../utils/httpClient.js'
    import loading from './loading/loading.vue'
    import zh_cn from './zh_cn.js'

    export default {
        data: function(){
            var colsArray = this.cols ? this.cols.split(',') : [];
            return {
                tableData: [],
                filters:'',
                loadingShow: false,
                colsArray,
                value:'',
                index: 0,
                editLoading:false,
                editFormVisible: false,
                editForm:{},
                handleType:'编辑',
                loading: false
            }
        },
        props: ['api', 'cols','modify','delete','add','selects'],
        mounted: function(){
            var self = this;
            http.get({
                vm: self,
                url: this.api
            }).then(res => {
                self.tableData = res.data;
            })
        },
        components: {
            loading
        },
        methods: {
            handleSelect(){
                var params = new Object();
                params[this.value] = this.filters;
                console.log(params)
                http.post({
                    vm: this,
                    url: this.selects,
                    params: params
                }).then(res=>{
                    res.data !='' ? this.tableData = res.data : '';
                });
                return false;
            },
            //显示新增界面
            handleAdd() {
                this.handleType = '新增';
                this.editFormVisible = true;
                this.editForm = Object.assign({}, this.tableData[0]);
            },
            handleEdit(index, row) {
                this.handleType = '编辑';
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
                this.index = index;
             },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).then(() => {
                    var params = this.tableData[index];
                    this.tableData.splice(index,1);
                    http.get({
                        vm: this,
                        url: this.delete,
                        params: params
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            //编辑确认按钮
            editSubmit: function () {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.editLoading = true;
                    var params = Object.assign({}, this.editForm);
                    if(this.handleType=='编辑'){
                        this.tableData[this.index] = Object.assign({}, this.editForm);
                        var url = this.modify;
                    }else if(this.handleType=='新增'){
                        this.tableData.push(this.editForm);
                        var url = this.add;
                    }
                       
                    http.get({
                        vm: this,
                        url: url,
                        params: params
                    }).then((res) => {
                        this.editLoading = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.editFormVisible = false;
                    });
                });

            }
        },
        filters: {
            zh_cn: function(value){
                return zh_cn[value];
            }
        }
    }
</script>