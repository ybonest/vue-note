<template>
  <div class="news-container">
    <h3 class="title">{{ newsInfo.title }}</h3>
    <p class="time"><span>发表时间：{{ newsInfo.add_time|dateFormat }}</span><span>点击：{{ newsInfo.click }}次</span></p>
    <hr>
    <p v-html="newsInfo.content"></p>
    
    <comments :id="id"></comments>
  </div>  
</template>

<script>
  import comments from '../subcomponents/comments.vue'
  export default {
    props:["id"],
    data(){
      return {
        newsInfo:{}
      }
    },
    created(){
      this.getNewsInfo();
    },
    methods:{
      async getNewsInfo(){
        const {data} = await this.$http.get(`/api/getnew/${this.id}`);
        if(data.status === 0){
          this.newsInfo = data.message[0]
        }
      }
    },
    components:{
      comments
    }
  }
</script>

<style lang="scss" scoped>
  .news-container{
    padding: 0 3px;
    .title{
      color: red;
      font-size: 15px;
      margin: 20px;
    }
    .time{
      display: flex;
      justify-content: space-between;
      color: #26a2ff;
      font-size: 13px;
    }
  }
</style>
