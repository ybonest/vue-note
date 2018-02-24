import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)

const cart = window.JSON.parse(localStorage.getItem('cart') || "[]")

const store = new Vuex.Store({
  state: {
    cart
  },
  mutations: {
    dataCd(state, data) {
      let flag = false;
      state.cart.some(car => {
        if (data.id === car.id) {
          car.count += data.count
          flag = true
          return true
        }
      })
      if (!flag) state.cart.push(data);

      localStorage.setItem('cart', window.JSON.stringify(state.cart))
    },
    updateCount(state, data) {
      state.cart.forEach(item => {
        if (item.id == data.id) {
          item.count = data.count
        }
      })
      localStorage.setItem('cart', window.JSON.stringify(state.cart))
    },
    updateCartStatus(state, data) {
      state.cart.forEach(item => {
        if (item.id == data.id) {
          item.status = data.status;
        }
      })
    },
    delCartById(state,id){
      state.cart.forEach((item,index) => {
        if(item.id == id){
          state.cart.splice(index,1)
          // break;
        }
      })
      localStorage.setItem('cart', window.JSON.stringify(state.cart))
    }
  },
  getters: {
    totalCount(state) {
      let sumCount = 0;
      state.cart.forEach(element => {
        sumCount += element.count;
      })
      return sumCount
    },
    idMapCOunt(state) {
      const o = {}
      state.cart.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    idMapState(state) {
      const o = {}
      state.cart.forEach(item => {
        o[item.id] = item.status
      })
      return o;
    },
    settlementInfo(state) {
      const info = { count: 0, amount: 0 };
      state.cart.forEach(item => {
        if (item.status) {
          info.count += item.count;
          info.amount += item.count * item.price;
        }
      })
      return info
    }
  }
})

export default store