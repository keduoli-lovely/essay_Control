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
	import page_BG from '@/components/page_BG/page_BG.vue'
	import bubble from '@/components/bubble/bubble.vue'
	import { maskstate } from '@/store/maskstare.js'
	import { otherdata } from '@/store/otherData.js'
	import { bubble as bubblesta } from '@/store/bubblesta.js'
	import { userdata } from '@/store/Usedata.js'
	import { storeToRefs } from 'pinia'
	import { removeessay } from '@/apis/reomEssayrow.js'
	import { changeessaysta } from '@/apis/classify.js'
	import { admin_api } from '@/apis/admin_api.js'
	
	
	const { essay_choice, tc_account_showsta, tc_pwd_showsta } = storeToRefs(maskstate())
	const { listitem_id, page_index, only_index } = storeToRefs(otherdata())
	const { keduoli } = bubblesta()
	const { getessaydata } = userdata()
	
	const props = defineProps({
		admin_acc: {
			type: [String, Number],
			default: "123456"
		},
		admin_pwd: {
			type: [String, Number],
			default: "123456"
		},
		admin_name: {
			type: String,
			default: 'admin'
		}
	})
	// 关闭弹窗
	const close = () => {
		essay_choice.value = false
		tc_account_showsta.value = true
		tc_pwd_showsta.value = true
	}
	
	const success = () => {
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
			case 4:
				change_admin_account()
				break;
			case 5:
				change_admin_acc_pwd()
				break;
			case 6:
			console.log(props.admin_name)
				// fn() 更改管理员昵称
				break;
			default:
				close()
				break;
		}
	}
	// 删除文章
	const removeessayfn = async () => {
		const res = await removeessay(listitem_id.value)
		keduoli('succeed', res.data.message)
		essay_choice.value = false
		getessaydata(20)
	}
	// 提交审核
	// 重新审核
	// 处理违规文章
	const review = async (index) => {
		const res = await changeessaysta(index, listitem_id.value)
		keduoli('succeed', res.data.message)
		getessaydata(20)
		essay_choice.value = false
	}
	
	// 重置管理员账号/更改管理员账号
	const change_admin_account = async () => {
		const res = await admin_api({
			update_sta: -1
		})
		
		if(res.data.code === 20011) {
			keduoli('warn', res.data.message)
			essay_choice.value = false
			return
		}
		keduoli('succeed', res.data.message)
		essay_choice.value = false
	}
	
	// fn() 更改管理员账号
	const change_admin_acc_pwd = async () => {
		if(props.admin_acc && props.admin_pwd) {
			const res = await admin_api({
				update_sta: 1,
				account: props.admin_acc,
				password: props.admin_pwd
			})
			
			if(res.data.code === 20011) {
				keduoli('warn', res.data.message)
				essay_choice.value = false
				return
			}
			
			keduoli('succeed', res.data.message)
			close()
		}else {
			keduoli('fail', "数据错误")
		}
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
		padding: 10rpx 0 20rpx;
		font-weight: 520;
		font-size: 38rpx;
		border-bottom: 1rpx solid rgba(0,0,0,.1);
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
		padding: 30rpx 0 40rpx;
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