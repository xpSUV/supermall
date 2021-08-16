<template>
  <div class="wrapper" ref="aaa">
    <div>
<!--      1.在使用better-scroll使  无论是否设置click：false，button都可以点击-->
      <button @click="btnClick"></button>

      <!--      2.在使用better-scroll使  必须设置click：true， div才可以可以监听点击-->
      <div @click="btnClick"></div>
    </div>
  </div>


</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        scroll:　null
      }
    },
    // 组件创建完可调用
    created() {        //别在created方法中进行拿取元素
      // console.log(this.$refs.aaaa);
      // console.log(document.querySelector('.wrapper'))
      // new BScroll(document.querySelector('.content'))   //document.querySelector获取为空  应为此时组件创建完但dom树还未解析完
      // this.scroll = new BScroll('.wrapper', {
      //
      // })
    },
    //组件挂载完成后
    mounted() {
      // console.log(this.$refs.aaaa);
      // console.log(document.querySelector('.wrapper'))
      this.scroll = new BScroll('.wrapper', {
        probeType: 3,
        pullUpLoad: true,
        click: true
      })

      this.scroll.on('scroll', (position) => {
        console.log(position)
      })

      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多');
      })
    },
    methods: {
      btnClick() {
        console.log('btnClick')
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    /*先设置确定的高度*/
    height: 150px;
    background-color: red;

    overflow: hidden;
    /*设置在y轴可滚动  并且会自动隐藏超出部分 即连带 overflow: hidden;*/
    /*overflow-y: scroll;*/
  }
</style>
