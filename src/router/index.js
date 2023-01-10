import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        name: 'app',
        path: '/',
        component: () => import('@/views/frontend/Navbar.vue'),
        children:[
            {
                name: 'index',
                path: '',
                component: () => import('@/views/frontend/Index.vue')
            },
            {
                name: 'products',
                path: 'products',
                component: () => import('@/views/frontend/Products.vue')
            },
            {
                name: 'product',
                path: 'product/:id',
                component: () => import('@/views/frontend/Product.vue')
            },
            {
                name: 'favorite',
                path: 'favorite',
                component: () => import('@/views/frontend/Favorites.vue')
            },
        ]
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
            },
            {
                name: 'adminProducts',
                path: 'products',
                component: () => import('@/views/dashboard/AdminProducts.vue'),
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