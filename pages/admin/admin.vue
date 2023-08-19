<template>
	<view class="admin">
		<view class="box">
			<view class="input">
				<view class="text">
					user&nbsp;:&nbsp; <input type="text" v-model.number="user_name" id="user">
				</view>
				<view class="text">
					password&nbsp;:&nbsp; <input type="password" id="pwd" v-model="user_pwd">
				</view>
			</view>
			
			<view class="btn">
				<view class="yes" @click="loginFN">
					登录
				</view>
				<view class="no" @click="close">
					重置
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { login } from '../../apis/login.js'
	
	// 用户输入
	let user_name = ref('')
	let user_pwd = ref('')
	
	let loginFN = async () => {
		if(user_name.value && user_pwd.value) {
			if(user_name.value.length >= 5 && user_pwd.value.length >= 5) {
				let obj = {
					admin: user_name.value,
					pwd: user_pwd.value,
				}
				let res = await login(obj)
				console.log(res.data)
				if(res.data.code == 2000) {
					uni.setStorageSync('root', res.data.result)
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			}else {
				// 弹窗提示
			}
		}else {
			// 弹窗提示
		}
	}
	
	let close = () => {
		user_name.value = ''
		user_pwd.value = ''
	}

</script>

<style lang="scss" scoped>

	.admin {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		background-image: url(/public/bg.png);
		background-size: cover;
		z-index: -1;
		.box {
			box-sizing: border-box;
			padding: 180rpx 50rpx;
			width: 1000rpx;
			height: 650rpx;
			box-shadow: 5rpx 5rpx 50rpx rgba(0, 0, 0, .2), -5rpx -5rpx 50rpx rgba(0, 0, 0, .2);
			border-radius: 14rpx;
			.input {
				display: flex;
				flex-direction: column;
				align-items: center;
				.text {
					margin-bottom: 40rpx;
					display: flex;
					justify-content: end;
					font-size: 34rpx;
					font-weight: 550;
					input {
						margin-right: 80rpx;
						width: 50%;
						width-max: 1400rpx;
						border-bottom: 1rpx solid #000;
					}
					#user {
						margin-left: 20rpx;
					}
					#pwd {
						margin-left: 20rpx;
					}
				}
			}
		}
		
		.btn {
			margin-top: 40rpx;
			display: flex;
			justify-content: center;
			font-size: 40rpx;
			.yes {
				cursor: pointer;
				margin-right: 100rpx;
			}
		}
	}
	
	

</style>
