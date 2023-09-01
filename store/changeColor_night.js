import { defineStore } from 'pinia'
import { ref } from 'vue'

export const changeColor = defineStore('changecolor', () => {
	let night = ref(false)
	
	return {
		night
	}
})