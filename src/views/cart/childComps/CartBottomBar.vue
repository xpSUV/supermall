<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottom",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
      // .toFixed(2) 保留两位小数
        return '￥' + this.cartList.filter(item => item.checked)
          .reduce((preValue, item) => preValue + item.price * item.count, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false

        // 1.使用filter    数值可以取反
        // return !(this.cartList.filter(item => !item.checked).length)

        // 2.使用find
        //find ： 当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
        // 测试条件是 return 后的函数体
        return !this.cartList.find(item => !item.checked)

        // 3.使用普通遍历
        // for(let item of this.cartList) {
        //   if(!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {    //全部选中
          // forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
          // 相当于只是遍历数组 但其中的函数可以传一些数组元素参数 function(currentValue, index, arr)
          this.cartList.forEach(item => item.checked = false)
        } else {      //部分或全部未选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll) {
          this.$toast.show('请选择购买的商品', 2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    /*文本等元素设置行间距   可以结合text-align：center 做到垂直水平居中*/
    line-height: 40px;

    background-color: #eee;

    font-size: 14px;
  }

  .check-content {
    display: flex;
    justify-content: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {

    margin-top: 10px;
    margin-right: 5px;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }

  .price {
    flex: 1;
    margin-left: 20px;
  }

  .calculate {
    text-align: center;
    width: 90px;
    background-color: red;
    color: #fff;
  }
</style>
