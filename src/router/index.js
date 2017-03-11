import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import Activities from '@/components/Activities.vue'
import Receipts from '@/components/Receipts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/profile',
      component: Profile,
      children: [
        {
          path: 'activities',
          name: 'Activities',
          component: Activities
        },
        {
          path: 'receipts',
          name: 'Receipts',
          component: Receipts
        }
      ]
    }
  ]
})
