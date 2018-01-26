### 组件
  组件是Vue最强大的功能之一，它可以扩展HTML元素，封装可重用的代码

### 组件之全局注册
+ 用法
```
Vue.component('my-component',{
  template:"<h1>这里是组件模版</h1>"
})
```

+ 注册后，便可以作为自定义元素<my-component></my-component>使用
```
<div id="example">
  <my-component></my-component>
</div>
```

+ 经渲染后页面成为:
```
<div id="example">
  <h1>这里是组件模版</h1>
</div>
```

### 局部注册
+ 在Vue实例内部创建局部组件
```
var child = {
  template:"<div>A custom component</div>"
}
new Vue({
  components:{
    'my-component':child
  }
})
```

### 模版解析注意事项
+ 在使用组件时有时会受到HTMT本身的一些限制，比如像`<ul>、<ol>、<table>、<select>`这样的元素里允许包含的元素有限制，而另一些像`<option>`这样的元素只能出现在某些特定元素的内部

例：如下自定义组件将被当做无效内容,从而导致了一些错误的渲染--[链接](https://ybonest.github.io/vue-note/html/myrow.html)
```
<table>
  <my-row></my-row>
</table>
```

在这种情况下可以使用`is`特性
```
<table>
  <tr is="my-row"></tr>
</table>
```


+ 使用data、methods、created等
  - 组件中与Vue实例相似，可以使用data、methods、created等
  实例[链接](https://ybonest.github.io/vue-note/html/component.html)
  ```
  Vue.component('mycom', {
      template: '<div><h1 @click="showMsg">{{ msg }}</h1><h1>12345</h1></div>',
      data: function () {
        return {
          msg: '这是组件的数据'
        }
      },
      created() {
        this.test()
      },
      methods: {
        showMsg() {
          console.log(this.msg)
        },
        test() {
          console.log('测试组件能否有自己的生命周期函数')
        }
      }
    })

    var vm = new Vue({
      el: '#app',
      data: {
        info: '123'
      },
      methods: {}
    });
  ```
