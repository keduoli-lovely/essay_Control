<template>
	<view class="essay">
		<el-card class="box">
			<view class="nav">
				<view class="allessay item" @click="addindex(0)">
					全部
				</view>
				<view class="toexamine item" @click="addindex(1)">
					待审核
				</view>

				<view class="pass item" @click="addindex(2)">
					审核通过
				</view>

				<view class="report item" @click="addindex(3)">
					举报
				</view>
				
				<view class="logding item" @click="logding">
					<el-icon class="logding-icon" :class="rotate ? 'amin' : ''"><Refresh /></el-icon>刷新
				</view>

				<view class="block" :style="{left: left + 'rpx'}"></view>
				
				<view class="search" v-show="navindex ===  0">
					<input type="text" id="search" placeholder="搜索">
				</view>
			</view>
		</el-card>
		
		<el-card class="box2">
			<listItem
				v-show="navindex === 0"
				v-for="(item, i) in essaydata" :key="i"
				:essaylist="item"
				@datatcFn="changedata(item)"
			></listItem>
			
			<listItem
				v-show="navindex === 1"
				v-for="(item, i) in essaydata" :key="i"
				:essaylist="item"
				:select2="'忽略本条'"
				@datatcFn="changedata(item)"
			></listItem>
			
			<listItem
				v-show="navindex === 2"
				v-for="(item, i) in essaydata" :key="i"
				:essaylist="item"
				:select2="'重新审核'"
				@datatcFn="changedata(item)"
			></listItem>
			
			<listItem
				v-show="navindex === 3"
				v-for="(item, i) in essaydata" :key="i"
				:essaylist="item"
				@datatcFn="changedata(item)"
			></listItem>
		</el-card>
	</view>
	
	<notification
		:datatc="datatc"
	></notification>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import listItem from '../../../components/listItem/listItem.vue'
	import notification from '../../../components/notification/notification.vue'
	import { maskstate } from '../../../store/maskstare.js'
	import { storeToRefs } from 'pinia'
	import { userdata } from '../../../store/Usedata.js'
	
	
	// 文章数据
	let { getessaydata } = userdata()
	let { essaydata } = storeToRefs(userdata())
	let rotate = ref(false)
	// 索引
	let navindex = ref(0)
	// 距离
	let left = ref(0)
	
	// 弹窗数据
	let datatc = ref({})
	let { essaytcstate } = storeToRefs(maskstate())
	let changedata = (data) => {
		essaytcstate.value = true
		datatc.value = data
	}
	

	let addindex = (i) => {
		navindex.value = i
		left.value = 200 * i
	}
	
	let logding = () => {
		rotate.value = true
		getessaydata(20)
		setTimeout(() => {
			rotate.value = false
		}, 3000)
		
		
	}
</script>

<style lang="scss" scoped>
	.essay {
		.box {
			margin-bottom: 40rpx;
			.nav {
				position: relative;
				width: 100%;
				display: flex;
				.logding {
					.logding-icon {
						font-size: 40rpx;
						vertical-align: middle;
						margin-right: 8rpx;
						padding-bottom: 6rpx;
						transform-origin: center;
					}
					&:hover {
						color: skyblue;
					}
				}
				.amin {
					animation: range 3s ease infinite;
				}
				@keyframes range {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(720deg);
					}
				}
				.item {
					cursor: pointer;
					white-space: nowrap;
					width: 200rpx;
					z-index: 1;
					padding: 20rpx 40rpx;
					text-align: center;
				}

				.item:first-child {
					margin-left: -20rpx;
				}

				.block {
					transition: all .4s ease;
					border-radius: 6rpx;
					position: absolute;
					top: -5rpx;
					width: 160rpx;
					height: 100rpx;
					background-color: skyblue;
				}
				.search {
					padding-bottom: 9rpx;
					position: absolute;
					top: 50%;
					right: 0;
					width: 400rpx;
					transform: translateY(-50%);
					border-bottom: 1rpx solid rgba(0,0,0,.3);
				}
			}
		}
		
		.box2 {
			height: 400rpx;
		}
		
	}
	
	
</style>