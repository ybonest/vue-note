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

