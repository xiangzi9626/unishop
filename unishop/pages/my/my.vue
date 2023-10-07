<template>
  <view class="my-container" v-if="data.token!=''">
    <MyUserInfo></MyUserInfo>
   </view>
  <view class="my-container" v-else>
     <MyLogin></MyLogin>
  </view>
  <view>
	  <button @click="test">TEST</button>
  </view>
</template>
<script setup>
	 import { onMounted, reactive } from "vue";
import MyLogin from "../../conponents/my-login/my-login.vue"
	import MyUserInfo from '../../conponents/my-userinfo/my-userinfo.vue'
	const data=reactive({
		token:""
	})
	const getToken=()=>{
		uni.getStorage({
			key:"user",
			success:function(res){
				data.user=JSON.parse(res.data)
			}
		})
		uni.getStorage({
			key:"token",
			success:function(res){
				 data.token=res.data
			}
		})
	}
	onMounted(()=>{
		getToken()
	})
	const test=()=>{
		uni.navigateTo({
			url:'/pages/test/test'
		})
	}
</script>
<style lang="scss" scoped>
  page,
  .my-container {
    height: 100%;
  }
</style>
