import axios from 'axios'

const http = axios.create({
	baseURL: 'http://127.0.0.1:3000',
	timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = uni.getStorageSync('root')
    	if(token.token) {
    		config.headers.token = token.token
    	}
      return config;
    }, function (error) {
      // 对请求错误做些什么
	 
      return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
	if(error.response.status == 401) {
		uni.removeStorageSync('root')
		uni.reLaunch({
			url: '/pages/admin/admin'
		})
	}
    return Promise.reject(error);
  });
  
  export default http