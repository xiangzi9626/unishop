<template>
	<button @click="clearCart">清空购物车</button>
  <view class="cart-container" v-if="data.cart.length !== 0">

    <!--<view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>-->

    <!-- 循环渲染购物车中的商品信息 -->
     
       <MyCart :cart="data.cart"></MyCart>
   

    <!-- 使用自定义的结算组件 -->
   <!-- <my-settle></my-settle>-->
  </view>

  <!-- 空白购物车的区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty.png" class="empty-img"></image>
    <text class="tip-text">没有数据</text>
  </view>
</template>

<script setup>
	import {
		onLoad,onReady
	} from "@dcloudio/uni-app"
import { reactive } from "vue";
import MyCart from '../../conponents/my-cart/my-cart.vue'
	const data=reactive({
		cart:[]
	})
	onReady((param)=>{
		getCart()
	})
	const getCart=()=>{
		uni.getStorage({
			key:"cart",
			success:(res)=>{
				data.cart=JSON.parse(res.data)
				console.log(data.cart)
			}
		})
	}
	const clearCart=()=>{
		uni.clearStorage({
			key:"cart",
			success:()=>{
				uni.showToast({
					title:"清空成功",
					icon:"none"
				})
			}
		})
	}
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
	height: 100%;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #EFEFEF;

    .cart-title-text {
      font-size: 14px;
      margin-left: 10px;
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
