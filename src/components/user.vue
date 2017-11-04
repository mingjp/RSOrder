<template>
    <div>
        <datagrid api="user" modify="user_modify" delete="user_delete" add="user_add" pagelen="3"></datagrid>
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