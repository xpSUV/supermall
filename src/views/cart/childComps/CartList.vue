<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
<!--      组件的话最好绑定key-->
     <cart-list-item
       v-for="(item, index) in cartList"
       :key="index"
       :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import CartListItem from "./CartListItem";

  import {mapGetters} from 'vuex'
  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 59px - 55px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
