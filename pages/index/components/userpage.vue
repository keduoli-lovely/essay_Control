<template>
	<view class="select" :class="night ? 'night' : 'daytime'">
		<view @click="createuserstate = true" class="item-sel">新增用户</view>
		<view class="item-sel" @click="changechoose">
			{{ statetext }}
		</view>
		<view @click="allsel" class="item-sel">全选</view>
		<view @click="closesel" class="item-sel">取消全选</view>
		<view @click="dellistuser" class="item-sel">删除所选用户<span v-if="userlistlength > 0 ">(已选择{{ userlistlength }}个用户)</span></view>
		<view @click="update" class="item-sel">刷新</view>
	</view>
	<view class="user">
		<view class="header">
			<!-- // 顶部 -->
			<view class="name">
				昵称
			</view>
			<view class="sex">
				性别
			</view>
			<view class="pic">
				头像
			</view>
			<view class="admin">
				账号
			</view>
			<view class="pwd">
				密码
			</view>
			<view class="time">
				创建时间
			</view>
		</view>
		
		<view class="body">
			<!-- // 数据展示 -->
			<checkbox-group checkbox-group @change="checkboxChange">
				<userList @senduserid="getuserrowid" v-for="(item, i) in userdatalist" :key="i" :userrow="item" />
			</checkbox-group>
		</view>
	</view>
	<tckfloor
		@yes="deluser"
		@no="cancel"
		:account="userrowid"
	 />
	 <createuseritem />
	 <bubble />
</template>

<script setup>
	import bubble from '../../../components/bubble/bubble.vue'
	import userList from '../../../components/userList/userList.vue'
	import tckfloor from '../../../components/tckfloor/tckfloor.vue'
	import createuseritem from '../../../components/createuseritem/createuseritem.vue'
	import { userdata } from '../../../store/Usedata.js'
	import { maskstate } from '../../../store/maskstare.js'
	import { delrowuser } from '../../../apis/delrowuser.js'
	import { storeToRefs } from 'pinia'
	import { ref, computed } from 'vue'
	import { bubble as bubblesta } from '../../../store/bubblesta.js'
	import { changeColor } from '@/store/changeColor_night.js'
	
	
	// 黑夜与白天
	let { night } = storeToRefs(changeColor())
	let { keduoli } = bubblesta()
	// 用户数据列表
	let userrowid = ref('')
	let userlist_id = ref([])
	let { userdatalist } = storeToRefs(userdata())
	let { getuserdata } = userdata()
	let { choose, allchoose, tckstate, createuserstate } = storeToRefs(maskstate())
	let userlistlength = ref(0)
	// 编辑状态
	let statetext = computed(() => {
		if(choose.value) {
			return '取消编辑'
		}else {
			return '编辑'
		}
	})
	let changechoose = () => {
		if(choose.value) {
			userlistlength.value = 0
			allchoose.value = false
		}
		choose.value = !choose.value
	}
	// 全选状态
	let allsel = () => {
		if(!choose.value) return
		let tmp = ref([])
		allchoose.value = true
		userdatalist.value.forEach(item => {
			tmp.value.push(item.Account)
		})
		userlistlength.value = 	tmp.value.length
		// 全部用户id
		userlist_id.value = tmp.value
	}
	// 取消全选
	let closesel = () => {
		if(!choose.value) return
		allchoose.value = false
		userlistlength.value = 0
		userlist_id.value = []
	}
	
	let checkboxChange = (id) => {
		userlistlength.value = id.detail.value.length
		if(id.detail.value.length) {
			userlist_id.value = id.detail.value
		}else {
			userlist_id.value = []
		}
	}
	
	// 批量删除用户
	let dellistuser = async () => {
		if(!choose.value) return
		if(userlist_id.value.length) {
			// api
			let parting = confirm('确认')
			if(!parting) return
			let res = await delrowuser(userlist_id.value)
			keduoli('succeed', res.data.message)
			getuserdata(20)
		}
	}
	
	let deluser = async () => {
		let res = await delrowuser(userrowid.value)
		if(res.data.code === 20000) {
			tckstate.value = false
			keduoli('succeed', res.data.message)
			getuserdata(20)
		}
		
	}
	let cancel = () => {
		tckstate.value = false
	}
	let getuserrowid = (id) => {
		userrowid.value = id
	}
	
	let update = () => {
		getuserdata(20).then(data => {
			keduoli('succeed', data.data.message)
		})
	}
	
</script>

<style lang="scss" scoped>
	.select {
		display: flex;
		margin-bottom: 40rpx;
		.item-sel {
			cursor: pointer;			
			padding: 20rpx 40rpx;
			background-color: var(--user_nav_bg);
			color: var(--user_nav_font);
			margin-right: 30rpx;
			border-radius: 8rpx;
			box-shadow: 1rpx 1rpx 5rpx rgba(0,0,0,.1);
			&:hover {
				background-color: skyblue;
			}
		}
 	}
	.user {
		overflow: hidden;
		border-radius: 6rpx;
		background-color: #fff;
		box-shadow: 4rpx 4rpx 20rpx rgba(0,0,0,.4);
		.header {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			text-align: center;
			background-color: #EEEEEE;
			font-size: 32rpx;
			// margin-bottom: 40rpx;
			border-bottom: 0;
			.name,
			.sex {
				text-align: center;
				width: 240rpx;
				max-width: 300rpx;
			}
			.pic {
				width: 200rpx;
			}
			.admin {
				width: 280rpx;
			}
			.pwd {
				width: 550rpx;
			}
			.time {
				width: 300rpx;
			}
		}
		
	}
	
	::v-deep .list:nth-child(1n) {
		background-color: #E0F7FA;
	}
	::v-deep .list:nth-child(2n) {
		background-color: #E8F5E9;
	}
</style>