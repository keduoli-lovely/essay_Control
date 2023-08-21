import { defineStore } from 'pinia'
import { ref } from 'vue'
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
	
	return {
		userdatalist,
		essaydata,
		rowuserdata,
		getuserdata,
		getessaydata
	}
})