import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Home',
    component: () => import('../views/Home/Home.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/Demo/Demo.vue'),
    children: [
      {
        path: 'virtual-list',
        name: 'VirtualList',
        component: () => import('../views/Demo/VirtualList/VirtualList.vue')
      },
      {
        path: 'image-review',
        name: 'ImageReview',
        component: () => import('../views/Demo/ImageReview/ImageReview.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: ''
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
