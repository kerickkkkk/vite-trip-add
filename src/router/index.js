import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        name: 'app',
        path: '/',
        component: () => import('@/views/frontend/Index.vue')
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('@/views/dashboard/Register.vue')
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/dashboard/Login.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // 統一路由切換就切到最上方
    scrollBehavior () {
        return {
            top: 0,
            behavior: 'smooth'
        }
    }
})

export default router