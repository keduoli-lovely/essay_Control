<template>
	<view class="bubble" :class="[classsta, tc ? 'atvbubble' : '']">
		{{ bubblesta }}
	</view>
</template>

<script setup>
import { bubble } from '@/store/bubblesta.js'
import { storeToRefs } from 'pinia'

const { bubblesta, classsta, tc } = storeToRefs(bubble())


</script>

<style lang="scss" scoped>
.atvbubble {
	top: 8% !important;
}
.bubble {
	transition: all .4s ease;
	box-shadow: 3rpx 3rpx 16rpx rgba(0,0,0,.4);
	z-index: 999;
	position: fixed;
	top: -10%;
	left: 50%;
	transform: translateX(-50%);
	padding: 10rpx 18rpx;
	border-radius: 4rpx;
	font-size: 30rpx;
	color: #fff;
}
.succeed {
	background-color: skyblue;
}
.fail {
	background-color: red;
}
.warn {
	background-color: #e6a23c;
}
</style>