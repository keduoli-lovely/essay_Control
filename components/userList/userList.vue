<template>
	<view class="list">
		<view class="name">
			{{ userrow.name }}
		</view>
		<view class="sex">
			{{ userrow.sex }}
		</view>
		<view class="pic">
			<image :src="userrow.pic" mode="aspectFill"></image>
		</view>
		
		<view class="admin">
			{{ userrow.Account }}
		</view>
		<view class="pwd">
			{{ userrow.password[0] }}
		</view>
		<view class="time">
			{{ time }}
		</view>
		
		<view class="btn">
			<view class="edit" @click="changestate(userrow)">
				编辑用户
			</view>
			<view class="del" @click="tips(userrow.Account)">
				删除用户
			</view>
		</view>
		
		<view class="sel" v-if="choose">
			<checkbox :value="userrow.Account" :checked="allchoose" ></checkbox>
		</view>
	</view>
	
	<changemask />
	
</template>

<script setup>
	import dayjs from 'dayjs'
	import changemask from '../changemask/changemask.vue'
	import { maskstate } from '../../store/maskstare.js'
	import { computed, ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import { userdata } from '../../store/Usedata.js'
	import { delrowuser } from '../../apis/delrowuser.js'
	
	
	let user = defineProps({
		userrow: Object
	})
	let emit = defineEmits(['senduserid'])
	
	let { essaytcstate, choose, allchoose, tckstate } = storeToRefs(maskstate())
	let { rowuserdata } = storeToRefs(userdata())
	
	let changestate = (data) => {
		essaytcstate.value = true
		rowuserdata.value = data
	}
	let time = computed(() => {
		return dayjs(user.userrow.createTime).format("YYYY-MM-DD")
	})
	
	// 删除用户
	let tips = (id) => {
		emit('senduserid', id)
		tckstate.value = true
	}
	
	
	

</script>

<style lang="scss" scoped>
	.list {
		position: relative;
		text-align: center;
		display: flex;
		align-items: center;
		width: 100%;
		height: 115rpx;
		.name,
		.sex {
			text-align: center;
			width: 240rpx;
			max-width: 300rpx;
		}
		.pic {
			position: relative;
			border-right: 10rpx solid red;
			width: 200rpx;
			image {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
		}
		.admin {
			width: 280rpx;
		}
		.pwd {
			width: 550rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.time {
			width: 300rpx;
		}
		
		.btn {
			width: 380rpx;
			display: flex;
			justify-content: space-between;
			position: absolute;
			top: 50%;
			right: 200rpx;
			transform: translateY(-50%);
			font-size: 28rpx;
			color: #fff;
			.edit,
			.del {
				cursor: pointer;
				border-radius: 8rpx;
				padding: 10rpx 20rpx;
				border: 2rpx solid #e0e0e0;
			}
			.edit {
				background-color: var(--user_btn_yes);
			}
			.del {
				background-color: var(--user_btn_no);
			}
		}
		
		.sel {
			position: absolute;
			top: 50%;
			left: 10rpx;
			transform: translateY(-50%);
		}
	}
</style>