<script setup>
import { ref } from 'vue'
import axios from 'axios'

const {VITE_BASE_URL : url} = import.meta.env
const email = ref('admin@mail.com')
const password = ref('123456')

axios.get(`${url}/users`)
.then(res=>{
    console.log(res)
}).catch(err=>{
    console.log('err')
})
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
        <button type="submit" class="btn btn-primary">送出</button>
    </form>
</div>
</template>

<style scoped lang="scss">

</style>
