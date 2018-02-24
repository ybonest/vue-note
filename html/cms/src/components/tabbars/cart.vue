<template>
  <div class="cart">
    <div class="mui-card" v-for="(item,index) in datalist" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch class="left" v-model="idMapState[item.id]" @change="handlerChange(item.id,idMapState[item.id])"></mt-switch>
          <img class="img-middle" :src="item.thumb_path" alt="">
          <div class="right">
            <h5>{{item.title}}</h5>
            <div>
              <span style="color:red">￥{{item.sell_price}}</span>
              <cartnumbox class="numbox-cart" :cartValue="idMapCOunt[item.id]" :id="item.id"></cartnumbox>
              <a href="javascript:;" @click="del(item.id,index)">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="left-total-price">
            <h5>总计(不含运费)</h5>
            <p>已勾选商品
              <span style="color:red;line-height:20px;">{{settlementInfo.count}}</span>,总价
              <span style="color:red;line-height:20px;">￥{{settlementInfo.amount}}</span>
            </p>
          </div>
          <div class="right-btn">
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import cartnumbox from "../subcomponents/cartnumbox.vue";

export default {
  data() {
    return {
      status: true,
      datalist: []
    };
  },
  created() {
    this.getDatas();
  },
  methods: {
    ...mapMutations(["dataCd", "updateCartStatus", "delCartById"]),
    setNewCount() {
      this.dataCd();
    },
    handlerChange(id, state) {
      console.log(id + "," + state);
      this.updateCartStatus({ id: id, status: state });
    },
    del(id,i) {
      this.datalist.splice(i,1);
      this.delCartById(id)
    },
    async getDatas() {
      const arr = [];
      this.cart.forEach(element => {
        arr.push(element.id);
      });
      if (arr.length <= 0) {
        return;
      }
      const str = arr.join(",");
      const { data } = await this.$http.get(`/api/goods/getshopcarlist/${str}`);
      console.log(data);
      if (data.status === 0) {
        this.datalist = data.message;
      }
    }
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["idMapState", "settlementInfo", "idMapCOunt"])
  },
  components: {
    cartnumbox
  }
};
</script>

<style lang="scss" scoped>
.cart {
  .mui-card-content-inner {
    display: flex;
  }
  .left {
    flex: 1;
  }
  .img-middle {
    flex: 1;
    margin: 10px;
    width: 20px;
    height: 50px;
  }
  .right {
    flex: 4;
    h5 {
      padding: 0;
      margin: 0px 0px 5px;
      line-height: 16px;
    }
    .numbox-cart {
      height: 30px;
    }
  }
  .right-btn {
    flex: 1;
  }
  .left-total-price {
    flex: 4;
  }
}
</style>
