// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import highcharts from 'highcharts'
import '@/styles/index.scss'
import VueHighCharts from 'vue-highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/store.js'
import VueParticles from 'vue-particles'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import animate from 'animate.css'
Vue.use(animate)
Vue.use(VueParticles)
highcharts3d(highcharts)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueHighCharts)
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(transition => {
  NProgress.done()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
