<template>
  <div>
    <swipe :imglist="imglist" :isbool="isbool" :url="url"></swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
              <img src="../../images/menu1.png" alt="">
              <div class="mui-media-body">新闻咨询</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
              <img src="../../images/menu2.png" alt="">
              <div class="mui-media-body">图片分享</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodlist">
              <img src="../../images/menu3.png" alt="">
              <div class="mui-media-body">商品购买</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../images/menu4.png" alt="">
              <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../images/menu5.png" alt="">
              <div class="mui-media-body">视频专区</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../images/menu6.png" alt="">
              <div class="mui-media-body">联系我们</div></a></li>
  </ul> 
  </div>
</template>

<script>
import swipe from '../subcomponents/swiper.vue'
export default {
  data() {
    return {
      imglist: "",
      isbool:true,
      url:"img"
    };
  },
  created() {
    this.getImgSwipe();
  },
  methods: {
    async getImgSwipe() {
      console.log(this.$http);
      const { data } = await this.$http.get("/api/getlunbo");
      if (data.status === 0) {
        this.imglist = data.message;
      }
    }
  },
  components:{
    swipe
  }
};
</script>

<style lang="scss" scoped>

.mui-table-view{
  background: #ffffff;
  border: none;
  img{
    width: 65%;
  }  
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
  font-size:13px;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border: none;
}
</style>
