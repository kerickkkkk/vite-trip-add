<script setup>
const {user} = JSON.parse(localStorage.getItem('ttshop')) 
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
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/products">景點</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/favorite">最愛</router-link>
            </li>
            <li v-if="user?.role.includes('admin')" class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/admin/">前往後台</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
</div>
</template>

<style scoped>

</style>
