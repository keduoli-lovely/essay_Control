<template>
	<el-card>
		<view class="other">
			<view class="title_setting">
				{{ lang["OTHER_SETTING_TITLE"] }}
			</view>
			<view class="setting_box">
				<!-- // admin -->
				<view class="admin">
					<span class="admin_text">{{ lang["OTHER_ADMIN_ACCOUNT"] }}:</span> 
					<view class="remove" @click="show_remove_btn">
						{{ lang["OTHER_ADMIN_REBOOT"] }}
					</view>
					<view class="set_admin" @click="show_setadmin_btn">
						{{ lang["OTHER_ADMIN_CHANGE"] }}
					</view>
				</view>
				<!-- // 设置颜色 -->
				<view class="back_color" :class="default_lang === 2 ? 'back_color_atv' : ''">
					<view class="appearance">
						{{ lang["OTHER_COLOR"] }}:
					</view>
					<view class="back" 
						:class="backColor_sta == 1 ? 'color_atv' : ''"
						@click="backColor_sta = 1"
					>
						<view class="back_pic pic">
							
						</view>
						{{ lang["OHTER_COLOR_BACK"] }}
					</view>
					
					<view class="white"
						:class="backColor_sta == 2 ? 'color_atv' : ''"
						@click="backColor_sta = 2"
					>
						<view class="white_pic pic">
							
						</view>
						{{ lang["OHTER_COLOR_WHITE"] }}
					</view>
					
				</view>
				<view class="select" :class="default_lang === 2 ? 'select_atv' : ''">
					 	<label class="radio1" @click="backColor_sta = 3">
					 		<text class="radio_text">{{ lang["OTHER_COLOR_AUTO"] }}</text>
							<span class="radio_cont" 
								:class="backColor_sta == 3 ? 'radio_atv' : ''"
							>
								<el-icon class="radio_icon"><Check /></el-icon>
							</span>
					 	</label>
						<br />
					 	<label class="radio2" @click="backColor_sta = 4">
					 		<text class="radio_text">{{ lang["OTHER_COLOR_SYSTEM"] }}</text>
							<span class="radio_cont"
								:class="backColor_sta == 4 ? 'radio_atv' : ''"
							>
								<el-icon class="radio_icon"><Check /></el-icon>
							</span>
					 	</label>
				</view>
				
				<!-- // 设置语言 -->
				<view class="lang" :class="default_lang === 2 ? 'lang_atv' : ''">
					<span class="lang_text">{{ lang["OTHER_LANG_SELECT"] }}:</span> <select v-model="lang_sta" class="select_row">
						<option :value="1">简体中文</option>
						<option :value="2">English</option>
					</select>
				</view>
			</view>
			
			
			<view class="userinfo_set" id="userinfo">
				<view class="userinfo_text">
					{{ lang["OTHER_SETTING_SUBTITLE"] }}
				</view>
				<view class="root_pic">
					<image src="/public/bg.jpg" mode="aspectFill"></image>
					
					<view class="pic_mask">
						<el-icon style="font-size: 55rpx;margin-right: 6rpx;"><Edit /></el-icon>更换头像
					</view>
				</view>
				
				<view class="root_name" @click="nikename_showta">
					<span class="name_text">{{ lang["OTHER_USER_NAME"] }}:</span><text v-text="admin_nikename" class="change_name" v-title="lang['OTHER_USER_NAME_TITLE']"></text>
				</view>
				
			</view>
			
			
			<!-- // 确认修改
			/**
			 * @todo1 当用户修改某一项后才显示按钮
			 * @todo2 当用户修改但是没有保存, 弹出提示框让用户选择
			 */ -->
			<view class="save" v-if="save_btn_sta">
				<view class="save_yes" @click="change_lang_color">
					{{ lang["OTHER_BTN_YES"] }}
				</view>
				
				<view class="save_no" @click="close_lang_color">
					{{ lang["OTHER_BTN_NO"] }}
				</view>
			</view>
		</view>
	</el-card>
	
	<Choice 
		:admin_acc="admin_account"
		:admin_pwd="admin_password"
		:admin_name="admin_name"
	>
		<p 
			v-if="tc_data_change_sta === 1"
		>
			你确定要重置密码吗!!!!
		</p>
		
		<view 
			class="input_tc_box"
			v-else-if="tc_data_change_sta === 2"
		>
			<view class="tc_account">
				<text 
					style="margin-right: 12rpx"
				>
					账号: 
				</text>
				<span 
					v-if="tc_account_showsta"
					 class="tc_row1_account"
				>
					123456
				</span>
				<input 
					v-else
					v-model.number="admin_account"
					maxlength="11" 
					type="text" 
					id="tc_change_account" 
					placeholder="123456"
				>
				<span 
					@click="tc_account_showsta = false" 
					class="tips_edit" 
					v-show="tc_account_showsta"
				>
					编辑
				</span>
			</view>
			<view class="tc_password">
				<text style="margin-right: 12rpx">密码: </text>
				<span 
					v-if="tc_pwd_showsta" 
					class="tc_row2_pwd"
				>
					123456
				</span>
				<input 
					v-else 
					v-model.number="admin_password" 
					type="text" 
					maxlength="11" 
					id="tc_change_password" 
					placeholder="123456"
				>
				
				<span 
					@click="tc_pwd_showsta = false" 
					class="tips_edit" 
					v-show="tc_pwd_showsta"
				>
					编辑
				</span>
			</view>
		</view>
		
		<view class="nikename_change_input" v-else>
			昵称: <input 
					type="text" 
					maxlength="11" 
					id="nikename_input" 
					:placeholder="admin_nikename"
					v-model="admin_name"
				>
		</view>
	</Choice>
</template>

<script setup>
	import { ref, watch, onMounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { lang_sel } from '@/store/lang_selec.js'
	import { changeColor } from '@/store/changeColor_night.js'
	import Choice from '@/components/Choice/Choice.vue'
	import { maskstate } from '@/store/maskstare.js'
	import { otherdata } from '@/store/otherData.js'
	
	
	onMounted(() => {
		// 获取/创建
		const pic_mask_el = document.querySelector('.pic_mask')
		create_input(pic_mask_el)
		// 获取管理员昵称
		let token = uni.getStorageSync('root')
		admin_nikename.value = token.name
	})
	
	// 管理员相关
	let admin_nikename = ref("admin")
	let admin_name = ref(null)
	let admin_account = ref(123456)
	let admin_password = ref(123456)
	// 创建input的方法
	const create_input = (el) => {
		const inp = document.createElement('input')
		inp.id = 'admin_pic_chnage'
		inp.type = 'file',
		inp.style.cssText = `
			position: absolute;
			width: 100%;
			height: 100%;
			opacity: 0;
			font-size: 0;
		`
		inp.accept = '.png, .jpg, .gif'
		el.appendChild(inp)
	}
	// 弹窗中显示的内容-sta
	let tc_data_change_sta = ref(2)

	// 语言切换
	let { lang, default_lang } = storeToRefs(lang_sel())
	let { default_color, night } = storeToRefs(changeColor())
	let { change_lang } = lang_sel()
	let { change_color } = changeColor()
	let sta = uni.getStorageSync('default')
	// 主题切换
	let backColor_sta = ref(2)
	let lang_sta= ref(1)
	backColor_sta.value = sta.color
	lang_sta.value = default_lang.value
	// 确认修改按钮的显示
	let save_btn_sta = ref(false)
	// 弹窗
	let { essay_choice, tc_account_showsta, tc_pwd_showsta } = storeToRefs(maskstate())
	let { page_index } = storeToRefs(otherdata())
	
	watch(night, () => {
		sta = uni.getStorageSync('default')
		backColor_sta.value = sta.color
	})
	
	watch([backColor_sta, lang_sta], () => {
		if(backColor_sta.value != sta.color || lang_sta.value != default_lang.value) {
			save_btn_sta.value = true
		}else {
			save_btn_sta.value = false
		}
	})
	
	const change_lang_color = () => {
		if(backColor_sta.value != sta.color) {
			sta.color = backColor_sta.value
			change_color(backColor_sta.value)
		}else if(lang_sta.value != default_lang.value) {
			sta.lang = lang_sta.value
			default_lang.value = lang_sta.value
			change_lang(lang_sta.value)
		}
		uni.setStorageSync('default', sta)
		save_btn_sta.value = false
	}
	
	const close_lang_color = () => {
		save_btn_sta.value = false
		backColor_sta.value = sta.color
		lang_sta.value = default_lang.value
	}
	
	const show_remove_btn = () => {
		tc_data_change_sta.value = 1
		essay_choice.value = true
		page_index.value = 4
	}
		
	const show_setadmin_btn = () => {
		tc_data_change_sta.value = 2
		essay_choice.value = true
		page_index.value = 5
	}
	const nikename_showta = () => {
		tc_data_change_sta.value = 3
		essay_choice.value = true
		page_index.value = 6
	}
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
			
			.back_color_atv {
				padding-left: 60rpx !important;
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
			
			.select_atv {
				margin: 30rpx 0 80rpx 324rpx !important;
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
			
			.lang_atv {
				padding-left: 95rpx;
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
	
	// 弹窗相关内容
	.input_tc_box {
		.tc_account,
		.tc_password {
			font-size: 34rpx;
			display: flex;
			margin-bottom: 15rpx;
			.tc_row1_account,
			.tc_row2_pwd {
				cursor: pointer;
				color: rgba(0,0,0, .6);
				padding: 0 40rpx 2rpx 6rpx;
				border-bottom: 1rpx solid rgba(0,0,0, .3);
				&:hover {
					color: skyblue;
					border-bottom: 1rpx solid skyblue;
				}
			}
			#tc_change_account,
			#tc_change_password {
				width: 300rpx;
				color: rgba(0,0,0, .6);
				border-bottom: 1rpx solid rgba(0,0,0, .4);
			}
			.tips_edit {
				font-size: 30rpx;
				color: rgba(0,0,0,.3);
				padding: 8rpx 0 0 10rpx;
				cursor: pointer;
				&:hover {
					color: skyblue;
				}
			}
		}
		
	}
	
	.nikename_change_input {
		display: flex;
		font-size: 32rpx;
		#nikename_input {
			width: 300rpx;
			margin-left: 12rpx;
			border-bottom: 1rpx solid rgba(0,0,0, .3);
		}
	}
</style>