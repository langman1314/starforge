import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/category/:id',
    name: 'category',
    component: () => import('@/views/CategoryPage.vue'),
    props: true,
  },
  {
    path: '/entry/:id',
    name: 'entry',
    component: () => import('@/views/EntryDetailPage.vue'),
    props: true,
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchResultsPage.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router