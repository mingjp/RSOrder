<template>
    <div>
        <datagrid api="menutable" modify="menutable_modify" delate="menutable_delate" add="menutable_add"></datagrid>
    </div>
</template>

<script type="text/javascript">
    import datagrid from '../common/datagrid.vue'

    export default {
        components: {
            datagrid
        }
    }
</script>