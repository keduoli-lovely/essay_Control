<template>
	<view class="index" :class="night ? 'night' : 'daytime'">
		<!-- // 顶栏 -->
		<view class="topbar">
			<view class="topbar-left">
				
			</view>
			
			<view class="topbar-right">
				<view class="user-pic">
					<image src="../../public/bg.jpg" mode="aspectFill"></image>
					<view class="move">
						<view class="list_move">
							<el-icon class="move_icon"><User /></el-icon>个人资料
						</view>
						<view class="list_move">
							<el-icon class="move_icon"><Notification /></el-icon>公告管理
						</view>
						<view class="list_move">
							<el-icon class="move_icon"><Setting /></el-icon>设置
						</view>
						<view class="list_move" @click="back">
							<el-icon class="move_icon"><SwitchButton /></el-icon>退出登录
						</view>
					</view>
				</view>
				<view class="user-name">
					{{ rootname }}
				</view>
				
				<view class="close" @click="back" style="margin: 0 40rpx;">
					退出登录
				</view>
				
				<view class="change_btn_off" @click="changecolor_night" style="margin-right: 40rpx;">
					{{ night_daytime }}
				</view>
				
				<view class="setting" style="margin-right: 40rpx;">
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
	import { ref, onMounted, computed } from 'vue'
	import home from './components/home.vue'
	import essay from './components/essay.vue'
	import publish from './components/publish.vue'
	import other from './components/other.vue'
	import user from './components/userpage.vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { userdata } from '../../store/Usedata.js'
	import { changeColor} from '@/store/changeColor_night.js'
	import { storeToRefs } from 'pinia'
	
	
	// 黑夜与白天的切换
	let { night } = storeToRefs(changeColor())
	let changecolor_night = () => {
		night.value = !night.value
	}
	let night_daytime = computed(() => {
		if(night.value) {
			return '黑夜'
		}else {
			return '白天'
		}
	})
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
		let sta = confirm('你确定要退出吗？？？')
		if(sta) {
			uni.removeStorageSync('root')
			uni.reLaunch({
				url: '/pages/admin/admin'
			})
		}
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
			background-color: var(--index_header_tarbar);
			box-shadow: 4rpx 4rpx 15rpx var(--index_tarbar_shadow);
			.topbar-right {
				display: flex;
				align-items: center;
				width: auto;
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
				color: var(--index_tarbar_font);
				.user-pic {
					transition: all .4s ease;
					cursor: pointer;	
					position: relative;
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
					&:hover {
						transform: translate(-60rpx, 50rpx) scale(1.8);
					}
					&:hover .move {
						opacity: 1;
						display: block;
					}
					.move {
						z-index: -1;
						display: none;
						opacity: 0;
						padding: 45rpx 0 20rpx 30rpx;
						transition: all .3s linear;
						position: absolute;
						top: 65rpx;
						left: -55rpx;
						width: 200rpx;
						background-color: #fff;
						border-radius: 12rpx;
						box-shadow: 4rpx 4rpx 20rpx rgba(0,0,0,.2);
						.list_move {
							transform: scale(.8) !important;
							font-size: 24rpx;
							margin-bottom: 10rpx;
							.move_icon {
								padding-bottom: 5rpx;
								vertical-align: middle;
								margin-right: 15rpx;
								font-size: 24rpx;
							}
							&:hover {
								color: skyblue;
							}
						}
					}
				}
				.close,
				.change_btn_off {
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
				background-color: var(--index_nav-bg);
				transition: all .4s ease;
				color: #B2EBF2;
				box-shadow: 10rpx 10rpx 40rpx var(--index_nav_shadow);
				.nav-btn {
					cursor: pointer;
					position: absolute;
					width: 80rpx;
					height: 40rpx;
					font-size: 50rpx;
					
					top: 25rpx;
					right: 20rpx;
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
					background-color: var(--index_nav_atv);
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
				background-color: var(--index_bg);
			}
		}
		
	}

</style>
