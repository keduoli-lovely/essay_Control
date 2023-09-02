<template>
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
				<view class="back">
					<view class="back_pic">
						
					</view>
					深色
				</view>
				
				<view class="white">
					<view class="white_pic">
						
					</view>
					浅色
				</view>
				
			</view>
			<view class="select">
				 <radio-group>
				 	<label class="radio1">
				 		<text class="radio_text">自动</text><radio value="1" />
				 	</label>
					<br />
				 	<label class="radio2">
				 		<text class="radio_text">跟随系统</text><radio value="2" />
				 	</label>
				 </radio-group>
			</view>
			
			<!-- // 设置语言 -->
			<view class="lang">
				<span class="lang_text">语言选择:</span> <select class="select_row">
					<option value="1">简体中文</option>
					<option value="2">English</option>
				</select>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.other {
		padding: 20rpx 100rpx;
		.title_setting {
			font-size: 60rpx;
			font-weight: 400;
			margin-bottom: 20rpx;
		}
		.setting_box {
			padding: 40rpx 0;
			.admin {
				margin-bottom: 40rpx;
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
					background-color: skyblue;
					&:hover {
						color: #fff;
						background-color: #00BCD4;
					}
				}
			}
			
			.back_color {
				display: flex;
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
						margin-bottom: 5rpx;
						width: 160rpx;
						height: 160rpx;
						background-color: #4d4d4d;
						border: 10rpx solid skyblue;
						border-radius: 14rpx;
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
				margin: 20rpx 0 40rpx 120rpx;
				.radio1,
				.radio2 {
					line-height: 60rpx;
					.radio_text {
						margin-right: 15rpx;
					}
				}
			}
			
			.lang {
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
	}
</style>