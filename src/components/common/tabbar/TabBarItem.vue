<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle">
<!--      插槽后面会被替换  里面的定义的属性如class也会被覆盖  所以让该class属性写到外面的div中  让该插槽继承  上面一样-->
      <slot name="item-text"></slot>
    </div>
<!--    <img src="../../assets/img/tabbar/home.svg" alt="">-->
<!--    <div>首页</div>-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String ,        //path相当于一个变量  并且也相当于该子组件TabBarItem的一个属性  对应的组件标签则可以使用该属性
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // 此处值可以代表true和false
        return this.$route.path.indexOf(this.path) !== -1   //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置  没有则返回-1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {

    width: 24px;
    height: 24px;
    margin-top: 3px;
    /*设置元素的垂直对齐方式：如图片文字对齐样式    此处也可以用来去除图片默认下面的空白间距（应为图片文本对齐默认格式图片会有下间距）*/
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
