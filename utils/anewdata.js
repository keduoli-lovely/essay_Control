export const anewdata = (data) => {
	let month_user_num = [0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0]
	let month_essay_num = [0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0]
	
	data.forEach(item => {
		month_user_num[item.index] = item.user,
		month_essay_num[item.index] = item.essay
	})
	
	return {
		month_user_num,
		month_essay_num
	}
}