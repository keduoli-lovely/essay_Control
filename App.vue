<script>
	import { lang_sel } from '@/store/lang_selec.js'
	import { changeColor } from '@/store/changeColor_night.js'
	
	export default {
		onLaunch: function() {
			let { change_lang } = lang_sel()
			let { change_color } = changeColor()
			let defaultSetting = uni.getStorageSync('default')
			if(defaultSetting) {
				change_lang(defaultSetting.lang)
				change_color(defaultSetting.color)
			}else {
				change_lang(1)
				uni.setStorageSync('default', {
					lang: 1,
					color: 2
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	* {
		box-sizing: border-box;
	}
	/*每个页面公共css */
	::-webkit-scrollbar
	{
	    width: 0rpx;
	}
	
	uni-app, uni-page, uni-page-wrapper, uni-page-body {
		height: 100%;
	}

</style>
