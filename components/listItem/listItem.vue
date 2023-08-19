<template>
	<view class="item">
		<view class="title">
			{{ essaylist.title }}
		</view>
		
		<view class="content">
			{{ essaylist?.text[0] }}
		</view>
		
		<view class="name">
			{{ essaylist.user?.name }}
		</view>
		
		<view class="time">
			{{ essaylist.time }}
		</view>
		
		<view class="move">
			<view class="show" @click="showtc">
				{{ select1 }}
			</view>
			
			<view class="del">
				{{ select2 }}
			</view>
		</view>
	</view>
</template>

<script setup>
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
	
	let showtc = () => {
		emit('datatcFn')
	}
</script>

<style lang="scss" scoped>
.item {
	position: relative;
	margin-bottom: 24rpx;
	display: flex;
	color: rgba(0,0,0,.6);
	.title {
		color: #000;
		padding: 0 100rpx 20rpx 0;
		width: 240rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.content {
		width: 800rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		padding-right: 100rpx;
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