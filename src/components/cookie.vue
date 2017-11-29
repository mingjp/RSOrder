<template>
    <div id="cookie">
        <table>
            <thead>
               
            </thead>
            <tbody>
                <tr v-for="(obj, index) in dataset">
                    <td class="orderId">{{obj.orderId}}</td>
                    <td v-for="(val, key) in obj.orderContent">
                        {{val.menuName}} &times;{{val.count}}
                        <input type="checkbox">
                    </td>
                    <td>
                        <button @click="del($event, obj.orderId)" :name="obj.orderId">&times;</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script type="text/javascript">
    import io from '../utils/socket.io.min.js';
    import common from '../common/common.js'
    import $ from 'jquery'  
    var socket = io.connect(common.baseUrl);
    export default {
        data(){
            return {
                dataset: [],
                baseUrl:common.baseUrl
            }
        },
        mounted: function(){
         
           var self = this;
           socket.emit('cn','0');
           socket.on('showMsg',function(data){
              self.dataset = JSON.parse(data);
           });
        },
        methods:{
            del:function(e, id){
                console.log(id);
                socket.on('delteMsg',id );
                socket.on('showMsg',function(data){
                   self.dataset = JSON.parse(data);
                });
            }
        }
    }
</script>
<style lang="scss">
    #cookie{
        table{
            width:100%;
        }
        tbody{
            tr{
                width:100%;
                border-bottom:3px dotted #ddd;
                height:80px;
                td{
                    border-right:3px dotted #999;
                    font-size:60px;
                    &.orderId{
                        color:#f00;
                    }
                    input{
                        width:40px;
                        height:40px;
                    }
                }
             
            }
        }
    }
</style>