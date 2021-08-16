<template>
  <div class="toast" v-show="isShow">
    <div >{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
    //   message: {
    //     type: String,
    //     default: ''
    //   },
    //   show: {
    //     type: Boolean,
    //     default: false
    //   }
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      // es6给参数设置默认值
      show(message='默认文字', duretion=2000) {
        // duretion = duretion || 2000        //es6前写默认参数

        this.isShow = true;
        this.message = message

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        },duretion)
      }
    }
  }
</script>

<style scoped>
 .toast {
   position: fixed;
   top: 50%;
   left: 50%;
   /*transform(转变): translate（平移动）x，y  参数写成 % 是根据自身的大小进行百分比  */
   transform: translate(-50%, -50%);
   padding: 8px 10px;

   /*必须设置了position:才能使用z-index*/
   z-index: 999;

   color: #fff;
   background-color: rgba(0,0,0,.75);
 }
</style>
