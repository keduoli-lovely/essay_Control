<template>
	<el-card>
		<view class="other">
			<view class="title_setting">
				设置
			</view>
			<view class="setting_box">
				<!-- // admin -->
				<view class="admin">
					<span class="admin_text">管理员账号:</span> 
					<view class="remove">
						重置
					</view>
					<view class="set_admin">
						更改
					</view>
				</view>
				<!-- // 设置颜色 -->
				<view class="back_color">
					<view class="appearance">
						外观:
					</view>
					<view class="back" 
						:class="backColor_sta == 1 ? 'color_atv' : ''"
						@click="backColor_sta = 1"
					>
						<view class="back_pic pic">
							
						</view>
						深色
					</view>
					
					<view class="white"
						:class="backColor_sta == 2 ? 'color_atv' : ''"
						@click="backColor_sta = 2"
					>
						<view class="white_pic pic">
							
						</view>
						浅色
					</view>
					
				</view>
				<view class="select">
					 	<label class="radio1" @click="backColor_sta = 3">
					 		<text class="radio_text">自动</text>
							<span class="radio_cont" 
								:class="backColor_sta == 3 ? 'radio_atv' : ''"
							>
								<el-icon class="radio_icon"><Check /></el-icon>
							</span>
					 	</label>
						<br />
					 	<label class="radio2" @click="backColor_sta = 4">
					 		<text class="radio_text">跟随系统</text>
							<span class="radio_cont"
								:class="backColor_sta == 4 ? 'radio_atv' : ''"
							>
								<el-icon class="radio_icon"><Check /></el-icon>
							</span>
					 	</label>
				</view>
				
				<!-- // 设置语言 -->
				<view class="lang">
					<span class="lang_text">语言选择:</span> <select v-model="lang_sta" class="select_row">
						<option value="1">简体中文</option>
						<option value="2">English</option>
					</select>
				</view>
			</view>
			
			
			<view class="userinfo_set" id="userinfo">
				<view class="userinfo_text">
					管理员详情
				</view>
				<view class="root_pic">
					<image src="/public/bg.jpg" mode="aspectFill"></image>
					
					<view class="pic_mask">
						<el-icon style="font-size: 55rpx;margin-right: 6rpx;"><Edit /></el-icon>更换头像
					</view>
				</view>
				
				<view class="root_name">
					<span class="name_text">昵称:</span><text class="change_name" title="修改昵称">admin</text>
				</view>
				
			</view>
			
			
			<!-- // 确认修改
			/**
			 * @todo1 当用户修改某一项后才显示按钮
			 * @todo2 当用户修改但是没有保存, 弹出提示框让用户选择
			 */ -->
			<view class="save" v-if="save_btn_sta">
				<view class="save_yes">
					确认修改
				</view>
				
				<view class="save_no">
					取消修改
				</view>
			</view>
		</view>
	</el-card>
</template>

<script setup>
	import { ref, watch } from 'vue'
	
	
	
	// 主题切换
	let backColor_sta = ref(2)
	let lang_sta= ref(1)
	
	// 确认修改按钮的显示
	let save_btn_sta = ref(false)
	watch([backColor_sta, lang_sta], () => {
		if(backColor_sta.value != 2 || lang_sta.value != 1) {
			save_btn_sta.value = true
		}else {
			save_btn_sta.value = false
		}
	})
</script>

<style lang="scss" scoped>
	.other {
		position: relative;
		padding: 20rpx 100rpx 160rpx;
		.title_setting,
		.userinfo_text {
			font-size: 60rpx;
			font-weight: 400;
			margin-bottom: 60rpx;
			padding-bottom: 40rpx;
			border-bottom: 1rpx solid rgba(0,0,0,.1);
		}
		.setting_box {
			padding: 40rpx 0;
			.admin {
				margin-bottom: 80rpx;
				display: flex;
				align-items: center;
				.admin_text {
					font-size: 40rpx;
				}
				.remove,
				.set_admin {
					cursor: pointer;
					font-size: 26rpx;
					margin-left: 30rpx;
					padding: 10rpx 40rpx;
					background-color: red;
					border-radius: 8rpx;
				}
				.remove:hover {
					color: #fff;
					background-color: #E53935;
				}
				.set_admin {
					margin-left: 45rpx;
					background-color: skyblue;
					&:hover {
						color: #fff;
						background-color: #00BCD4;
					}
				}
			}
			
			.back_color {
				display: flex;
				padding-left: 120rpx;
				.appearance {
					font-size: 40rpx;
					margin-right: 30rpx;
				}
				.back,
				.white {
					text-align: center;
					.back_pic,
					.white_pic {
						cursor: pointer;
						margin-bottom: 20rpx;
						width: 160rpx;
						height: 160rpx;
						background-color: #4d4d4d;
						border-radius: 14rpx;
						box-shadow: 6rpx 6rpx 15rpx rgba(0,0,0,.3);
					}
				}
				.color_atv {
					color: skyblue;
					.pic {
						border: 4rpx solid skyblue;
						box-shadow: 0 0 40rpx skyblue, inset 0 0 8rpx skyblue;
					}
				}
				.white {
					margin-left: 50rpx;
					.white_pic {
						background-color: #fff;
					}
				}
			}
			
			.select {
				margin: 30rpx 0 80rpx 245rpx;
				.radio1,
				.radio2 {
					display: flex;
					align-items: center;
					line-height: 60rpx;
					.radio_text {
						margin-right: 10rpx;
					}
					.radio_cont {
						line-height: 35rpx;
						text-align: center;
						color: #fff;
						font-size: 28rpx;
						font-weight: 600;
						display: block;
						width: 35rpx;
						height: 35rpx;
						border-radius: 50%;
						border: 1rpx solid rgba(0,0,0,.2);
						.radio_icon {
							padding-top: 4rpx;
						}
					}
					.radio_atv {
						background-color: skyblue;
					}
				}
			}
			
			.lang {
				padding-left: 40rpx;
				display: flex;
				align-items: center;
				.lang_text {
					font-size: 40rpx;
					margin-right: 30rpx;
				}
				.select_row {
					padding: 5rpx 10rpx;
					border-radius: 6rpx;
					outline: none;
					background-color: #4d4d4d;
					color: #fff;
				}
			}
			
		}
		
		.userinfo_set {
			position: absolute;
			top: -60rpx;
			left: 40%;
			margin-top: 80rpx;
			width: 800rpx;
			min-width: 600rpx;
			.userinfo_text {
				border: 0;
			}
			.root_pic {
				cursor: pointer;
				position: relative;
				width: 340rpx;
				height: 340rpx;
				margin: 0 0 60rpx 100rpx;
				overflow: hidden;
				border-radius: 50%;
				&:hover .pic_mask {
					opacity: 1;
				}
				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					border: 4rpx solid rgba(0,0,0,.1);
				}
				.pic_mask {
					transition: all .2s linear;
					opacity: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					left: -10%;
					bottom: 0;
					width: 120%;
					height: 50%;
					color: #fff;
					font-size: 26rpx;
					background-color: rgba(0,0,0,.3);
				}
			}
			.root_name {
				.name_text {
					font-size: 40rpx;
					margin-right: 30rpx;
				}
				.change_name {
					cursor: pointer;
					padding: 0 15rpx 2rpx;
					border-bottom: 1rpx solid rgba(0,0,0,.2);
					letter-spacing: 3rpx;
					&:hover {
						color: skyblue;
						border-color: skyblue;
					}
				}
			}
		}
		
		.save {
			position: absolute;
			left: 140rpx;
			bottom: 20rpx;
			font-size: 30rpx;
			color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.save_yes,
			.save_no {
				cursor: pointer;
				padding: 15rpx 25rpx;
				background-color: #145b7d;
				border-radius: 8rpx;
				box-shadow: 4rpx 4rpx 10rpx rgba(0,0,0,.2);
			}
			.save_yes:hover {
				color: #000;
				background-color: skyblue;
			}
			.save_no {
				margin-left: 40rpx;
				background-color: #999;
			}
		}
	}
</style>