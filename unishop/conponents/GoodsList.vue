<template>
	<view class="container">
		<view class="goods-list">
			<block v-for="(item,index) in props.goodsList" :key="index">
				<view class="goods-item" @click="toDetailPage(item)">
		<view class="img-box">
			<image :src="APP_CONFIG.SERVER_URL+'/upload/img/goods/'+item.img.split(',')[0]"></image>
		</view>
		<view class="title">{{item.title}}</view>
		<view class="price">
			<text class="symbol">￥</text>
			<text class="big-num">{{parsePrice(item.price)[0]}}</text>
			<text class="small-num">.{{parsePrice(item.price)[1]}}</text>
		</view>
		</view>
		</block>
	</view>
	</view>
</template>
<script setup>
	import {APP_CONFIG} from "../common/config.js"
	import {parsePrice} from "../wxs/number.js"
	const props = defineProps({
	goodsList:[]
	}
	)
	const toDetailPage = (item) => {
		uni.navigateTo({
			url: "/pages/detail/detail?id=" + item.id
		})
	}
</script>
<style scoped lang="scss">
	.container{
		width:750rpx;
	}
	.goods-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding-bottom: 20rpx;
	}
	.goods-item {
		margin-top:20rpx;
		width: 340rpx;
	}

	.img-box {
		width: 340rpx;
		height: 340rpx;
		border: 0;
		image{
			max-width:340rpx;
			max-height:340rpx;
			margin: auto;
			line-height:340rpx;
		}
	}

	.goods-item .title {
		margin: 5px 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.price {
		color: crimson;
		.big-num{
			font-size:30rpx;
		}
		.symbol,.small-num{
			font-size:25rpx;
		}
	}
</style>