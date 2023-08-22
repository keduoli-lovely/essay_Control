<template>
	<view class="item">
		<view class="title">
			{{ essaylist.title }}
		</view>
		
		<view class="contentText">
			<view class="content">
				{{ essaylist?.text[0] }}
			</view>
		</view>
		
		<view class="name">
			{{ essaylist.user?.name }}
		</view>
		
		<view class="time">
			{{ pushtime }}
		</view>
		
		<view class="move">
			<view class="show" @click="showtc">
				{{ select1 }}
			</view>
			
			<view class="del" @click="choice">
				{{ select2 }}
				
			</view>
			
			<view class="del" @click="innocent" v-if="select2 == '确认违规'">
				没有违规
				
			</view>
		</view>
	</view>
</template>

<script setup>
	import dayjs from 'dayjs'
	import { ref, computed } from 'vue'
	import { maskstate } from '../../store/maskstare.js'
	import { otherdata } from '../../store/otherData.js'
	import { storeToRefs } from 'pinia'
	
	
	let sta_two = ref(true)
	let { essay_choice } = storeToRefs(maskstate())
	let { listitem_id, page_index, tipsText, only_index } = storeToRefs(otherdata())
	let emit = defineEmits(['datatcFn'])
	
	let props = defineProps({
		essaylist: Object,
		select1: {
			type: String,
			default: '查看详情'
		},
		select2: {
			type: String,
			default: '删除文章'
		}
	})
	let pushtime = computed(() => {
		return dayjs(props.essaylist.time).format('YYYY-MM-DD')
	})
	let showtc = () => {
		emit('datatcFn')
	}
	let choice = () => {
		switch(page_index.value) {
			case 0: 
				tipsText.value = '确定要删除这篇文章！！'
				allpage()
				break;
			case 1:
				// 页面2的方法
				tipsText.value = '确定提交通过审核！！'
				allpage()
				break;
			case 2:
				// 页面3的方法
				tipsText.value = '确定重新审核！！！'
				allpage()
				break;
			case 3:
				// 页面4的方法
				tipsText.value = '确认文章违规！！！'
				only_index.value = false
				allpage()
				break;
		}
	}
	// 全部页面的方法
	let allpage = () => {
		listitem_id.value = props.essaylist._id
		essay_choice.value = true
	}
	// 无违规
	let innocent = () => {
		only_index.value = true
		tipsText.value = '确认文章无违规！！！'
		listitem_id.value = props.essaylist._id
		essay_choice.value = true
	}
	
</script>

<style lang="scss" scoped>
.item {
	position: relative;
	margin-bottom: 24rpx;
	display: flex;
	align-items: center;
	color: rgba(0,0,0,.6);
	.title {
		color: #000;
		padding-right: 100rpx;
		width: 240rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.contentText {
		width: 700rpx;
		min-width: 400rpx;
		.content {
			width: 100%;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			padding-right: 100rpx;
		}
	}
	.name {
		padding-right: 100rpx;
		width: 240rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.time {
		padding-right: 100rpx;
	}
	
	.move {
		position: absolute;
		top: 50%;
		right: 100rpx;
		transform: translateY(-50%);
		display: flex;
		font-size: 24rpx;
		.show {
			cursor: pointer;
			padding: 0 3rpx 4rpx;
			border-bottom: 1rpx solid rgba(0,0,0,.3);
			margin-right: 40rpx;
			&:hover {
				color: red;
				border-bottom: 1rpx solid red;
			}
		}
		.del {
			position: relative;
			cursor: pointer;
			padding: 0 3rpx 4rpx;
			border-bottom: 1rpx solid rgba(0,0,0,.3);
			margin-left: 40rpx;
			&:hover {
				color: red;
				border-bottom: 1rpx solid red;
			}
			
		}
	}
}
</style>