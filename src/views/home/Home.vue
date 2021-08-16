<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>

<!--    利用better-scroll实现局部滚动 必须要设置高度-->  <!--    不加冒号会被当成字符串-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <RecommendView :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

<!--vue3不需要加就能监听-->
<!--    组件是不能直接监听点击的  还需添加vue事件的修饰符native 才能监听一个组件的原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";
  import {itemListenerMix, backTopMixin} from "common/mixin";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [itemListenerMix, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,

      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('dawdadadawdwa销毁')
    },
    //活跃时
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    //不活跃时
    deactivated() {
      // 1. 保存y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 2. 取消全局事件监听（取消的只是本vue组件中的itemImgListener这个方法（所以有个this代表本组件）   不影响其他vue组件中的itemImgListener方法 ）
      // 对应下面的 this.$bus.$on('itemImageLoad',this.itemImgListener)
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
      // 1. 请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = -position.y > 1000

        // 2.决定tabcontrol 是否吸顶（position：fixed）
        this.isTabFixed = -position.y > this.tabOffsetTop
      },
      swiperImageLoad() {
        // 2.获取tabControl的offsetTop
        // 所有的组件都有一个属性$el：用于获取组件中的元素  ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        console.log(this.$refs.tabControl2.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
        *网络请求相关的方法
      */
      // 1. 请求多个数据
      getHomeMultidata(){
        getHomeMultidata().then(res => {     //网络请求： 异步操作（此处是回调函数）放入回调队列 会先执行下面的代码执行完成后 再到回调对列中按顺序执行添加进去的异步操作
        // this.result = res;  //保存结果数据  res:总数据
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
       })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
        })
      },

    }
  }
</script>

<!--scoped:作用域属性  加这个属性的话当前样式只对该组件内其效果  负责全局-->
<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    /*position: relative;*/
  }
  .home-nav {
  /*应为在App.vue中导入了@import "assets/css/base.css";  所以可以直接用其中定义的变量*/
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时 为了让导航栏不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 10;*/
  }

  /*.tab-control {*/
  /*  !*粘性定位*!*/
  /*  position: sticky;*/
  /*  !*设置top才有用*!*/
  /*  top: 44px;*/
  /*  z-index: 1;*/
  /*}*/

  .content {
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    /*使用 z-index 的前提是，需要设置 div 的 定位（eg: position: absolute;）如果元素是标准流，没有定位，那么设置z-index不会使当前元素在另一个元素上方。*/
    position: relative;
    z-index: 9;
  }

  /*.content {*/
  /*    !*calc：c3新增属性 动态计算   !*100%是父级标签的*!*!*/
  /*    !*overflow: hidden;*!*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  !*margin-top: 44px;*!*/
  /*}*/

</style>


