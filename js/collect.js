//主页豆腐块的组件
Vue.component('homepage', {
	props: ['items'],
	template: '#homepage',
	data: function() {
		return {
			chooseIndex: 0, //查看的采集单元的index
			detailIndex: 0, //删除的采集单元的index
			modifyIndex: 0 //修改的采集单元的index
		}
	},
	methods: {
		initData:function(){
			this.$emit('init-data');
		},
		checkDetail: function(index) { //点击豆腐块上的查看 获取查看的index,并传递给父组件app
			this.$emit('get-choose-data', index);
			this.$parent.$children[1].updateDetail();
		},
		showModifyModal: function(index) { //点击豆腐块上的修改，获取修改的index,并传递给父组件app
			this.$emit('get-modify-data', index);
		},
		deleteItem: function(index) { //删除一项豆腐块
			this.detailIndex = index;
			var nIdArray=[];
			nIdArray.push(this.items[this.detailIndex].nId);
			this.$http.delete('/dataCollect/ModbusTcp/api/collectUnit', {body:nIdArray})
			.then(function(res) {
				this.items.splice(this.detailIndex, 1)
			}, function(res) {
				var error = res.body.errCode;
				if(error == (-6)) {
					toastr.warning('该采集单元已被使用，无法删除。', '警告', {
						closeButton: true,
						"showDuration": "300",
						"timeOut": "3000"
					});
				} else {
					toastr.warning('删除文件时发生错误。', res.status + '错误', {
						closeButton: true,
						"showDuration": "300",
						"timeOut": "3000"
					})
				}
			})
		}
	}
})