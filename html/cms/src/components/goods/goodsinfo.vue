<template>
<div>
  <transition 
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter">
    <div v-show="flag" class="circle" ref="circle"></div>
  </transition>
  
  <div class="mui-card">
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
					<swipe :imglist="imglist" :url="url"></swipe>
			</div>
		</div>
	</div>

  <div class="mui-card">
    <div class="mui-card-header">{{canshu.title}}</div>
    <div class="mui-card-content">
      <div class="mui-card-content-inner">
        <div><span style="font-size:14px">市场价：<del>{{canshu.market_price}}</del> </span>
        <span style="font-size:14px">&nbsp;&nbsp;销售价：</span>
        <span style="font-size:14px;font-weight:700;color:red;">{{canshu.sell_price}}</span></div>
        <div style="margin:10px 0px;">
          <span style="font-size:13px">购买数量：</span>
          <shopingno :maxnum="canshu.stock_quantity" @getNum="getNumOfShpNo"></shopingno>
        </div>
        <div>
          <mt-button type="primary" style="font-size:13px" size="small">立即购买</mt-button>
          <mt-button type="danger"  style="font-size:13px" size="small" @click="addToCart">加入购物车</mt-button>
        </div>
      </div>
    </div>
  </div>

  <div class="mui-card">
    <div class="mui-card-header">商品参数</div>
    <div class="mui-card-content">
      <div class="mui-card-content-inner">
        <ul class="goods-cs">
          <li><span>商品货号:</span><span>{{canshu.goods_no}}</span></li>
          <li><span>商品货号:</span><span>{{canshu.stock_quantity}}</span></li>
          <li><span>商品货号:</span><span>{{canshu.add_time | dateFormat}}</span></li>
        </ul>
      </div>
    </div>
    <div class="mui-card-footer">
      <mt-button type="primary" size="large" plain @click="getImgDesc" style="margin-bottom:10px">图文介绍</mt-button>
      <mt-button type="danger" size="large" plain @click="getCmts">商品评论</mt-button>
    </div>
  </div>
 
</div>
</template>

<script>
import {mapMutations} from "vuex"
import swipe from "../subcomponents/swiper.vue";
import shopingno from "../subcomponents/shopingno.vue";
export default {
  props: ["id"],
  created() {
    this.getImgs();
    this.getCanshu();
  },
  data() {
    return {
      imglist: [],
      url: "src",
      canshu: {},
      flag: false,
      selectCount:0
    };
  },
  methods: {
    ...mapMutations(["dataCd"]),
    async getImgs() {
      const { data } = await this.$http.get(`/api/getthumimages/${this.id}`);
      if (data.status === 0) {
        this.imglist = data.message;
      }
    },
    async getCanshu() {
      const { data } = await this.$http.get(`/api/goods/getinfo/${this.id}`);
      if (data.status === 0) {
        this.canshu = data.message[0];
      }
    },
    getCmts() {
      this.$router.push(`/home/goodscmt/${this.id}`);
    },
    getImgDesc() {
      this.$router.push(`/home/imgdesc/${this.id}`);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0px,0px)";
    },
    enter(el, done) {
      const badge = document.querySelector(".mui-badge");
      const badgePosition = badge.getBoundingClientRect();
      const circlePosotion = this.$refs.circle.getBoundingClientRect();
      const x = badgePosition.left - circlePosotion.left;
      const y = badgePosition.bottom - circlePosotion.bottom;
      el.offsetWidth;
      el.style.transform = `translate(${x}px,${y}px)`;
      el.style.transition = "all 0.4s cubic-bezier(.1,-0.46,1,.3)";
      done();
    },
    afterEnter(el) {
      this.flag = false;
    },
    getNumOfShpNo(n) {
      //从子元素拿出数据到父元素
      // this.dataCd({ id:this.id,count: parseInt(n),price:this.canshu.sell_price });
      this.selectCount = parseInt(n)
    },
    addToCart(){
      this.flag = !this.flag
      this.dataCd({ id:this.id,count: this.selectCount,status:true,price:this.canshu.sell_price });
    }
  },
  components: {
    swipe,
    shopingno
  }
};
</script>

<style lang="scss" scoped>
.circle {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  z-index: 99;
  top: 368px;
  left: 145px;
}
.goods-cs {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  line-height: 30px;
  color: #666;
}
.mui-card-footer {
  display: block;
}
</style>
