import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getessay } from '../apis/getessay.js'
import { getuser } from '../apis/getuser.js'

export const userdata = defineStore('data', () => {
	let userdatalist = ref({})
	let essaydata = ref({})
	
	
	let rowuserdata = ref({})
	
	const getuserdata = async (limit) => {
		// todo
		let res = await getuser(limit)
		userdatalist.value = res.data.result.data
		return res
	}
	
	const getessaydata = async (limit) => {
		let res = await getessay(limit)
		essaydata.value = res.data.result
	}
	
	let essaylength = computed(() => {
		let arr = ref(Object.keys(essaydata.value))
		return arr.value.length
	})
	
	let userlength = computed(() => {
		return userdatalist.value.length
	})
	
	return {
		userdatalist,
		essaydata,
		rowuserdata,
		getuserdata,
		getessaydata,
		essaylength,
		userlength
	}
})