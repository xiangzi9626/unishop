<template>
	<view class="container">
		<view class="top">
		<view class="address" v-if="!address.name">
			<view><text>填写收货信息</text></view>
			<view>
				<uni-forms :modelValue="formData">
					<uni-forms-item required label="收货人" name="name">
						<uni-easyinput type="text" v-model="formData.name" placeholder="请输入收货人" />
					</uni-forms-item>
					<uni-forms-item required label="手机号" name="phone">
						<uni-easyinput type="text" v-model="formData.phone" placeholder="请输入手机号" />
					</uni-forms-item>
					<uni-forms-item required label="所在地">
						<uni-data-picker :localdata="select.localData" popup-title="请选择省市区" @change="onchange"
							@nodeclick="onnodeclick">
						</uni-data-picker>
					</uni-forms-item>
					<uni-forms-item label="详细地址">
					<uni-easyinput type="text" v-model="formData.detailAddress" placeholder="请输入详细地址" />
					</uni-forms-item>
				</uni-forms>
				<button @click="submitForm">保存并使用</button>
			</view>
		</view>
		<view class="address2" v-else>
			<view class="left">
			<text>{{address.name}},</text>
			<text>{{address.mobile}},</text>
			<text>{{address.city}}</text>
			<text>{{address.detailAddress}}</text>
			</view>
			<view class="right" @click="editAddress">
				  <uni-icons type="compose" size="20"></uni-icons>
			</view>
		</view>
		
		
		
	<view class="goods">
		<block v-for="(goods, i) in goodsList" :key="i">
			<uni-swipe-action-item>
			<view class="goods-item">
			  <!-- 左侧的盒子 -->
			  <view class="goods-item-left">
			    <image :src="goods.img" class="goods-pic"></image>
			  </view>
			  <!-- 右侧的盒子 -->
			  <view class="goods-item-right">
			    <!-- 商品的名字 -->
			    <view class="goods-name">{{goods.name}}</view>
			    <view class="goods-info-box">
			      <view class="goods-price">
			      	 <text class="symbol">￥</text>
			      	<text class="big-num">{{parsePrice(goods.price)[0]}}</text>
			      	<text class="small-num">.{{parsePrice(goods.price)[1]}}</text>
			      </view>
			      <text>数量:x{{goods.count}} </text>
			    </view>
			  </view>
			</view>
			</uni-swipe-action-item>
			 </block>
	</view>
	<view class="v3">
		<view>
			<text>配送费用</text>
			<text>￥0.00</text>
		</view>
	</view>
	</view>
	<view class="bottom">
		 <view class="price">
			 <text>合计:</text>
			<text class="symbol">￥</text>
			<text class="big-num">{{parsePrice(totalPrice)[0]}}</text>
			<text class="small-num">.{{parsePrice(totalPrice)[1]}}</text>
		</view>
		<view>提交订单</view>
	</view>
	</view>
</template>
<script setup>
	import {parsePrice} from "../../wxs/number.js"
	import {onLoad} from "@dcloudio/uni-app"
	import {reactive,ref} from "vue";
	import {CITY_DATA} from "../../common/city-data/data.js"
	const address=reactive({name:"华子",mobile:"12112451245",city:"江苏省",detailAddress:"东城区10号"})
	const select = reactive({
		localData:[]
	})
	const totalPrice=ref(0)
	const goodsList=reactive([{
		 name:"商品一",
		price:100,
		count:2,
		img:"/static/banner/1.jpg"
	},{
		 name:"商品2",
		price:120,
		count:3,
		img:"/static/banner/1.jpg"
	}])
	const formData = reactive({
		name: "",
		phone: "",
		detailAddress:""
	})
	const countPrice=()=>{
		let total=0
		for(let index in goodsList){
			total+=goodsList[index].price*goodsList[index].count
		}
		totalPrice.value=total
	}
	onLoad(() => {
		countPrice()
		// 省市区数据树生成
		select.localData=getCityTree()
	})
	const editAddress=()=>{
		 address.name=""
	}
	const getCityTree = () => {
		let res=[]
		 for(let i in CITY_DATA.DATA){
			 if(CITY_DATA.DATA[i].parent_code==null){
				  res.push({
					 id:CITY_DATA.DATA[i].code,
					 pid:0,
					 text:CITY_DATA.DATA[i].name,
					 children:[],
					 value:CITY_DATA.DATA[i].code
				 })
			 }
		 }
		 for(let i in res){
			 for(let j in CITY_DATA.DATA){
				 if(res[i].id==CITY_DATA.DATA[j].parent_code){
					 res[i].children.push({
						id:CITY_DATA.DATA[j].code,
						pid:CITY_DATA.DATA[j].parent_code,
						text:CITY_DATA.DATA[j].name,
						children:[],
						value:CITY_DATA.DATA[j].code 
					 })
				 }
			 }
		 }
		 for(let i in res){
			 for(let j in res[i].children){
				 for(let k in CITY_DATA.DATA){
					 if(res[i].children[j].id==CITY_DATA.DATA[k].parent_code){
						 res[i].children[j].children.push({
							 id:CITY_DATA.DATA[k].code,
							 pid:CITY_DATA.DATA[k].parent_code,
							 text:CITY_DATA.DATA[k].name,
							 children:[],
							 value:CITY_DATA.DATA[k].code
						 })
					 }
				 }
			 }
		 }
		 return res
	}
	// 整体选择完成以后
	const onchange = (e) => {

	}
	// 节点变化后 （并非已经选择完毕）
	const onnodeclick = (node) => {

	}
	</script>
<style lang="scss" scoped>
	.container {
		width:700rpx;
		height: 100vh;
		margin:auto;
		display: flex;
		flex-direction: column;
	}
	.container .top{
		flex:1;
	}
.address button{
	color: #C00000;
}
	.address view:nth-child(1) {
		font-weight: bold;
		margin: 20rpx 0;
	}
	.goods-item {
		margin:0 auto 20rpx auto;
	  box-sizing: border-box;
	  display: flex;
	  border-bottom: 1px solid #f0f0f0;
	 }
	  .goods-item-left {
	    margin-right: 5px;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	 }
	    .goods-pic {
	      width: 100px;
	      height: 100px;
	      display: block;
	   }
	  .goods-item-right {
	    display: flex;
	    flex: 1;
	    flex-direction: column;
	    justify-content: space-between;
	}
	    .goods-name {
	      font-size: 13px;
	    }
	
	    .goods-info-box {
	      display: flex;
	      justify-content: space-between;
	      align-items: center;
	}
	.container .v3 view{
	display: flex;
	justify-content: space-between;
	padding-bottom:20rpx;
	}
	.container .bottom{
		padding-bottom:20rpx;
		 display:flex;
		justify-content:space-between;
	}
	.container .bottom view:nth-child(1){
		padding:10rpx 0;
	}
	.container .bottom view:nth-child(2){
		background-color: #C00000;
		color:#fff;
		padding:10rpx 20rpx;
		border-radius:10px;
	}
	.top .address2{
		padding:20rpx 0;
		display: flex;
		justify-content: space-between;
		.left{
			width: 500rpx;
		}
		.right{
			padding-left: 10rpx;
		 }
	}
	.bottom .price,.goods-price {
		.big-num{
			color: crimson;
			font-size:30rpx;
		}
		.symbol,.small-num{
			color: crimson;
			font-size:25rpx;
		}
	}
</style>