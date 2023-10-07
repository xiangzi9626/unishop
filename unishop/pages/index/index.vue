<template>
	<view class="search">
		<uni-easyinput :inputBorder="false" prefixIcon="search" confirmType="搜索" v-model="data.search" placeholder="请输入关键字搜索"></uni-easyinput>
	</view>
	<!--轮播图-->
	<view class="banner">
		<swiper :circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image src="/static/banner/1.jpg"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="/static/banner/2.jpg"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="/static/banner/3.jpg"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
	<!--分类-->
	 <view class="cat-item">
	      <view class="item" @click="toClassifyPage" data-sts="1">
	        <image src="/static/icon/newProd.png"></image>
	        <text>新品推荐</text>
	      </view>
	      <view class="item" @tap="toClassifyPage" data-sts="1">
	        <image src="/static/icon/timePrice.png"></image>
	        <text>限时特惠</text>
	      </view>
	      <view class="item" @tap="toClassifyPage" data-sts="3">
	        <image src="/static/icon/neweveryday.png"></image>
	        <text>每日疯抢</text>
	      </view>
	      <view class="item" @tap="toCouponCenter">
	        <image src="/static/icon/newprods.png"></image>
	        <text>领优惠券</text>
	      </view>
	    </view>
		<!--商品列表 -->
		<view class="text-box">
			<text>最新上架</text>
		</view>
		 <scroll-view scroll-y="true">
				<view><GoodsList :goodsList="data.goodsList"/></view>
			</scroll-view>	 
</template>
<script setup>
	import { reactive, ref } from "vue";
import {request} from "../../common/http.js"
 import GoodsList from '../../conponents/GoodsList.vue'
 import {onLoad} from "@dcloudio/uni-app"
const data=reactive({
	search:"",
	goodsList:[]
})
const page=reactive({
	currentPage:1,
	pageSize:20
})
	const getData=async ()=>{
		const res = await request({url:"/goods/list",data:page})
		 data.goodsList=res.data
	}
	onLoad(()=>{
		getData()
	})
</script>
<style scoped>
	.banner image{
		width: 750rpx;
	}
	.cat-item {
	  display: flex;
	  justify-content: space-between;
	  background: #fff;
	  padding: 20rpx 0;
	}
	
	.cat-item .item {
	  text-align: center;
	  width: 25%;
	  display: flex;
	  flex-direction: column;
	  margin: auto;
	  align-items: center;
	}
	
	.cat-item .item image {
	  width: 75rpx;
	  height: 75rpx;
	}
	
	.cat-item .item text {
	  font-size: 26rpx;
	  margin-top: 20rpx;
	}
	.text-box{
		margin-left:16rpx;
		color: crimson;
		font-weight:800;
	}
</style>