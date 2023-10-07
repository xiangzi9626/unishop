import {APP_CONFIG} from "./config.js"
const BASE_URL = APP_CONFIG.SERVER_URL
export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method: options.method || 'POST',
			data: options.data || {},
			success: (res)=>{
				 if(res.statusCode !== 200) {
					return uni.showToast({
						title: '获取数据失败'
					})
				}
				resolve(res.data)
			},
			fail: (err)=>{
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			},
			complete:(res)=>{
				if(res.data=="login"){
					try{
						uni.removeStorageSync("token")
					    uni.removeStorageSync("user")
						uni.switchTab({
							url:"/pages/my/my"
						})
					}catch(e){
						
					}
				}
			},
		})
	})
}