<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/users'
import { useRouter } from 'vue-router'

const store = useUserStore()

const router = useRouter()
const swal = inject('$swal')

const url = import.meta.env.VITE_BASE_URL
const email = ref('admin@mail.com')
const password = ref('123456')

const submitHandler = () => {
    const params = {
        email : email.value,
        password : password.value
    }
    axios.post(`${url}/login`, params)
        .then(({data}) => {
            const {accessToken: token, user} = data
            const toLocalStorage = {
                user, token
            }
            localStorage.setItem('ttshop', JSON.stringify(toLocalStorage))
            router.push({
                name: `${ user?.role?.includes('admin') ? 'admin' : 'index'}`
            })
        }).catch(error=>{
            console.dir(error)
            swal(error?.response?.data)
        })
}
</script>

<template>
<div>
    <form class="bg-light p-4">
        <div class="mb-3">
            <label for="email" class="form-label">信箱</label>
            <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="password">
        </div>
        <button @click="submitHandler" type="submit" class="btn btn-primary">送出</button>
        <div>沒有帳號嗎？
            <router-link to="/register">註冊去</router-link>
        </div>
    </form>
</div>
</template>

<style scoped lang="scss">

</style>
