<template>
  <div>
    <ul class="mui-table-view">
      <li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
          <router-link :to="'/home/getnewsinfo/'+item.id">
            <img class="mui-media-object mui-pull-left" :src="item.img_url">
            <div class="mui-media-body">
              <h1>{{ item.title }}</h1>
              <p class='mui-ellipsis'><span>发表时间：{{ item.add_time|dateFormat }}</span><span>点击：{{ item.click }}次</span></p>
            </div>
          </router-link>
      </li>
    </ul>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      newsList: []
    };
  },
  created(){
    this.getNewsList();
  },
  methods: {
    async getNewsList() {
      const { data } = await this.$http.get("/api/getnewslist");
      if (data.status === 0) {
        this.newsList = data.message;
        console.log(this.newsList);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .mui-table-view-cell{
    h1{
      font-size: 14px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .mui-ellipsis{
      font-size: 13px;
      color: #26a2ff;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
