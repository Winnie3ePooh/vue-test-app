import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const MainComp = () => import('../components/MainComp.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/main', component: MainComp },
      { path: '/', redirect: '/main' }
    ]
  })
}
