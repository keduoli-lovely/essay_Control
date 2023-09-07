import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const changeColor = defineStore('changecolor', () => {
	let night = ref(false)
	let default_data = uni.getStorageSync('default')
	
	let default_color = computed(() => {
		if(default_data) {
			return default_data.color
		}else {
			uni.setStorageSync('default', {
				lang: 1,
				color: 2
			})
			return 2
		}
	})
	
	
	
	watch(default_color, () => {
		change_color(default_color)
	})
	
	const change_color = (sta) => {
		default_data.color = sta
		switch(sta) {
			case 1:
				night.value = true
				break;
			case 2:
				night.value = false
				break;
			case 3:
				time_change_color()
				 break;
			case 4:
				system_change_color()
				break;
			default:
				default_data.color = 2
				break;
		}
		uni.setStorageSync('default', default_data)
	}
	// 根据时间修改
	const time_change_color = () => {
		let hours = new Date().getHours()
		if(hours >= 7 && hours <= 19) {
			globalFn(false, 2)
		}else {
			globalFn(true, 1)
		}
	}
	// 根据系统修改
	const system_change_color = () => {
		let isdark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		if(isdark) {
			globalFn(true, 1)
		}else {
			globalFn(false, 2)
		}
	}
	
	const globalFn = (bool_data, num) => {
		let default_data = uni.getStorageSync('default')
		if(bool_data) {
			night.value = true
			default_data.color = 1
		}else {
			night.value = false
			default_data.color = 2
		}
		uni.setStorageSync('default', default_data)
	}
	
	return {
		night,
		default_color,
		change_color
	}
})