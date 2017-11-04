<template>
    <div>
        <datagrid api="order_getAll" modify="order_update" delete="order_del" selects="order_selectSome"></datagrid>
    </div>
</template>
<script type="text/javascript"> 
    import http from '../utils/httpClient.js'
    import datagrid from '../common/datagrid.vue'

    export default {
        components: {
            datagrid
        }
    }
</script>
