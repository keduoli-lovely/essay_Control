import http from '../http/http.js'

export const getuser = (limit) => {
	return http({
		url: `/root/user?limit=${limit}`
	})
}