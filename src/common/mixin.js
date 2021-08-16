import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";


// 此处是将itemListenerMix中的 mounted() {}函数中的代码  （也可以添加data（）{} ,components:{}等等  反正vue实例对象中的大部分东西都可以混入 ）抽出
// 自动同 Detail.vue中的Vue实例中的mounted() {}函数（即生命周期函数）中的代码混入到一起了
//只需在Detail.vue中的Vue实例中 添加 mixins: [itemListenerMix],即可


export const itemListenerMix = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refreshs = debounce(this.$refs.scroll.refresh,100)
    // 1.监听detail中的推荐item中图片加载完成   此处接收GoodsListItem中通过this.$bus.$emit('itemImageLoad')   传过来的事件  第二个参数是回调函数
    // $bus默认是没有值的  需在main.js中通过 vue原型给他附一个vue实例

    this.itemImgListener = () => {
      refreshs()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

// exends继承可以减少类class中的代码量
// mixin混入可以减少对象中的代码量


export const backTopMixin = {
  components: {
    BackTop            //混入中注册也需要导入相关依赖
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },

  // 注意：mixin  只能抽取methods中的外层整个方法  如果要只抽取methods中的该外层方法内部一些代码  则合并时会将该方法覆盖原方法而不是合并
  // 要是真想抽取该外层方法内部一些代码 则把这些代码单独另外写成一个方法  在原外层方法中调用  然后在mixin中抽出该方法
  // 生命周期函数如 create  、 mounted  可以抽取其函数中的部分代码进行合拼  应为她是与methods同级的（即属于vue对象中的第一层属性方法）
  methods: {
    backClick() {
      // 父组件访问子组件 中的方法 属性 数据   另外：scrollTo方法参数： x y 时间ms
      this.$refs.scroll.scrollTo(0, 0, 200)
    },
  }
}
