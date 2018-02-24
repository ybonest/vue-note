<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input class="mui-input-numbox" type="number" ref="num" :value="init" @change="getNumCount"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  data(){
    return {
      init:1
    }
  },
  props: ["maxnum"],
  mounted() {
    mui(".mui-numbox").numbox();
    this.getNumCount();
  },
  methods:{
    getNumCount(){
      let n = this.$refs.num.value;
      console.log("bbbb")
      console.log(n);
      // console.log(this.$refs)
      this.$emit('getNum',n)
    }
  },
  watch: {
    maxnum: function(newVal) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

