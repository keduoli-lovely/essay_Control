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
	const props = defineProps({
		essay_row: Object
	})
</script>

<style lang="scss" scoped>
	.list {
		padding: 20rpx 0;
		display: flex;
		align-items: center;
		color: var(--essayitem_font);
		&:hover {
			background-color: var(--essay_hover_bg);
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
			color: var(--essay_pop_font);
			&:hover {
				color: red;
			}
		}
	}
</style>