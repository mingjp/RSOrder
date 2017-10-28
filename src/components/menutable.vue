<template>
    <div>
        <h1>menu list</h1>
        <datagrid api="getgoods"></datagrid>
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