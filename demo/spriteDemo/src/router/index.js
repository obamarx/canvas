import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Base from '@/components/base'
import Group from '@/components/group'
import Event from '@/components/event'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/base',
      name: 'base',
      component: Base
    },
    {
      path: '/group',
      name: 'group',
      component: Group
    },
    {
      path: '/event',
      name: 'event',
      component: Event
    }
  ]
})
