<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
<!--    {{goods}}-->
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /*设置包裹 使flex布局可以换行*/
    flex-wrap: wrap;
    /*排列 均等分*/
    justify-content: space-around;
    padding: 2px;
  }


</style>
