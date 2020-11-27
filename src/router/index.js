import Vue from 'vue'
import Router from 'vue-router'

import Default from '@/components/Default'


import PermissionIndex from '@/components/Permission/Index'
import PermissionCreate from '@/components/Permission/Create'


import typecreate from '@/components/typepermission/Create'
import typeindex from '@/components/typepermission/Index'


Vue.use(Router)

const routes = [
  { path: '/', name: 'Default', component: Default },


  { path:'/typepermission/index',name:'typeindex',component:typeindex},
  { path:'/typepermission/create',name:'typecreate',component:typecreate},
  { path:'/typepermission/:code/edit',name:'typeedit',component:typecreate},

  { path:'/Permission/index',name:'PermissionIndex',component:PermissionIndex},
  { path:'/Permission/create',name:'PermissionCreate',component:PermissionCreate},
  { path:'/Permission/:code/edit',name:'PermissionEdit',component:PermissionCreate},
 



]

export default new Router({
  routes
})
