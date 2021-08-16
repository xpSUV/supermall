<template>
  <div class="goods-item" @click="itemClick">
<!--    vue中监听图片等加载是否完成  @load="方法" 加载完成执行方法-->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      // 原生js监听图片： img.onload = function(){}
      imageLoad() {             //v-for="item in goods" 这里  每当一张图片加载完成后就发送一次事件
        // if (this.$router.path.indexof('/home')){
        // //使用事件总线(应为这两个组件距离太远了 一层一层的父子组件通信太麻烦)  此处是发射一个事件可以跟参数，参数作为接收方的回调函数的参数  跟子传父的使用方法差不多
        //   this.$bus.$emit('itemImageLoad')
        // }
        // else if (this.$router.path.indexof('/detail')){
        //   this.$bus.$emit('detailitemImageLoad')
        // }

        this.$bus.$emit('itemImageLoad')
      },
      itemClick() {
        this.$router.push('/detail'+ this.goodsItem.iid)   //动态路由传递数据id方式
        // this.$router.push({        //query传递数据id方式
        //   path: '/detail',
        //   query: {
        //
        //   }
        // })
      }
    },

  }
</script>

<style scoped>

  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    /*父级使用padding子元素绝对定位不受padding影响*/
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    /*文字一行显示 如果有更多文字则显示 ...*/
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }

</style>
