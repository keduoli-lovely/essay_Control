<!-- 将概括所有选择弹窗 -->

<template>
	<view class="box" :class="essay_choice ? 'atv' : ''">
		<h4 class="title">
			<text>提示</text>
			<el-icon @click="close" class="icon"><Close /></el-icon>
		</h4>
		<view class="content">
			<slot></slot>
		</view>
		<view class="btn">
			<view class="no" @click="close">
				取消
			</view>
			<view class="yes" @click="success">
				确认
			</view>
		</view>
	</view>
	
	<bubble />
	
	<page_BG v-if="essay_choice" />
</template>

<script setup>
	import page_BG from '../page_BG/page_BG.vue'
	import bubble from '../bubble/bubble.vue'
	import { maskstate } from '../../store/maskstare.js'
	import { otherdata } from '../../store/otherData.js'
	import { bubble as bubblesta } from '../../store/bubblesta.js'
	import { userdata } from '../../store/Usedata.js'
	import { storeToRefs } from 'pinia'
	import { removeessay } from '../../apis/reomEssayrow.js'
	import { changeessaysta } from '../../apis/classify.js'
	
	
	let { essay_choice } = storeToRefs(maskstate())
	let { listitem_id, page_index, only_index } = storeToRefs(otherdata())
	let { keduoli } = bubblesta()
	let { getessaydata } = userdata()
	
	// 关闭弹窗
	let close = () => {
		essay_choice.value = false
	}
	
	let success = () => {
		switch(page_index.value) {
			case 0:
				// fn
				removeessayfn()
				break;
			case 1:
				// fn
				review(1)
				break;
			case 2:
				// fn
				review(0)
				break;
			case 3:
				// fn
				let index = -1
				if(only_index.value) {
					index = 1
				}else {
					index = -1
				}
				review(index)
				break;
		}
	}
	// 删除文章
	let removeessayfn = async () => {
		let res = await removeessay(listitem_id.value)
		keduoli('succeed', res.data.message)
		essay_choice.value = false
		getessaydata(20)
	}
	// 提交审核
	// 重新审核
	// 处理违规文章
	let review = async (index) => {
		let res = await changeessaysta(index, listitem_id.value)
		keduoli('succeed', res.data.message)
		getessaydata(20)
		essay_choice.value = false
	}

</script>

<style lang="scss" scoped>

.atv {
	z-index: 99 !important;
	top: 45% !important;
	opacity: 1 !important;
}
.box {
	z-index: -1;
	transition: all .4s ease;
	padding: 20rpx 40rpx 70rpx 20rpx;
	position: fixed;
	opacity: 0;
	top: 20%;
	left: 50%;
	width: 600rpx;
	// height: 400rpx;
	transform: translate(-50%, -50%);
	box-shadow: 4rpx 4rpx 20rpx rgba(0,0,0,.4);
	background-color: #fff;
	border-radius: 6rpx;
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 0;
		font-weight: 520;
		font-size: 38rpx;
		.icon {
			cursor: pointer;
			font-size: 40rpx;
			color: rgba(0,0,0,.4);
			&:hover {
				color: skyblue;
			}
		}
	}
	.content {
		font-size: 26rpx;
		padding: 40rpx 0;
	}
	.btn {
		display: flex;
		position: absolute;
		bottom: 30rpx;
		right: 50rpx;
		font-size: 26rpx;
		.yes {
			&:hover {
				color: #000;
				background-color: #B2EBF2;
			}
			color: #fff;
			margin-left: 40rpx;
			background-color: skyblue;
		}
		.no {
			&:hover {
				color: skyblue;
				background-color: #E0F7FA;
			}
			border: 1rpx solid rgba(0,0,0,.2);
		}
		.yes,
		.no {
			text-align: center;
			padding: 8rpx 20rpx;
			border-radius: 6rpx;
			cursor: pointer;
		}
	}
}
</style>