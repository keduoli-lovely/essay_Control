import http from '../http/http.js'

export const getessay = (p) => {
	return http({
		url: `/root/essay?limit=${p}`
	})
}