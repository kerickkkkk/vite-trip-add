import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        name: 'app',
        path: '/',
        component: () => import('@/views/frontend/Index.vue'),
        children:[]
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
    {
        name: 'dashboard',
        path: '/admin',
        component: () => import('@/views/dashboard/DashboardEntry.vue'),
        children:[
            {
                name: 'admin',
                path: '',
                component: () => import('@/views/dashboard/DashboardIndex.vue'),
            }
        ]
    },
    // 404
    // {
    //     path: '/:pathMatch(.*)*',
    //     component: () => import('@/views/NotFound.vue/')
    // }

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