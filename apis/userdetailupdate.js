import http from '../http/http.js'

export const changedetail = (index, obj) => {
	return http({
		url: '/root/update/user',
		method: 'POST',
		data: {
			index,
			obj
		}
	})
}