<template>
	<view class="create" :class="createuserstate ? 'atv' : ''">
		<view class="close" @click="createuserstate = false">
			<el-icon ><CloseBold /></el-icon>
		</view>
		<view class="pic">
			<view class="img">
				<image src="/public/bg.jpg" mode="aspectFill">
				</image>
				<view class="change">
					<el-icon class="picicon"><Edit /></el-icon>
				</view>
			</view>
			
		</view>
		<view class="name item createname">
			昵称 <input type="text" placeholder="昵称" v-model="name" />
		</view>
		<view class="account item createacc">
			账号 <input class="" type="text" placeholder="account" v-model="acc" />
		</view>
		<view class="pwd item createpwd">
			密码 <input type="password" placeholder="password" v-model="pwd" />
		</view>
		<view class="sex item">
			性别 <select name="sex" id="sex" v-model="sex">
				<option value="1">男</option>
				<option value="2">女</option>
				<option value="3">其他</option>
			</select>
		</view>
		<view class="age item createage">
			年龄 <input type="text" id="age" v-model="age">
		</view>
		
		<view class="btn">
			<view class="yes" @click="createuser">
				创建
			</view>
			<view class="no" @click="createuserstate = false">
				取消
			</view>
		</view>
	</view>
	
	<page_BG v-if="createuserstate" />
</template>

<script setup>
	import page_BG from '../page_BG/page_BG.vue'
	import { maskstate } from '../../store/maskstare.js'
	import { storeToRefs } from 'pinia'
	import { ref, onMounted } from 'vue'
	import { createFn } from '../../utils/createelection.js'
	import { pushnewuser } from '../../apis/pushnewuserdata.js'
	import { bubble } from '../../store/bubblesta.js'
	import { userdata } from '../../store/Usedata.js'
	
	// 获取用户数据 / 创建用户后重新获取用户数据
	let { getuserdata } = userdata()
	// 弹窗
	let { keduoli } = bubble()
	// 遮罩状态
	let { createuserstate } = storeToRefs(maskstate())
	let name = ref('')
	let acc = ref('')
	let pwd = ref('')
	let sex = ref(2)
	let age = ref('')
	let sta = ref(false)
	let createuser
	
	onMounted(() => {
		createuser = async () => {
			if(sta.value) return
			if(name.value.length >= 2 && name.value.length <= 8) {
				if(acc.value.length >= 6 && acc.value.length <= 11) {
					if(pwd.value.length >= 6 && pwd.value.length <= 15) {
						if(sex.value > 0) {
							if(age.value > 0 && age.value < 200) {
								let res = await pushnewuser({
									name: name.value,
									account: acc.value,
									password: pwd.value,
									sex: sex.value,
									age: age.value
								})
								if(res.data.code == 20020) {
									keduoli('succeed', res.data.message)
									getuserdata(20)
									createuserstate.value = false
									name.value = ''
									acc.value = ''
									pwd.value = ''
									sex.value = 2
									age.value = ''
								}else {
									keduoli('fail', res.data.message)
								}
							}else {
								let el = document.querySelector('.createage')
								showtextfn('年龄超出范围', el)
							}
						}
					}else {
						let el = document.querySelector('.createpwd')
						showtextfn('密码长度为6-15', el)
					}
				}else {
					let el = document.querySelector('.createacc')
					showtextfn('账号长度为6-11', el)
				}
			}else {
				let el = document.querySelector('.createname')
				showtextfn('昵称的字数为2-8', el)
			}
		}
	})
	
	let showtextfn = (font, ele) => {
		sta.value = true
		let span = createFn(font)
		ele.appendChild(span)
		ele.childNodes[2].className = 'atv-create'
		let timer = setTimeout(() => {
			document.querySelector('.keduoli').remove()
			ele.childNodes[2].classList.remove('atv-create')
			clearTimeout(timer)
			sta.value = false
		}, 3000)
	}
	

</script>

<style lang="scss" scoped>
	.atv {
		position: relative;
		opacity: 1 !important;
		top: 50% !important;
		z-index: 99 !important;
	}
	.create {
		z-index: -1;
		opacity: 0;
		transition: all .4s ease;
		position: fixed;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 6rpx;
		padding: 40rpx;
		box-shadow: 2rpx 2rpx 10rpx rgba(0,0,0,.2);
		.close {
			position: absolute;
			top: 15rpx;
			right: 20rpx;
			font-size: 38rpx;
			cursor: pointer;
			&:hover {
				color: skyblue;
			}
		}
		.pic {
			padding: 20rpx 0;
			display: flex;
			justify-content: center;
			width: 100%;
			height: 100%;
			.img {
				overflow: hidden;
				position: relative;
				width: 180rpx;
				height: 180rpx;
				border-radius: 20rpx;
				image {
					width: 100%;
					height: 100%;
				}
				&:hover .change {
					opacity: 1;
				}
				.change {
					transition: all .3s ease;
					opacity: 0;
					display: flex;
					justify-content: center;
					position: absolute;
					bottom: 0;
					width: 250rpx;
					height: 150rpx;
					transform: rotate(-42deg) translate(-20rpx, 60rpx);
					background-color: rgba(0,0,0,.4);
					.picicon {
						position: relative;
						top: 28rpx;
						font-size: 40rpx;
						color: #fff;
						transform: rotate(42deg);
					}
				}
			}
		}
		.atv-create {
			border-bottom: 1rpx solid red !important;
		}
		.item {
			position: relative;
			font-size: 24rpx;
			color: #000;
			display: flex;
			padding: 20rpx 160rpx;
			input,
			#sex {
				color: #000;
				font-size: 24rpx;
				margin-left: 20rpx;
				padding-bottom: 4rpx;
				border-bottom: 1rpx solid rgba(0,0,0,.8);
			}
			#sex {
				width: 140rpx;
				border-radius: 6rpx;
				color: #000;
				outline: none;
				border: 2rpx solid #000;
			}
			&:first-child {
				padding-top: 50rpx;
			}
			&:last-child {
				padding-bottom: 80rpx;
			}
		}
		.btn {
			padding: 30rpx 0 40rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 28rpx;
			.yes {
				&:hover {
					color: skyblue;
				}
				cursor: pointer;
				margin-right: 100rpx;
			}
			.no:hover {
				cursor: pointer;
				color: skyblue;
			}
		}
	}

</style>