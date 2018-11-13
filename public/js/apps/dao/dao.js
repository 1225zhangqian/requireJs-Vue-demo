/**
 *
 * @authors qianzhang6 (you@example.org)
 * @date    2018-03-06 15:55:39
 * @version $Id$
 */
require.config(requireConfig);
define(function(require, exports, module) { 
    var axios = require('axios'); 
    module.exports = { 
        /*获取人员列表*/
        getRylist: function(params) { 
            var url = CONTEXTPATH + '/public/mock/studentInfo.json';
            var query = new URLSearchParams();
            $.map(params, function (value, key) { 
                        query.append(key,value);
                    })
            return axios.post(url,query); 
        },
        /*获取当前状态字典*/
        getDqztDic: function(params) {
            var url = CONTEXTPATH + '/public/mock/dqzt.json';
            var query = new URLSearchParams();
            $.map(params, function (value, key) { 
                        query.append(key,value);
                    })
            return axios.post(url,query); 
        },
        /*获取人员细类字典*/
        getSelectInputDic: function(params) {
            var url = CONTEXTPATH + '/public/mock/selectInput.json';
            var query = new URLSearchParams();
            $.map(params, function (value, key) { 
                        query.append(key,value);
                    })
            return axios.post(url,query); 
        },
        /*获取地市区划字典*/
        getSelectTreeDic: function(params) {
            var url = CONTEXTPATH + '/public/mock/tree.json';
            var query = new URLSearchParams();
            $.map(params, function (value, key) { 
                        query.append(key,value);
                    })

            return axios.post(url,query); 
        }  
    };
});
