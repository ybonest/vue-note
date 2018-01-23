####1.插值表达式
    ``` 
    <div id="app">
        <p>{{ message }}</p>
    </div>
    <script>
        new Vue({
            el:"#app",
            data:{
                message:"Hello Vue"
            }
        })
    </script>
    ```

####2.v-cloak
 > 插值表达式存在闪烁问题，可以使用v-cloak解决闪烁问题

    ```
    CSS样式设置
    <style>
        [v-cloak] {
        display: none;
        }
    </style>
    <div id="app" v-cloak>
        <h3>{{ message }}</h3>
    </div>
    <script>
        new Vue({
            el:"#app",
            data:{
                message:"Hello Vue"
            }
        })
    </script>
    ```

####3.v-text
    > 注意：v-text会覆盖元素原有内容

    ```
    <div v-text="message"></div>
    ```


####4.v-html
    ```
    <div v-html="html"></div>
    ```

####5.v-bind
    > 为html属性节点绑定数据

    ```
    <!-- 绑定一个属性 -->
    <img v-bind:src="imageSrc">

    <!-- 缩写 -->
    <img :src="imageSrc">

    <!-- 内联字符串拼接 -->
    <img :src="'/path/to/images/' + fileName">

    <!-- class 绑定 -->
    <div :class="{ red: isRed }"></div>
    <div :class="[classA, classB]"></div>
    <div :class="[classA, { classB: isB, classC: isC }]">

    <!-- style 绑定 -->
    <div :style="{ fontSize: size + 'px' }"></div>
    <div :style="[styleObjectA, styleObjectB]"></div>

    <!-- 绑定一个有属性的对象 -->
    <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

    <!-- 通过 prop 修饰符绑定 DOM 属性 -->
    <div v-bind:text-content.prop="text"></div>

    <!-- prop 绑定。“prop”必须在 my-component 中声明。-->
    <my-component :prop="someThing"></my-component>

    <!-- 通过 $props 将父组件的 props 一起传给子组件 -->
    <child-component v-bind="$props"></child-component>

    <!-- XLink -->
    <svg><a :xlink:special="foo"></a></svg>
    ```

------ 内容参考：Vue教程