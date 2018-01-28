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
      ]
    })

    new Vue({
      el: "#app",
      data: {},
      methods: {},
      router
    })
  </script>
```

代码展示以及实例链接(https://ybonest.github.io/vue-note/html/router1.html)
<iframe style="overflow:hidden;height:150px;width:100%" class="yboflag" src="html/router1.html"></iframe>
