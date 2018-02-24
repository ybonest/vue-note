<template>
  <div>
    <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
      <div class="mui-scroll">
          <a :class="['mui-control-item',item.id === 0 ? 'mui-active' : '']" @click="getImgList(item.id)" v-for="item in navlist" :key="item.id">
              {{item.title}}
          </a>
      </div>
    </div>
    <ul class="img-container">
      <router-link v-for="item in imglist" :key="item.id" tag="li" :to="'/home/photoinfo/'+item.id">
        <img v-lazy="item.img_url" alt="">
        <div class="content">
          <h5>{{item.title}}</h5>
          <p>{{item.zhaiyao}}</p>
        </div>
      </router-link>
    </ul>
  </div>  
</template>

<script>
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      navlist: [{ id: 0, title: "全部" }],
      imglist: []
    };
  },
  created() {
    this.getNavList();
    this.getImgList(0);
  },
  methods: {
    async getNavList() {
      const { data } = await this.$http.get("/api/getimgcategory");
      if (data.status === 0) {
        this.navlist = this.navlist.concat(data.message);
      }
    },
    async getImgList(id) {
      const { data } = await this.$http.get(`/api/getimages/${id}`);
      if (data.status === 0) {
        this.imglist = data.message;
        console.log(this.imglist);
      }
    }
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>

<style lang="scss" scoped>
.mui-scroll-wrapper {
  touch-action: pan-x;
}
.img-container {
  list-style: none;
  padding: 10px;
  margin: 0;
  img {
    vertical-align: middle;
    width: 100%;
  }
  img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  li {
    box-shadow: 0 0 7px #999;
    position: relative;
    background-color: #ddd;
    text-align: center;
    & + li {
      margin-top: 10px;
    }
    .content {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      max-height: 25%;
      bottom: 0px;
      overflow: hidden;
      h5 {
        color: #ffffff;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        color: #ffffff;
        text-indent: 2em;
        font-size: 13px;
      }
    }
  }
}
</style>
