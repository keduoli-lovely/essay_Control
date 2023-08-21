<template>
	<view class="toshow" :class="essaytcstate ? 'atv' : ''">
		<view class="close" @click="essaytcstate = false">
			<el-icon>
				<CloseBold />
			</el-icon>
		</view>
		<view class="pic">
			<image :src="rowuserdata.pic" mode="aspectFill"></image>
		</view>
		<view class="name t12" style="display: flex">
			<p>昵称</p>&nbsp;
			<view class="showint">
				<input type="text" id="name" v-if="false">
				<span v-else>{{ rowuserdata.name }}</span>
			</view>

			<view class="btn-change">
				编辑
			</view>
		</view>
		<view class="sex t12" style="display: flex">
			<p>性别</p>&nbsp;
			<view class="showint">
				<input type="text" id="sex" v-if="false">
				<span v-else>{{ rowuserdata.sex }}</span>
			</view>

			<view class="btn-change">
				编辑
			</view>
		</view>
		<view class="admin t12" style="display: flex">
			<p>账号</p>&nbsp;
			<view class="showint">
				<input type="text" id="admin" v-if="false">
				<span v-else>{{ rowuserdata.Account }}</span>
			</view>

			<view class="btn-change">
				编辑
			</view>
		</view>
		<view class="pwd t12" style="display: flex">
			<p>密码</p>&nbsp;
			<view class="showint">
				<input type="text" id="pwd" v-if="false">
				<span 
					style="display:block;width: 350rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
					v-else>{{ rowuserdata?.password ? rowuserdata.password[0] : '无' }}</span>
			</view>

			<view class="btn-change">
				编辑
			</view>
		</view>
	</view>
	
	<page_BG v-if="essaytcstate" />
</template>

<script setup>
	import page_BG from '../page_BG/page_BG.vue'
	import { maskstate } from '../../store/maskstare.js'
	import { userdata } from '../../store/Usedata.js'
	import { storeToRefs } from 'pinia'
	
	let { rowuserdata } = storeToRefs(userdata())
	let { essaytcstate } = storeToRefs(maskstate())
	

</script>

<style lang="scss" scoped>
	.atv {
		top: 50% !important;
		opacity: 1 !important;
		z-index: 99 !important;
	}
	.toshow {
		transition: all .3s ease;
		opacity: 0;
		display: flex;
		flex-direction: column;
		padding: 80rpx 20rpx;
		z-index: -1;
		border-radius: 14rpx;
		position: fixed;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 800rpx;
		height: 800rpx;
		background-color: #fff;
		box-shadow: 1rpx 1rpx 16rpx rgba(0, 0, 0, .01);

		.pic {
			margin-left: 100rpx;
			margin-bottom: 40rpx;
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.close {
			position: absolute;
			top: 20rpx;
			right: 15rpx;
			font-size: 45rpx;
			font-weight: 400;
			color: rgba(0, 0, 0, .4);
			cursor: pointer;

			&:hover {
				color: skyblue;
			}
		}

		.t12 {
			display: flex;
			align-items: center;
			padding: 20rpx 50rpx 10rpx 100rpx;
			width: 100%;

			p {
				margin-right: 10rpx;
				font-size: 28rpx;
			}

			.showint {
				line-height: 60rpx;
				height: 60rpx;
				font-size: 26rpx;
				color: rgba(0, 0, 0, .7);
				padding-left: 10rpx;
				width: 350rpx;
				padding-bottom: 6rpx;
				border-bottom: 1rpx solid rgba(0, 0, 0, .35);
			}

			.btn-change {
				cursor: pointer;
				padding-bottom: 4rpx;
				margin-left: 50rpx;
				border-bottom: 3rpx dashed rgba(0, 0, 0, .4);

				&:hover {
					color: skyblue;
					border-bottom: 3rpx dashed skyblue;
				}
			}
		}

	}
</style>