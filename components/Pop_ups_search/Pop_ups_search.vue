<template>
	<view class="pop" :class="[search_pop ? 'atv_pop' : '', night ? 'night' : 'daytime']">
		<view class="title">
			搜索相关: <span class="text">''&nbsp;{{ title }}&nbsp;''</span>
		</view>
		
		<view class="cont_list">
			<essayItem
				v-for="item in essay_list"
				:key="item._id"
				:essay_row="item"
			></essayItem>
		</view>	
		
		<view class="close" @click="search_pop = false">
			关闭
		</view>
		<view class="close_icon" @click="search_pop = false">
			<el-icon><Close /></el-icon>
		</view>
	</view>
</template>

<script setup>
	import essayItem from '../../pages/index/components/essayItem.vue'
	import { maskstate } from '../../store/maskstare.js'
	import { storeToRefs } from 'pinia'
	import { changeColor } from '@/store/changeColor_night.js'
	
	
	
	// 黑夜与白天
	let { night } = storeToRefs(changeColor())
	let props = defineProps({
		essay_list: Array,
		title: String
	})
	
	let { search_pop } = storeToRefs(maskstate())
	
</script>

<style lang="scss" scoped>
.atv_pop {
	opacity: 1 !important;
	right: 0% !important;
	z-index: 99 !important;
}
.pop {
	transition: all .4s linear;
	opacity: 0;
	z-index: -1;
	padding: 60rpx 100rpx;
	position: fixed;
	top: 9%;
	right: -100%;
	width: 60%;
	height: 90%;
	background-color: var(--essay_pop_bg);
	.title {
		font-size: 50rpx;
		font-weight: 550;
		font-family: 'Times New Roman', Times, serif;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid var(--essay_pop_border);
		color: var(--essay_pop_font);
		.text {
			color: skyblue;
			font-weight: 400;
			font-size: 35rpx;
		}
	}
	.cont_list {
		padding-top: 20rpx;
		height: 600rpx;
		overflow: auto;
	}
	.close {
		cursor: pointer;
		position: absolute;
		left: 120rpx;
		bottom: 150rpx;
		text-align: center;
		width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: var(--essay_pop_font);
		background-color: var(--essay_btn_bg);
		box-shadow: 4rpx 4rpx 20rpx var(--essay_btn_shadow);
		border-radius: 4rpx;
		&:hover {
			background-color: var(--essay_btn_shadow);
		}
	}
	.close_icon {
		cursor: pointer;
		position: absolute;
		top: 45rpx;
		right: 80rpx;
		font-size: 50rpx;
		color: var(--essay_icon_color);
		&:hover {
			color: skyblue;
		}
	}
}
</style>