<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
