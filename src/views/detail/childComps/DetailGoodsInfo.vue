<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :src="item | Imgfilter"
        :key="index"
        alt=""
        @load="imgLoad"
      />
      <!-- 使用懒加载 -->
<!--      <img-->
<!--        v-for="(item, index) in detailInfo.detailImage[0].list"-->
<!--        v-lazy="item | Imgfilter"-->
<!--        :key="index"-->
<!--        alt=""-->
<!--        @load="imgLoad"-->
<!--      />-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default () {
        return {};
      }
    }
  },

  filters: {
    Imgfilter: function (value) {
      return "http:" + value
    }
  },
  computed: {
    showImage (item) {
      return "http:" + item;
    }
  },
  data () {
    return {
      counter: 0,
      imagesLength: 0,
      MyTopImages: [],
    }
  },
  //防止详情页内图片加载不完全而导致的better-scroll插件滚动中断
  methods: {
      imgLoad(){
          //判断，所有的图片都加载完了，那么进行一次回调就可以了
          if(++this.counter === this.imagesLength){
              this.$emit('imageLoad');
          }
      }
  },
  watch: {
    // 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。
    // 这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的
      detailInfo(){
          //获取图片的个数
          this.imagesLength = this.detailInfo.detailImage[0].list.length;
      }
  }

  // methods: {
  //   imgLoad () {
  //     //console.log('加载DetailGoodsInfo');
  //     this.$emit('detailImageLoad');
  //   }
  // },
  //  created() {
  //    if(Object.keys(this.detailInfo).length !== 0){
  //     this.MyTopImages = this.detailInfo.detailImage[0].list;
  //     for(let i = 0; i < this.MyTopImages.length; i++){
  //         this.MyTopImages[i] = "http:" + this.MyTopImages[i];
  //     }
  //    }

  //     console.log(this.MyTopImages);
  // }
}
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>
