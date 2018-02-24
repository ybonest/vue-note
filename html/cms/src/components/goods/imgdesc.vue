<template>
  <div class="mui-card">
    <div class="mui-card-header" style="text-align:center;font-size:15px;color:blue;">
      {{imgdesc.title}}
    </div>
    <div class="mui-card-content">
      <div class="mui-card-content-inner">
        <div v-html="imgdesc.content"></div>
      </div>
    </div>
    <div class="mui-card-footer">页脚</div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        imgdesc:{}
      }
    },
    created(){
      this.getImgDesc();
    },
    methods:{
      async getImgDesc(){
        const {data} = await this.$http.get(`/api/goods/getdesc/${this.id}`);
        if(data.status === 0){
          // console.log(data.message);
          this.imgdesc = {...data.message[0]}
        }
      }
    },
    props:['id']
  }
</script>

<style lang="scss" scoped>

</style>
