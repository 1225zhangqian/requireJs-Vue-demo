/**
 *
 * @authors qianzhang6 
 * @date    2018-02-05
 */
require.config(requireConfig);
define(function(require, exports, module) {
	var $ = require('jquery');
	var utils = { 
		//ajax请求封装
		ajax: {
			/**
			 * post请求
			 * @param  {[string]} url      [请求接口地址]
			 * @param  {[object]} data     [请求参数]
			 * @param  {[function]} handler  [处理句柄]
			 * @param  {[string]} dataType [交互数据类型]
			 * @param  {[string]} async  [同步异步]
			 * @return {[Deferd]}          [Deferd对象]
			 */
			ajaxPost: function(url, data, handler, dataType, async) {
				var dtd = $.Deferred(),
					data;
				$.ajax({
					url: url,
					data: data || {},
					type: 'POST',
					cache: false,
					async: async || true,
					dataType: dataType || 'json'
				}).done(function(data) {
					data = handler ? handler(data) : data;
					dtd.resolve(data);
				}).fail(function() {
					dtd.reject(data);
				});
				return dtd.promise();
			},

			/**
			 * get请求
			 * @param  {[string]} url      [请求接口地址]
			 * @param  {[object]} data     [请求参数]
			 * @param  {[function]} handler  [处理句柄]
			 * @param  {[string]} dataType [交互数据类型]
			 * @param  {[string]} async  [同步异步]
			 * @return {[Deferd]}          [Deferd对象]
			 */
			ajaxGet: function(url, data, handler, dataType, async) {
				var dtd = $.Deferred(),
					data;
				$.ajax({
					url: url,
					data: data || {},
					type: 'GET',
					cache: false,
					async: async || true,
					dataType: dataType || 'json'
				}).done(function(data) {
					data = handler ? handler(data) : data;
					dtd.resolve(data);
				}).fail(function() {
					dtd.reject(data);
				});
				return dtd.promise();
			}
		},
		/**
		 * [format 时间格式化]
		 * @param {[type]} fmt [时间格式]
		 * @return {[String]} [格式化后的日期]
		 */
		dateFormate: function(date, format) {
			date = new Date(date);
			var map = {
				"M": date.getMonth() + 1, //月份 
				"d": date.getDate(), //日 
				"h": date.getHours(), //小时 
				"m": date.getMinutes(), //分 
				"s": date.getSeconds(), //秒 
				"q": Math.floor((date.getMonth() + 3) / 3), //季度 
				"S": date.getMilliseconds() //毫秒 
			};
			format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
				var v = map[t];
				if (v !== undefined) {
					if (all.length > 1) {
						v = '0' + v;
						v = v.substr(v.length - 2);
					}
					return v;
				} else if (t === 'y') {
					return (date.getFullYear() + '').substr(4 - all.length);
				}
				return all;
			});
			return format;
		},
		/**
		 * 获取url参数值
		 * @param  {[type]} name [description]
		 * @return {[type]}      [description]
		 */
		getUrlParam: function(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'), //构造一个含有目标参数的正则表达式对象
				r = window.location.search.substr(1).match(reg); //匹配目标参数
			if (r != null) {
				return decodeURIComponent(r[2]);
			}
			return null;
		},
	};
	/**
	 * [format 时间格式化]
	 * @param {[type]} fmt [时间格式]
	 * @return {[String]} [格式化后的日期]
	 */
	Date.prototype.format = function(fmt) {
		var o = {
			'M+': this.getMonth() + 1, //月份 
			'd+': this.getDate(), //日 
			'h+': this.getHours(), //小时 
			'm+': this.getMinutes(), //分 
			's+': this.getSeconds(), //秒 
			'q+': Math.floor((this.getMonth() + 3) / 3), //季度 
			'S': this.getMilliseconds()
				//毫秒 
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '')
				.substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k])
					.substr(('' + o[k]).length)));
			}
		}
		return fmt;
	};
	/** TO DO
	 * 注册ajax全局complete事件，对于session失效，直接跳转到登陆页面
	 */
	$(document).ajaxComplete(function(event, XMLHttpRequest, options) {
		var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
		if (sessionstatus === 'false') {
			window.location = CONTEXTPATH + '/user/loginout.do';
		}
	});
	//下拉展开
	$(document).on('click','#showCollapse',function(){
		var $this = $(this);
		if ($('#collapse').hasClass('hidden')) {
          $('#collapse').removeClass('hidden');
          $this.html('Collapse <i class="anticon icon-up"></i>');
      	} else {
          $('#collapse').addClass('hidden');
          $this.html('Collapse <i class="anticon icon-down"></i>');
      	}
	})
	module.exports = utils;
});