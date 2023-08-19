<template>
	<view class="userinfobox">
		<el-card class="card" body-style="display: flex;flex-direction: column;align-items: center">
			<view class="userinfo">
				<view class="user-pic">
					<image src="../../../public/bg.png" mode="aspectFill"></image>
				</view>
				
				<view class="user-name">
					{{ rootname }}
				</view>
			</view>
			
			<view class="other">
				<view class="isroot">
					权限: root
				</view>
				<view class="time">
					时间: 2023-8-8
				</view>
			</view>
		</el-card>
		
		<el-card class="card2">
			<view class="navview">
				<!-- // 新增用户 -->
				<view class="newuser nav-item">
					<view class="user-icon">
						<el-icon><UserFilled /></el-icon>
					</view>
					
					<view class="num">
						<view class="num-size">
							10086
						</view>
						<view class="num-text">
							新增用户
						</view>
					</view>
				</view>
				<!-- // 新增文章 -->
				<view class="newessay nav-item">
					<view class="essay-icon">
						<el-icon><List /></el-icon>
					</view>
					
					<view class="num">
						<view class="num-size">
							10086
						</view>
						<view class="num-text">
							新增用户
						</view>
					</view>
				</view>
				
				<!-- // 全部用户 -->
				<view class="alluser nav-item">
					<view class="user-icon">
						<el-icon><UserFilled /></el-icon>
					</view>
					
					<view class="num">
						<view class="num-size">
							10086
						</view>
						<view class="num-text">
							新增用户
						</view>
					</view>
				</view>
				
				<!-- // 全部文章 -->
				<view class="allessay nav-item">
					<view class="essay-icon">
						<el-icon><List /></el-icon>
					</view>
					
					<view class="num">
						<view class="num-size">
							10086
						</view>
						<view class="num-text">
							新增用户
						</view>
					</view>
				</view>
			</view>
		</el-card>
	</view>
	
	<view class="viewbox">
		<view class="listnew">
			<el-card class="card3">
				<view class="toptext">
					今日热榜
				</view>
				
				<view class="hot-list">
					<view class="row-essay">
						<view class="index">
							1
						</view>
						
						<view class="row-text">
							珂朵莉世界第一可爱
						</view>
						
						<view class="show">
							查看详情
						</view>
					</view>
					<view class="row-essay">
						<view class="index">
							2
						</view>
						
						<view class="row-text">
							珂朵莉世界第一可爱
						</view>
						
						<view class="show">
							查看详情
						</view>
					</view>
					<view class="row-essay">
						<view class="index">
							3
						</view>
						
						<view class="row-text">
							珂朵莉世界第一可爱111111111111
						</view>
						
						<view class="show">
							查看详情
						</view>
					</view>
				</view>
				
			</el-card>
		</view>
		
		<view class="chart">
			<el-card class="card4">
				
			</el-card>
		</view>
	</view>
	
</template>

<script setup>
	import * as echarts from "echarts";
	import { ref, onMounted } from 'vue';
	
	 let rootname = ref('keduoli')
	 
	onMounted(() => {
		let token = uni.getStorageSync('root')
		rootname.value = token.name
		let echart = echarts;
		let view = echart.init(document.querySelector('.card4'))
		
		view.setOption({
		        xAxis: {
		          type: "category",
		          data: [
		            "一月",
		            "二月",
		            "三月",
		            "四月",
		            "五月",
		            "六月",
		            "七月",
		            "八月",
		            "九月",
		            "十月",
		            "十一月",
		            "十二月"
		          ]
		        },
		        tooltip: {
		          trigger: "axis"
		        },
		        yAxis: {
		          type: "value"
		        },
				series: [
				          {
				            data: [
								101,
								200,
								80,
								90,
								1,
								1000,
								500,
								600,
								900,
								300,
								200,
								700
				            ],
				            type: "line",
				            smooth: true
				          }
				        ]
				      });
				      window.onresize = function() {
				        //自适应大小
				        echart.resize();
				      };
		
	})
	
	
</script>

<style lang="scss" scoped>
	.userinfobox {
		display: flex;
		justify-content: space-between;
		width: 100%;
		.card {
			width: 28%;
			font-size: 26rpx;
			.userinfo {
				border-bottom: 1rpx solid #999;
				margin-bottom: 40rpx;
				padding-bottom: 40rpx;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				.user-pic {
					margin-right: 60rpx;
					width: 200rpx;
					height: 200rpx;
					border-radius: 50%;
					overflow: hidden;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.user-name {
					letter-spacing: 6rpx;
					font-size: 55rpx;
					margin: 26rpx 0 22rpx;
				}
			}
			.other {
				display: flex;
				width: 100%;
				justify-content: space-evenly;
			}
		}
		
		.card2 {
			padding-top: 40rpx;
			width: 70%;
			height: 320rpx;
			.navview {
				display: flex;
				justify-content: space-between;
				.nav-item {
					display: flex;
					width: 22%;
					height: 160rpx;
					background-color: #fff;
					border-radius: 14rpx;
					overflow: hidden;
					box-shadow: 2rpx 2rpx 10rpx rgba(0,0,0,.1);
					.user-icon,
					.essay-icon {
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 50rpx;
						width: 35%;
						height: 100%;
						background-color: #B2EBF2;
						color: #fff;
					}
					
					.num {
						width: 65%;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.num-size {
							font-size: 42rpx;
						}
						.num-text {
							margin-top: 6rpx;
							font-size: 26rpx;
							color: rgba(0,0,0,.5);
						}
					}
				}
			}
		}
	}
	
	.viewbox {
		display: flex;
		justify-content: space-between;
		.listnew {
			margin-top: 40rpx;
			width: 28%;
			.card3 {
				padding-left: 20rpx;
				.toptext {
					font-size: 34rpx;
					color: orangered;
					padding-bottom: 30rpx;
				}
				.hot-list {
					.row-essay {
						position: relative;
						margin-bottom: 28rpx;
						display: flex;
						.index {
							color: red;
							margin-right: 16rpx;
						}
						.row-text {
							width: 400rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							color: rgba(0,0,0,.7)
						}
						.show {
							cursor: pointer;
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
							right: 0;
							font-size: 24rpx;
							color: rgba(0,0,0,.5);
							padding: 0 4rpx 2rpx;
							border-bottom: 1rpx solid rgba(0,0,0,.5);
							&:hover {
								color: red;
								border-bottom: 1rpx solid red;
							}
							
						}
					}
				}
			}
		}

		.chart {
			transform: translateY(-30rpx);
			width: 70%;
			.card4 {
				width: 100%;
				height: 650rpx;
			}
		}
	}
</style>