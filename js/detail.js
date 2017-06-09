Vue.component('detail', {
	props: ['propscollectlist', 'propschooseindex', 'propstablelist'],
	template: '#detail',
	data: function() {
		return {
			tableList: [],
			modifyData: {
				"collectId": "",
				"nDeviceId": "",
				"szVarCode": "",
				"nStartReg": "",
				"nRegCount": "",
				"nFunCode": "",
				"nDeviceAddr": "",
				"szRegDataType": "int",
				"bMergeBOOL": "1",
				"bIsBlockEndBOOL": "1",
				"fFactor": ""
			}
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
						data: that.propstablelist, //获取数据s（*）
						toolbar: '#toolbar', //工具按钮用哪个容器
						striped: true, //是否显示行间隔色
						cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						pagination: true, //是否显示分页（*）
						sortable: true, //是否启用排序
						sortOrder: "asc", //排序方式
						queryParams: oTableInit.queryParams, //传递参数（*）
						sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
						pageNumber: 1, //初始化加载第一页，默认第一页
						pageSize: 10, //每页的记录行数（*）
						pageList: [5, 25, 50, 100], //可供选择的每页的行数（*）
						strictSearch: true,
						showColumns: true, //是否显示所有的列
						showRefresh: false, //是否显示刷新按钮
						minimumCountColumns: 2, //最少允许的列数
						clickToSelect: true, //是否启用点击选中行
						uniqueId: "collectId", //每一行的唯一标识，一般为主键列
						showExport: true, //是否显示导出按钮  
						fileName: '导出表格数据', //导出文件
						buttonsAlign: "right", //按钮位置  
						exportTypes: ['excel'], //导出文件类型  
						Icons: 'glyphicon-export',
						columns: [{
								checkbox: true
							},
							{
								field: 'nDeviceId',
								title: '设备名称'
							},
							{
								field: 'szVarCode',
								title: '变量编码'
							},
							{
								field: 'nStartReg',
								title: '起始寄存器'
							},
							{
								field: 'nFunCode',
								title: '功能码'
							},
							{
								field: 'nDeviceAddr',
								title: '设备地址'
							},
							{
								field: 'fFactor',
								title: '系数'
							},
							{
								field: 'szRegDataType',
								title: '数据类型'
							},
							{
								field: 'bMergeBOOL',
								title: '是否连续'
							},
							{
								field: 'bIsBlockEndBOOL',
								title: '是否块尾'
							}
						]

					});
				};
				//得到查询的参数
				oTableInit.queryParams = function(params) {
					var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
						limit: params.limit, //页面大小
						offset: params.offset, //页码
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
		},
		showModal: function() { //点击编辑  将要编辑的数据展示在模态框里
			var selectedData = $('#table').bootstrapTable('getSelections'); //获取选中数据的数组  一项就进行编辑 多项或0项就提示选择
			if(selectedData.length == 1) {
				$('#modifyTableList').modal('show');
				this.modifyData = {
					"nDeviceId": selectedData[0].nDeviceId,
					"szVarCode": selectedData[0].szVarCode,
					"nStartReg": selectedData[0].nStartReg,
					"nRegCount": selectedData[0].nRegCount,
					"nFunCode": selectedData[0].nFunCode,
					"nDeviceAddr": selectedData[0].nDeviceAddr,
					"szRegDataType": selectedData[0].szRegDataType,
					"bMergeBOOL": selectedData[0].bMergeBOOL,
					"bIsBlockEndBOOL": selectedData[0].bIsBlockEndBOOL,
					"fFactor": selectedData[0].fFactor
				}
			} else {
				$('#myModalError').modal('show');
			};
		},
		modify: function() {
			var nowIndex = $('#table').bootstrapTable('getSelections')[0].index;
			var that = this;
			console.log(this.modifyData.nDeviceId)
			//						this.$http.put('url', {
			//							"nDeviceId": that.modifyData.nDeviceId,
			//							"szVarCode": that.modifyData.szVarCode,
			//							"nStartReg": that.modifyData.nStartReg,
			//							"nRegCount": that.modifyData.nRegCount,
			//							"nFunCode": that.modifyData.nFunCode,
			//							"nDeviceAddr": that.modifyData.nDeviceAddr,
			//							"szRegDataType": that.modifyData.szRegDataType,
			//							"bMergeBOOL": that.modifyData.bMergeBOOL,
			//							"bIsBlockEndBOOL": that.modifyData.bIsBlockEndBOOL,
			//						}).then(function(res) {
			//							$('#table').bootstrapTable('updateRow', {
			//								index: nowIndex,
			//								row: that.modifyData
			//							});
			//						}, function(res) {
			//							toastr.warning('修改文件时发生错误。', res.status + '错误', {
			//								closeButton: true,
			//								"showDuration": "300",
			//								"timeOut": "3000"
			//							});
			//						})
			$('#table').bootstrapTable('updateRow', {
				index: nowIndex,
				row: that.modifyData
			});
		}
	},
	updated: function() {
		function initFileInput(ctrlName, uploadUrl) {
			var control = $('#' + ctrlName);
			control.fileinput({
				language: 'zh', //设置语言 中文
				uploadUrl: uploadUrl, //上传的地址
				allowedFileExtensions: ['xls', 'xlsx', 'xlsm', 'csv', 'xlt', 'xltx', 'xltm'], //接收的文件后缀
				uploadAsync: true, //默认异步上传
				showUpload: true, //是否显示上传按钮
				showRemove: true, //是否显示移除按钮
				showCaption: true, //是否显示标题
				showPreview: true, //是否显示预览
				dropZoneEnabled: false, //是否显示拖拽区域
				browseClass: "btn btn-default", //按钮样式
				maxFileCount: 1, //表示允许同时上传的最大文件个数
				previewFileIcon: ""
			});
		}
		initFileInput("input-1a", "1/1/1");
		$('#input-1a').on("fileerror", function(event, data,msg) {
			//请求失败
			console.log('xuxuxu')
		}).on("fileuploaded", function(event, data, previewId, index) {
			//请求成功
		});
		$('.file-caption-name').text('请上传excel表格文件').css('color', '#999');
	}
})