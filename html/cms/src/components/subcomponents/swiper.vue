<template>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="item in imglist"  :key="item.img">
      <img :src="item[url]" :class="{fullwidth:isbool}" alt="">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
  export default {
    props:['imglist','isbool','url'],
    data(){
      return {

      }
    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 180px;
  text-align: center;
  overflow: hidden;
  img {
    height: 100%;
  }
  .fullwidth {
    width: 100%;
  }
}
</style>
