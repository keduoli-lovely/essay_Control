<template>
	<view class="essay">
		<el-card class="box">
			<view class="nav">
				<view class="allessay item" @click="addindex(0)">
					全部
				</view>
				<view class="toexamine item" @click="addindex(1)">
					待审核
				</view>

				<view class="pass item" @click="addindex(2)">
					审核通过
				</view>

				<view class="report item" @click="addindex(3)">
					举报
				</view>
				
				<view class="logding item" @click="logding">
					<el-icon class="logding-icon" :class="rotate ? 'amin' : ''"><Refresh /></el-icon>刷新
				</view>

				<view class="block" :style="{left: left + 'rpx'}"></view>
				
				<view class="search" v-show="navindex ===  0">
					<input type="text" @input="search_fn" @focus="search_focus" @blur="search_blur" id="search" v-model="search_text" placeholder="搜索">
					<view class="tips" v-if="search_is_show">
						<view class="tips_row" @click="todetail" v-for="(item, i) in filter_search_value" :key="item._id">
							&nbsp;&nbsp;&nbsp;&nbsp;{{ item.title }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</view>
						<view class="tips_row">
							&nbsp;&nbsp;&nbsp;&nbsp;搜索:‘{{ search_text }}’&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</view>
					</view>
				</view>
			</view>
		</el-card>
		<el-card class="box2" v-if="decision">
			<listItem
				v-show="navindex === 0"
				v-for="(item, i) in essaydata" :key="i"
				:essaylist="item"
				@datatcFn="changedata(item)"
			></listItem>
			
			<listItem
				v-if="review.length"
				v-show="navindex === 1"
				v-for="(item, i) in review" :key="i"
				:essaylist="item"
				:select2="'通过审核'"
				@datatcFn="changedata(item)"
			></listItem>
			
			<listItem
				v-if="backreview.length"
				v-show="navindex === 2"
				v-for="(item, i) in backreview" :key="i"
				:essaylist="item"
				:select2="'重新审核'"
				@datatcFn="changedata(item)"
			></listItem>
			
			<listItem
				v-if="report.length"
				v-show="navindex === 3"
				v-for="(item, i) in report" :key="i"
				:essaylist="item"
				:select2="'确认违规'"
				@datatcFn="changedata(item)"
			></listItem>
		</el-card>
	</view>
	
	<Choice>
		<view>
			{{ tipsText }}
		</view>
	</Choice>
	<notification
		:datatc="datatc"
	></notification>
	
	<PopUps
		:essay_list="filter_search_value"
		:title="search_text"
	 ></PopUps>
</template>

<script setup>
	/*
		@todo1: 文章时间不准确
		@todo2: 文章审核等方法和路由的实现
		@todo3: index.vue 页面的根高度为100vh(屏幕高度)导致显示不正常
	*/
	import { ref, computed, watch } from 'vue'
	import Choice from '../../../components/Choice/Choice.vue'
	import listItem from '../../../components/listItem/listItem.vue'
	import notification from '../../../components/notification/notification.vue'
	import { maskstate } from '../../../store/maskstare.js'
	import { storeToRefs } from 'pinia'
	import { userdata } from '../../../store/Usedata.js'
	import { otherdata } from '../../../store/otherData.js' 
	import PopUps from '../../../components/Pop_ups_search/Pop_ups_search.vue'
	

	// 文章页面的方法区分
	let { page_index, tipsText } = storeToRefs(otherdata())
	// 文章数据
	let { getessaydata } = userdata()
	let { essaydata } = storeToRefs(userdata())
	let rotate = ref(false)
	// 索引
	let navindex = ref(0)
	// 距离
	let left = ref(0)
	
	/**
	*	@review 过滤的待审核数据
	* 	@backreview 重新审核的数据
	* 	@report 被举报的数据
	* `@filterdata 过滤方法
	*/
   let filterdata = (sta) => {
   	return Object.values(essaydata.value).filter(item => {
   		return item.state == sta
   	})
   }
	let review = computed(() => {
		return filterdata(0)
	})
	let backreview = computed(() => {
		return filterdata(1)
	})
	
	let report = computed(() => {
		return filterdata(-1)
	})
	/**
	 * @decision 判断card2的显示
*/
	let decision = ref(true)
	watch([ navindex, essaydata ], () => {
		if(!essaydata.value[0]?.user_id) {
			decision.value = false
		}else {
			decision.value = true
		}
		if(navindex.value == 1) {
			decision.value = review.value.length <= 0 ? false : true 
		}else if(navindex.value == 2) {
			decision.value = backreview.value.length <= 0 ? false : true 
		}else if(navindex.value === 3) {
			decision.value = report.value.length <= 0 ? false : true 
		}
	})
   
	// 弹窗数据
	let datatc = ref({})
	let { essaytcstate, search_pop } = storeToRefs(maskstate())
	let changedata = (data) => {
		essaytcstate.value = true
		datatc.value = data
	}
	let todetail = () => {
		search_pop.value = true
	}

	let addindex = (i) => {
		page_index.value = i
		navindex.value = i
		left.value = 200 * i
	}
	
	let logding = () => {
		rotate.value = true
		getessaydata(20)
		setTimeout(() => {
			rotate.value = false
		}, 3000)
	}
	
	// 搜索相关
	let search_is_show = ref(false)
	let search_text = ref('')
	let filter_search_value = ref([])
	let search_fn = () => {
		let tmp_array = []
		if(!search_text.value) {
			search_is_show.value = false
			filter_search_value.value = []
		}else {
			search_is_show.value = true
		}
		for (let i in essaydata.value) {
			let tmp = essaydata.value[i]
			if(tmp.title.includes(search_text.value) || tmp.text[0].includes(search_text)) {
				tmp_array.push(tmp)
			}
		}
		filter_search_value.value = tmp_array.splice(0, 6)
	}
	
	let search_focus = () => {
		if(search_text.value) {
			search_is_show.value = true
		}
	}
	let search_blur = () => {
		let timer = setTimeout(() => {
			search_is_show.value = false
			clearTimeout(timer)
		}, 1000)
	}
</script>

<style lang="scss" scoped>
	.essay {
		.box {
			overflow: inherit;
			margin-bottom: 40rpx;
			.nav {
				z-index: 10;
				position: relative;
				width: 100%;
				display: flex;
				.logding {
					.logding-icon {
						font-size: 40rpx;
						vertical-align: middle;
						margin-right: 8rpx;
						padding-bottom: 6rpx;
						transform-origin: center;
					}
					&:hover {
						color: skyblue;
					}
				}
				.amin {
					animation: range 3s ease infinite;
				}
				@keyframes range {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(720deg);
					}
				}
				.item {
					cursor: pointer;
					white-space: nowrap;
					width: 200rpx;
					z-index: 1;
					padding: 20rpx 40rpx;
					text-align: center;
				}

				.item:first-child {
					margin-left: -20rpx;
				}

				.block {
					transition: all .4s ease;
					border-radius: 6rpx;
					position: absolute;
					top: -5rpx;
					width: 160rpx;
					height: 100rpx;
					background-color: skyblue;
				}
				.search {
					padding-bottom: 9rpx;
					position: absolute;
					top: 50%;
					right: 0;
					width: 400rpx;
					transform: translateY(-50%);
					border-bottom: 1rpx solid rgba(0,0,0,.3);
					.tips {
						position: absolute;
						top: 80rpx;
						right: 5rpx;
						width: 400rpx;
						background-color: #fff;
						border-radius: 5rpx;
						box-shadow: 4rpx 4rpx 15rpx rgba(0,0,0,.3);
						font-size: 24rpx;
						color: rgba(0,0,0,.7);
						.tips_row {
							width: 100%;
							cursor: pointer;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							padding: 15rpx 0;
							&:hover {
								color: #000;
								background-color: #B2DFDB;
							}
						}
					}
				}
			}
		}
		
	}
	
	
</style>