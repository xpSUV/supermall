<template>
  <div id="app">
<!--    router-view：路由组件展示位置-->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabbar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>
<style>
  @import "assets/css/base.css";
</style>
