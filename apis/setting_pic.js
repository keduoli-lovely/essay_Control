import http from '../http/http.js'

export const setting_pic = (data) => {
	return http({
		method: 'POST',
		url: '/root/upload',
		data,
		headers: { 
			'content-type': 'multipart/form-data' ,
		},
		
	})
}