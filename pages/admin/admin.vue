<template>
	<view class="admin">
		<view class="box1" :class="isshow ? 'atvshow' : '' ">

		</view>
		<view class="box2">
			<view class="tips" @click="showbox1">
				<el-icon>
					<Menu />
				</el-icon>
			</view>
			<view class="title">
				珂朵莉世界第一
			</view>
			<view class="inp">
				<view class="item name_inp">
					<el-icon class="icon">
						<User />
					</el-icon><input placeholder="请输入账号" type="text" v-model="user_name" id="user">
				</view>

				<view class="item pwd_inp">
					<el-icon class="icon">
						<Lock />
					</el-icon>
					<input placeholder="请输入密码" :type="seeshow ? 'text' : 'password'" id="pwd" v-model="user_pwd">
					<view class="show_box" @click="seeshow = !seeshow">
						<el-icon v-if="seeshow">
							<View />
						</el-icon>
						<el-icon v-else>
							<Hide />
						</el-icon>
					</view>
				</view>

				<view class="item cap_inp">
					<el-icon class="icon">
						<CollectionTag />
					</el-icon>
					<input placeholder="请输入验证码" type="text" v-model.number="user_dict" id="dict">

					<view class="dict" title="看不清,换一个" @click="changedict">
						{{ dicttext }}
					</view>
				</view>
			</view>

			<view class="btn" @click="changetex">
				登录
			</view>
		</view>
	</view>

	<view class="bg">

	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		login
	} from '../../apis/login.js'
	import {
		captcha
	} from '../../utils/Captcha.js'
	import {
		createFn
	} from '../../utils/createelection.js'

	// 验证码
	let dicttext = ref('')
	dicttext.value = captcha(5)
	//展示与隐藏
	let isshow = ref(false)
	let seeshow = ref(false)
	// 用户输入
	let user_name = ref('')
	let user_pwd = ref('')
	let user_dict = ref('')
	let sta = ref(false)

	let changetex = async () => {
			if (sta.value) return
			if (user_name.value.length >= 5 && user_name.value.length <= 11 ) {
				if (user_pwd.value.length >= 5 && user_pwd.value.length <= 11) {
					if(user_dict.value == dicttext.value) {
						let obj = {
							admin: user_name.value,
							pwd: user_pwd.value,
						}
						let res = await login(obj)
						if (res.data.code == 2000) {
							uni.setStorageSync('root', res.data.result)
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					}else {
						user_dict.value = ''
						let el = document.querySelector(".cap_inp")
						createspan('验证码错误', el)
						dicttext.value = captcha(5)
					}
				} else {
					// 弹窗提示
					let el = document.querySelector(".pwd_inp")
					createspan('密码的长度为5-11', el)
				}
			} else {
				// 弹窗提示
				let el = document.querySelector(".name_inp")
				createspan('账号的长度为5-11', el)
			}
		}

	let showbox1 = () => {
		isshow.value = !isshow.value
	}

	let changedict = () => {
		dicttext.value = captcha(5)
	}

	let createspan = (font, ele) => {
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
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-image: url(/public/bg.jpg);
		z-index: -1;
	}

	.admin {
		overflow: hidden;
		border-radius: 14rpx;
		display: flex;
		position: absolute;
		top: 50%;
		left: 65%;
		transform: translate(-50%, -50%);
		width: 1400rpx;

		.atvshow {
			transform: translateX(0) !important;
		}

		.box1 {
			transition: all .6s ease;
			transform: translateX(100%);
			flex: 1;
			background-color: rgba(255, 255, 255, .6);
		}

		.box2 {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 100rpx 40rpx;
			flex: 1;
			background-color: #fff;

			.tips {
				cursor: pointer;
				position: absolute;
				top: 25rpx;
				left: 0;
				padding: 5rpx 10rpx;
				background-color: skyblue;
				font-size: 26rpx;
				border-top-right-radius: 4rpx;
				border-bottom-right-radius: 4rpx;
				color: #fff;
			}

			.title {
				font-size: 40rpx;
			}

			.inp {
				.item {
					position: relative;
					margin: 60rpx 0;
					width: 400rpx;
					height: 40rpx;
					border-bottom: 1rpx solid rgba(0, 0, 0, .4);

					input {
						position: absolute;
						padding-left: 60rpx;
						font-size: 24rpx;
						font-weight: 400;
						left: 0;
						bottom: 2rpx;
						width: 100%;
						height: 100%;
						color: rgba(0, 0, 0, .6);
					}

					.icon {
						position: absolute;
						left: 4rpx;
					}

					.show_box {
						cursor: pointer;
						right: 5rpx;
						bottom: -4rpx !important;
					}

					.show_box,
					.icon {
						position: absolute;
						bottom: 5rpx;
						color: rgba(0, 0, 0, .4);
					}

					.dict {
						cursor: pointer;
						position: absolute;
						right: 5rpx;
						bottom: 10rpx;
						font-size: 24rpx;
						background-color: skyblue;
						color: #fff;
						padding: 4rpx 6rpx;
						border-radius: 4rpx;
					}
				}
			}

			.btn {
				cursor: pointer;
				color: #fff;
				margin-top: 20rpx;
				padding: 14rpx 100rpx;
				background-color: skyblue;
				border-radius: 40rpx;

				&:hover {
					background-color: rgba(125, 206, 235, .6);
				}
			}
		}

	}

</style>