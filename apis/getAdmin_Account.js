import http from '@/http/http.js'

export const get_Admin_account = () => {
	return http({
		url: '/root/getadmin',
	})
}