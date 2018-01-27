### 过渡
Vue在插入、更新或者移除DOM时提供多种不同方式的应用过渡效果
+ 在CSS过渡和动画中自动应用class
+ 可以配合使用第三方CSS动画库，如[Animate.css](https://daneden.github.io/animate.css/)
+ 在过渡钩子函数中使用JavaScript直接操作DOM
+ 可以配合使用第三方JavaScript动画库，[Velocity.js](http://velocityjs.org/)

Vue提供了transition的封装组件，在下列情形中，可以给任何元素和组件添加entering/leaving过渡
+ 条件渲染(使用v-if)
+ 条件展示(使用v-show)
+ 动态组件
+ 组件根节点

### 过渡类名
1. v-enter：定义过渡的开始状态
2. v-enter-active：定义过渡的状态
3. v-enter-to：定义进入过渡的结束状态
4. v-leave：定义离开过渡的开始状态
5. v-leave-active：定义过渡的状态，在元素离开过渡被触发后立即生效
6. v-leave-to：定义离开过渡的结束状态

![img](/md/animate.png)

对于这些在enter/leave过渡中切换的类名，v-是这些类名的前缀，可以修改，如下
```
<transiton name="ybo">
  <h1>动画</h1>
</transiton>
//当transition增加name属性后，v-enter等就替换为ybo-enter
```