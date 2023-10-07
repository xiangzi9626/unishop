<template>
	<view class="container">
		<view class="top">
			<view class="swiper">
				<swiper :style="'height:'+swiperHeight">
					<swiper-item :style="'height:'+swiperHeight">
						<view class="img-box">
							<image :src="APP_CONFIG.SERVER_URL+'/upload/img/goods/'+data.goodsImg">
							</image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="title">{{data.goods.title}}</view>
			<view class="price">
				<text class="symbol">￥</text>
				<text class="big-num">{{parsePrice(data.goods.price)[0]}}</text>
				<text class="small-num">.{{parsePrice(data.goods.price)[1]}}</text>
			</view>
		</view>
		<view class="content">
			<rich-text class="rich-text" :nodes="data.goods.content"></rich-text>
		</view>
		<view class="bottom-box">
			<uni-goods-nav @click="onClick" :button-group="buttonGroup" :options="options"
				@buttonClick="buttonClick"></uni-goods-nav>
		</view>
	</view>
	<uni-popup ref="popup" type="bottom"
		style="z-index: 100;position: absolute;bottom: 0;background-color:white;left:0;" class="uni-popup">
		<view style="width:100%;background-color: white;padding:20rpx 0;">
			<view style="width:90%;height:900rpx;margin:auto;">
				<view v-if="Object.keys(data.address).length>0" style="padding: 0 5rpx;display:flex;" @click="jumpAddress">
				<uni-icons type="location" size="25" style="margin-top:15rpx;"></uni-icons>
				<text>{{data.address.name}}&nbsp;{{data.address.phone}}&nbsp;{{data.address.province}}{{data.address.city}}{{data.address.area}}{{data.address.detail}}</text>
				<uni-icons type="forward" size="25" style="margin-top:15rpx;"></uni-icons>
				</view>
				<view style="display:flex;">
					<view class="popup-left" style="width: 200rpx;height:150rpx;padding:5rpx;">
						<image style="max-width:200rpx;max-height:150rpx;margin: auto;"
							:src="APP_CONFIG.SERVER_URL+'/upload/img/goods/'+data.goodsImg">
						</image>
					</view>
					<view class="popup-right"
						style="margin-left:20rpx;display:flex;flex-direction:column;">
						<view class="price" v-if="data.selectAll">
							<text class="symbol">￥</text>
							<text class="big-num">{{parsePrice(order.spec.price)[0]}}</text>
							<text class="small-num">.{{parsePrice(order.spec.price)[1]}}</text>
							<text style="color:black;" v-if="data.selectAll">&nbsp;库存{{order.spec.stock}}件</text>
						</view>
						<view class="price" v-else-if="data.maxPrice==data.minPrice">
							<text class="symbol">￥</text>
							<text class="big-num">{{parsePrice(data.goods.price)[0]}}</text>
							<text class="small-num">.{{parsePrice(data.goods.price)[1]}}</text>
							<text style="color: black;" v-if="Object.keys(data.select).length==0">&nbsp;库存{{data.goods.stock}}件</text>
						</view>
						<view class="price" v-else>
							<text class="symbol">￥</text>
							<text class="big-num">{{parsePrice(data.minPrice)[0]}}</text>
							<text class="small-num">.{{parsePrice(data.minPrice)[1]}}</text>
							<text class="small-num">-</text>
							<text class="big-num">{{parsePrice(data.maxPrice)[0]}}</text>
							<text class="small-num">.{{parsePrice(data.maxPrice)[1]}}</text>
						</view>
						 <view style="display:flex;flex-wrap:wrap;width:520rpx;">
							<block v-if="Object.keys(order.spec).length>0">已选择&nbsp;</block>
							<block v-for="(value,key) in order.spec">
								<block v-if="key!='price' && key!='stock'">{{key}}&nbsp;{{value}}&nbsp;</block>
								</block>
						</view>
						<view>
							<uni-number-box v-if="data.selectAll" v-model="order.count" :min="1" :max="order.spec.stock" :step="1" @change="numChange"></uni-number-box>
						   <uni-number-box v-else-if="Object.keys(data.select).length==0" v-model="order.count" :min="1" :max="data.goods.stock" :step="1" @change="numChange"></uni-number-box>
						</view>
					</view>
				</view>
				<scroll-view :scroll-y="true" style="width:100%;height:600rpx;margin:30rpx auto;">
					<view v-for="(value,key) in data.select" :key="key">
						<view>
							<text style="margin-top:15rpx;">{{key}}</text>
							<view style="display:flex;flex-wrap:wrap;width:100%;">
								<view v-for="(item,index) in value" style="padding:10rpx 15rpx;margin:15rpx 0 0 15rpx"
									@click="select(key,index)" :class="{active:item.active==true}">
									<text>{{item.val}}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view style="margin: auto;">
					<button @click="addCart" type="default" style="background-color:red;color:white;" v-if="data.showAddCartButton">加入购物车</button>
					<button @click="submitOrder" type="default" style="background-color:red;color:white;" v-else>立即支付</button>
				</view>
			</view>
		</view>
	</uni-popup>
</template>
<script setup>
	import {
		APP_CONFIG
	} from "../../common/config.js"
	import {
		reactive,
		ref
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		request
	} from "../../common/http";
	import {
		parsePrice
	} from "../../wxs/number.js"
	const swiperHeight = ref('750rpx')
	const popup = ref(null)
	const data = reactive({
		token:"",
		showAddCartButton:false,
		goodsImg: "",
		goods: {},
		cart: [],
		maxPrice: 0,
		minPrice: 0,
		select: {},
		selectAll: false,
		address:{},
		user:{}
	})
	const options = reactive([{
			icon: "home",
			text: "首页"
		},
		{
			icon: "cart",
			text: "购物车",
			info: data.cart.length,
			infoBackgroundColor: '#C00000',
			infoColor: "white"
		}
	])
	const order = reactive({
		 title:data.goods.title,
		img:data.goods.img,
		 count: 1,
		gid: data.goods.id,
		spec: {},
		address:data.address
	})
	const jumpAddress=()=>{
		 popup.value.close("bottom")
		uni.navigateTo({
			url:"/pages/delivery-address/delivery-address"
		})
	}
	const getAddress=async ()=>{
		if(data.token=="" || data.token==undefined) return false
		 const res =await request({url:"/user/address/get?uid="+data.user.id})
		 data.address=res
	}
	const addCart=()=>{
		if(!data.selectAll && Object.keys(data.select).length>0){
			return uni.showToast({
				title:"请选择规格",
				icon:"none"
			})
		}
		let id=data.goods.id
		let title=data.goods.title
		let img=data.goodsImg
		let price=order.spec.price
		let spec=order.spec
		delete spec.price
		delete spec.stock
		let count=order.count
			let obj={"id":id,"title":title,"img":img,"price":price,"spec":spec,"count":count,"state":false}
			 data.cart.push(obj)
			uni.setStorage({
				key:"cart",
				data:JSON.stringify(data.cart),
				success:function(){
					 options[1].info=data.cart.length
					uni.showToast({
						icon:"none",
						title:"加入购物车成功"
					})
				 popup.value.close("bottom")
				},
				fail:function(){
					uni.showToast({
						icon:"none",
						title:"加入购物车失败请重试"
					})
				}
			})
	}
	const submitOrder=async ()=>{
		 if(!data.selectAll && Object.keys(data.select).length>0){
			return uni.showToast({
				title:"请选择规格",
				icon:"none"
			})
		}
		const res=await request({url:"/user/order/add",data:order})
		console.log(res)
		/*uni.navigateTo({
			url: "/pages/submit-order/submit-order"
		})*/
	}
	const select = (key, index) => {
		order.count=1
		for (let i = 0; i < data.select[key].length; i++) {
			if (i == index) {
				continue
			} else {
				data.select[key][i].active = false
			}
		}
		data.select[key][index].active = !data.select[key][index].active
		if (data.select[key][index].active) {
			order.spec[key] = data.select[key][index].val
		} else {
			if (key in order.spec) {
				delete order.spec[key]
			}
		}
		let sel = {}
		for (let key in data.select) {
			if (key in order.spec) {
				sel[key] = order.spec[key]
			}
		}
		order.spec = sel
		if (Object.keys(data.select).length == Object.keys(order.spec).length) {
			data.selectAll = true
			for (let i = 0; i < data.goods.sale.length; i++) {
				let n = 0
				for (let key in data.goods.sale[i]) {
					if (data.goods.sale[i][key] == order.spec[key]) {
						n++
					}
				}
				if (n == Object.keys(order.spec).length) {
					order.spec["price"] = Number(data.goods.sale[i]["price"])
					order.spec["stock"] = Number(data.goods.sale[i]["stock"])
					break;
				} else {
					if ("price" in order.spec) delete order.spec["price"]
					if ("stock" in order.spec) delete order.spec["stock"]
				}
			}
		} else {
			data.selectAll = false
		}
	}
	const numChange = () => {
		let stock=Number(data.goods.stock)
		if(Object.keys(data.select).length>0){
			stock=Number(order.spec.stock)
		}
		if (order.count >= stock) { 
			order.count = stock
		}
	}
	const getData = async (id) => {
		const res = await request({
			url: "/goods/get?id=" + id
		})
		const cartStr = uni.getStorageSync("cart")
		if (cartStr != "" && cartStr!=undefined) {
			data.cart = JSON.parse(cartStr)
			options[1].info = data.cart.length
		}
		res.sale = JSON.parse(res.sale)
		res.content = res.content.replace(/<img/g, `<img class='img'`)
		res.content += `<div style='width:100%;height:80px;'></div>`
		res.img = res.img.split(",")
		data.goodsImg = res.img[0]
		data.goods = res
		let priceArr = []
		for (let i = 0; i < res.sale.length; i++) {
			let price = Number(res.sale[i]["price"])
			priceArr.push(price)
		}
		priceArr.sort((a, b) => a - b)
		data.minPrice = priceArr[0]
		data.maxPrice = priceArr[priceArr.length - 1]
		for (let i = 0; i < res.sale.length; i++) {
			for (let key in res.sale[i]) {
				let b = false
				if (Number(res.sale[i]["active"]) == 1) {
					b = true
				}
				if (i == 0 && key != "price" && key != "stock" && key != "active") {
					let val = []
					val.push({
						"val": res.sale[i][key],
						"active": b
					})
					data.select[key] = val
				} else if (i > 0 && key != "price" && key != "stock" && key != "active") {
					let isExist = false
					for (let k in data.select) {
						for (let index in data.select[k]) {
							if (data.select[k][index].val == res.sale[i][key]) {
								isExist = true
							}
						}
					}
					if (!isExist) {
						data.select[key].push({
							"val": res.sale[i][key],
							"active": b
						})
					}
				}
			}
		}
	}
	const buttonGroup = reactive([{
			text: '加入购物车',
			backgroundColor: 'black',
			color: '#fff'
		},
		{
			text: '立即购买',
			backgroundColor: '#C00000',
			color: '#fff'
		}
	])
	const setSwiperHeight = () => {
		const query = uni.createSelectorQuery()
		query.select(".img-box").boundingClientRect((rect) => {
			swiperHeight.value = rect.height + "px"
		})
		query.exec()
	}
	const getStorage=()=>{
		data.token=uni.getStorageSync("token")
		let user=uni.getStorageSync("user")
		if(user!=undefined && user!=""){
			data.user=JSON.parse(user)
		}
	}
	
	onLoad((param) => {
		getStorage()
		//uni.clearStorage("cart")
		 getData(param.id)
		setSwiperHeight()
		getAddress()
	})
	const buttonClick = (e) => {
		switch (e.index) {
			case 0:
			data.showAddCartButton=true
			popup.value.open('bottom')
				//console.log("加入购物车")
				break
			case 1:
			let token=uni.getStorageSync("token")
			if(token==undefined || token==""){
				uni.switchTab({
					url:"/pages/my/my"
				})
			}else if(data.address.name==undefined){
				uni.navigateTo({
					url: "/pages/addAddress/addAddress"
				})
			}else{
				getAddress()
			data.showAddCartButton=false
				//console.log("打开购买弹出窗口")
				popup.value.open('bottom')
				}
				break
		}
	}
	const onClick = (e) => {
		let index = e.index
		switch (index) {
			case 0:
				uni.switchTab({
					url: "/pages/index/index"
				})
				break
			case 1:
				uni.switchTab({
					url: "/pages/cart/cart"
				})
				break
		}
	}
	/*const toTest = () => {
		uni.navigateTo({
			url: "/pages/test/test"
		})
	}*/
</script>
<style lang="scss">
	.uni-popup .active {
		background-color: red;
		color: white;
	}

	.container {
		width: 720rpx;
		margin: auto;
		height: 100vh;
	}

	swiper,
	swiper-item {
		width: 100%;
	}

	swiper image {
		max-width: 750rpx;
		max-height: 750rpx;
		margin: auto;
	}

	.title {
		margin: 10rpx 0;
	}

	.price {
		color: crimson;
	}

	.price .big-num {
		font-size: 30rpx;
	}

	.price .symbol,
	.small-num {
		font-size: 25rpx;
	}

	.content {
		margin-top: 20rpx;
	}

	.rich-text {
		width: 720rpx;
	}

	.img {
		margin: auto;
		max-width: 100% !important;
		max-height: 100% !important;
		display: block;
	}

	.bottom-box {
		z-index: 100;
		width: 100%;
		position: fixed;
		bottom: 0;
	}
</style>