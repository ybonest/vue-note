<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input class="mui-input-numbox" type="number" :value="cartValue" ref="nobox" @change="updateCart"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";
import { mapMutations } from 'vuex';
export default {
  props:["cartValue","id"],
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["updateCount"]),
    updateCart(){
     const val = mui(".mui-numbox").numbox().getValue();
     console.log(this.id);
     this.updateCount({id:this.id,count:val})
    }
  },
  mounted() {
    mui(".mui-numbox").numbox();
  }
};
</script>

<style lang="scss" scoped>

</style>
