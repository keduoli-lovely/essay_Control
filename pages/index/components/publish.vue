<template>
	<el-card>
		<view class="push" :class="night ? 'night' : 'daytime'">
			<view class="title">
				<span class="text">标题:</span> <input type="text" name="title" id="title">
			</view>
			<view class="time">
				<span class="text">时间:</span> 
				<!-- // 选择时间 -->
				<input type="date" name="time" id="time" v-if="!time_setting">
				<!-- // 输入时间 -->
				<input type="text" name="in_time" placeholder="年-月-日" id="in_time" v-else>
				<radio-group style="display: flex" @change="changeColor">
					时间选择: 
						当前时间 &nbsp;<label class="radio">
							<radio checked="true" value="1" /><text></text>
						</label>
						&nbsp;&nbsp; |&nbsp;&nbsp;
						自定义时间: &nbsp;<label class="radio">
							<radio value="2" /><text></text>
						</label>
				</radio-group>
			</view>
			
			<view class="file">
				<view class="file_tit">
					上传文件
				</view>
				<view class="video">
					视频<span style="color: rgba(0,0,0,.4);margin: 0 6rpx;">(限制上传一个)</span>
					<view class="send_box">
						选择视频
						<view class="input input_video">
							
						</view>
					</view>
				</view>
				
				<view class="app">
					软件<span style="color: rgba(0,0,0,.4);margin: 0 6rpx;">(限制上传一个软件)</span>
					<view class="send_box">
						选择app
						<view class="input input_app">
							
						</view>
					</view>
				</view>
				
				
				<view class="image">
					图片<span style="color: rgba(0,0,0,.4);margin: 0 6rpx;">(限制上传6张图片)</span>
					<view class="pic_box">
						<view class="pic_item">
							<el-icon><Plus /></el-icon>
							<view class="pic">
								
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</el-card>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { changeColor as color_night } from '@/store/changeColor_night.js'
	import { storeToRefs } from 'pinia'
	
	let { night } = storeToRefs(color_night())
	
	onMounted(() => {
		createEl()
	})
	
	// input 的生成
	let createEl = () => {
		let el1 = document.querySelector('.input_video')
		let el2 = document.querySelector('.input_app')
		let el3 = document.querySelectorAll(".pic")
		el1.innerHTML = `
			<input type="file" id="video" style="cursor: pointer;" accept="video/*">
		`
		el2.innerHTML = `
			<input type="file" id="app" style="cursor: pointer;" accept=".apk, .exe">
		`
		el3.forEach(item => {
			item.innerHTML = `
				<input type="file" id="pic" style="cursor: pointer;width: 100%; height: 100%" accept="image/*">
			`
		})
	}
	// 控制时间的切换
	let time_setting = ref(false)
	let changeColor = (i) => {
		if(i.detail.value == 2) {
			time_setting.value = true
		}else {
			time_setting.value = false
		}
	} 
</script>

<style lang="scss" scoped>
	.push {
		padding: 60rpx 120rpx;
		.title {
			margin-bottom: 40rpx;
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			font-size: 45rpx;
			color: var(--push_content_title);
			.text {
				margin-right: 40rpx;
			}
			#title {
				width: 1600rpx;
				height: 60rpx;
				border: 1rpx solid rgba(0,0,0,.2);
				border-radius: 2rpx;
				padding-left: 20rpx;
			}
		}
		.time {
			margin-bottom: 40rpx;
			display: flex;
			align-items: center;
			.text {
				margin-right: 40rpx;
			}
			#time,
			#in_time {
				width: 400rpx;
				padding-bottom: 4rpx;
				margin-right: 100rpx;
				border-bottom: 1rpx solid rgba(0,0,0,.2);
			}
		}
		.file {
			.video,
			.app {
				display: flex;
				font-size: 35rpx;
				.send_box {
					overflow: hidden;
					position: relative;
					margin-left: 40rpx;
					width: 200rpx;
					height: 45rpx;
					text-align: center;
					line-height: 45rpx;
					border: 1rpx solid rgba(0,0,0,.2);
					font-size: 26rpx;
					color: rgba(0,0,0,.8);
					border-radius: 5rpx;
					.input {
						cursor: pointer;
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						opacity: 0;
					}
				}
			}
			.video,
			.app {
				margin-bottom: 15rpx;
			}
			
			.image {
				padding: 20rpx 0;
				border: 1rpx solid rgba(0,0,0,.2);
				.pic_box {
					border-radius: 6rpx;
					margin: 20rpx;
					padding: 20rpx 40rpx;
					border: 1rpx solid rgba(0,0,0,.2);
					.pic_item {
						position: relative;
						cursor: pointer;
						border-radius: 6rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 50rpx;
						margin: 20rpx 0;
						width: 260rpx;
						height: 260rpx;
						border: 1rpx solid rgba(0,0,0,.2);
						.pic {
							position: absolute;
							top: 0;
							left: 0;
							opacity: 0;
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>