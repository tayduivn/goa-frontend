import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: 'home',
      component: () => import('./views/home/Base'),
      children: [
        {
          path: 'home',
          name: 'homeV',
          component: () => import('./views/home/Home'),
          meta: {requiresPublicClient: true}
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
          path: 'products',
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
          name: 'ProductsCheckout',
          component: () => import('./views/home/ship/ProductsCart'),
          meta: {requiresAuth: true},
        },
        {
          path: 'message',
          name: 'ProductsMessage',
          component: () => import('./views/home/ship/ProductsMessage'),
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
          path: 'help',
          name: 'help',
          component: () => import('./views/home/Help'),
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
      name: 'Base',
      redirect: '/cpanel/home',
      component: () => import('./views/cpanel/Base'),
      meta: {requiresAuthAdmin: true},
      children: [
        {
          path: 'home',
          name: 'home',
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
          path: 'products',
          name: 'Products',
          component: () => import('./views/cpanel/Products')
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('./views/cpanel/Categories')
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
  let token = store.getters.getToken
  let level = store.getters.getLevelUser
  if (!token || token === '') {
    if (localStorage.token !== '') {
      if (localStorage.getItem('user') !== undefined || localStorage.getItem('user') === null) {
        store.commit('SET_USER', localStorage.getItem('user'))
        store.commit('AUTH_SUCCESS', localStorage.token)
        token = store.getters.getToken
        level = store.getters.getLevelUser
      }
    }
  }
  next()
  /*
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if ((token && level === 'Cliente') || (token && level === 'Transportista')) {
      next()
    } else {
      next({
        path: '/login',
        params: {nextUrl: to.fullPath}
      })
    }
  } else if (to.matched.some(record => record.meta.isNoUserLog)) {
    console.log(level)
    if ((token && level === 'Cliente') || (token && level === 'Transportista')) {
      next('/')
    } else if (token && level === 'Administrador') {
      next('/cpanel/admin')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresPublicClient)) {
    if (level === 'Transportista') {
      next('/order-client')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAuthAdmin)) {
    if (token && level === 'Administrador') {
      next()
    } else {
      next({
        path: '/cpanel',
        params: {nextUrl: to.fullPath}
      })
    }
  } else if (to.matched.some(record => record.meta.isNoUserLogAdmin)) {
    if (token && level === 'Administrador') {
      next({
        path: '/cpanel/admin',
        params: {nextUrl: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }*/
})

export default router
