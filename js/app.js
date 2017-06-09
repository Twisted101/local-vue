var app = new Vue({
	el: '#app',
	data: {
		collectList: [], //采集服务数据
		tableList: [],
		homepageType: true, //主页展示
		detailType: false, //列表页隐藏
		chooseIndex: 0, //点击查看采集单元详情的 index
		chooseNId: '2222', //点击查看采集单元详情的nId
		modifyData: {
			"nId": "",
			"szName": "",
			"szServerIP": "",
			"nServerPort": "",
			"nCollectInterval": "",
			"nCmdInterval": "",
			"szRemark": ""
		},
		addData: {
			"nId": "",
			"szName": "",
			"szServerIP": "",
			"nServerPort": "",
			"nCollectInterval": "",
			"nCmdInterval": "",
			"szRemark": ""
		},
		appModifyIndex: 88,
		addszNameTitle: '', //添加名字 文字提示
		addszNameIcon: false, //添加名字 警告图标
		addszServerIPTitle: '', //添加 IP 文字提示
		addszServerIPIcon: false, //添加IP 警告图片
		addnServerPortTitle: '', //添加端口 文字提示
		addnServerPortIcon: false, //添加端口 警告图标
		addnCollectIntervalTitle: '', //添加采集周期 文字提示
		addnCollectIntervalIcon: false, //添加采集周期  警告图标
		addnCmdIntervalTitle: '', //添加命令间隔 文字提示
		addnCmdIntervalIcon: false, //添加命令间隔 警告图标
		addszRemarkIcon: false, //添加备注 警告图标
	},
	created: function() {
		this.$http.get('data/data1.json').then(function(res) {
			console.log(res)
			this.collectList = res.body.data; //接受的对象
		}, function() {
			alert('请求失败处理'); //失败处理
		});
	},
	methods: {
		getChooseData: function(index) { //点击豆腐块子组件的查看，接受index值，切换到具体一项的采集单元列表页  与下面的showDetail方法 内容一致
			this.chooseIndex = index;
			this.chooseNId = this.collectList[index].nId; //获取到点击的nId
			this.homepageType = false;
			this.detailType = true;
			this.$http.get('./data/data3.json')
				.then(function(res) {
					this.tableList = res.body;
					this.$children[1].updateDetail(); //触发表格子组件的生成列表方法
				}, function(res) {

				})

		},
		addModalData: function() { //点击添加模态框的确认按钮
			this.collectList.push(this.addData)
			this.addData = {
				"nId": "",
				"szName":"",
				"szServerIP": "",
				"nServerPort": "",
				"nCollectInterval": "",
				"nCmdInterval": "",
				"szRemark": ""
			}
		},
		getModifyIndex: function(index) { //点击豆腐块上的编辑
			this.appModifyIndex = index;
			this.modifyData = {
				"szName": this.collectList[this.appModifyIndex].szName,
				"szServerIP": this.collectList[this.appModifyIndex].szServerIP,
				"nServerPort": this.collectList[this.appModifyIndex].nServerPort,
				"nCollectInterval": this.collectList[this.appModifyIndex].nCollectInterval,
				"nCmdInterval": this.collectList[this.appModifyIndex].nCmdInterval,
				"remark": this.collectList[this.appModifyIndex].remark
			} //把当前的值展现在模态框里
		},
		modifyModalData: function() { //点击修改模态框的确认修改
			//			{
			//				"nId": this.collectList[this.appModifyIndex].nId,
			//				"szServerIP": this.collectList[this.appModifyIndex].szServerIP,
			//				"nServerPort": this.collectList[this.appModifyIndex].nServerPort,
			//				"nCollectInterval": this.collectList[this.appModifyIndex].nCollectInterval,
			//				"nCmdInterval": this.collectList[this.appModifyIndex].nCmdInterval,
			//				"remark": this.collectList[this.appModifyIndex].remark
			//			}
			//              ↑↑↑ 发送的数据↑↑↑↑

			this.collectList.splice(this.appModifyIndex, 1, this.modifyData);
		},
		showDetail: function(index) { //点击左侧采集单元导航栏，切换到具体一项的采集单元列表页
			this.chooseIndex = index;
			this.chooseNId = this.collectList[index].nId; //获取到点击的nId  将NId传递给表格子组件
			this.homepageType = false;
			this.detailType = true;
			//						this.$http.post('url', 'this.chooseNId')
			//							.then(function(res) { //回传列表数据
			//			
			//							}, function(res) {
			//								toastr.warning('添加文件时发生错误。', res.status + '错误', {
			//								closeButton: true,
			//								"showDuration": "300",
			//								"timeOut": "3000"
			//								})
			//							});
			//模拟
			this.$http.get('./data/data2.json')
				.then(function(res) {
					this.tableList = res.body;
					this.$children[1].updateDetail(); //触发表格子组件的生成列表方法
				}, function(res) {

				})
		},
		showHomepage: function() {
			this.homepageType = true;
			this.detailType = false;
		},
		addszNameKeyup: function() {
			var pattName = /^.{0,64}$/;
			if(!pattName.test(this.addData.szName)) {
				this.addszNameTitle = '名称不能超过64个字符';
				this.addszNameIcon = true;
			} else {
				this.addszNameIcon = false;
			}
		},
		addszNameBlur: function() {

		}
	}
});