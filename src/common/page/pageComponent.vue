    <template>
        <div>
            <nav aria-label="Page navigation" @click="page($event)">
                <ul class="pagination">
                    <li>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li v-for="(value, index) in dataPage">
                        <a href="#">{{value}}</a>
                    </li>
                    <li>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
      </div>
</template>
<script>
    import $ from 'jquery'  
    import 'bootstrap/dist/css/bootstrap.min.css'
    import http from '../../utils/httpClient.js'
    export default  {
        data:function(){
            return {
                dataPage:[],
                len:0,
                qty:0
            }
        },
        created:function(){
            for(var i=0;i<this.$parent.len-2;i++){
                this.dataPage.push(i+1);
            }
            this.len = this.$parent.len;
        },
        mounted:function(){ 
            $('ul.pagination').find('li').eq(1).addClass('active');
        },
        methods:{
            page:function(e){
                var self = this;
                var $ul = $(e.target).parents('ul');
                var $lis = $ul.find('li');
                var item_index =Math.ceil((this.len-2)/2);
                var currentLi = $(e.target).parents('li');
                var value = 0;
                // 前一个active的下标
                var index1 = $lis.filter('.active').index();
                // 现在的下标
                var index = currentLi.index();
                // 点击到了next(this.len-1)或pervious(0);
                if(index == 0 || index == this.len-1){
                    index<1 ? index = (index1 <2 ? 1 :index1-1) :index = (index1+1>this.len-2? this.len-2:index1+1);
                }
                value = this.dataPage[index>this.len-3? this.len-3 : index-1];
                    if(this.$parent.msgDatas[value]){
                    this.$parent.tableData = this.$parent.msgDatas[value];
                }
                if(!this.$parent.msgDatas[value+1]){
                    var params = new Object(); 
                    params.pagNo = value*1+1;
                    params.qty = this.$parent.qty1;
                    params.len = this.len-2;
                    params.word = this.$parent.value;
                    params.value = this.$parent.filters;
                    http.get({
                        vm: self,
                        url: self.$parent.api,
                        params:params
                    }).then(res => {
                        var len = self.len-2;
                        for(var i=0; i<len; i++){
                            self.$parent.msgDatas[value+1+i] = res.data.length>0? res.data.slice(i*self.$parent.qty1, (i+1)*self.$parent.qty1) : []
                        }
                    })
            }
            $lis.eq(index).addClass('active').siblings('li').removeClass('active');
            if(this.$parent.tableData.length == 0){
                this.dataPage = [];
                var value_current = value;
                while(this.$parent.msgDatas[value_current].length == 0){
                    value_current--;
              }
              var idx = 0;
              if(value_current < this.len-2){
                  this.len = value_current+2;
              }
              for(var i=this.len-2; i > 0; i--){
                  this.dataPage.push(value_current-i+1);
              }
              $lis.eq(this.len-2).addClass('active').siblings('li').removeClass('active');
                  this.$parent.tableData = this.$parent.msgDatas[value_current];
                  return false;
            }
            if(value>=item_index && this.$parent.tableData.length>0){
                  this.dataPage = [];
              for(var i=0;i<this.len-2;i++){
                  this.dataPage.push(value-(item_index-1)+i);
              }
              $lis.eq(item_index).addClass('active').siblings('li').removeClass('active');
            }
            
          }
        }
  }
</script>