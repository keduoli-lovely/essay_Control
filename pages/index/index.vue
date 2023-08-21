<template>
	<view class="index">
		<!-- // 顶栏 -->
		<view class="topbar">
			<view class="topbar-left">
				
			</view>
			
			<view class="topbar-right">
				<view class="user-pic">
					<image src="../../public/bg.png" mode="aspectFill"></image>
				</view>
				<view class="user-name">
					{{ rootname }}
				</view>
				
				<view class="close" @click="back" style="margin: 0 40rpx;">
					退出登录
				</view>
				
				<view class="setting">
					设置
				</view>
				
			</view>
		</view>
		
		<!-- // 版心 -->
		<view class="banner">
			
			<!-- // 导航 -->
			<view class="nav" :style="{width: navlength + '%'}">
				<view class="nav-btn" @click="navlengthfn">
					<el-icon><Fold /></el-icon>
				</view>
				<view class="home item"
					:class="[ismin ? 'minsty' : '',pageindex == 1 ? 'atv' : '']"
					@click="pageindex = 1"
				>
					<el-icon class="icon" title="主页"><HomeFilled /></el-icon>
					<text v-if="!ismin">主页</text>
				</view>
				
				<view class="essay item" 
					:class="[ismin ? 'minsty' : '', pageindex == 2 ? 'atv' : '']"
					@click="pageindex = 2"
				>
					<el-icon class="icon" title="文章"><Tickets /></el-icon>
					<text v-if="!ismin">所有文章</text>
				</view>
				
				<view class="essay item"
					:class="[ismin ? 'minsty' : '', pageindex == 3 ? 'atv' : '']"
					@click="pageindex = 3"
				>
					<el-icon class="icon" title="用户"><UserFilled /></el-icon>
					<text v-if="!ismin">用户</text>
				</view>
				
				<view class="send item" 
					:class="[ismin ? 'minsty' : '', pageindex == 4 ? 'atv' : '']" 
					@click="pageindex = 4"
				>
					<el-icon class="icon" title="公告"><Promotion /></el-icon>
					<text v-if="!ismin">发布公告</text>
				</view>
				
				<view class="oter item" 
					:class="[ismin ? 'minsty' : '', pageindex == 5 ? 'atv' : '']" 
					@click="pageindex = 5"
				>
					<el-icon class="icon" title="其他"><Operation /></el-icon>
					<text v-if="!ismin">其他</text>
				</view>
			</view>
			
			<!-- // 内容 -->
			
			<view class="content">
				<home v-if="pageindex === 1" />
				<essay v-else-if="pageindex === 2" />
				<user v-else-if="pageindex === 3" />
				<publish v-else-if="pageindex === 4" />
				<other v-else />
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import home from './components/home.vue'
	import essay from './components/essay.vue'
	import publish from './components/publish.vue'
	import other from './components/other.vue'
	import user from './components/userpage.vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { userdata } from '../../store/Usedata.js'
	
	// 获取必要数据
	onMounted(() => {
		let token = uni.getStorageSync('root').token
		if(!token) {
			uni.reLaunch({
				url: '/pages/admin/admin'
			})
		}
		let { getessaydata, getuserdata } = userdata()
		getessaydata(20)
		getuserdata(20)
		
	})
	let rootname = ref('keduoli')
	//判断是否登录
	onLoad(() => {
		let token = uni.getStorageSync('root')
		if(token) {
			rootname.value = token.name
		}
		if(!token) {
			uni.reLaunch({
				url: '/pages/admin/admin'
			})
		}
	})
	// nav 的长度
	let navlength = ref(4)
	let ismin = ref(true)
	
	// 内容区的显示组件
	let pageindex = ref(1)
	
	let navlengthfn = () => {
		if(navlength.value === 4) {
			navlength.value = 15
			ismin.value = false
		}else {
			navlength.value = 4
			ismin.value = true
		}
	}
	
	let back = () => {
		uni.removeStorageSync('root')
		uni.reLaunch({
			url: '/pages/admin/admin'
		})
	}

</script>

<style lang="scss" scoped>
	.index {
		height: 100vh;
		display: flex;
		flex-direction: column;
		.topbar {
			z-index: 99;
			font-size: 28rpx;
			position: relative;
			width: 100%;
			height: 8%;
			background-color: #fff;
			box-shadow: 4rpx 4rpx 15rpx rgba(0,0,0,.2);
			.topbar-right {
				display: flex;
				align-items: center;
				width: 520rpx;
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
				.user-pic {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					overflow: hidden;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.close {
					cursor: pointer;
					&:hover {
					color: red;
				}
				}
				.user-name {
					margin-left: 26rpx;
					color: skyblue;
				}
			}
		}
		
		.banner {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 92%;
			background-color: #B2EBF2;
			
			.nav {
				position: relative;
				padding: 100rpx 0 100rpx;
				height: 100%;
				background-color: #FAFAFA;
				transition: all .4s ease;
				color: #B2EBF2;
				.nav-btn {
					cursor: pointer;
					position: absolute;
					width: 40rpx;
					height: 40rpx;
					font-size: 50rpx;
					
					top: 25rpx;
					right: 42rpx;
				}
				.item {
					transition: all .4s ease;
					white-space: nowrap;
					cursor: pointer;
					overflow: hidden;
					border-top: 1rpx solid rgba(0,0,0,.2);
					padding: 40rpx 20rpx 40rpx 60rpx;
					font-size: 32rpx;
					font-weight: 550;
					&:last-child {
						border-bottom: 1rpx solid rgba(0,0,0,.2);
					}
					.icon {
						margin-right: 10rpx;
						vertical-align: text-top;
						font-size: 40rpx;
					}
				}
				.atv {
					color: #fff;
					background-color: skyblue;
				}
				.minsty {
					padding: 26rpx 0;
					text-align: center;
					font-size: 40rpx;
				}
			}
			
			.content {
				padding: 80rpx 100rpx;
				margin-left: 1rpx;
				width: 100%;
				height: 100%;
				background-color: #F5F5F5;
			}
		}
		
	}

</style>
