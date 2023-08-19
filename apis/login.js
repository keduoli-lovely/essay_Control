import http from '../http/http.js'


export const login = (data) => {
	return http({
		url: '/root',
		method: 'POST',
		data
	})
}