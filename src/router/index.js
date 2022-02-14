import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/system-state',
    children: [{
      path: 'system-state',
      name: 'SystemState',
      component: () => import('@/views/system-state/index'),
      meta: { title: '系统状态', icon: 'dashboard' }
    }]
  },

  {
    path: '/parameter',
    component: Layout,
    redirect: '/parameter/config',
    name: 'Parameter',
    meta: { title: '小区参数配置', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/parameter/config'),
        meta: { title: '参数配置', icon: 'table' }
      },
      {
        path: 'power',
        name: 'Power',
        component: () => import('@/views/parameter/power'),
        meta: { title: '功放状态', icon: 'tree' }
      }
    ]
  },

  {
    path: '/code',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Code',
        component: () => import('@/views/code/index'),
        meta: { title: '侦码数据', icon: 'form' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/upload',
    name: 'System',
    meta: {
      title: '系统配置',
      icon: 'nested'
    },
    children: [
      {
        path: 'upload',
        component: () => import('@/views/system/upload'), // Parent router-view
        name: 'Upload',
        meta: { title: '系统升级' }
      },
      {
        path: 'password',
        component: () => import('@/views/system/password'),
        name: 'Password',
        meta: { title: '修改密码' }
      },
      {
        path: 'log',
        component: () => import('@/views/system/log'),
        name: 'Log',
        meta: { title: '系统日志' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
