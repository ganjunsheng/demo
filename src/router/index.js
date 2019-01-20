import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/Login'
// import Home from '@/views/Home'
// import User from '@/views/User/User'
// import firstCategory from '@/views/FirstCategory/FirstCategory'
// import Secondcategroy from '@/views/Secondcategroy/Secondcategroy'
// import Product from '@/views/Product/Productlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      // component: Login
      component: resolve => require(['@/Login'], resolve)
    },
    {
      path: '/',
      name: 'home',
      // component: Home,
      component: resolve => require(['@/views/Home'], resolve),
      children: [
        {
          name: '用户管理',
          path: 'users',
          // component: User
          component: resolve => require(['@/views/User/User'], resolve)
        },
        {
          path: 'firstcategory',
          name: '一级分类',
          // component: firstCategory
          component: resolve => require(['@/views/FirstCategory/FirstCategory'], resolve)
        },
        {
          path: 'secondcategroy',
          name: '二级分类',
          // component: Secondcategroy
          component: resolve => require(['@/views/Secondcategroy/Secondcategroy'], resolve)
        },
        {
          path: 'product',
          name: '商品管理',
          // component: Product
          component: resolve => require(['@/views/Product/Productlist'], resolve)
        }
      ]
    }
  ]
})
