import http from '../http/http.js'

export const pushnewuser = (detail) => {
	return http({
		url: '/root/newuser',
		method: 'POST',
		data: {
			...detail
		}
	})
}