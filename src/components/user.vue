<template>
    <div>
<<<<<<< HEAD
        <datagrid api="user" modify="user_modify" delete="user_delete" add="user_add" pagelen="3"></datagrid>
=======
        <datagrid api="user" modify="user_modify" delete="user_delete" add="user_add"></datagrid>
>>>>>>> 20dd63a052964fa874c2d3281cd0bd3e42fccfa2
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