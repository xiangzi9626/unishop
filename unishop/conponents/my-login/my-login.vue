<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<view style="width: 100%;height: auto;display:flex;flex-direction: column;align-items:center;">
			<input v-model="form.username"
				style="width:90%;border:1px solid gray;padding:5rpx 0 5rpx 5rpx;border-radius:10px;" type="text"
				placeholder="请输入用户名" />
			<input v-model="form.password"
				style="width: 90%;margin-top:20rpx;border:1px solid gray;padding:5rpx 0 5rpx 5rpx;border-radius:10px;"
				type="password" placeholder="请输入密码" />
			<button type="primary" class="btn-login" @click="login">登录</button>

		</view>
		<button style="background-color:limegreen;color:white;" type="primary" class="btn-login"
			@click="wxLogin">微信一键登录</button>
		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>
<script setup>
	import {
		reactive
	} from "vue";
import { request } from "../../common/http.js";
	import {
		WX_CONFIG
	} from "../../common/wx_config.js"
	const form = reactive({
		username: "",
		password: ""
	})
	const login =async () => {
		form.username = form.username.trim()
		if (form.username == "" || form.password == "") {
			return uni.showToast({
				title: "请输入用户名和密码",
				icon: "none",
			})
		}
		const res=await request({url:"/user/login",data:form})
		if(res.code==200){
			uni.setStorage({
				key:"user",
				data:JSON.stringify(res.data.user)
			})
			 uni.setStorage({
				key:"token",
				data:res.data.token,
				success:function(){
					uni.reLaunch({
						url: '/pages/my/my'
					})
				}
			})
		}else{
			uni.showToast({
				title:"用户名或密码错误",
				icon:"none"
			})
		}
	}
	const wxLogin = () => {
		wx.login({
			success: (res) => {
				//通过res.code向服务器发起请求登录
				console.log(res)
				uni.setStorage({
					key: "token",
					data: "user",
					success: function() {
						uni.reLaunch({
							url: '/pages/my/my'
						})
					}
				})
			}
		})
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		background-color: #F8F8F8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;

		&::after {
			content: ' ';
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 20rpx 0;
			background-color: #C00000;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>