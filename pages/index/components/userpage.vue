<template>
	<view class="select" :class="night ? 'night' : 'daytime'">
		<view @click="createuserstate = true" class="item-sel">{{ lang["USER_NAV_ROW1"] }}</view>
		<view class="item-sel" @click="changechoose">
			{{ statetext }}
		</view>
		<view @click="allsel" class="item-sel">{{ lang["USER_NAV_ROW4"] }}</view>
		<view @click="closesel" class="item-sel">{{ lang["USER_NAV_ROW5"] }}</view>
		<view @click="dellistuser" class="item-sel">{{ lang["USER_NAV_ROW6"] }}<span v-if="userlistlength > 0 ">
			( 
				{{ lang["USER_NAV_SELECT_ROW1"] }}
				{{ userlistlength }}
				{{ lang["USER_NAV_SELECT_ROW2"] }}
			)</span></view>
		<view @click="update" class="item-sel">{{ lang["USER_NAV_ROW7"] }}</view>
	</view>
	<view class="user">
		<view class="header">
			<!-- // 顶部 -->
			<view class="name">
				{{ lang["USER_INFO_NAME"] }}
			</view>
			<view class="sex">
				{{ lang["USER_INFO_SEX"] }}
			</view>
			<view class="pic">
				{{ lang["USER_INFO_PIC"] }}
			</view>
			<view class="admin">
				{{ lang["USER_INFO_ACCOUNT"] }}
			</view>
			<view class="pwd">
				{{ lang["USER_INFO_PWD"] }}
			</view>
			<view class="time">
				{{ lang["USER_INFO_CREATETIME"] }}
			</view>
		</view>
		
		<view class="body" style="overflow: auto;">
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
	import bubble from '@/components/bubble/bubble.vue'
	import userList from '@/components/userList/userList.vue'
	import tckfloor from '@/components/tckfloor/tckfloor.vue'
	import createuseritem from '@/components/createuseritem/createuseritem.vue'
	import { userdata } from '@/store/Usedata.js'
	import { maskstate } from '@/store/maskstare.js'
	import { delrowuser } from '@/apis/delrowuser.js'
	import { storeToRefs } from 'pinia'
	import { ref, computed } from 'vue'
	import { bubble as bubblesta } from '@/store/bubblesta.js'
	import { changeColor } from '@/store/changeColor_night.js'
	import { lang_sel } from '@/store/lang_selec.js'
	
	
	
	// 语言切换
	const { lang } = storeToRefs(lang_sel())
	// 黑夜与白天
	const { night } = storeToRefs(changeColor())
	const { keduoli } = bubblesta()
	// 用户数据列表
	let userrowid = ref('')
	let userlist_id = ref([])
	const { userdatalist } = storeToRefs(userdata())
	const { getuserdata } = userdata()
	const { choose, allchoose, tckstate, createuserstate } = storeToRefs(maskstate())
	let userlistlength = ref(0)
	// 编辑状态
	const statetext = computed(() => {
		if(choose.value) {
			return lang.value["USER_NAV_ROW3"]
		}else {
			return lang.value["USER_NAV_ROW2"]
		}
	})
	const changechoose = () => {
		if(choose.value) {
			userlistlength.value = 0
			allchoose.value = false
		}
		choose.value = !choose.value
	}
	// 全选状态
	const allsel = () => {
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
	const closesel = () => {
		if(!choose.value) return
		allchoose.value = false
		userlistlength.value = 0
		userlist_id.value = []
	}
	
	const checkboxChange = (id) => {
		userlistlength.value = id.detail.value.length
		if(id.detail.value.length) {
			userlist_id.value = id.detail.value
		}else {
			userlist_id.value = []
		}
	}
	
	// 批量删除用户
	const dellistuser = async () => {
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
	
	const deluser = async () => {
		const res = await delrowuser(userrowid.value)
		if(res.data.code === 20000) {
			tckstate.value = false
			keduoli('succeed', res.data.message)
			getuserdata(20)
		}
		
	}
	const cancel = () => {
		tckstate.value = false
	}
	const getuserrowid = (id) => {
		userrowid.value = id
	}
	
	const update = () => {
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
	
	::v-deep .list:nth-child(even) {
		background-color: skyblue;
	}
	::v-deep .list:nth-child(odd) {
		background-color: var(--user_item_row);
	}
</style>