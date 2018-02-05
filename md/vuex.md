### Vuex是什么？
Vuex是一个专门为Vue.js应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化----摘自官方文档。

在没有使用Vuex的时候，实现父子组件之间的传值需要使用v-bind/v-on/$emit()以及props配合进行传值（父子组件传值详细信息请看本笔记**组件**章节的组合组件部分），而兄弟组件之间传值或者多层嵌套情况下组件之间的传值将变的十分麻烦，但使用Vuex后，传值就变的极为简单了。

vuex提供了共享数据的能力，我们可以把组件中共享的状态抽出来放假vue下的数据池中，这样组件之间的数据通信将变的十分方便

### State数据共享池
+ state是vuex中存放数据的共享数据池

#### 初步使用vuex的步骤
1. 引入Vuex插件`<script src="./js/vuex.js"></script>`
2. 实例化一个Vuex.Store对象，并挂载到Vue中
3. 在vuex中的state数据池中定义共享数据

实例展示以及[(链接)](https://ybonest.github.io/vue-note/vuexexample/example/index.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="vuexexample/example/index.html"></iframe>

```
<div id="app">
    <component-one></component-one>
    <hr>
    <component-two></component-two>
  </div>
  <script>
    Vue.use(Vuex)
    const store = new Vuex.Store({
      state:{  //数据池
        count:0,
        cart:[
          {id:1,count:1},
        ]
      },
      mutations:{
        increme(state){
          state.count++;
        }
      }
    })
    //定义组件
    Vue.component('component-one',{
      template:`<div>
          <p>{{dataOne}}</p>
          <input type="button" value="增加数据1" @click="increment">
          <input type="button" value="增加数据2" @click="increment2">
          <p>count:{{$store.state.count}}</p>
        </div>`,
      data(){
        return {
          dataOne:'component-one组件'
        }
      },
      methods:{
        increment(){
          console.log(this);  //当在Vue实例中挂载Vuex的实例store后，可以看到，组件中多了一个$store对象，该对象存放了共享数据
          console.log(this.$store.state.count)
          this.$store.state.count++;  //虽然可以这样操作共享数据，但是一般情况下这中操作数据的方式是被禁止的，vuex中修改gongxiang数据需要借用mutations
        },
        increment2(){
          this.$store.commit('increme');
        }
      }
    })
    Vue.component('component-two',{
      template:`<div>
          <p>{{dataTwo}}</p>
          <p>{{count}}</p>
        </div>`,
      data(){
        return {
          dataTwo:'component-two组件'
        }
      },
      computed:{
        ...Vuex.mapState(["count"])  //使用展开运算符以及mapState把数据映射state数据映射到组件的计算属性中
      }
    })
    const vm = new Vue({
      el:"#app",
      data:{
        dataApp:'来自App的数据'
      },
      store  //将vuex实例挂载到组件上
    })
  </script>
```

#### mapState辅助函数
mapState函数可以快捷方便的辅助我们生成计算属性，实时更新共享数据的变化

实例展示以及[(链接)](https://ybonest.github.io/vue-note/vuexexample/example.1/index.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="vuexexample/example.1/index.html"></iframe>

```
<div id="app">
    <component-one></component-one>
  </div>
  <script>
    const store = new Vuex.Store({
      state:{  //数据池
        count:0,
        cart:[
          {id:1,count:1},
        ]
      },
      mutations:{
        increme(state){
          state.count++;
        }
      }
    })
    //定义组件
    Vue.component('component-one',{
      template:`<div>
          <p>{{dataOne}}</p>
          <button @click="add">+1</button>
          <p>{{count}}</p>
          <p>{{countAlias}}</p>
          <p>{{countPlusLocalState}}</p>
        </div>`,
      data(){
        return {
          dataOne:'component-one组件',
          localCount:2
        }
      },
      methods:{
        add(){
          this.$store.commit('increme') //commit参数对应所要调用的mutations中的属性方法
        }
      },
      computed:Vuex.mapState({  //使用mapState生成计算属性
        count:state => state.count, //使用箭头函数
        countAlias:'count', //传入的字符串等同于箭头函数state => state.count
        countPlusLocalState(state){
          return state.count + this.localCount
        }
      })
    })
    const vm = new Vue({
      el:"#app",
      data:{
        dataApp:'来自App的数据'
      },
      store  //将vuex实例挂载到组件上
    })
  </script>
```

> 当映射的计算属性的名称与 state 的子节点名称相同时，也可以给 mapState 传一个字符串数组

```
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

> 使用对象展开运算符
上例中都是覆盖式的将共享数据以计算属性的方式映射到computed，这样组件再也无法自定义自己的计算属性，因此推荐使用对象展开运算符形式

```
computed: {
    // 这是使用 vuex 映射过来的计算属性,mapState传入的是是要映射到该处的共享数据
    ...mapState(["count"]),
    // 这是自定义的计算属性
    myinfo: function() {
      return this.a + "~~~~";
    }
  }
```

#### Getter
+ 有时候需要从store中的state中派生处于一些状态，例如对列表进行过滤排序并计数

```
computed:{
  doneTodosCount(){
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

> 但是如果有多个组件需要使用到此属性，就需要复制多份，或者使用一个共享函数后在多出导入，但是这两种凡是都不是很理想

+ Vuex允许在store中定义`getter`（可以认为是store的计算属性），就像计算属性一样，getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了变化才会被重新计算

+ 使用
  1. **Getter接受state作为其第一个参数**
  2. **Getter会暴露store.getters对象**
  3. **Getter也可以接受其他getter作为第二个参数**
  4. **可以通过让getter返回一个函数，来实现给getter传参**

实例展示以及[(链接)](https://ybonest.github.io/vue-note/vuexexample/example.3/index.html)
<iframe style="overflow:hidden;height:180px;width:100%" class="yboflag" src="vuexexample/example.3/index.html"></iframe>
```
<div id="app">
  <component-one></component-one>
</div>
<script>
  const store = new Vuex.Store({
    state: {  //数据池
      count: 0,
      carts: [
        { id: 1, count: 1 },
        { id: 2, count: 2 },
        { id: 3, count: 3 },
        { id: 4, count: 4 },
        { id: 5, count: 5 },
      ]
    },
    mutations: {
      increme(state) {
        state.count++;
      }
    },
    getters: {
      filtersCart(state) {  //使用普通函数
        return state.carts;
      },
      filterCart: state => { //使用箭头函数
        return state.carts.filter(cart => cart.id % 2 === 0)
      },
      getId5: (state) => (id) => {  //返回一个函数来传入参数
        console.log(id);
        console.log(state.carts.find(cart => cart.id === id))
        return state.carts.find(cart => cart.id === id)
      }
    }
  })
  //定义组件
  Vue.component('component-one', {
    template: `<div>
          <p>{{dataOne}}</p>
          <p v-for="item in getCart" :key="item.id">{{item.count}}</p>
          <hr>
          <div>
            <p v-for="item in getFiltersCart" :key="item.id">{{item.count}}</p>
          </div>
          <hr>
          <div>
            <p>{{getId5Arg.count}}</p>
          </div>
        </div>`,
    data() {
      return {
        dataOne: 'component-one组件'
      }
    },
    created() {
      this.test();
    },
    methods: {
      test() {
        console.log(this);
        console.log(this.getFiltersCart)
      }
    },
    computed: {
      getCart() { //引入store中的getters
        return this.$store.getters.filtersCart;
      },
      getFiltersCart() {
        return this.$store.getters.filterCart;
      },
      getId5Arg() {
        return this.$store.getters.getId5(5);  //调用getters传入参数
      }
    }
  })
  const vm = new Vue({
    el: "#app",
    data: {
      dataApp: '来自App的数据'
    },
    store  //将vuex实例挂载到组件上
  })
</script>
```
