import { ref } from 'vue'
import { defineStore } from 'pinia'

export const maskstate = defineStore('mask', () => {
	let essaytcstate = ref(false)
	let choose = ref(false)
	let allchoose = ref(false)
	let choosearray = ref([])
	let tckstate = ref(false)
	let createuserstate = ref(false)
	
	return {
		essaytcstate,
		choose,
		allchoose,
		choosearray,
		tckstate,
		createuserstate
	}
})