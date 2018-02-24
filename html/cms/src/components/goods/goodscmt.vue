<template>
<div>
  <comments :id="id"></comments>
</div>
</template>

<script>
  import comments from '../subcomponents/comments.vue'
  export default {
    props:['id'],
    components:{
      comments
    }
  }
</script>

<style lang="scss" scoped>

</style>
