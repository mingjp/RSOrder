<template>
    <div>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-top: 15px;">
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
        <el-table :data="tableData" v-model="tableData" stripe border v-loading="loading" style="width: 100%">
            <el-table-column sortable v-for="(value, key) in tableData[0]" v-if="(colsArray[0] && colsArray.indexOf(key) > -1) || !colsArray[0]" :prop="key" :label="key | zh_cn" >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" size="small" icon="el-icon-edit" ></el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" size="small" icon="el-icon-delete" ></el-button>
                </template>
            </el-table-column>
        </el-table>
       <pageComponent v-show="true" :api="api"></pageComponent>
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
    import pageComponent from './page/pageComponent.vue'
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
                loading: false,
                msgDatas:{},
                pageNo:1,
                len:0,
                qty1:0
            }
        },
        props: ['api', 'cols','modify','delete','add','selects','qty','pagelen'],
        created:function(){
            this.len = this.pagelen || 5;
            this.len = this.len*1 + 2;
            this.qty1 = this.qty || 5;
        },
        mounted: function(){
            var self = this;
            var params = new Object(); 
            params.pagNo = this.pageNo;
            params.qty = this.qty1;
            params.len = this.len-2;
            http.get({
                vm: self,
                url: this.api,
                params: params
            }).then(res => {
                var len = self.len-2;
                for(var i=0; i<len; i++){
                    self.msgDatas[self.pageNo+i] = res.data.slice(i*self.qty1, (i+1)*self.qty1);
                }
                self.tableData = self.msgDatas[self.pageNo];
            })
        },
        components: {
            loading,
            pageComponent
        },
        methods: {
            handleSelect(){
                var self = this;
                var params = new Object();
                params.word = this.value;
                params.value = this.filters;
                params.pagNo = this.pageNo;
                params.qty = this.qty1;
                params.len = this.len-2;
                http.post({
                    vm: this,
                    url: this.selects,
                    params: params
                }).then(res=>{
                    var len = self.len-2;
                    self.msgDatas = {};
                    for(var i=0; i<len; i++){
                        self.msgDatas[self.pageNo+i] = res.data.length>0? res.data.slice(i*self.qty1, (i+1)*self.qty1) : [];
                    }
                    self.tableData = self.msgDatas[self.pageNo];
                });
            },
            //显示新增界面res.data !='' ? this.tableData = res.data : '';
            handleAdd() {
                if(this.$parent.handleAdd){
                    this.$parent.handleAdd();
                    return false;
                }
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
                        var url = this.modify;
                    }else if(this.handleType=='新增'){
                        var url = this.add;
                    }
                       
                    http.get({
                        vm: this,
                        url: url,
                        params: params
                    }).then((res) => {
                        if(this.handleType=='编辑'){
                            this.tableData[this.index] = Object.assign({}, this.editForm);
                            console.log(this.editForm)
                        }else if(this.handleType=='新增'){
                            this.tableData.push(this.editForm);
                        }
                        this.editLoading = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.editFormVisible = false;
                    });
                });

            },
            handleSizeChange:function(val){
                console.log(555, val);
            },
            handleCurrentChange:function(val){
                 console.log(555, val);
            },
            currentPage4:function(){
                console.log(333);
            }
        },
        filters: {
            zh_cn: function(value){
                return zh_cn[value];
            }
        }
    }
</script>