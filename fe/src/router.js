import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解决VUE element导航栏重复点击路由报错----NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/project'
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('./views/project')
    },
    {
      path: '/mould/:id',
      name: 'mould',
      component: () => import('./views/mould')
    },
    {
      path: '/record/:id',
      name: 'record',
      component: () => import('./views/record')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/user')
    }
  ]
})
