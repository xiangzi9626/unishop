<template>
	<view class="container">
		<view class="scroll-box">
	<scroll-view scroll-y="true">
	<block v-for="(goods, i) in props.cart" :key="i">
	  <uni-swipe-action-item>
  <view class="goods-item">
    <!-- 左侧的盒子 -->
    <view class="goods-item-left">
      <radio :checked="goods.state" color="#C00000" @click="radioClick(i)"></radio> 
      <image :src="APP_CONFIG.SERVER_URL+'/upload/img/goods/'+goods.img" class="goods-pic"></image>
    </view>
    <!-- 右侧的盒子 -->
    <view class="goods-item-right">
      <!-- 商品的名字 -->
      <view class="goods-name">{{goods.title}}</view>
	  <view style="color: gray;"><text v-for="(v,k) in goods.spec">{{k}}:{{v}}&nbsp;</text></view>
      <view class="goods-info-box">
        <view class="goods-price">
        	<text class="symbol">￥</text>
        	<text class="big-num">{{parsePrice(goods.price)[0]}}</text>
        	<text class="small-num">.{{parsePrice(goods.price)[1]}}</text>
        </view>
        <uni-number-box :min="1" :value="goods.count" @change="numChange(i,$event)"></uni-number-box>
      </view>
    </view>
  </view>
  </uni-swipe-action-item>
  </block>
  </scroll-view>
   </view>
  <view class="bottom-box">
	  <view class="bottom-item1">
		  <radio :checked="data.select" color="#C00000" @click="selectAll">全选</radio>
	  </view>
	  <view class="bottom-item2" @click="deleteGoods">
		  <text>删除</text>
	  </view>
	  <view class="bottom-item3">
		  总计:
        	<text class="symbol">￥</text>
        	<text class="big-num">{{parsePrice(data.total)[0]}}</text>
        	<text class="small-num">.{{parsePrice(data.total)[1]}}</text>
       </view>
	  <view class="bottom-item4" @click="settlement">
		  <text>结算</text>
	  </view>
  </view>
  </view>
</template>

<script setup>
	import {APP_CONFIG} from "../../common/config.js"
	import {parsePrice} from "../../wxs/number.js"
import { reactive } from "vue";
	const data=reactive({
		total:0.00,
		select:false
	})
	const props=defineProps({cart:[]})
	const radioClick=(index)=>{
		props.cart[index].state=!props.cart[index].state
		totalPrice()
		let n=0
		for(let i=0;i<props.cart.length;i++){
			if(props.cart[i].state){
				n++
			}
		}
		if(n==props.cart.length){
			data.select=true
		}else{
			data.select=false
		}
		
	}
	const numChange=(index,count)=>{
		props.cart[index].count=count
		totalPrice()
	}
	const deleteGoods=()=>{
		if(data.total==0){
			uni.showToast({
				title:"请勾选商品",
				icon:"error"
			})
			return
		}
	}
	//结算
	const settlement=()=>{
		if(data.total==0){
			uni.showToast({
				title:"请勾选商品",
				icon:"none"
			})
			return
		}
	uni.navigateTo({
		url:"/pages/submit-order/submit-order"
	})
	}
	const selectAll=()=>{
		data.select=!data.select
		for(let i=0;i<props.cart.length;i++){
			props.cart[i].state=data.select
		}
		totalPrice()
	}
	//计算总价
	const totalPrice=()=>{
		let total_price=0.00
		for(let i=0;i<props.cart.length;i++){
			if(props.cart[i].state){
				total_price+=props.cart[i].price*props.cart[i].count
			}
		}
		data.total=total_price
	}
</script>

<style lang="scss" scoped>
	.container{
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.scroll-box{
		flex:1;
	}
	.bottom-box{
		padding:10rpx;
		display: flex;
		justify-content:space-around;
	}
	.bottom-item2{
		color:#C00000;
	}
	.bottom-item3 text{
		color: #C00000;
	}
	.bottom-item4{
		border-radius: 5px;
		padding:5rpx 20rpx;
		background-color: #C00000;
		color: #ffffff;
	}
  .goods-item {
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-price{
          color: crimson;
          .big-num{
          	font-size:30rpx;
          }
          .symbol,.small-num{
          	font-size:25rpx;
          }
          
		  
        }
      }
    }
  }
  .bottom-item3{
	  .big-num{
	  	font-size:30rpx;
	  }
	  .symbol,.small-num{
	  	font-size:25rpx;
	  }
  }
</style>
