/**
 *
 * @authors qianzhang6 
 * @date    2018-02-05
 */
require.config(requireConfig);
define(function(require, exports, module) {
	var $ = require('jquery'),
		zTree = require('zTree'),
		selectpage = require('selectpage'),
        dao = require('dao'),
		Vue = require('vue');
    

    //注册全局方法，统一请求字典
    $.fn.zdRadio = function() {
        this.each(function(){
            var zdObj = $(this);
            var zdlb = zdObj.attr("zdlb");
            dao.getDqztDic({zdlb:zdlb}).then(res =>{
                //radio组件
                Vue.component('zq-radio', { 
                    template: `<span ><label class="radio-wrapper" v-for="item in vdata">
                                    <span class="radio ">
                                      <input type="radio" name="radio-input" class="radio-input" value="{{item.value}}">
                                      <span class="radio-inner"></span>
                                    </span>
                                    <span> {{item.text}}</span>
                                </label></span>`,
                    data: function () {
                        return { vdata: res.data}
                    }
                }) 
             
            }) 
        })
    }
    $.fn.zdSelectInput = function() {
        this.each(function(){
            var zdObj = $(this);
            var zdlb = zdObj.attr("zdlb");

            dao.getSelectInputDic({zdlb:zdlb}).then(res =>{
                //zdSelectInput组件
                zdObj.selectPage({
                showField: 'desc', //showField：设置下拉列表中显示文本的列
                keyField: 'id', //keyField：设置下拉列表项目中项目的KEY值，用于提交表单
                data: res.data,//data：数据源，可以是JSON数据格式，也可以是URL 

            }) 
             
            }) 
        })
    }
$(function() {
    //页面初始化
    $('.zdRadio').zdRadio();
});
	//zTree组件
	Vue.component('zq-ztree', {
	  // todo-item 组件现在接受一个
	  // "prop"，类似于一个自定义特性。
	  // 这个 prop 名为 todo。
	  props: ['vdata'],
	  template: `<div class="ant-select-tree">
				    <input type="text" class="form-control ant-select-tree-input" readonly="readonly" 
				        placeholder="Please select">
				    <div class="ant-select-tree-dropdown hidden">
				        <input type="text" class="form-control input-sm" placeholder="请输入名称">
				        <ul id="tree2" class="ztree"></ul>
				    </div>
				</div>`
	}) 

    var ztreeInputName="";
    var ztreeInputCode="";
    var ztreeId="";
    var ztreeSearchId="";
    // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
    var setting1 = {
        async: {
            enable: true,
            type: "post",
            url: CONTEXTPATH+'/public/mock/tree.json',
            otherParam: {'searchKey':""}
        },
        check: {
            enable: false,
            chkStyle: "checkbox",
            chkboxType: { "Y": "", "N": "" }
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId",
                rootPId: 0
            }
        },
        view: {
            showIcon:false,
            dblClickExpand: false,
            fontCss: getFontCss1
        },
        callback: {
            onClick: onClick1,
            onCheck: onCheck2
        }
    };

    function getFontCss1(treeId, treeNode) {
        return treeNode.highlight ? {color:"#1890ff"} : {color:"#495060"};
    }

    function onClick1(e, treeId, treeNode) {
        //console.info(treeId+","+treeNode.id + ", " + treeNode.name);      
        //console.info(ztreeInputName+"||"+ztreeInputCode+"||"+ztreeId+"||"+ztreeSearchId);
        
        var ztreeInputCode = $("#"+treeId).parent().parent().find("[type='hidden']").attr("id");
        var ztreeInputName = $("#"+treeId).parent().parent().find("[type='text']").attr("id");
        
        $("#"+ztreeInputName).val(treeNode.name);
        $("#"+ztreeInputCode).val(treeNode.id);

        // 隐藏 dropdown
        $("#"+treeId).closest('.ant-select-tree-dropdown').addClass("hidden");
        
        
    }
    
    
    function onCheck2(e, treeId, treeNode) {
        // zTree 的语法取 selectedNode
        var zTree = $.fn.zTree.getZTreeObj(ztreeId);
        nodes = zTree.getCheckedNodes();

        id = "";
        name = "";
/*        nodes.sort(function compare(a, b) {
            return a.id - b.id;
        });*/
        for (var i in nodes) {
            if(nodes[i].id!=null&&nodes[i].id!=undefined&&nodes[i].id!=""){
                id += nodes[i].id + ",";
            }
            if(nodes[i].name!=null&&nodes[i].name!=undefined&&nodes[i].name!=""){
                name += nodes[i].name + ",";
            }
            
            
        }
        if (id.length > 0) id = id.substring(0, id.length - 1);
        if (name.length > 0) name = name.substring(0, name.length - 1);

        $("#"+ztreeInputName).val(name);
        $("#"+ztreeInputCode).val(id);

        // 隐藏 dropdown
        // $("#tree2").closest('.ant-select-tree-dropdown').addClass("hidden");
    }
    
 

    function searchNode1() {
        setting1.async.otherParam={'searchKey':$("#"+ztreeSearchId).val()};
        $.fn.zTree.init($("#"+ztreeId), setting1);
        
        //console.info("重新渲染节点");

      
    }



});