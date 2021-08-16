<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    /*line-height 设置多行元素的空间量，如多行文本的间距  此处不直接设置height  是应为元素line-height会把他撑开*/
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);

  }
  .left, .right {
    width: 60px;

  }
  .center {
    /*为什么他会在中间默认占据  ：这个是看上面的div设置了 他这个div是在中间添加的 所以在中间占据了*/
    /*把剩余空间全部占据: 应为只有他自己设置flex: 1;了所以他自己均分剩下的空间即 全部占据*/
    flex: 1;
  }

</style>
