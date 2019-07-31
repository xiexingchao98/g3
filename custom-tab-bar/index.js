Component({
	data: {
		active: 0,
		list: [
			{
				icon: {
					normal: '/resources/icon/outline_home_black_48dp.png',
					active: '/resources/icon/baseline_home_black_48dp.png'
				},
				url: '/pages/index/index'
			},
			{
				icon: {
					normal: '/resources/icon/outline_dashboard_black_48dp.png',
					active: '/resources/icon/baseline_dashboard_black_48dp.png'
				},
				url: '/pages/classification/classification'
			},			
			{
				icon: {
					normal: '/resources/icon/outline_shopping_cart_black_48dp.png',
					active: '/resources/icon/baseline_shopping_cart_black_48dp.png'
				},
				url: '/pages/cart/cart'
			},
			{
				icon: {
					normal: '/resources/icon/outline_person_black_48dp.png',
					active: '/resources/icon/baseline_person_black_48dp.png'
				},
				url: '/pages/my/my'
			}
		]
	},

	methods: {
		onChange(event) {
			wx.switchTab({
				url: this.data.list[event.detail].url
			})
		}
	}
});
