<template>
	<view class="notification" :class="essaytcstate ? 'atv' : 'noatv'">
		<h1 class="title">
			{{ datatc.title }}
		</h1>
		
		<view class="userinfo">
			<view class="name">
				发布人: {{ datatc?.user?.name }}
			</view>
			<view class="time">
				发布时间: {{ datatc.time }}
			</view>
		</view>
		
		<view class="text">
			{{ datatc.text ? datatc.text[0] : '什么也没有写' }}
		</view>
		
		<view class="pic">
			<image v-for="(item, i) in datatc.essaypics" :key="i" :src="item" mode="aspectFill"></image>
		</view>
		
		<view class="btn" @click="close">
			关闭
		</view>
		
		<view class="btn-icon" @click="close">
			<el-icon class="icon"><CloseBold /></el-icon>
		</view>
		
	</view>
	
	<page_BG v-if="essaytcstate" />
</template>

<script setup>
	import page_BG from '../page_BG/page_BG.vue'
	import { maskstate } from "../../store/maskstare.js"
	import { storeToRefs } from 'pinia'
	
	let { essaytcstate } = storeToRefs(maskstate())
	let props = defineProps({
		datatc: Object
	})
	
	let close = () => {
		essaytcstate.value = false
	}
</script>

<style lang="scss" scoped>
.atv {
	opacity: 1;
	top: 50%;
}
.noatv {
	opacity: 0;
	top: 0%;
	z-index: -1 !important;
}
.notification {
	transition: all .4s ease-in-out;
	z-index: 99;
	padding: 50rpx 80rpx;
	position: fixed;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 60%;
	height: 80%;
	background-color: #fff;
	border-radius: 14rpx;
	box-shadow: 10rpx 10rpx 40rpx rgba(0,0,0,.4);
	text-align: center;
	.title {
		margin-bottom: 20rpx;
		font-size: 80rpx;
	}
	.userinfo {
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgba(0,0,0,.4);
		margin-bottom: 20rpx;
		font-size: 34rpx;
		.name {
			margin-right: 40rpx;
		}
	}
	.text {
		margin-bottom: 40rpx;
	}
	.pic {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		width: 100%;
		image {
			width: 30%;
			height: 450rpx;
		}
	}
	
	.btn {
		cursor: pointer;
		position: absolute;
		right: 100rpx;
		bottom: 80rpx;
		width: 140rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 14rpx;
		box-shadow: 4rpx 4rpx 10rpx rgba(0,0,0,.4);
	}
	.btn-icon {
		cursor: pointer;
		position: absolute;
		top: 35rpx;
		right: 35rpx;
		font-size: 45rpx;
		.icon {
			&:hover {
				color: skyblue;
			}
		}
	}
}
</style>