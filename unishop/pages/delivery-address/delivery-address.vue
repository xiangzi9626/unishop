<template>
	<view class="container">
		<view class="main">
		    <view class="empty" v-if="data.addressList.length==0">
		      <view class="img">
		        <image src="/static/images/icon/empty-addr.jpg"></image>
		      </view>
		      <view class="txt">您还没有收货地址</view>
		    </view>
			  <block v-for="(item, index) in data.addressList" :key="index">
			        <view class="address">
			          <view class="personal" @click="selAddrToOrder(item)">
			            <view class="info-tit">
			              <text class="name">{{item.name}}</text>
			              <text class="tel">{{item.phone}}</text>
			              <image src="/static/images/icon/revise.png" :data-addrid="item" @click="edit(item.id)"></image>
			            </view>
			            <view class="addr">
			
			              <text class="addr-get"> {{item.province}}{{item.city}}{{item.area}}{{item.detail}}</text>
			            </view>
			          </view>
			          <view class="select-btn">
			            <view class="box">
			              <label @click="onDefaultAddr(index)" :data-addrid="item.id">
			                <radio :value="item.id" :checked="item.selected==1" color="#eb2444"></radio>设为默认地址</label>
			            </view>
			          </view>
			        </view>
			      </block> 
	</view>
	<view class="footer" @click="onAddAddr">
	    <text>新增收货地址</text>
	  </view>
</view>
</template>
<script setup>
import { reactive } from "vue";
import { request } from "../../common/http";
import {
		onLoad,onReady
	} from "@dcloudio/uni-app"
	const data=reactive({
		addressList:[],
		user:{}
	})
	
	const getUser=()=>{
		uni.getStorage({
			key:"user",
			success:(res)=>{
				 data.user=JSON.parse(res.data)
			}
		})
	}
	const getAddressList=async()=>{
		const list=await request({url:"/user/address/list?uid="+data.user.id})
		 data.addressList=list
	}
	onLoad(()=>{
		getUser()
	})
	onReady(()=>{
		getAddressList()
	})
	const onAddAddr=()=>{
		uni.navigateTo({
			url:"/pages/addAddress/addAddress"
		})
	}
	const onDefaultAddr=async(index)=>{
		if(Number(data.addressList[index].selected)!=1){
			const res=await request({url:"/user/address/default?uid="+data.user.id+"&id="+data.addressList[index].id})
			if(res.code==200){
				for(let i=0;i<data.addressList.length;i++){
					data.addressList[i].selected=0
				}
				data.addressList[index].selected=1
			}else{
				return uni.showToast({
					title:"设置失败请重试",
					icon:"none"
				})
			}
		}
	}
	const eidt=(id)=>{
		uni.navigateTo({
			url:"/pages/editAddress/editAddress?id="+id
		})
	}
</script>
<style scoped lang="scss">
@import "./delivery-address.css"
</style>