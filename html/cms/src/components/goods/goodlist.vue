<template>
  <div class="good-list">
    <ul class="ul-flex">
      <router-link v-for="item in goodsList" :key="item.id" tag="li" :to="'/home/goofsinfo/'+item.id">
        <img :src="item.img_url" alt="">
        <h5>{{item.title}}</h5>
        <div class="bottom">
          <p><span class="new-val">￥{{item.sell_price}}   </span><del class="old-val">￥{{item.market_price}}</del></p>
          <p class="hot-buy"><span>热卖中</span><span>剩{{item.stock_quantity}}件</span></p>
        </div>
      </router-link>
    </ul>
    <mt-button type="danger" size="large" @click="getGoodsList">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      pageindex: 1,
      goodsList: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      const { data } = await this.$http.get(
        `/api/getgoods?pageindex=${this.pageindex}`
      );
      if (data.status === 0) {
        if (data.message.length === 0) {
          Toast({
            message: "没有更多数据了",
            position: "center",
            duration: 2000
          });
          return;
        }
        this.goodsList = [...this.goodsList, ...data.message];
        this.pageindex++;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ul-flex {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 7px;
  li {
    width: 49%;
    padding: 2px;
    box-shadow: 0 0 7px #cccccc;
    margin-bottom: 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    img {
      width: 100%;
    }
  }
  h5 {
    font-size: 13px;
  }
  .new-val {
    color: red;
  }
  .hot-buy {
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    background-color: #eeeeee;
  }
  p {
    margin: 0;
  }
}
</style>
