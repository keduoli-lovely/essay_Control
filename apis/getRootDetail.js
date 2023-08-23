import http from '../http/http.js'

export const getroot = () => {
	return http({
		url: '/root'
	})
}

export const gethost = () => {
	return http({
		url: '/root/hot'
	})
}