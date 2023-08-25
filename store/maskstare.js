import { ref } from 'vue'
import { defineStore } from 'pinia'

export const maskstate = defineStore('mask', () => {
	let essaytcstate = ref(false)
	let choose = ref(false)
	let allchoose = ref(false)
	let choosearray = ref([])
	let tckstate = ref(false)
	let createuserstate = ref(false)
	
	// essay
	let essay_choice = ref(false)
	let search_pop = ref(false)
	
	return {
		essaytcstate,
		choose,
		allchoose,
		choosearray,
		tckstate,
		createuserstate,
		// essay
		essay_choice,
		search_pop
	}
})