import http from '../http/http.js'

export const delrowuser = (id) => {
	return http({
		url: '/root/del',
		method: 'POST',
		data: {
			id
		}
	})
}