### 路由基础用法

```
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
      router
    })
  </script>
```

代码展示以及[链接](https://ybonest.github.io/vue-note/html/router1.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/router1.html"></iframe>


