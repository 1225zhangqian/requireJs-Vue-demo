/**
 *	资源目录管理页面
 * @authors nnliu3 (you@example.org)
 * @date    2017-01-06 15:55:39
 * @version $Id$
 */
require.config(requireConfig);
require(['jquery', 'bootstrap', 'dao', 'vue','comCompnents','utils'],function($, bootstrap, dao,  Vue, comCompnents, utils) {

	/**
	 * 渲染vm
	 */	
	new Vue({
	    el: '#rylistpage',
	   	data: {
	   		query:{
	   			name:'',
	   			sfz:'',
	   			gxsj: '',
	   			ryxl:''
	   		},
	   		ryListData:[],  
	    },
	    watch:{  
	    },
	    methods: { 
			getBaseInfo: function(){ 
				//初始化人员列表
				dao.getRylist(this.query).then(res =>{
		  			this.ryListData=res.data.result.data;
		  		}) 
			},
			search: function(){ 
				this.query.gxsj = $('#demo7').val(); 
				this.query.ryxl = $(':input[name="ryxl"]').val(); 
				console.log(this.query)
				this.getBaseInfo (this.query);
			},
			empty: function(){
				$('.select-input').selectPageClear();
				$(':input[name="ryxl"]').val('')
				$('#demo7').val(''); 
				this.query = {};
				console.log(this.query)
			}
	    }, 
	    computed: {  
		},
	    components: {
		    // <my-component> 将只在父组件模板中可用 
		},
	  	mounted: function () {
	  		$('.zdSelectInput').zdSelectInput();
		  	this.$nextTick(function () { 
		    
		  }) 
		  this.getBaseInfo ();

		},
		created: function () { 
		}
	})  
	 
})