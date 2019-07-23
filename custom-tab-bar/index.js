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
					normal: '/resources/icon/outline_shopping_cart_black_48dp.png',
					active: '/resources/icon/baseline_shopping_cart_black_48dp.png'
				},
				url: '/pages/index/index'
			},
			{
				icon: {
					normal: '/resources/icon/outline_person_black_48dp.png',
					active: '/resources/icon/baseline_person_black_48dp.png'
				},
				url: '/pages/index/index'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
