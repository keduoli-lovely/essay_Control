import { defineStore } from 'pinia'
import { ref } from 'vue'

export const otherdata = defineStore('other', () => {
	// essay
	let listitem_id = ref('')
	
	// essay page fn
	let page_index = ref(0)
	
	// tips text
	let tipsText = ref('你确定要删除这篇文章吗！！')
	return {
		listitem_id,
		page_index,
		tipsText
	}
})