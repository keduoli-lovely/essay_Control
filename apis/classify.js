import http from '../http/http.js'

export const changeessaysta = (index, id) => {
	return http({
		url: '/root/update/essay',
		method: 'POST',
		data: {
			index,
			id
		}
	})
}