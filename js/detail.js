Vue.component('detail', {
	props: ['propscollectlist', 'propschoosenid', 'propsszname'],
	template: '#detail',
	data: function() {
		return {
			tableList: [],
			nowIndex: 0,
			fileName:'选择文件上传',
			dblnowIndex: 0,
			modifyData: {
				"deviceVariantName": "",
				"deviceVariantId": "",
				"nStartReg": "",
				"nRegType": "",
				"nDeviceAddr": "",
				"szRegDataType": "int",
				"bMergeRead": "",
				"bMergeWrite": "",
				"fFactor": ""
			},
			modifyLists: {
				"nDeviceAddr": "",
				"deviceVariantId": '',
				"nRegType": "",
				"fFactor": "",
				"szRegDataType": "int",
				"bMergeRead": "1",
				"bMergeWrite": "1"
			},
			"hideB": true,
			"hidebools": true,
			"fFactorDisabled": false,
			"fFactorsDisabled": false,
			"nDeviceAddrCheck": false,
			"nRegTypeCheck": false,
			"fFactorCheck": false,
			"szRegDataTypeCheck": false,
			"bMergeReadCheck": false,
			"bMergeWriteCheck": false,			
			"modifynStartRegStar":true,
			"modifynStartRegIcon":false,
			"modifynStartRegTitle":'',
			"modifynDeviceAddrStar":true,
			"modifynDeviceAddrIcon":false,
			"modifynDeviceAddrTitle":'',
			"modifyfFactorStar":true,
			"modifyfFactorIcon":false,
			"modifyfFactorTitle":'',
			"modifynDeviceAddrsStar": true,
			"modifynDeviceAddrsIcon": false,
			"modifynDeviceAddrsTitle": '',
			"modifyfFactorsStar": true,
			"modifyfFactorsIcon": false,
			"modifyfFactorsTitle": '',
			"modifyButton":true,
			"uploadButton":true,
			"szRegDataTypeDisabled": false,
			"szRegDataTypesDisabled":false,
			"szRegDataTypeCheckDisabled":false,
			"fFactorCheckDisabled":false,
			"modifyListsButton":false
		}
	},
	methods: {
		updateDetail: function() { //在父组件里调用此方法 接受表格数据并生成表格
			var that = this;
			$(function() {
				//1.初始化Table
				var oTable = new TableInit();
				oTable.Init();
				//2.初始化Button的点击事件
				var oButtonInit = new ButtonInit();
				oButtonInit.Init();
			});
			var TableInit = function() {
				var oTableInit = new Object();
				//初始化Table
				oTableInit.Init = function() {
					$('#table').bootstrapTable('destroy');
					$('#table').bootstrapTable({
						method: 'post',
						contentType: "application/x-www-form-urlencoded", 
						url: "/dataCollect/ModbusTcp/api/modbusTcpVariant", //要请求数据的文件路径
						toolbar: '#toolbar', //工具按钮用哪个容器
						striped: true, //是否显示行间隔色
						cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						pagination: true, //是否显示分页（*）
						sortable: true, //是否启用排序
						sortOrder: "asc", //排序方式
						queryParams: oTableInit.queryParams, //传递参数（*）
						sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
						pageNumber: 1, //初始化加载第一页，默认第一页
						pageSize: 20, //每页的记录行数（*）
						pageList: [10,20,30,40,50,100,150,200], //可供选择的每页的行数（*）
						strictSearch: true,
						showColumns: true, //是否显示所有的列
						showRefresh: false, //是否显示刷新按钮
						showToggle:true,
						minimumCountColumns: 2, //最少允许的列数
						clickToSelect: false, //是否启用点击选中行
						uniqueId: "deviceVariantId", //每一行的唯一标识，一般为主键列
						showExport: false, //是否显示导出按钮  
						fileName: '导出表格数据', //导出文件
						buttonsAlign: "right", //按钮位置  
						exportTypes: ['excel'], //导出文件类型  
						Icons: 'glyphicon-export',
						columns: [{
							checkbox: true
						},
						{
							field: 'deviceVariantId',
							visible: false
						},
						{
							field: 'deviceVariantName',
							title: '设备名称',
						},
						{
							field: 'nDeviceAddr',
							title: '设备地址'
						},
						{
							field: 'nStartReg',
							title: '寄存器地址'
						},
						{
							field: 'nRegType',
							title: '寄存器类型',
							formatter: function(value, row, index) {
								if(value == 1) {
									return "线圈状态"
								}
								if(value == 2) {
									return "输入状态"
								}
								if(value == 3) {
									return "保持寄存器"
								}
								if(value == 4) {
									return "输入寄存器"
								}
							}
						},
						{
							field: 'szRegDataType',
							title: '数据类型',
							formatter: function(value, row, index) {
								switch(value) {
									case 'int16':
									return '16位整型';
									break;
									case 'uint16':
									return '16位无符号整型';
									break;
									case 'int32':
									return '32位整型';
									break;
									case 'uint32':
									return '32位无符号整型';
									break;
									case 'int64':
									return '64位整型';
									break;
									case 'uint64':
									return '64位无符号整型';
									break;
									case 'float':
									return '单精度浮点型';
									break;
									case 'double':
									return '双精度浮点型';
									break;
									case 'bool':
									return '布尔类型';
									break;
								}
							}
						},
						{
							field: 'fFactor',
							title: '系数因子'
						},
						{
							field: 'bMergeRead',
							title: '连续读取',
							visible: false,
							formatter: function(value, row, index) {
								if(value == 1) {
									return "是"
								}
								if(value == 0) {
									return "否"
								}
							}
						},
						{
							field: 'bMergeWrite',
							title: '连续写入',
							visible: false,
							formatter: function(value, row, index) {
								if(value == 1) {
									return "是"
								}
								if(value == 0) {
									return "否"
								}
							}
						}
						],
						onDblClickRow: function(_element, _event) {
							that.dblnowIndex  = $('#table').find(_event[0]).data('index');
							//获取到双击的index
							dblclickTable(_element, _event);
						},
					});
				};
				//得到查询的参数
				oTableInit.queryParams = function(params) {
					var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
						limit: params.limit, //页面大小
						offset: params.offset, //页码
						nId:that.propschoosenid,//nId是采集单元的ID
						departmentname: $("#txt_search_departmentname").val(),
						statu: $("#txt_search_statu").val()
					};
					return temp;
				};
				return oTableInit;
			};
			var ButtonInit = function() {
				var oInit = new Object();
				var postdata = {};
				oInit.Init = function() {
					//初始化页面上面的按钮事件
				};
				return oInit;
			};
			function dblclickTable(_element, _event) {
				$('#modifyTableList').modal('show');
				that.modifyData = {
					"deviceVariantId": _element.deviceVariantId,
					"deviceVariantName": _element.deviceVariantName,
					"collectId": _element.collectId,
					"nStartReg": _element.nStartReg,
					"nRegType": _element.nRegType,
					"nDeviceAddr": _element.nDeviceAddr,
					"szRegDataType": _element.szRegDataType,
					"bMergeRead": _element.bMergeRead,
					"bMergeWrite": _element.bMergeWrite,
					"fFactor": _element.fFactor,
				}
				if(that.modifyData.nRegType == '3' || that.modifyData.nRegType == '4') {
					that.hideB = false;
				}
			}
		},
		showModal: function() { //点击编辑  将要编辑的数据展示在模态框里
			var selectedData = $('#table').bootstrapTable('getSelections'); //获取选中数据的数组  一项就进行编辑 多项或0项就提示选择
			if(selectedData.length == 1) { //选择一项进行编辑
				$('#modifyTableList').modal('show');
				this.modifyData = {
					"deviceVariantId": selectedData[0].deviceVariantId,
					"deviceVariantName": selectedData[0].deviceVariantName,
					"nStartReg": selectedData[0].nStartReg,
					"nRegType": selectedData[0].nRegType,
					"nDeviceAddr": selectedData[0].nDeviceAddr,
					"szRegDataType": selectedData[0].szRegDataType,
					"bMergeRead": selectedData[0].bMergeRead,
					"bMergeWrite": selectedData[0].bMergeWrite,
					"fFactor": selectedData[0].fFactor
				}
				if(this.modifyData.nRegType == '3' || this.modifyData.nRegType == '4') {
					this.hideB = false;
				}
			} else
			if(selectedData.length > 1) { //选择多项进行编辑
				this.nDeviceAddrCheck = false;
				this.nRegTypeCheck = false;//变量初始化
				this.fFactorCheck = false;//下同
				this.szRegDataTypeCheck = false;
				this.bMergeCheck = false;
				this.modifyLists = {
					"nDeviceAddr": "",
					"nRegType": "",
					"fFactor": "",
					"szRegDataType": "int",
					"bMergeRead": "1",
					"bMergeWrite": "1"
				}
				$('#modifyTableLists').modal('show');
			} else { //0选择 提示
				$('#myModalError').modal('show');
			};
		},
		changenRegType: function() { //单项编辑模态框，改变寄存器类型 如果选择线圈 数据类型就为bool  并且不能选择其他项
			if(this.modifyData.nRegType == '1') {
				this.modifyData.fFactor = '1';
				this.fFactorDisabled = true;
			};
			if(this.modifyData.nRegType == '2' || this.modifyData.nRegType == '3' || this.modifyData.nRegType == '4') {
				this.fFactorDisabled = false;
			}
			if(this.modifyData.nRegType == '1' || this.modifyData.nRegType == '2') {
				this.modifyData.szRegDataType = 'bool';
				this.szRegDataTypeDisabled = true;
				this.hideB = true;
				$('#J_szRegDataType').css('background-color', '#ebebe4');
			}
			if(this.modifyData.nRegType == '3' || this.modifyData.nRegType == '4') {
				console.log('x')
				this.hideB = false;
				this.szRegDataTypeDisabled = false;

				$('#J_szRegDataType').css('background-color', '#fff')
			}
		},
		changenRegTypes: function() { //多项编辑模态框，改变寄存器类型 如果选择线圈 数据类型就为bool  并且不能选择其他项
			//如果选1或者2，数据类型下拉框选中并且定死  数据类型checkbox选中并且定死
			if(this.modifyLists.nRegType == '1'&& this.nRegTypeCheck == true) {
				this.modifyLists.fFactor = '1';
				this.fFactorsDisabled = true;
				this.fFactorCheck = true;
				this.fFactorCheckDisabled = true;
			}else{
				this.fFactorsDisabled = false;
				this.fFactorCheckDisabled = false;
				this.fFactorCheck = false;
			}
			if((this.modifyLists.nRegType == '1' || this.modifyLists.nRegType == '2') && this.nRegTypeCheck == true) {
				this.modifyLists.szRegDataType = 'bool';
				this.szRegDataTypesDisabled = true;
				this.szRegDataTypeCheck = true;
				this.szRegDataTypeCheckDisabled = true;
				$('#J_szRegDataTypes').css('background-color', '#ebebe4');
			}
			if(this.nRegTypeCheck == false) {
				this.szRegDataTypeCheck = false;
				this.szRegDataTypesDisabled = false;
				this.szRegDataTypeCheckDisabled = false;
				$('#J_szRegDataTypes').css('background-color', '#fff')
			}
			if(this.modifyLists.nRegType == '3' || this.modifyLists.nRegType == '4') {
				this.modifyLists.szRegDataType = 'int16';
				this.hidebools = false;
				this.szRegDataTypeCheck = false;
				this.szRegDataTypesDisabled = false;
				this.szRegDataTypeCheckDisabled = false;
				$('#J_szRegDataTypes').css('background-color', '#fff')
			}
		},
		modify: function() {
			$(".undfan-loading").fadeIn();
			if($('#table').bootstrapTable('getSelections').length == 0) {
				this.nowIndex = this.dblnowIndex;
			} else {
				this.nowIndex = $('#table').bootstrapTable('getSelections')[0].index;
			}
			this.$http.put('/dataCollect/ModbusTcp/api/modbusTcpVariant', [this.modifyData])
			.then(function(res) {
				$(".undfan-loading").fadeOut();
				$('#table').bootstrapTable('refresh');
			}, function(res) {
				$(".undfan-loading").fadeOut();
				toastr.warning('编辑文件时发生错误。', res.status + '错误', {
					closeButton: true,
					"showDuration": "300",
					"timeOut": "3000"
				})
			})
		},
		modifyList: function() {
			var modifyArray = []; //所有数据合集的list
			var aSelectedData; //一行的数据 
			var selectedDataArray = $('#table').bootstrapTable('getSelections');
			for(var i = 0; i < selectedDataArray.length; i++) {
				aSelectedData = {
					"nDeviceAddr": this.modifyLists.nDeviceAddr,
					"deviceVariantId": selectedDataArray[i].deviceVariantId,
					"nRegType": this.modifyLists.nRegType, //功能码
					"szRegDataType": this.modifyLists.szRegDataType, //数据类型
					"bMergeRead": this.modifyLists.bMergeRead, //是否连续
					"bMergeWrite": this.modifyLists.bMergeWrite, //是否连续
					"fFactor": this.modifyLists.fFactor //系数
				}
				if(this.nDeviceAddrCheck == false) {
					delete aSelectedData.nDeviceAddr;
				}
				if(this.nRegTypeCheck == false) {//如果没有checkbox  就删除对象里的对应属性
					delete aSelectedData.nRegType;
				}
				if(this.szRegDataTypeCheck == false) {
					delete aSelectedData.szRegDataType;
				}
				if(this.bMergeReadCheck == false) {
					delete aSelectedData.bMergeRead;
				}
				if(this.bMergeWriteCheck == false) {
					delete aSelectedData.bMergeWrite;
				}
				if(this.fFactorCheck == false) {
					delete aSelectedData.fFactor;
				}
				modifyArray.push(aSelectedData);
			}
			$(".undfan-loading").fadeIn();
			this.$http.put('/dataCollect/ModbusTcp/api/modbusTcpVariant', modifyArray)
			.then(function(res) {
				$(".undfan-loading").fadeOut();
				$('#table').bootstrapTable('refresh');
			}, function(res) {
				$(".undfan-loading").fadeOut();
				toastr.warning('编辑文件时发生错误。', res.status + '错误', {
					closeButton: true,
					"showDuration": "300",
					"timeOut": "3000"
				})
			})
		},
		chooseFile:function(){
			$('#chooseFileUpload').click();
		},
		changeFile:function(){
			var valueName = $('#chooseFileUpload').val().split("\\")[$('#chooseFileUpload').val().split("\\").length-1]//获取到文件名
			if(!valueName==""){
				this.fileName = valueName;
				this.uploadButton = false;
			}else{
				this.fileName = "选择文件上传";
				this.uploadButton = true;
			}
		},
		uploadFile: function() {
			$(".undfan-loading").fadeIn();
			var that = this;
			$('#upload').ajaxForm({
				// dataType: 'json',
				success: function() {
					$(".undfan-loading").fadeOut();
					$("#table").bootstrapTable('refreshOptions', {
						url: "/dataCollect/ModbusTcp/api/modbusTcpVariant",
						pageNumber: 1,
						pageSize: 20,
					});
					toastr.success('文件上传成功',{
						closeButton: true,
						"showDuration": "300",
						"timeOut": "3000"
					})
					that.fileName = "选择文件上传";
					that.uploadButton = true;
					return false;
				},
				error: function(res) {
					$(".undfan-loading").fadeOut();
					
					if(undefined == JSON.parse(res.responseText).errMsg || "" == JSON.parse(res.responseText).errMsg)
					{
						JSON.parse(res.responseText).errMsg = "上传文件出错";
					}
					toastr.warning(JSON.parse(res.responseText).errMsg, '错误', {
						closeButton: true,
						"showDuration": "300",
						"timeOut": "3000"
					});
					return false;
				}
			});
		},
		downloadFile:function(){
			window.location.href = '/dataCollect/ModbusTcp/api/exportVariants?collectId='+this.propschoosenid;
		},
		"nStartReg": "",
		modifynStartRegKeyup: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nStartReg)) {
				this.modifynStartRegTitle = '请输入非负整数';
				this.modifynStartRegIcon = true;
				this.modifynStartRegStar = false;
			} else {
				this.modifynStartRegIcon = false;
				this.modifynStartRegStar = true;
			}
		},
		modifynStartRegBlur: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nStartReg)) {
				this.modifynStartRegTitle = '请输入非负整数';
				this.modifynStartRegIcon = true;
				this.modifynStartRegStar = false;
			} else {
				this.modifynStartRegIcon = false;
				this.modifynStartRegStar = true;
			}
			if(this.modifyData.nStartReg == '') {
				this.modifynStartRegTitle = '该项不能为空';
				this.modifynStartRegIcon = true;
				this.modifynStartRegStar = false;
			}
		},
		modifynDeviceAddrKeyup: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nDeviceAddr)) {
				this.modifynDeviceAddrTitle = '请输入非负整数';
				this.modifynDeviceAddrIcon = true;
				this.modifynDeviceAddrStar = false;
			} else {
				this.modifynDeviceAddrIcon = false;
				this.modifynDeviceAddrStar = true;
			}
		},
		modifynDeviceAddrBlur: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.modifyData.nDeviceAddr)) {
				this.modifynDeviceAddrTitle = '请输入非负整数';
				this.modifynDeviceAddrIcon = true;
				this.modifynDeviceAddrStar = false;
			} else {
				this.modifynDeviceAddrIcon = false;
				this.modifynDeviceAddrStar = true;
			}
			if(this.modifyData.nDeviceAddr == '') {
				this.modifynDeviceAddrTitle = '该项不能为空';
				this.modifynDeviceAddrIcon = true;
				this.modifynDeviceAddrStar = false;
			}
		},
		modifyfFactorKeyup: function() {
			var pattName = /^(-?\d+)(\.\d+)?$/;
			if(!pattName.test(this.modifyData.fFactor)) {
				this.modifyfFactorTitle = '请输入浮点数';
				this.modifyfFactorIcon = true;
				this.modifyfFactorStar = false;
			} else {
				this.modifyfFactorIcon = false;
				this.modifyfFactorStar = true;
			}
		},
		modifyfFactorBlur: function() {
			var pattName = /^(-?\d+)(\.\d+)?$/;
			if(!pattName.test(this.modifyData.fFactor)) {
				this.modifyfFactorTitle = '请输入浮点数';
				this.modifyfFactorIcon = true;
				this.modifyfFactorStar = false;
			} else {
				this.modifyfFactorIcon = false;
				this.modifyfFactorStar = true;
			}
			if(this.modifyData.fFactor == '') {
				this.modifyfFactorTitle = '该项不能为空';
				this.modifyfFactorIcon = true;
				this.modifyfFactorStar = false;
			}
		},
		checkmodifynDeviceAddrs: function() {
			if(this.nDeviceAddrCheck == true) {
				var pattName = /^\d+$/;
				if(!pattName.test(this.modifyLists.nDeviceAddr)) {
					this.modifynDeviceAddrsTitle = '请输入非负整数';
					this.modifynDeviceAddrsIcon = true;
					this.modifynDeviceAddrsStar = false;
				} else {
					this.modifynDeviceAddrsIcon = false;
					this.modifynDeviceAddrsStar = true;
				}
				if(this.modifyLists.nDeviceAddr == '') {
					this.modifynDeviceAddrsTitle = '该项不能为空';
					this.modifynDeviceAddrsIcon = true;
					this.modifynDeviceAddrsStar = false;
				}
			} else {
				this.modifynDeviceAddrsIcon = false;
				this.modifynDeviceAddrsStar = true;
			}
		},
		modifynDeviceAddrsKeyup: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.modifyLists.nDeviceAddr) && this.nDeviceAddrCheck == true) {
				this.modifynDeviceAddrsTitle = '请输入非负整数';
				this.modifynDeviceAddrsIcon = true;
				this.modifynDeviceAddrsStar = false;
			} else {
				this.modifynDeviceAddrsIcon = false;
				this.modifynDeviceAddrsStar = true;
			}
		},
		modifynDeviceAddrsBlur: function() {
			var pattName = /^\d+$/;
			if(!pattName.test(this.modifyLists.nDeviceAddr) && this.nDeviceAddrCheck == true) {
				this.modifynDeviceAddrsTitle = '请输入非负整数';
				this.modifynDeviceAddrsIcon = true;
				this.modifynDeviceAddrsStar = false;
			} else {
				this.modifynDeviceAddrsIcon = false;
				this.modifynDeviceAddrsStar = true;
			}
			if(this.modifyLists.nDeviceAddr == '' && this.nDeviceAddrCheck == true) {
				this.modifynDeviceAddrsTitle = '该项不能为空';
				this.modifynDeviceAddrsIcon = true;
				this.modifynDeviceAddrsStar = false;
			}
		},
		checkmodifyfFactors: function() {
			if(this.fFactorCheck == true) {
				var pattName = /^(-?\d+)(\.\d+)?$/;
				if(!pattName.test(this.modifyLists.nDeviceAddr)) {
					this.modifyfFactorsTitle = '请输入非负整数';
					this.modifyfFactorsIcon = true;
					this.modifyfFactorsStar = false;
					this.modifyListsButton = true;
				} else {
					this.modifyfFactorsIcon = false;
					this.modifyfFactorsStar = true;
				}
				if(this.modifyLists.nDeviceAddr == '') {
					this.modifyfFactorsTitle = '该项不能为空';
					this.modifyfFactorsIcon = true;
					this.modifyfFactorsStar = false;
					this.modifyListsButton = true;
				}
			} else {
				this.modifyfFactorsIcon = false;
				this.modifyfFactorsStar = true;
			}
		},
		modifyfFactorsKeyup: function() {
			var pattName = /^(-?\d+)(\.\d+)?$/;
			if(!pattName.test(this.modifyLists.fFactor)) {
				this.modifyfFactorsTitle = '请输入浮点数';
				this.modifyfFactorsIcon = true;
				this.modifyfFactorsStar = false;
			} else {
				this.modifyfFactorsIcon = false;
				this.modifyfFactorsStar = true;
			}
		},
		modifyfFactorsBlur: function() {
			var pattName = /^(-?\d+)(\.\d+)?$/;
			if(!pattName.test(this.modifyLists.fFactor)) {
				this.modifyfFactorsTitle = '请输入浮点数';
				this.modifyfFactorsIcon = true;
				this.modifyfFactorsStar = false;
			} else {
				this.modifyfFactorsIcon = false;
				this.modifyfFactorsStar = true;
			}
			if(this.modifyLists.fFactor == '') {
				this.modifyfFactorsTitle = '该项不能为空';
				this.modifyfFactorsIcon = true;
				this.modifyfFactorsStar = false;
			}
		}
	},
	beforeUpdate: function() {
		if(this.modifynStartRegIcon == true ||
			this.modifynDeviceAddrIcon == true ||
			this.modifyfFactorIcon == true ||
			this.modifyData.nStartReg === '' ||
			this.modifyData.nDeviceAddr === '' ||
			this.modifyData.fFactor === ''
		) {
			this.modifyButton = true
		} else {
			this.modifyButton = false
		};
		if(this.modifynDeviceAddrsIcon == true || this.modifyfFactorsIcon == true) {
			this.modifyListsButton = true;
		} else {
			this.modifyListsButton = false;
		}
	}
})