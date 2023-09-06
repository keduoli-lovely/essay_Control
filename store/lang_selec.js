import { defineStore } from 'pinia'
import { ref } from 'vue'
import { zh } from '@/lang/Zh_Cn.js'
import { en } from '@/lang/english.js'


export const lang_sel = defineStore('lang', () => {
	
	let lang = ref(en)
	let default_lang = ref(1)
	let default_data = uni.getStorageSync('default')
	
	if(default_data) {
		default_lang.value = default_data.lang
	}else {
		uni.setStorageSync('default', {
			lang: 1,
			color: 2
		})
	}
	
	const change_lang = (sta) => {
		switch(sta) {
			case 1:
				lang.value = zh
				break;
			case 2:
				lang.value = en
				break;
			default:
				lang.value = zh
		}
	}
	
	
	return {
		lang,
		default_lang,
		change_lang
	}
})
