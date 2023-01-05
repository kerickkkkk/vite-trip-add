<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const swal = inject('$swal')

const {VITE_BASE_URL : url} = import.meta.env
const email = ref('dragon@mail.com')
const password = ref('123456')

const submitHandler = () => {
    const params = {
        email : email.value,
        password : password.value
    }
    axios.post(`${url}/login`, params)
        .then(({data}) => {
            const {accessToken: token, user} = data
            localStorage.setItem('trip-token', token)
            router.push({
                name: `${ user?.role?.includes('admin') ? 'admin' : 'app'}`
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
