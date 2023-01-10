<script setup>
import { ref, computed, onMounted, inject } from "vue"
import axios from "axios"

const baseUrl = import.meta.env.VITE_BASE_URL
const swal = inject("$swal")
const { user, token } = localStorage.getItem("ttshop") ? JSON.parse(localStorage.getItem("ttshop"))  : {}



const favorites = ref([])

const getFavorites = () => {
  axios({
      method : 'GET',
      url: `${baseUrl}/600/users/${user.id}/likes?_expand=product`,
      headers: {
          Authorization: `Bearer ${token}`
      },
  }).then(({data}) => {
    favorites.value = data
  }).catch( (error) => {
      console.dir(error)
      swal(error?.response?.data)
  })
};

const removeFavorite = (favoriteId) => {
  const method = 'DELETE' 
  const url = `${baseUrl}/600/likes/${favoriteId}`
  axios({
      method,
      url,
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then(res => {
    getFavorites()
  }).catch( (error) => {
      console.dir(error)
      swal(error?.response?.data)
  })
};

onMounted(()=>{
    getFavorites()
})
</script>

<template>
<div>
    我的最愛
    <div class="container">
      <div class="row">
        <template v-if="favorites.length > 0">
          <div v-for="item in favorites" :key="item.id" class="col-4">
            <div class="card">
              <img :src="item.product.imageUrl" class="card-img-top" />
              <div class="card-body">
                <div class="d-flex">
                  <h5 class="card-title">{{ item.product.title }}</h5>
                  <button
                    @click="removeFavorite(item.id)"
                    class="btn btn-outline-primary"
                  >
                    取消最愛
                  </button>
                </div>
                <p class="card-text">{{ item.product.content }}</p>
                <router-link :to="`/products`" class="btn btn-primary"
                  >返回景點列表</router-link>
              </div>
            </div>
          </div>
        </template>
        <template v-else> 
            沒有產品列表 
            <router-link :to="`/products`" class="btn btn-primary"
                  >返回景點列表</router-link>
         </template>
      </div>
    </div>
</div>
</template>

<style scoped>

</style>
