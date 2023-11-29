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
							<el-icon class="move_icon"><User /></el-icon>{{ rootname }}
						</view>
						<view class="list_move">
							<el-icon class="move_icon"><Notification /></el-icon>{{ lang["INDEX_TARBAT_INFO_ROW2"] }}
						</view>
						<view class="list_move" @click="pageindex = 5">
							<el-icon class="move_icon"><Setting /></el-icon>{{ lang["INDEX_TARBAT_INFO_ROW3"] }}
						</view>
						<view class="list_move" @click="back">
							<el-icon class="move_icon"><SwitchButton /></el-icon>{{ lang["INDEX_TARBAT_INFO_ROW4"] }}
						</view>
					</view>
				</view>
				
				<view class="close" @click="back" style="margin: 0 40rpx;">
					<el-icon style="font-size: 48rpx;"><SwitchButton /></el-icon>
				</view>
				
				<view class="change_btn_off" @click="changecolor_night" style="margin-right: 40rpx;">
					<view class="night_icon" :class="night ? 'night_icon_atv' : ''">
						<el-icon class="sunny" style="margin-bottom: 10rpx;color: rgba(254,76,64);"><Sunny /></el-icon>
						<el-icon style="color: skyblue;"><Moon /></el-icon>
					</view>
				</view>
				
				<view class="setting" style="margin-right: 40rpx;">
					<el-icon style="font-size: 48rpx;" @click="pageindex = 5"><Setting /></el-icon>
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
					<el-icon class="icon" v-title="lang['INDEX_NAV_ROW1']"><HomeFilled /></el-icon>
					<text v-if="!ismin">{{ lang["INDEX_NAV_ROW1"] }}</text>
				</view>
				
				<view class="essay item" 
					:class="[ismin ? 'minsty' : '', pageindex == 2 ? 'atv' : '']"
					@click="pageindex = 2"
				>
					<el-icon class="icon" v-title="lang['INDEX_NAV_ROW2']"><Tickets /></el-icon>
					<text v-if="!ismin">{{ lang["INDEX_NAV_ROW2"] }}</text>
				</view>
				
				<view class="essay item"
					:class="[ismin ? 'minsty' : '', pageindex == 3 ? 'atv' : '']"
					@click="pageindex = 3"
				>
					<el-icon class="icon" v-title="lang['INDEX_NAV_ROW3']"><UserFilled /></el-icon>
					<text v-if="!ismin">{{ lang["INDEX_NAV_ROW3"] }}</text>
				</view>
				
				<view class="send item" 
					:class="[ismin ? 'minsty' : '', pageindex == 4 ? 'atv' : '']" 
					@click="pageindex = 4"
				>
					<el-icon class="icon" v-title="lang['INDEX_NAV_ROW4']"><Promotion /></el-icon>
					<text v-if="!ismin">{{ lang["INDEX_NAV_ROW4"] }}</text>
				</view>
				
				<view class="oter item" 
					:class="[ismin ? 'minsty' : '', pageindex == 5 ? 'atv' : '']" 
					@click="pageindex = 5"
				>
					<el-icon class="icon" v-title="lang['INDEX_NAV_ROW5']"><Operation /></el-icon>
					<text v-if="!ismin">{{ lang["INDEX_NAV_ROW5"] }}</text>
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
	import { en } from '@/lang/english.js'
	import { ref, onMounted, computed } from 'vue'
	import home from '@/pages/index/components/home.vue'
	import essay from '@/pages/index/components/essay.vue'
	import publish from '@/pages/index/components/publish.vue'
	import other from '@/pages/index/components/other.vue'
	import user from '@/pages/index/components/userpage.vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { userdata } from '@/store/Usedata.js'
	import { changeColor} from '@/store/changeColor_night.js'
	import { storeToRefs } from 'pinia'
	import { lang_sel } from '@/store/lang_selec.js'
	
	// 语言的切换
	const { lang } = storeToRefs(lang_sel())
	// 黑夜与白天的切换
	const { night } = storeToRefs(changeColor())
	const { change_color } = changeColor()
	const changecolor_night = () => {
		const default_data = uni.getStorageSync('default')
		night.value = !night.value
		if(night.value) {
			default_data.color = 1
			change_color(1)
		}else {
			default_data.color = 2
			change_color(2)
		}
		uni.setStorageSync('default', default_data)
	}

	// 获取必要数据
	onMounted(() => {
		const token = uni.getStorageSync('root').token
		if(!token) {
			uni.reLaunch({
				url: '/pages/admin/admin'
			})
		}
		const { getessaydata, getuserdata } = userdata()
		getessaydata(20)
		getuserdata(20)
		
	})
	let rootname = ref('keduoli')
	//判断是否登录
	onLoad(() => {
		const token = uni.getStorageSync('root')
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
	
	const navlengthfn = () => {
		if(navlength.value === 4) {
			navlength.value = 15
			ismin.value = false
		}else {
			navlength.value = 4
			ismin.value = true
		}
	}
	
	const back = () => {
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
		overflow: hidden;
		height: 100%;
		display: flex;
		flex-direction: column;
		.topbar {
			top: 0;
			z-index: 99;
			font-size: 28rpx;
			position: sticky;
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
						padding: 45rpx 0 20rpx 20rpx;
						transition: all .3s linear;
						position: absolute;
						top: 65rpx;
						left: -55rpx;
						width: 200rpx;
						
						background-color: var(--index_move_bg);
						border-radius: 12rpx;
						box-shadow: 4rpx 4rpx 20rpx rgba(0,0,0,.2);
						.list_move {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							width: 180rpx;
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
				.setting {
					display: flex;
					align-items: center;
				}
				.night_icon {
					transition: all .2s linear;
					display: flex;
					justify-content: center;
					flex-direction: column;
					font-size: 55rpx;
					height: 120rpx;
					transform: translateY(4rpx);
					&:hover .sunny {
						transform: rotate(10deg) !important;
					}
					.sunny {
						transform-origin: center;
						transition: all .4s ease;
					}
				}
				.night_icon_atv {
					font-size: 48rpx !important;
					transform: translateY(-56rpx) !important;
				}
				.close,
				.change_btn_off,
				.setting {
					overflow-y: hidden;
					width: 60rpx;
					height: 60rpx;
					cursor: pointer;
					transform-origin: center;
					transition: all .4s ease;
					&:hover {
						color: skyblue;
				}

				}
				.setting:hover {
					transform: rotate(14deg) !important;
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
