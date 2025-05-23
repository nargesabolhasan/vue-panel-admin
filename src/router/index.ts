import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Login from '@/views/Login.vue'
import SignIn from '@/views/SignIn.vue'
import Dashboard from '@/views/Dashboard.vue'
import AddArticle from '@/views/AddArticle.vue'
import AllArticles from '@/views/AllArticles.vue'

import { ROUTES, DASHBOARD_ROUTES_NAME } from '@/constants/routes'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: ROUTES.LOGIN },
  { path: ROUTES.LOGIN, component: Login },
  { path: ROUTES.SIGN_IN, component: SignIn },
  {
    path: ROUTES.DASHBOARD.ROOT,
    component: Dashboard,
    children: [
      { path: '', redirect: ROUTES.DASHBOARD.ADD_ARTICLE },
      {
        path: ROUTES.DASHBOARD.ADD_ARTICLE,
        name: DASHBOARD_ROUTES_NAME.ADD_ARTICLE,
        component: AddArticle,
      },
      {
        path: ROUTES.DASHBOARD.ALL_ARTICLES,
        name: DASHBOARD_ROUTES_NAME.ALL_ARTICLES,
        component: AllArticles,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
