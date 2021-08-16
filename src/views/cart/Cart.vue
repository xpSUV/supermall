<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

<!--    商品列表-->
    <cart-list/>

<!--    底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  // 先从vuex中引入mapGetters
  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // mapGetters 辅助函数  两种语法
      // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：  计算属性computed
      // ...mapGetters(['cartLength', 'cartList']

      ...mapGetters({
        length: 'cartLength',
        // list:　'cartList'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
