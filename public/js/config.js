var CONTEXTPATH = 'http://localhost:8008';
var requireConfig = {

    baseUrl: CONTEXTPATH + "/public/js/",

    paths: {
        jquery: 'plugins/jquery-3.3.1.min',
        vue: 'plugins/vue/vue.min',
        vueRouter: 'plugins/vue/vue-router',
        bootstrap: 'plugins/bootstrap-3.3.7-dist/js/bootstrap',
        dao: 'apps/dao/dao',
        utils: 'apps/common/common',
        zTree: 'plugins/ztree/js/jquery.ztree.core',
        selectpage: 'plugins/selectpage/selectpage',
        comCompnents : 'apps/common/comCompnents',
        axios : 'https://cdn.bootcss.com/axios/0.16.0/axios.min'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        zTree:{
            deps: ['jquery'],
            exports: 'zTree'
        },
        selectpage:{
            deps: ['jquery'],
            exports: 'selectpage'
        }
    }
}