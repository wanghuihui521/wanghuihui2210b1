import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:"/welcome",
    children: [
      {
        path: '/categories',
        name: 'categories',
        component: () => import('../views/categories.vue')
      },
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/welcome.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由鉴权

router.beforeEach((to,from,next)=>{
  let token=localStorage.getItem('token')
  if(!token&&to.path!="/login"){
    next('/login')
  }else if(token&&to.path=="/login"){
    next('/')
  }else {
    next()
  }
})

export default router
