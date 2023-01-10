<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const {user: userLocalStorage} = localStorage.getItem('ttshop') ? JSON.parse(localStorage.getItem('ttshop')) : {}
const user = ref({})
const logout = () => {
  localStorage.setItem('ttshop', '{}')
  user.value = null
  router.push({
      name: `index`
  })
}

onMounted(() => {
  user.value = userLocalStorage
})
</script>

<template>
<div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">首頁</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav ms-auto mb-2 mb-md-0">
            <li v-if="user?.role?.includes('admin')" class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/admin/">前往後台</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/products">景點</router-link>
            </li>
            <template v-if="user">
              <li class="nav-item">
                <router-link class="nav-link" aria-current="page" to="/favorite">最愛</router-link>
              </li>
              <li class="nav-item">
                  <a @click="logout" class="nav-link" aria-current="page">登出</a>
              </li>
            </template>
            <template v-else="user">
              <li class="nav-item">
                <router-link to="/login" class="nav-link" aria-current="page">登入</router-link>                    
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link" aria-current="page">註冊</router-link>                    
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
</div>
</template>

<style scoped>

</style>
