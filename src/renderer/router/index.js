import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'custompage',
      component: require('@/components/CustomPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/deepLink',
      name: 'dee[link',
      component: require('@/components/DeepLink').default
    }
  ]
})
