<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart" >加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart () {
        this.$emit('addToCart')
      }
    }

  }
</script>

<style scoped>
  .bottom-bar {

  /*相对定位的参考点，是它自己定位(移动)之前的位置，不是相对于父节点，也不是相对于平级节点。*/
  /*  position: relative;*/
  /*  bottom: 49px;*/

    /*绝对定位的参考对象就不是自己了，而是最近的已设置了position的祖先元素，并且position不是static，而是absolute或者relative。*/
    /*  首先看它的父元素是否设置了position为absolute或者relative，如果有就按父元素的左上角作为参考点，*/
    /*  如果没有则再找祖父元素、曾祖父元素、高祖父元素，如果都没有就以页面文档的初始位置作为参考点。*/

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 58px;
    background-color: #fff;
    /* position: relative; */
    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item > div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 3px;
    background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  }

  .bar-left .service {
    background-position: 0 -54px;
  }

  .bar-left .shop {
    background-position: 0 -98px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }
</style>
