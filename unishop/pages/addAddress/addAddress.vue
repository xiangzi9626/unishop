<template>
	<view class="container">
		<view class="address">
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
					<uni-forms-item required label="详细地址">
						<uni-easyinput type="text" v-model="formData.detail" placeholder="请输入详细地址" />
					</uni-forms-item>
				</uni-forms>
				<button @click="submitAddress">保存收货地址</button>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		onLoad,onReady
	} from "@dcloudio/uni-app"
	import {
		reactive
	} from "vue";
	import {
		CITY_DATA
	} from "../../common/city-data/data.js"
	import {request} from "../../common/http.js"
	const select = reactive({
		localData: []
	})
	const formData = reactive({
		uid:0,
		name: "",
		province: "",
		city: "",
		area: "",
		phone: "",
		detail: "",
		selected:0
	})
	onLoad(() => {
		select.localData = getCityTree()
	})
	onReady(()=>{
		getUser()
	})
	const getUser=()=>{
		uni.getStorage({
			key:"user",
			success:(res)=>{
				formData.uid=JSON.parse(res.data).id
			}
		})
	}
	const submitAddress=async () => {
		 for(let key in formData){
			 formData[key]=formData[key]+"".trim()
		}
		 if(formData.name.trim()==""){
			return uni.showToast({
				title:"收货人不能为空",
				icon:"none"
			})
		}
		if(formData.phone.trim()==""){
			return uni.showToast({
				title:"请输入手机号",
				icon:"none"
			})
		}
		if(formData.city.trim()==""){
			return uni.showToast({
				title:"请选择地区",
				icon:"none"
			})
		}
		if(formData.detail.trim()==""){
			return uni.showToast({
				title:"请输入详细地址",
				icon:"none"
			})
		}
		const res=await request({url:"/user/address/add",data:formData})
		if(res.code==200){
			uni.navigateTo({
				url:"/pages/delivery-address/delivery-address"
			})
		}else{
			uni.showToast({
				title:"提交失败请重试",
				icon:"none"
			})
		}
	}
	const onchange = (e) => {
		let areas = e.detail.value
		formData.province = areas[0].text
		formData.city = areas[1].text
		formData.area = areas[2].text
	}
	const getCityTree = () => {
		let res = []
		for (let i in CITY_DATA.DATA) {
			if (CITY_DATA.DATA[i].parent_code == null) {
				res.push({
					id: CITY_DATA.DATA[i].code,
					pid: 0,
					text: CITY_DATA.DATA[i].name,
					children: [],
					value: CITY_DATA.DATA[i].code
				})
			}
		}
		for (let i in res) {
			for (let j in CITY_DATA.DATA) {
				if (res[i].id == CITY_DATA.DATA[j].parent_code) {
					res[i].children.push({
						id: CITY_DATA.DATA[j].code,
						pid: CITY_DATA.DATA[j].parent_code,
						text: CITY_DATA.DATA[j].name,
						children: [],
						value: CITY_DATA.DATA[j].code
					})
				}
			}
		}
		for (let i in res) {
			for (let j in res[i].children) {
				for (let k in CITY_DATA.DATA) {
					if (res[i].children[j].id == CITY_DATA.DATA[k].parent_code) {
						res[i].children[j].children.push({
							id: CITY_DATA.DATA[k].code,
							pid: CITY_DATA.DATA[k].parent_code,
							text: CITY_DATA.DATA[k].name,
							children: [],
							value: CITY_DATA.DATA[k].code
						})
					}
				}
			}
		}
		return res
	}
</script>
<style scoped lang="scss">
	.container {
		width: 700rpx;
		margin: auto;
	}

	.address button {
		width: 500rpx;
		background-color: #C00000;
		color: #fff;
		border-radius: 10px;
	}

	.address view:nth-child(1) {
		font-weight: bold;
		margin: 20rpx 0;
	}
</style>