import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Product from './views/Product.vue'
import ProductInfo from './views/ProductInfo.vue'
import Write from './views/Write.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/productInfo',
      name: 'productInfo',
      component: ProductInfo
    },
    {
      path: '/write',
      name: 'write',
      component: Write
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

