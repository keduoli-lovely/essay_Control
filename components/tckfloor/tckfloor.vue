<template>
	<view class="floor" :class="tckstate ? 'atv' : ''">
		<view class="tip">
			提示
		</view>
		
		<view class="body">
			账户 : {{ account }}<br />
			您确定要删除该用户吗？ 
		</view>
		
		<view class="btn">
			<view class="yesbtn" @click="emit('yes')">
				确认
			</view>
			<view class="nobtn" @click="emit('no')">
				取消
			</view>
		</view>
	</view>
	
	<page_BG v-if="tckstate" />
</template>

<script setup>
	import page_BG from '@/components/page_BG/page_BG.vue'
	import { maskstate } from '@/store/maskstare.js'
	import { storeToRefs } from 'pinia'
	
	const { tckstate } = storeToRefs(maskstate())
	
	const emit = defineEmits(['yes', 'no'])
	const porps = defineProps({
		account: String
	})
	
</script>

<style lang="scss" scoped>
	.atv {
		top: 50% !important;
		opacity: 1 !important;
		z-index: 99 !important;
	}
	.floor {
		transition: all .3s ease;
		z-index: -1;
		opacity: 0;
		padding: 40rpx 100rpx;
		position: fixed;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 900rpx;
		background-color: #fff;
		box-shadow: 2rpx 2rpx 10rpx rgba(0,0,0,.2);
		.tip {
			color: #000;
			padding: 0 0 15rpx;
			border-bottom: 1rpx solid rgba(0,0,0,.2);
		}
		.body {
			color: rgba(0,0,0,.75);
			font-size: 30rpx;
			margin: 60rpx 0;
		}
		.btn {
			display: flex;
			margin-top: 15rpx;
			font-size: 26rpx;
			.yesbtn {
				cursor: pointer;
				margin-right: 25rpx;
				&:hover {
					color: skyblue;
				}
			}
			.nobtn:hover {
				cursor: pointer;
				color: skyblue;
			}
		}
	}

</style>