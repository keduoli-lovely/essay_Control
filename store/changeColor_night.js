import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const changeColor = defineStore('changecolor', () => {
	let night = ref(false)
	let default_color = ref(2)
	let default_data = uni.getStorageSync('default')
	
	if(default_data) {
		default_color.value = default_data.color
	}else {
		uni.setStorageSync('default', {
			lang: 1,
			color: 2
		})
	}
	
	watch(default_color, () => {
		change_color(default_color)
	})
	
	const change_color = (sta) => {
		switch(sta) {
			case 1:
				night.value = true
				default_color.value = sta
				break;
			case 2:
				night.value = false
				default_color.value = sta
				break;
			case 3:
				time_change_color()
				 break;
			case 4:
				system_change_color()
				break;
			default:
				default_color.value = 2
				break;
		}
	}
	// 根据时间修改
	const time_change_color = () => {
		
	}
	// 根据系统修改
	const system_change_color = () => {
		
	}
	return {
		night,
		default_color,
		change_color
	}
})