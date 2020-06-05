/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('admin-lte/dist/js/adminlte.min');
require('admin-lte/dist/js/demo');
require('admin-lte/plugins/select2/js/select2.full.min');
require('tooltipster/dist/js/tooltipster.bundle.min');
require('admin-lte/plugins/summernote/summernote-bs4.min');
require('admin-lte/plugins/daterangepicker/daterangepicker');

// Imports
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./components/Home";
import App from "./components/App"
import ExampleComponent from "./components/ExampleComponent"
import {store} from './store/store'
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RequestList from "./components/headers/HeaderList"
import ApproveList from "./components/materials/MaterialList"
import { HasError, AlertError } from 'vform'

//Vue Configs
Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();
Vue.use(VueRouter);

//Vue Router
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: "/", component: Home, name: 'home'},
        {path: "/example", component: ExampleComponent, name: 'example'},
        {path: "/login", component: Login, name: 'login'},
        {path: "/register", component: Register, name: 'register'},
        {path: "/headers", component: RequestList, name: 'headers'},
        {path: "/materials", component: ApproveList, name: 'materials'},
    ]
});


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
*/

const app = new Vue({
    el: '#app',
    store: store,
    components: {
        App
    },
    router,
});
