<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" >
<!--      属性：topImages  传入值： top-images  -->
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>

    <!--vue3不需要加就能监听-->
    <!-- vue2 组件是不能直接监听点击的  还需添加vue事件的修饰符native 才能监听一个组件的原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>

</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  // import Toast from "components/common/toast/Toast";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMix, backTopMixin} from "common/mixin";

  import { mapActions } from 'vuex'



  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodsList,
      // Toast
    },
    mixins: [itemListenerMix, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // message: '',
        // show: false

      }
    },
    // this.$route: 当前活跃路由    路由：router/index.js中配置的routes  path与component
    // create() 中压根不能获取元素
    created() {           //es6对象中方法简写    等同于(es5写法) create: function() {}     但create在vue中是一个特殊字符代表生命周期函数
      // 1.保存存入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        // 1.获取顶部的图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取推荐信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        /*
        // 1.  第一次获取offsettop值
        // 值不对的原因是：this.$refs.params.$el压根没有被渲染
        this.themeTopYs = []
        // 数组push推值到数组中
        this.themeTopYs.push(0);
        // 获取到的组件不能直接获取offsetTop属性值  需获取到该组件内的元素 才有offsetTop属性值
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);


        // 2.第二次获取：值任然不对　　　　　图片没有加载完成
        // 等到 dom 标签元素渲染完调用这个函数方法$nextTick(）  传入一个回调函数  但仍不能不能保证图片渲染加载完成了
        this.$nextTick(() => {
          // 根据最新的数据，对应的DOM是已经渲染完出来
          // 但是图片已然是没有加载完成
          // offsetTop值不对时，一般都是图片的问题
          this.themeTopYs = []
          // 数组push推值到数组中
          this.themeTopYs.push(0);
          // 获取到的组件不能直接获取offsetTop属性值  需获取到该组件内的元素 才有offsetTop属性值
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs);
        })
         */

      })

      //3. 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      // 4. 给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        // 数组push推值到数组中
        this.themeTopYs.push(0);
        // 获取到的组件不能直接获取offsetTop属性值  需获取到该组件内的元素 才有offsetTop属性值
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // js中最大数值表示Number.MAX_VALUE
        this.themeTopYs.push(Number.MAX_VALUE)

        console.log(this.themeTopYs);
      },200)
    },

    // 会出现数据还没有获取到
    mounted() {

    },
    //更新时进行调用
    updated() {

    },
    destroyed() {
    //由于之keepalive排除掉了Detail怎么解决返回时的定位 <keep-alive exclude="Detail">
    //   为什么排除  是应为避免每次进入详情页后退出时 详情页仍处于keepalive  下次点击其他商品时还进入的是原来的详情页（应为没有被销毁）
    //  所以此处不能使用deactivated() {}   换为destroyed(){}
      this.$bus.$off('itemImgLoad', this.itemImgListener)   //销毁时（离开当前组件时）取消本组件的全局响应事件
    },
    methods: {
      // 跟mapGetters用法一样都是映射store中对象action或getter中的方法函数到其他组件中，
      // 使其他组件可以直接使用该方法而避免一层层的调用store的繁琐代码
      // 但，mapActions是在methods中使用  mapGetters是在computeds中使用
      ...mapActions(['addCart']),
      // ...mapActions({
      //   add: 'addCart'
      // }),

      imageLoad() {
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },

      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200)
      },

      // contentScroll:该方法只要滚动scroll就会触发，应为封装的BScroll中$emit发射出去一个事件scroll该事件是当监听滚动位置（即滚动时就会触发）
      // 而scroll该事件@scroll="contentScroll"  所以该方法只要滚动scroll就会触发
      contentScroll(position) {
        // 1. 获取y值
        const positionY = -position.y + 44
        // 2. postionY和主题中的y值进行对比

        // [0, 11502, 12482, 12678]
        // 在 0 到 11502 之间，index = 0
        // 在 11502 到 12482 之间，index = 1
        // 在 12482 到 12678 之间，index = 2
        // 在 12678 之后，index = 3
        /*
        for (let i in this.themeTopYs) {
          // 得到的i是index  是String类型
          // parseInt(i)  //转换成为Number整形
          if(positionY >　this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
            console.log(i)
          }
        }
         */
        let length = this.themeTopYs.length
        for (let i = 0 ;i < length-1; i++) {
          // if(this.currentIndex !== i && ((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
          //   || (i === length - 1 && positionY >=　this.themeTopYs[i]))) {
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        this.isShowBackTop = -position.y > 1000
      },

      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0]
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2.将商品添加到购物车里
        // this.$store.cartList.push(product)    //不要直接通过state修改状态 这样vuex监测不到  通过mutations修改
        // this.$store.commit('addCart', product)

        // 此处能使用then方法是应为actions中的addCart方法中设置返回一个promise
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res)
        // })

        // mapActions映射
        this.addCart(product).then(res => {
          // this.show = true;
          // this.message = res;
          //
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = '';
          // }, 1500)

          this.$toast.show(res, 2000)
        })

        // 3.添加到购物车成功

      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 129px);
  }
</style>
