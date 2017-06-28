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
		showDeleteModal: function(index) { //删除一项豆腐块
			this.$emit('get-delete-data', index);
		}
	}
})