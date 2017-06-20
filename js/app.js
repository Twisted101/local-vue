var app = new Vue({
	el: '#app',
	data: {
		collectList: [], //采集服务数据
		homepageType: true, //主页展示
		chooseSzName:'',
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
		addButton:true,
		modifyButton:true,
		appModifyIndex: 88,
		addszNameStar:true,//添加名字 星星是否显示
		addszNameTitle: '', //添加名字 文字提示
		addszNameIcon: false, //添加名字 警告图标
		addszServerIPStar:true,
		addszServerIPTitle: '', //添加 IP 文字提示
		addszServerIPIcon: false, //添加IP 警告图片
		addnServerPortStar:true,
		addnServerPortTitle: '', //添加端口 文字提示
		addnServerPortIcon: false, //添加端口 警告图标
		addnCollectIntervalStar:true,
		addnCollectIntervalTitle: '', //添加采集周期 文字提示
		addnCollectIntervalIcon: false, //添加采集周期  警告图标
		addnCmdIntervalStar:true,
		addnCmdIntervalTitle: '', //添加命令间隔 文字提示
		addnCmdIntervalIcon: false, //添加命令间隔 警告图标
		addszRemarkIcon:false,
		addszRemarkTitle:'',
		modifyszNameStar:true,
		modifyszNameTitle: '', 
		modifyszNameIcon: false, 
		modifyszServerIPStar:true,
		modifyszServerIPTitle: '', 
		modifyszServerIPIcon: false, 
		modifynServerPortStar:true,
		modifynServerPortTitle: '', 
		modifynServerPortIcon: false, 
		modifynCollectIntervalStar:true,
		modifynCollectIntervalTitle: '', 
		modifynCollectIntervalIcon: false, 
		modifynCmdIntervalStar:true,
		modifynCmdIntervalTitle: '', 
		modifynCmdIntervalIcon: false,
		modifyszRemarkTitle:'',
		modifyszRemarkIcon:false
	},
	created: function() {
		$(".undfan-loading").fadeIn();
		this.$http.get('/dataCollect/ModbusTcp/api/collectUnit').then(function(res) {
			$(".undfan-loading").fadeOut();
			this.collectList = res.body; //接受的对象
		}, function(res) {
			$(".undfan-loading").fadeOut();
			toastr.warning('加载文件时发生错误。', res.status + '错误', {
				closeButton: true,
				"showDuration": "300",
				"timeOut": "3000"
			})
		});
	},
	methods: {
		initData: function() {  //每次点击添加采集单元的时候清空里面的数据
			this.addData = {
				"nId": "",
				"szName": "",
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
			for(var i = 0;i<navLis.length;i++){
				navLis[i].classList.remove('libgc');
			}
			navLis[index].classList.add('libgc');
			this.chooseIndex = index;
			this.chooseSzName = this.collectList[index].szName;
			this.chooseNId = this.collectList[index].nId; //获取到点击的nId
			this.homepageType = false;
			this.detailType = true;
			this.$children[1].updateDetail();
		},
		addModalData: function() { //点击添加模态框的确认按钮
			$(".undfan-loading").fadeIn();
			this.$http.post('/dataCollect/ModbusTcp/api/collectUnit', this.addData)
			.then(function(res) {
				$(".undfan-loading").fadeOut();
				this.addData.nId = res.id;
				this.collectList.push(this.addData)
				this.addData = {
					"nId": "",
					"szName": "",
					"szServerIP": "",
					"nServerPort": "",
					"nCollectInterval": "",
					"nCmdInterval": "",
					"szRemark": ""
				}
			}, function(res) {
				$(".undfan-loading").fadeOut();
				toastr.warning('添加文件时发生错误。', res.status + '错误', {
					closeButton: true,
					"showDuration": "300",
					"timeOut": "3000"
				})
			})
		},
		getModifyIndex: function(index) { //点击豆腐块上的编辑
			this.appModifyIndex = index;
			this.modifyData = {
				"nId":this.collectList[this.appModifyIndex].nId,
				"szName": this.collectList[this.appModifyIndex].szName,
				"szServerIP": this.collectList[this.appModifyIndex].szServerIP,
				"nServerPort": this.collectList[this.appModifyIndex].nServerPort,
				"nCollectInterval": this.collectList[this.appModifyIndex].nCollectInterval,
				"nCmdInterval": this.collectList[this.appModifyIndex].nCmdInterval,
				"szRemark": this.collectList[this.appModifyIndex].szRemark
			} //把当前的值展现在模态框里
		},
		modifyModalData: function() { //点击修改模态框的确认修改
			$(".undfan-loading").fadeIn();
			this.$http.put('/dataCollect/ModbusTcp/api/collectUnit',this.modifyData)
			.then(function(res) {
				$(".undfan-loading").fadeOut();
				this.collectList.splice(this.appModifyIndex, 1, this.modifyData);
			}, function(res) {
				$(".undfan-loading").fadeOut();
				toastr.warning('编辑文件时发生错误。', res.status + '错误', {
					closeButton: true,
					"showDuration": "300",
					"timeOut": "3000"
				})
			})
		},
		showDetail: function(index) { //点击左侧采集单元导航栏，切换到具体一项的采集单元列表页
			var navLis = document.getElementsByClassName('navlis');
			for(var i = 0;i<navLis.length;i++){
				navLis[i].classList.remove('libgc');
			}
			navLis[index].classList.add('libgc');
			this.chooseIndex = index;
			this.chooseSzName = this.collectList[index].szName;
			this.chooseNId = this.collectList[index].nId; //获取到点击的nId  将NId传递给表格子组件
			this.homepageType = false;
			this.detailType = true;
			this.$children[1].updateDetail();
		},
		showHomepage: function() {
						var navLis = document.getElementsByClassName('navlis');
			for(var i = 0; i < navLis.length; i++) {
				navLis[i].classList.remove('libgc');
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
			if(this.addData.szName == '') {
				this.addszNameTitle = '该项不能为空';
				this.addszNameIcon = true;
				this.addszNameStar = false;
			} else {
				this.addszNameIcon = false;
				this.addszNameStar = true;
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
			if(this.addData.szServerIP == '') {
				this.addszServerIPTitle = '该项不能为空';
				this.addszServerIPIcon = true;
				this.addszServerIPStar = false;
			} else {
				this.addszServerIPIcon = false;
				this.addszServerIPStar = true;
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
			if(this.addData.nServerPort == '') {
				this.addnServerPortTitle = '该项不能为空';
				this.addnServerPortIcon = true;
				this.addnServerPortStar = false;
			} else {
				this.addnServerPortIcon = false;
				this.addnServerPortStar = true;
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
			if(this.addData.nCollectInterval == '') {
				this.addnCollectIntervalTitle = '该项不能为空';
				this.addnCollectIntervalIcon = true;
				this.addnCollectIntervalStar = false;
			} else {
				this.addnCollectIntervalIcon = false;
				this.addnCollectIntervalStar = true;
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
			if(this.addData.nCmdInterval == '') {
				this.addnCmdIntervalTitle = '该项不能为空';
				this.addnCmdIntervalIcon = true;
				this.addnCmdIntervalStar = false;
			} else {
				this.addnCmdIntervalIcon = false;
				this.addnCmdIntervalStar = true;
			}
		},
		addszRemarkKeyup:function(){
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
			if(this.modifyData.szName == '') {
				this.modifyszNameTitle = '该项不能为空';
				this.modifyszNameIcon = true;
				this.modifyszNameStar = false;
			} else {
				this.modifyszNameIcon = false;
				this.modifyszNameStar = true;
			}
		},
		modifyszServerIPKeyup: function() {
			var pattName = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
			if(!pattName.test(this.modifyData.szServerIP)) {
				this.modifyszServerIPTitle = '请输入正确的IP地址';
				this.modifyszServerIPIcon = true;
				this.modifyszServerIPStar = false;
			} else {
				this.modifyszServerIPIcon = false;
				this.modifyszServerIPStar = true;
			}
		},
		modifyszServerIPBlur: function() {
			if(this.modifyData.szServerIP == '') {
				this.modifyszServerIPTitle = '该项不能为空';
				this.modifyszServerIPIcon = true;
				this.modifyszServerIPStar = false;
			} else {
				this.modifyszServerIPIcon = false;
				this.modifyszServerIPStar = true;
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
			if(this.modifyData.nServerPort == '') {
				this.modifynServerPortTitle = '该项不能为空';
				this.modifynServerPortIcon = true;
				this.modifynServerPortStar = false;
			} else {
				this.modifynServerPortIcon = false;
				this.modifynServerPortStar = true;
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
			if(this.modifyData.nCollectInterval == '') {
				this.modifynCollectIntervalTitle = '该项不能为空';
				this.modifynCollectIntervalIcon = true;
				this.modifynCollectIntervalStar = false;
			} else {
				this.modifynCollectIntervalIcon = false;
				this.modifynCollectIntervalStar = true;
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
			if(this.modifyData.nCmdInterval == '') {
				this.modifynCmdIntervalTitle = '该项不能为空';
				this.modifynCmdIntervalIcon = true;
				this.modifynCmdIntervalStar = false;
			} else {
				this.modifynCmdIntervalIcon = false;
				this.modifynCmdIntervalStar = true;
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
			this.addData.szName == '' ||
			this.addData.szServerIP == '' ||
			this.addData.nServerPort == '' ||
			this.addData.nCollectInterval == '' ||
			this.addData.nCmdInterval == ''
			) {
			this.addButton = true
	} else {
		this.addButton = false
	};
	if(this.modifyszNameIcon == true ||
		this.modifyszServerIPIcon == true ||
		this.modifynServerPortIcon == true ||
		this.modifynCollectIntervalIcon == true ||
		this.modifynCmdIntervalIcon == true ||
		this.modifyszRemarkIcon == true ||
		this.modifyData.szName == '' ||
		this.modifyData.szServerIP == '' ||
		this.modifyData.nServerPort == '' ||
		this.modifyData.nCollectInterval == '' ||
		this.modifyData.nCmdInterval == ''
		){
		this.modifyButton = true
} else {
	this.modifyButton = false
};
}
});