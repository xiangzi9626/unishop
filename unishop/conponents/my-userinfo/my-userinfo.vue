<template>
	<view class="my-userinfo-container">
		<!-- 头像和昵称区域 -->
		<view class="top-box">
			<image src="/static/avatar.png" class="avatar"></image>
			<view class="nickname">{{data.user.username}}</view>
		</view>

		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第1个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>

			<!-- 第2个面板 -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>

			<!-- 第3个面板 -->
			<view class="panel">
				<view class="panel-list-item" @click="deliveryAddress">
					<uni-icons type="location" size="18"></uni-icons>
					<text>收货地址</text>
				</view>
				<view class="panel-list-item">
					<uni-icons type="contact" size="18"></uni-icons>
					<text>联系客服</text>
				</view>
				<view class="panel-list-item" @click="logout">
					<uni-icons type="flag" size="18"></uni-icons>
					<text>退出登录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive
	} from "vue"
	const data = reactive({
		user: {}
	})
	const getUserInfo = () => {
		uni.getStorage({
			key: "user",
			success: function(res) {
				data.user = JSON.parse(res.data)
			}
		})
	}
	onMounted(() => {
		getUserInfo()
	})
	const deliveryAddress = () => {
		uni.navigateTo({
			url: "/pages/delivery-address/delivery-address"
		})
	}

	const logout = () => {
		uni.showModal({
			title: "提示",
			content: "确定退出登录吗?",
			success: function() {
				try {
					uni.removeStorageSync("token")
					uni.removeStorageSync("user")
					uni.reLaunch({
					  url: '/pages/my/my'
					})
				}catch(e) {

				}
			}
		})
	}
</script>

<style lang="scss" scoped>
	.my-userinfo-container {
		height: 100%;
		background-color: #F4F4F4;

		.top-box {
			height: 400rpx;
			background-color: #C00000;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.avatar {
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 2px solid #FFF;
				box-shadow: 0 1px 5px black;
			}

			.nickname {
				font-size: 16px;
				color: #FFF;
				font-weight: bold;
				margin-top: 10px;
			}
		}
	}

	.panel-list {
		padding: 0 10px;
		position: relative;
		top: -10px;

		.panel {
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;

			.panel-title {
				line-height: 45px;
				padding-left: 10px;
				font-size: 15px;
				border-bottom: 1px solid #F4F4F4;
			}

			.panel-body {
				display: flex;
				justify-content: space-around;

				.panel-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					padding: 10px 0;
					font-size: 13px;

					.icon {
						width: 35px;
						height: 35px;
					}
				}
			}
		}
	}

	.panel-list-item {
		display: flex;
		align-items: center;
		font-size: 15px;
		padding: 0 10px;
		line-height: 45px;

		text {
			margin-bottom: 3rpx;
			padding-left: 1px;
		}
	}
</style>