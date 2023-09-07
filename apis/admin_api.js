import http from '@/http/http.js'

export const admin_api = (obj) => {
	return http({
		url: '/root/updata',
		method: 'POST',
		data: {
			...obj
		}
	})
}