/**
 *
 * @authors qianzhang6 (you@example.org)
 * @date    2018-03-06 15:55:39
 * @version $Id$
 */
require.config(requireConfig);
define(function(require, exports, module) { 
        var Vue = require('vue');
        var VueRouter = require('vueRouter');
        Vue.use(VueRouter);  
        const routerUrl ={
            rylist :{
                template: '<iframe src= "/views/rylist.html"></iframe>'
            },
            demo :{
                template: '<iframe src= "/views/demo.html"></iframe>'
            }
        }
        const router = new VueRouter({
            routes: [{
                    path: '/rylist',
                    component: routerUrl.rylist
                },{
                    path: '/demo',
                    component: routerUrl.demo
                },
/*                {
                    path: '/component2',
                    component: function(resolve) {
                        resolve(require('./demo1.js'));
                    }
                },*/
            ]
        })
        var app = new Vue({
            el: '#router',
            router: router,
            template: '<div class="content">\
            <h1>Hello Content!</h1>\
            <p>\
            <router-link to="/rylist">Go to rylist</router-link>\
            <router-link to="/demo">Go to demo</router-link>\
            </p>\
            <router-view></router-view>\
            </div>'
        });
});
