<template>
<!--  ref/children-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }

    },
    data() {
      return {
        scroll: null
      }
    },
    //组件挂载完成后
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
     // 2.监听滚动的位置
     if (this.probeType ===2 || this.probeType ===3){
     this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
     })
     }
      // 3.监听上拉加载事件  即监听scroll滚到底部
      // （实际监听触发还是在Scroll。vue中执行的 这里子传父 只是为了让父组件home在Scroll。vue监听到pullingUp事件后作出相应的事件回调）
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x,y, time=300){
        this.scroll && this.scroll.scrollTo(x,y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
