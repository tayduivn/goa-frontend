import Vue from 'vue'
import Router from 'vue-router'
import {getTokenLevelUser} from "./utils/util"

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'BaseView',
      redirect: 'home',
      component: () => import('./views/home/BaseView'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/home/Home'),
        },
        {
          path: 'forgot',
          name: 'forgot',
          component: () => import('./views/home/Forgot'),
          meta: {isNoUserLog: true}
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/home/Login'),
          meta: {isNoUserLog: true}
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('./views/home/Register'),
          meta: {isNoUserLog: true}
        },
        {
          path: 'products/:name?',
          name: 'Products',
          component: () => import('./views/home/ship/Products'),
          meta: {requiresAuth: true}
        },
        {
          path: 'products-detail/:id',
          name: 'ProductsDetail',
          component: () => import('./views/home/ship/ProductsDetail'),
          meta: {requiresAuth: true},
        },
        {
          path: 'cart',
          name: 'ProductsCart',
          component: () => import('./views/home/ship/ProductsCart'),
          meta: {requiresAuth: true},
        },
        {
          path: 'profile',
          name: 'profileUser',
          component: () => import('./views/home/Profile'),
          meta: {requiresAuth: true}
        },
        {
          path: 'order-client',
          name: 'order-client',
          component: () => import('./views/home/OrderClient'),
          meta: {requiresAuth: true}
        },
        {
          path: 'politics',
          name: 'politics',
          component: () => import('./views/home/PoliticsSecurity'),
        },
      ]
    },
    {
      path: '/cpanel/login',
      name: 'cpanelLogin',
      component: () => import('./views/cpanel/Login'),
      meta: {isNoUserLogAdmin: true}
    },
    {
      path: '/cpanel/forgot',
      name: 'cpanel-forgot',
      component: () => import('./views/cpanel/Forgot'),
      meta: {isNoUserLogAdmin: true}
    },
    {
      path: '/cpanel',
      name: 'cPanelBaseView',
      component: () => import('./views/cpanel/BaseView'),
      meta: {requiresAuthAdmin: true},
      children: [
        {
          path: 'pHome',
          name: 'cPanelHome',
          component: () => import('./views/cpanel/Home')
        },
        {
          path: 'client',
          name: 'client',
          component: () => import('./views/cpanel/Client')
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('./views/cpanel/Orders')
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('./views/cpanel/Users')
        },
        {
          path: 'roles',
          name: 'roles',
          component: () => import('./views/cpanel/Roles')
        },
        {
          path: 'profile',
          name: 'profileAdmin',
          component: () => import('./views/cpanel/Profile')
        },
        {
          path: 'transactions',
          name: 'Transactions',
          component: () => import('./views/cpanel/Transactions')
        },
        {
          path: 'p-products',
          name: 'cPanelProducts',
          component: () => import('./views/cpanel/Products')
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('./views/cpanel/Categories')
        },
        {
          path: 'emails',
          name: 'emails',
          component: () => import('./views/cpanel/SingUpEmail')
        },
        {
          path: 'payments',
          name: 'payments',
          component: () => import('./views/cpanel/Payments')
        },
        {
          path: 'reviews',
          name: 'Reviews',
          component: () => import('./views/cpanel/Reviews')
        },
        {
          path: 'carts',
          name: 'Carts',
          component: () => import('./views/cpanel/Carts')
        },
      ]
    },
    {
      path: '*',
      name: 'Error 404',
      component: () => import('./views/home/error404')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let {token, level} = getTokenLevelUser()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token && level === 'Cliente') {
      next()
    } else {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      })
    }
  } else if (to.matched.some(record => record.meta.isNoUserLog)) {
    if (token && level === 'Cliente') {
      next('/')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAuthAdmin)) {
    if (token && level === 'Administrador') {
      next()
    } else {
      next({
        path: '/cpanel/login',
        params: {nextUrl: to.fullPath}
      })
    }
  } else if (to.matched.some(record => record.meta.isNoUserLogAdmin)) {
    if (token && level === 'Administrador') {
      next({
        path: '/cpanel/pHome',
        params: {nextUrl: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
