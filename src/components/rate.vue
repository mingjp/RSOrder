<template>
    <div>
        <datagrid api="rate"  delete="rate_delete"  pagelen="3"></datagrid>
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