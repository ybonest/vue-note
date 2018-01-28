### 路由基础用法
1. 使用<router-link>创建路由hash链接
2. 使用</router-view>创建路由组件容器
3. 创建VueRoute实例，自定规则对应关系
4. Vue实例中指定路由对象，把创建号的路由对象挂载到VM实例上

```
  <style>
    .yboactive{
      font-size: 15px;
      font-weight: 500;
      color: red;
    }
  </style>

  <div id="app">
    <!-- 使用router-link组件导航 -->
    <!-- 通过传入to属性指定链接 -->
    <!-- <<router-link>默认会被渲染成一个<a>标签 -->
    <router-link to="/home">home</router-link>
    <router-link to="/movie">movie</router-link>
    <router-link to="/about">about</router-link>
    
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
  <script>
    const home = {
      template: "<h1>home</h1>"
    }
    const movie = {
      template: "<h1>movie</h1>"
    }
    const about = {
      template: "<h1>about</h1>"
    }

    const router = new VueRouter({
      routes: [
        // { path:'/',component:home}, //设置默认展示的组件，不推荐
        { path: '/', redirect: '/home' },  //使用redirect属性，设置路由重定向
        { path: '/home', component: home },
        { path: '/movie', component: movie },
        { path: '/about', component: about }
      ],
      // 当某一个路由规则被选中时，Vue会给该路由规则渲染成的a标签增加
      //class="router-link-exact-active router-link-active"，
      //因此我们可以router-link-active来修改标签被选中的默认样式，即通俗说的
      //高亮效果，同时Vue-router中还提供了linkActiveClass属性，可以覆盖默认提供的
      //router-link-active类名
      linkActiveClass:'yboactive'
    })

    new Vue({
      el: "#app",
      data: {},
      methods: {},
      router  // 用来指定路由对象的， 把创建好的路由对象，挂载到VM实例上
    })
  </script>
```

代码展示以及[链接](https://ybonest.github.io/vue-note/html/router1.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/router1.html"></iframe>

### 路由传参
使用$route.params
1. 在VueRouter实例中，指定routes的path，用`:参数`方式指定传参
2. 在对应的component中用 `$route.params.参数` 获取传参内容
```
<div id="app">
    <router-link to="/home">home</router-link>
    <router-link to="/movie/starting">starting</router-link>
    <router-link to="/movie/endding">endding</router-link>
    <router-link to="/about">about</router-link>

    <router-view></router-view>
  </div>
  <script>
    const home = {
      template: '<h1>home</h1>'
    }
    const movie = {
      template: '<h1>movie --- {{ $route.params.type }}</h1>',
      created() {
        console.log(this);
        // 获取路由URL传递过来的参数
        console.log(this.$route.params.type)
      }
    }
    const about = {
      template: '<h1>about</h1>'
    }

    const router = new VueRouter({
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home },
        // 在路由规则的 path 中，可以通过 : 来指定规则的某一部分，是参数；
        { path: '/movie/:type', component: movie },
        { path: '/about', component: about }
      ],
      linkActiveClass:'yboactive'
    })

    new Vue({
      el:"#app",
      data:{},
      methods:{},
      router
    })
  </script>
```

代码展示以及[链接](https://ybonest.github.io/vue-note/html/router2.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/router2.html"></iframe>


传多个参数时与传单个参数基本一致
+ 如下`<router-link to="/movie/starting/3">movie</router-link>`传入starting和3两个参数
+ 在VueRouter实例对应的路由规则中指定path为`{path:'/movie/:type/:id',component:movie}`

代码展示以及[链接](https://ybonest.github.io/vue-note/html/router3.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/router3.html"></iframe>

使用props传参(推荐方法)
1. 在VueRouter实例的routes规则中添加``rops:true`,例：`{ path: '/movie/:type/:id', component: movie, props: true }`
2. 在对应的路由组件中增加props，例如：`props:['type','id']`

代码展示以及[链接](https://ybonest.github.io/vue-note/html/router4.html)
<iframe style="overflow:hidden;width:100%" class="yboflag" src="html/router4.html"></iframe>