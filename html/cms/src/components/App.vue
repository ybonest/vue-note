<template>
  <div class="app-container">
    <mt-header fixed title="钱多多">
      <span slot="left" @click="goBack" v-if="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab">
      <!-- <router-link to=""></router-link> -->
			<router-link to="/home" class="mui-tab-item-my">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link to="/member" class="mui-tab-item-my">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link to="/cart" class="mui-tab-item-my">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{totalCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link to="/search" class="mui-tab-item-my">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { mapState,mapGetters } from "vuex";
export default {
  data() {
    return {
      flag: false
    };
  },
  created(){
    this.initInterceptors();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    initInterceptors() {
      this.$http.interceptors.request.use(function(config) {
        Indicator.open({
          text: "Loading...",
          spinnerType: "fading-circle"
        });
        return config;
      });

      this.$http.interceptors.response.use(function(response) {
        Indicator.close();
        return response;
      });
    }
  },
  watch:{
    '$route.path':{
      handler:function(newVal){
        this.flag = !(newVal === '/home')
      },
      immediate:true
    }
  },
  computed:{
    ...mapGetters([
      'totalCount'
    ])
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow: hidden;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-leave-active,
.v-enter-active {
  transition: all 0.4s ease;
}
.mui-bar-tab .mui-tab-item-my.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-my {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-my .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-my .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
