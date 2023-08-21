import { ref } from 'vue'
import { defineStore } from 'pinia'

export const bubble = defineStore('bubble', () => {
	let bubblesta = ref('珂朵莉')
	let classsta = ref('succeed')
	let tc = ref(false)
	
	const keduoli = (sta, text) => {
		bubblesta.value = text
		classsta.value = sta
		tc.value = true
		let timer = setTimeout(() => {
			tc.value = false
			clearTimeout(timer)
		}, 3000)
	}
	
	
	return {
		bubblesta,
		classsta,
		tc,
		keduoli
	}
})

