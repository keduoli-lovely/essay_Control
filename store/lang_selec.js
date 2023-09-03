import { defineStore } from 'pinia'
import { ref } from 'vue'
import { zh } from '@/lang/Zh_Cn.js'
import { en } from '@/lang/english.js'


export const lang_sel = defineStore('lang', () => {
	
	let lang = ref(en)
	
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
		change_lang
	}
})
