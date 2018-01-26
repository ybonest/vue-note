### 组件
  组件是Vue最强大的功能之一，它可以扩展HTML元素，封装可重用的代码

### 组件之全局注册
+ 用法
```
Vue.component('my-component',{
  template:"<h1>这里是组件模版</h1>"
})
```

注册后，便可以作为自定义元素<my-component></my-component>使用
```
<div id="example">
  <my-component></my-component>
</div>
```

经渲染后页面成为:
```
<div id="example">
  <h1>这里是组件模版</h1>
</div>
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
