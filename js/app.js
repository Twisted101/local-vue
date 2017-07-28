var app = new Vue({
	el: '#app',
	data: {
		collectList: [], //采集服务数据
		//		tableList: [],
		homepageType: true, //主页展示
		detailType: false, //列表页隐藏
		chooseIndex: 0, //点击查看采集单元详情的 index
		chooseNId: '2222', //点击查看采集单元详情的nId
		chooseSzName: '',
		deleteIndex: 0,
		deleteNId: '233',
		deleteszName: '',
		modifyData: {
			"nId": "",
			"szName": "",
			"nCmdTimeout": "",
			"szServerIP": "",
			"nServerPort": "",
			"nCollectInterval": "",
			"nCmdInterval": "",
			"szRemark": ""
		},
		addData: {
			"nId": "",
			"szName": "",
			"nCmdTimeout": "",
			"szServerIP": "",
			"nServerPort": "",
			"nCollectInterval": "",
			"nCmdInterval": "",
			"szRemark": ""
		},
		addButton: true,
		modifyButton: true,
		appModifyIndex: 88,
		addszNameStar: true, //添加名字 星星是否显示
		addszNameTitle: '', //添加名字 文字提示
		addszNameIcon: false, //添加名字 警告图标
		addszServerIPStar: true,
		addszServerIPTitle: '', //添加 IP 文字提示
		addszServerIPIcon: false, //添加IP 警告图片
		addnServerPortStar: true,
		addnServerPortTitle: '', //添加端口 文字提示
		addnServerPortIcon: false, //添加端口 警告图标
		addnCmdTimeoutStar: true,
		addnCmdTimeoutTitle: '',
		addnCmdTimeoutIcon: false,
		addnCollectIntervalStar: true,
		addnCollectIntervalTitle: '', //添加采集周期 文字提示
		addnCollectIntervalIcon: false, //添加采集周期  警告图标
		addnCmdIntervalStar: true,
		addnCmdIntervalTitle: '',
		addnCmdIntervalIcon: false,
		addszRemarkIcon: false,
		addszRemarkTitle: '',
		modifyszNameStar: true,
		modifyszNameTitle: '',
		modifyszNameIcon: false,
		modifynCmdTimeoutStar: true,
		modifynCmdTimeoutTitle: '',
		modifynCmdTimeoutIcon: false,
		modifyszServerIPStar: true,
		modifyszServerIPTitle: '',
		modifyszServerIPIcon: false,
		modifynServerPortStar: true,
		modifynServerPortTitle: '',
		modifynServerPortIcon: false,
		modifynCollectIntervalStar: true,
		modifynCollectIntervalTitle: '',
		modifynCollectIntervalIcon: false,
		modifynCmdIntervalStar: true,
		modifynCmdIntervalTitle: '',
		modifynCmdIntervalIcon: false,
		modifyszRemarkTitle: '',
		modifyszRemarkIcon: false
	},
	created: function() {
		$(".undfan-loading").fadeIn();
		this.$http.get('data/data1.json').then(function(res) {
			$(".undfan-loading").fadeOut();
			this.collectList = res.body; //接受的对象
		}, function(res) {
			$(".undfan-loading").fadeOut();
			console.log("xixixi")
			toastr.warning('加载文件时发生错误。', res.status + '错误', {
				closeButton: true,
				"showDuration": "300",
				"timeOut": "3000"
			})
		});
	},
	methods: {
		initData: function() {
			this.addData = {
				"nId": "",
				"szName": "",
				"nCmdTimeout": "",
				"szServerIP": "",
				"nServerPort": "",
				"nCollectInterval": "",
				"nCmdInterval": "",
				"szRemark": ""
			};
			this.addButton = true;
		},
		getChooseData: function(index) { //点击豆腐块子组件的查看，接受index值，切换到具体一项的采集单元列表页  与下面的showDetail方法 内容一致
			var navLis = document.getElementsByClassName('navlis');
			for(var i = 0; i < navLis.length; i++) {
				navLis[i].getElementsByTagName('a')[0].classList.remove('libgc');
			}
			navLis[index].getElementsByTagName('a')[0].classList.add('libgc');
			this.chooseIndex = index;
			this.chooseSzName = this.collectList[index].szName;
			this.chooseNId = this.collectList[index].nId; //获取到点击的nId
			this.homepageType = false;
			this.detailType = true;
			this.$children[1].updateDetail();
		},
		addModalData: function() { //点击添加模态框的确认按钮
			this.collectList.push(this.addData)
			this.addData = {
				"nId": "",
				"szName": "",
				"szServerIP": "",
				"nCmdTimeout": "",
				"nServerPort": "",
				"nCollectInterval": "",
				"nCmdInterval": "",
				"szRemark": ""
			}
			$('#myModalAdd').modal('hide')
		},
		getModifyIndex: function(index) { //点击豆腐块上的编辑
			this.appModifyIndex = index;
			this.modifyData = {
				"nId": this.collectList[this.appModifyIndex].nId,
				"szName": this.collectList[this.appModifyIndex].szName,
				"szServerIP": this.collectList[this.appModifyIndex].szServerIP,
				"nCmdTimeout": this.collectList[this.appModifyIndex].nCmdTimeout,
				"nServerPort": this.collectList[this.appModifyIndex].nServerPort,
				"nCollectInterval": this.collectList[this.appModifyIndex].nCollectInterval,
				"nCmdInterval": this.collectList[this.appModifyIndex].nCmdInterval,
				"szRemark": this.collectList[this.appModifyIndex].szRemark
			} //把当前的值展现在模态框里

		},
		modifyModalData: function() { //点击修改模态框的确认修改
			//			{
			//				"nId": this.collectList[this.appModifyIndex].nId,
			//				"szServerIP": this.collectList[this.appModifyIndex].szServerIP,
			//				"nServerPort": this.collectList[this.appModifyIndex].nServerPort,
			//				"nCollectInterval": this.collectList[this.appModifyIndex].nCollectInterval,
			//				"nCmdInterval": this.collectList[this.appModifyIndex].nCmdInterval,
			//				"szReamrk": this.collectList[this.appModifyIndex].szReamrk
			//			}
			//              ↑↑↑ 发送的数据↑↑↑↑
			this.collectList.splice(this.appModifyIndex, 1, this.modifyData);
		},
		getDeleteData: function(index) {
			this.deleteIndex = index;
			this.deleteszName = this.collectList[this.deleteIndex].szName;
		},
		confirmDelete: function() {
			console.log(this.deleteIndex);
			var nIdArray = [];
			nIdArray.push(this.collectList[this.deleteIndex].nId);
			console.log(nIdArray)
			this.collectList.splice(this.deleteIndex, 1)
			$('#deleteModal').modal('hide')
		},
		showDetail: function(index) { //点击左侧采集单元导航栏，切换到具体一项的采集单元列表页
			var navLis = document.getElementsByClassName('navlis');
			for(var i = 0; i < navLis.length; i++) {
				navLis[i].getElementsByTagName('a')[0].classList.remove('libgc');
			}
			navLis[index].getElementsByTagName('a')[0].classList.add('libgc');
			this.chooseIndex = index;
			this.chooseSzName = this.collectList[index].szName;
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
			this.$children[1].updateDetail();
			//			this.$http.get('./data/data2.json')
			//				.then(function(res) {
			//					this.tableList = res.body;
			//					 //触发表格子组件的生成列表方法
			//				}, function(res) {
			//
			//				})
		},
		showHomepage: function() {
			var navLis = document.getElementsByClassName('navlis');
			for(var i = 0; i < navLis.length; i++) {
				navLis[i].getElementsByTagName('a')[0].classList.remove('libgc');
			}
			this.homepageType = true;
			this.detailType = false;
		},
		addszNameKeyup: function() {
			var pattName = /^.{0,64}$/;
			if(!pattName.test(this.addData.szName)) {
				this.addszNameTitle = '名称不能超过64个字符';
				this.addszNameIcon = true;
				this.addszNameStar = false;
			} else {
				this.addszNameIcon = false;
				this.addszNameStar = true;
			}
		},
		addszNameBlur: function() {
						var pattName = /^.{0,64}$/;
			if(!pattName.test(this.addData.szName)) {
				this.addszNameTitle = '名称不能超过64个字符';
				this.addszNameIcon = true;
				this.addszNameStar = false;
			} else {
				this.addszNameIcon = false;
				this.addszNameStar = true;
			}
			if(this.addData.szName == '') {
				this.addszNameTitle = '该项不能为空';
				this.addszNameIcon = true;
				this.addszNameStar = false;
			}
		},
		addszServerIPKeyup: function() {
			var pattName = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
			if(!pattName.test(this.addData.szServerIP)) {
				this.addszServerIPTitle = '请输入正确的IP地址';
				this.addszServerIPIcon = true;
				this.addszServerIPStar = false;
			} else {
				this.addszServerIPIcon = false;
				this.addszServerIPStar = true;
			}
		},
		addszServerIPBlur: function() {
			var pattName = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
			if(!pattName.test(this.addData.szServerIP)) {
				this.addszServerIPTitle = '请输入正确的IP地址';
				this.addszServerIPIcon = true;
				this.addszServerIPStar = false;
			} else {
				this.addszServerIPIcon = false;
				this.addszServerIPStar = true;
			}
			if(this.addData.szServerIP == '') {
				this.addszServerIPTitle = '该项不能为空';
				this.addszServerIPIcon = true;
				this.addszServerIPStar = false;
			}
		},
		addnServerPortKeyup: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.addData.nServerPort)) {
				this.addnServerPortTitle = '请输入非负整数';
				this.addnServerPortIcon = true;
				this.addnServerPortStar = false;
			} else {
				this.addnServerPortIcon = false;
				this.addnServerPortStar = true;
			}
		},
		addnServerPortBlur: function() {
						var pattName = /^\d+$/;
			if(!pattName.test(this.addData.nServerPort)) {
				this.addnServerPortTitle = '请输入非负整数';
				this.addnServerPortIcon = true;
				this.addnServerPortStar = false;
			} else {
				this.addnServerPortIcon = false;
				this.addnServerPortStar = true;
			}
			if(this.addData.nServerPort == '') {
				this.addnServerPortTitle = '该项不能为空';
				this.addnServerPortIcon = true;
				this.addnServerPortStar = false;
			} 
		},
		addnCollectIntervalKeyup: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.addData.nCollectInterval)) {
				this.addnCollectIntervalTitle = '请输入非负整数';
				this.addnCollectIntervalIcon = true;
				this.addnCollectIntervalStar = false;
			} else {
				this.addnCollectIntervalIcon = false;
				this.addnCollectIntervalStar = true;
			}
		},
		addnCollectIntervalBlur: function() {
						var pattName = /^\d+$/;
			if(!pattName.test(this.addData.nCollectInterval)) {
				this.addnCollectIntervalTitle = '请输入非负整数';
				this.addnCollectIntervalIcon = true;
				this.addnCollectIntervalStar = false;
			} else {
				this.addnCollectIntervalIcon = false;
				this.addnCollectIntervalStar = true;
			}
			if(this.addData.nCollectInterval == '') {
				this.addnCollectIntervalTitle = '该项不能为空';
				this.addnCollectIntervalIcon = true;
				this.addnCollectIntervalStar = false;
			} 
		},
		addnCmdTimeoutKeyup: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.addData.nCmdTimeout)) {
				this.addnCmdTimeoutTitle = '请输入非负整数';
				this.addnCmdTimeoutIcon = true;
				this.addnCmdTimeoutStar = false;
			} else {
				this.addnCmdTimeoutIcon = false;
				this.addnCmdTimeoutStar = true;
			}
		},
		addnCmdTimeoutBlur: function() {
						var pattName = /^\d+$/;
			if(!pattName.test(this.addData.nCmdTimeout)) {
				this.addnCmdTimeoutTitle = '请输入非负整数';
				this.addnCmdTimeoutIcon = true;
				this.addnCmdTimeoutStar = false;
			} else {
				this.addnCmdTimeoutIcon = false;
				this.addnCmdTimeoutStar = true;
			}
			if(this.addData.nCmdTimeout == '') {
				this.addnCmdTimeoutTitle = '该项不能为空';
				this.addnCmdTimeoutIcon = true;
				this.addnCmdTimeoutStar = false;
			} 
		},
		addnCmdIntervalKeyup: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.addData.nCmdInterval)) {
				this.addnCmdIntervalTitle = '请输入非负整数';
				this.addnCmdIntervalIcon = true;
				this.addnCmdIntervalStar = false;
			} else {
				this.addnCmdIntervalIcon = false;
				this.addnCmdIntervalStar = true;
			}
		},
		addnCmdIntervalBlur: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.addData.nCmdInterval)) {
				this.addnCmdIntervalTitle = '请输入非负整数';
				this.addnCmdIntervalIcon = true;
				this.addnCmdIntervalStar = false;
			} else {
				this.addnCmdIntervalIcon = false;
				this.addnCmdIntervalStar = true;
			}
			if(this.addData.nCmdInterval == '') {
				this.addnCmdIntervalTitle = '该项不能为空';
				this.addnCmdIntervalIcon = true;
				this.addnCmdIntervalStar = false;
			} 
		},
		addszRemarkKeyup: function() {
			var pattName = /^.{0,255}$/;
			if(!pattName.test(this.addData.szRemark)) {
				this.addszRemarkTitle = '备注信息不能超过255个字符';
				this.addszRemarkIcon = true;
			} else {
				this.addszRemarkIcon = false;
			}
		},
		modifyszNameKeyup: function() {
			var pattName = /^.{0,64}$/;
			if(!pattName.test(this.modifyData.szName)) {
				this.modifyszNameTitle = '名称不能超过64个字符';
				this.modifyszNameIcon = true;
				this.modifyszNameStar = false;
			} else {
				this.modifyszNameIcon = false;
				this.modifyszNameStar = true;
			}
		},
		modifyszNameBlur: function() {
						var pattName = /^.{0,64}$/;
			if(!pattName.test(this.modifyData.szName)) {
				this.modifyszNameTitle = '名称不能超过64个字符';
				this.modifyszNameIcon = true;
				this.modifyszNameStar = false;
			} else {
				this.modifyszNameIcon = false;
				this.modifyszNameStar = true;
			}
			if(this.modifyData.szName == '') {
				this.modifyszNameTitle = '该项不能为空';
				this.modifyszNameIcon = true;
				this.modifyszNameStar = false;
			} 
		},
		modifyszServerIPKeyup: function() {
			var pattName = /^.{0,32}$/;
			if(!pattName.test(this.modifyData.szServerIP)) {
				this.modifyszServerIPTitle = '目标IP不能超过32个字符';
				this.modifyszServerIPIcon = true;
				this.modifyszServerIPStar = false;
			} else {
				this.modifyszServerIPIcon = false;
				this.modifyszServerIPStar = true;
			}
		},
		modifyszServerIPBlur: function() {
			var pattName = /^.{0,32}$/;
			if(!pattName.test(this.modifyData.szServerIP)) {
				this.modifyszServerIPTitle = '目标IP不能超过32个字符';
				this.modifyszServerIPIcon = true;
				this.modifyszServerIPStar = false;
			} else {
				this.modifyszServerIPIcon = false;
				this.modifyszServerIPStar = true;
			}
			if(this.modifyData.szServerIP == '') {
				this.modifyszServerIPTitle = '该项不能为空';
				this.modifyszServerIPIcon = true;
				this.modifyszServerIPStar = false;
			}
		},
		modifynServerPortKeyup: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nServerPort)) {
				this.modifynServerPortTitle = '请输入非负整数';
				this.modifynServerPortIcon = true;
				this.modifynServerPortStar = false;
			} else {
				this.modifynServerPortIcon = false;
				this.modifynServerPortStar = true;
			}
		},
		modifynServerPortBlur: function() {
						var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nServerPort)) {
				this.modifynServerPortTitle = '请输入非负整数';
				this.modifynServerPortIcon = true;
				this.modifynServerPortStar = false;
			} else {
				this.modifynServerPortIcon = false;
				this.modifynServerPortStar = true;
			}
			if(this.modifyData.nServerPort == '') {
				this.modifynServerPortTitle = '该项不能为空';
				this.modifynServerPortIcon = true;
				this.modifynServerPortStar = false;
			} 
		},
		modifynCollectIntervalKeyup: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nCollectInterval)) {
				this.modifynCollectIntervalTitle = '请输入非负整数';
				this.modifynCollectIntervalIcon = true;
				this.modifynCollectIntervalStar = false;
			} else {
				this.modifynCollectIntervalIcon = false;
				this.modifynCollectIntervalStar = true;
			}
		},
		modifynCollectIntervalBlur: function() {
						var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nCollectInterval)) {
				this.modifynCollectIntervalTitle = '请输入非负整数';
				this.modifynCollectIntervalIcon = true;
				this.modifynCollectIntervalStar = false;
			} else {
				this.modifynCollectIntervalIcon = false;
				this.modifynCollectIntervalStar = true;
			}
			if(this.modifyData.nCollectInterval == '') {
				this.modifynCollectIntervalTitle = '该项不能为空';
				this.modifynCollectIntervalIcon = true;
				this.modifynCollectIntervalStar = false;
			} 
		},
		modifynCmdIntervalKeyup: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nCmdInterval)) {
				this.modifynCmdIntervalTitle = '请输入非负整数';
				this.modifynCmdIntervalIcon = true;
				this.modifynCmdIntervalStar = false;
			} else {
				this.modifynCmdIntervalIcon = false;
				this.modifynCmdIntervalStar = true;
			}
		},
		modifynCmdIntervalBlur: function() {
						var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nCmdInterval)) {
				this.modifynCmdIntervalTitle = '请输入非负整数';
				this.modifynCmdIntervalIcon = true;
				this.modifynCmdIntervalStar = false;
			} else {
				this.modifynCmdIntervalIcon = false;
				this.modifynCmdIntervalStar = true;
			}
			if(this.modifyData.nCmdInterval == '') {
				this.modifynCmdIntervalTitle = '该项不能为空';
				this.modifynCmdIntervalIcon = true;
				this.modifynCmdIntervalStar = false;
			}
		},
		modifynCmdTimeoutKeyup: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nCmdTimeout)) {
				this.modifynCmdTimeoutTitle = '请输入非负整数';
				this.modifynCmdTimeoutIcon = true;
				this.modifynCmdTimeoutStar = false;
			} else {
				this.modifynCmdTimeoutIcon = false;
				this.modifynCmdTimeoutStar = true;
			}
		},
		modifynCmdTimeoutBlur: function() {
						var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nCmdTimeout)) {
				this.modifynCmdTimeoutTitle = '请输入非负整数';
				this.modifynCmdTimeoutIcon = true;
				this.modifynCmdTimeoutStar = false;
			} else {
				this.modifynCmdTimeoutIcon = false;
				this.modifynCmdTimeoutStar = true;
			}
			if(this.modifyData.nCmdTimeout == '') {
				this.modifynCmdTimeoutTitle = '该项不能为空';
				this.modifynCmdTimeoutIcon = true;
				this.modifynCmdTimeoutStar = false;
			}
		},
		modifyszRemarkKeyup: function() {
			var pattName = /^.{0,255}$/;
			if(!pattName.test(this.modifyData.szRemark)) {
				this.modifyszRemarkTitle = '备注信息不能超过255个字符';
				this.modifyszRemarkIcon = true;
			} else {
				this.modifyszRemarkIcon = false;
			}
		}
	},
	beforeUpdate: function() {
		if(this.addszNameIcon == true ||
			this.addszServerIPIcon == true ||
			this.addnServerPortIcon == true ||
			this.addnCollectIntervalIcon == true ||
			this.addnCmdIntervalIcon == true ||
			this.addszRemarkIcon == true ||
			this.addData.szName === '' ||
			this.addData.szServerIP === '' ||
			this.addData.nServerPort === '' ||
			this.addData.nCollectInterval === '' ||
			this.addData.nCmdInterval === ''
		) {
			this.addButton = true
		} else {
			this.addButton = false
		};
		if(this.modifyszNameIcon === true ||
			this.modifyszServerIPIcon === true ||
			this.modifynServerPortIcon === true ||
			this.modifynCollectIntervalIcon === true ||
			this.modifynCmdIntervalIcon === true ||
			this.modifyszRemarkIcon === true ||
			this.modifyData.szName === '' ||
			this.modifyData.szServerIP === '' ||
			this.modifyData.nServerPort === '' ||
			this.modifyData.nCollectInterval === '' ||
			this.modifyData.nCmdInterval === ''
		) {
			this.modifyButton = true
		} else {
			this.modifyButton = false
		};
	}
});