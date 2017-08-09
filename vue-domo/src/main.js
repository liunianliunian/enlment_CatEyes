// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import 'font-awesome/css/font-awesome.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import './assets/theme/theme-green/index.css'
// import './assets/theme/theme-darkblue/index.css'


Vue.use(ElementUI)

import store from './store/store.js'
import Vuex from 'vuex'

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})





  