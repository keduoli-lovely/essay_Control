<template>
	<view class="list">
		<view class="title">{{ essay_row.title }}</view>
		<view class="cont">{{ essay_row.text[0] }}</view>
		<view class="name">{{ essay_row.user.name }}</view>
		
		<view class="btn">
			查看
		</view>
	</view>
</template>

<script setup>
	let props = defineProps({
		essay_row: Object
	})
</script>

<style lang="scss" scoped>
	.list {
		padding: 20rpx 0;
		display: flex;
		align-items: center;
		color: #757575;
		&:hover {
			background-color: #E0F7FA;
		}
		&:last-child {
			margin-bottom: 60rpx;
		}
		.title {
			padding-left: 20rpx;
			flex: 1;
		}
		.cont {
			flex: 2;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.name {
			font-size: 28rpx;
			flex: 1;
		}
		.btn {
			cursor: pointer;
			flex: 1;
			font-size: 26rpx;
			color: rgba(0,0,0,.6);
			&:hover {
				color: red;
			}
		}
	}
</style>