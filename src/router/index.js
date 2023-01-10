import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/users'
const projectName = import.meta.env.VITE_PROJECT_NAME
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
        meta: { requiresAuth: true } ,
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

// 統一取得是否有驗證資訊
router.beforeEach((to, from, next) => {
    // 宣告要在裡面宣告 不然因為生命週期關係會取不到資料
    const store = useUserStore()

    // 統一全部都要撈出使用者資訊，沒有就是 undefined 
    const {user, token} = localStorage.getItem(projectName) ? JSON.parse(localStorage.getItem(projectName)) : {}
    // 寫到 pinia
    store.user = user
    store.token = token

    if(to.meta.requiresAuth){
        if(user && user?.role?.includes('admin')){
            next()
        }else{
            const name = user ? 'index' : 'login'
            console.log('沒有權限')
            return {name}
        }
    }else{
        next()
    }
})
export default router