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
				"collectId": "",
				"nStartReg": "",
				"nFunCode": "",
				"nDeviceAddr": "",
				"szRegDataType": "int",
				"bMerge": "1",
				"fFactor": ""
			},
			modifyLists: {
				"nFunCode": "",
				"fFactor": "",
				"szRegDataType": "int",
				"bMerge": "1"
			},
			"nFunCodeCheck": false,
			"fFactorCheck": false,
			"szRegDataTypeCheck": false,
			"bMergeCheck": false,
			"modifynStartRegStar":true,
			"modifynStartRegIcon":false,
			"modifynStartRegTitle":'',
			"modifynDeviceAddrStar":true,
			"modifynDeviceAddrIcon":false,
			"modifynDeviceAddrTitle":'',
			"modifyfFactorStar":true,
			"modifyfFactorIcon":false,
			"modifyfFactorTitle":'',
			"modifyButton":true,
			"uploadButton":true
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
							field: 'nStartReg',
							title: '寄存器地址'
						},
						{
							field: 'nFunCode',
							title: '寄存器类型',
							formatter: function(value, row, index) {
								switch(value) {
									case '01':
									return '线圈状态';
									break;
									case '02':
									return '输入状态';
									break;
									case '03':
									return '保持寄存器';
									break;
									case '04':
									return '输入寄存器';
									break;
								}
							}
						},
						{
							field: 'nDeviceAddr',
							title: '设备地址'
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
							field: 'bMerge',
							title: '连续读写',
							visible: false,
							formatter: function(value, row, index) {
								if(value == "1") {
									return "是"
								}
								if(value == "0") {
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
					"nFunCode": _element.nFunCode,
					"nDeviceAddr": _element.nDeviceAddr,
					"szRegDataType": _element.szRegDataType,
					"bMerge": _element.bMerge,
					"fFactor": _element.fFactor,
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
					"nFunCode": selectedData[0].nFunCode,
					"nDeviceAddr": selectedData[0].nDeviceAddr,
					"szRegDataType": selectedData[0].szRegDataType,
					"bMerge": selectedData[0].bMerge,
					"fFactor": selectedData[0].fFactor
				}
			} else
			if(selectedData.length > 1) { //选择多项进行编辑
				this.nFunCodeCheck = false;//变量初始化
				this.fFactorCheck = false;//下同
				this.szRegDataTypeCheck = false;
				this.bMergeCheck = false;
				this.modifyLists = {
					"nFunCode": "",
					"fFactor": "",
					"szRegDataType": "int",
					"bMerge": "1"
				}
				$('#modifyTableLists').modal('show');
			} else { //0选择 提示
				$('#myModalError').modal('show');
			};
		},
		modify: function() {
			$(".undfan-loading").fadeIn();
			if($('#table').bootstrapTable('getSelections').length == 0) {
				this.nowIndex = this.dblnowIndex;
			} else {
				this.nowIndex = $('#table').bootstrapTable('getSelections')[0].index;
			}
			this.$http.put('/dataCollect/ModbusTcp/api/modbusTcpVariant', [{
				"deviceVariantId":this.modifyData.deviceVariantId,
				"nStartReg": this.modifyData.nStartReg,
				"nFunCode": this.modifyData.nFunCode,
				"nDeviceAddr": this.modifyData.nDeviceAddr,
				"szRegDataType": this.modifyData.szRegDataType,
				"bMerge": this.modifyData.bMerge,
				"fFactor": this.modifyData.fFactor
			}]).then(function(res) {
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
					"deviceVariantId": selectedDataArray[i].deviceVariantId,
					"nFunCode": this.modifyLists.nFunCode, //功能码
					"szRegDataType": this.modifyLists.szRegDataType, //数据类型
					"bMerge": this.modifyLists.bMerge, //是否连续
					"fFactor": this.modifyLists.fFactor //系数
				}
				if(this.nFunCodeCheck == false) {//如果没有checkbox  就删除对象里的对应属性
					delete aSelectedData.nFunCode;
				}
				if(this.szRegDataTypeCheck == false) {
					delete aSelectedData.szRegDataType;
				}
				if(this.bMergeCheck == false) {
					delete aSelectedData.bMerge;
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
			$('#upload').ajaxForm({
				dataType: 'json',
				success: function(){
					 return false; 
				},
				error: function(){
					 return false; 
				}
			});
		},
		downloadFile:function(){
			window.location.href = '/dataCollect/ModbusTcp/api/exportVariants?collectId='+this.propschoosenid;
		},
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
			if(this.modifyData.nStartReg == '') {
				this.modifynStartRegTitle = '该项不能为空';
				this.modifynStartRegIcon = true;
				this.modifynStartRegStar = false;
			} else {
				this.modifynStartRegIcon = false;
				this.modifynStartRegStar = true;
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
			if(this.modifyData.nDeviceAddr == '') {
				this.modifynDeviceAddrTitle = '该项不能为空';
				this.modifynDeviceAddrIcon = true;
				this.modifynDeviceAddrStar = false;
			} else {
				this.modifynDeviceAddrIcon = false;
				this.modifynDeviceAddrStar = true;
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
			if(this.modifyData.fFactor == '') {
				this.modifyfFactorTitle = '该项不能为空';
				this.modifyfFactorIcon = true;
				this.modifyfFactorStar = false;
			} else {
				this.modifyfFactorIcon = false;
				this.modifyfFactorStar = true;
			}
		}
	},
	beforeUpdate:function(){
		if(this.modifynStartRegIcon == true ||
			this.modifynDeviceAddrIcon == true ||
			this.modifyfFactorIcon == true ||
			this.modifyData.nStartReg == '' ||
			this.modifyData.nDeviceAddr == '' ||
			this.modifyData.fFactor == ''
			) {
			this.modifyButton = true
	} else {
		this.modifyButton = false
	};
}
})