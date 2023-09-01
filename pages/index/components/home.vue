<template>
	<view class="userinfobox">
		<el-card class="card" body-style="display: flex;flex-direction: column;align-items: center">
			<view class="userinfo">
				<view class="user-pic">
					<image src="/public/bg.jpg" mode="aspectFill"></image>
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
					时间: {{ newtime }}
				</view>
			</view>
		</el-card>

		<el-card class="card2">
			<view class="navview">
				<!-- // 新增用户 -->
				<view class="newuser nav-item">
					<view class="user-icon">
						<el-icon>
							<UserFilled />
						</el-icon>
					</view>

					<view class="num">
						<view class="num-size">
							{{ essaylength }}
						</view>
						<view class="num-text">
							新增发布
						</view>
					</view>
				</view>
				<!-- // 新增文章 -->
				<view class="newessay nav-item">
					<view class="essay-icon">
						<el-icon>
							<List />
						</el-icon>
					</view>

					<view class="num">
						<view class="num-size">
							{{ userlength }}
						</view>
						<view class="num-text">
							新增用户
						</view>
					</view>
				</view>

				<!-- // 全部用户 -->
				<view class="alluser nav-item">
					<view class="user-icon">
						<el-icon>
							<UserFilled />
						</el-icon>
					</view>

					<view class="num">
						<view class="num-size">
							{{ essaylength }}
						</view>
						<view class="num-text">
							全部文章
						</view>
					</view>
				</view>

				<!-- // 全部文章 -->
				<view class="allessay nav-item">
					<view class="essay-icon">
						<el-icon>
							<List />
						</el-icon>
					</view>

					<view class="num">
						<view class="num-size">
							{{ userlength }}
						</view>
						<view class="num-text">
							全部用户
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
					<view class="row-essay" 
						v-for="(item, i) in essayhotdata"
						:key="i"
					>
						<view class="index">
							{{ i + 1 }}
						</view>

						<view class="row-text">
							{{ item?.text[0] }}
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
	import {
		ref,
		onMounted,
		computed
	} from 'vue';
	import dayjs from 'dayjs'
	import {
		userdata
	} from '../../../store/Usedata.js'
	import {
		storeToRefs
	} from 'pinia'
	import {
		getroot,
		gethost
	} from '../../../apis/getRootDetail.js'
	import {
		anewdata
	} from '../../../utils/anewdata.js'


	// 用户与文章
	let {
		userlength,
		essaylength
	} = storeToRefs(userdata())
	// 当前时间
	let newtime = computed(() => {
		return dayjs(new Date()).format('YYYY-MM-DD')
	})

	let rootname = ref('keduoli')
	let essayhotdata = ref([])
	let essayhot = async () => {
		let res = await gethost()
		essayhotdata.value = res.data.data
	}


	onMounted(async () => {
		let token = uni.getStorageSync('root')
		rootname.value = token.name
		let echart = echarts;
		let view = echart.init(document.querySelector('.card4'))
		// 基本数据
		essayhot()
		let rootdetail = await getroot()
		let {
			month_user_num,
			month_essay_num
		} = anewdata(rootdetail.data.result.data)
		view.setOption({
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月',
					'九月', '十月', '十一月', '十二月'
				]
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
					name: 'essay',
					type: 'line',
					stack: 'Total',
					areaStyle: {
						color: '#A5D6A7'
					},
					itemStyle: {
						color: '#4CAF50'
					},
					emphasis: {
						focus: 'series'
					},
					data: month_essay_num
				},
				{
					name: 'user',
					type: 'line',
					stack: 'Total',
					label: {
						show: true,
						position: 'top'
					},
					areaStyle: {
						color: '#81D4FA'
					},
					itemStyle: {
						color: '#26C6DA'
					},
					emphasis: {
						focus: 'series'
					},
					data: month_user_num
				}
			]
		});

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
			background-color: var(--home_card_bg);
			color: var(--home_card_font);
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
			background-color: var(--home_card_bg);
			.navview {
				display: flex;
				justify-content: space-between;

				.nav-item {
					display: flex;
					width: 22%;
					height: 160rpx;
					background-color: var(--home_numnav_item);
					border-radius: 14rpx;
					overflow: hidden;
					box-shadow: 2rpx 2rpx 10rpx rgba(0, 0, 0, .1);

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
							color: rgba(0, 0, 0, .5);
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
				background-color: var(--home_card_bg);
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
						&:nth-child(2) .index{
							color: #C62828 !important;
						}
						&:nth-child(3) .index{
							color: #000 !important;
						}

						.row-text {
							width: 400rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							color: rgba(0, 0, 0, .7)
						}

						.show {
							cursor: pointer;
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
							right: 0;
							font-size: 24rpx;
							color: rgba(0, 0, 0, .5);
							padding: 0 4rpx 2rpx;
							border-bottom: 1rpx solid rgba(0, 0, 0, .5);

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
				background-color: var(--home_card_bg);
				width: 100%;
				height: 650rpx;
			}
		}
	}
</style>