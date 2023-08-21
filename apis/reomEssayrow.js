import http from '../http/http.js'

export const removeessay = (id) => {
	return http({
		url: '/root/remove',
		method: 'POST',
		data: {
			id
		}
	})
}