<script setup>
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
const baseUrl = import.meta.env.VITE_BASE_URL

const router = useRouter()
const swal = inject('$swal')

const products = ref([])

const getProducts = () => {
  axios.get(`${baseUrl}/products`)
      .then( ({data}) => {
          products.value = data
      })
      .catch( (error) => {
          console.dir(error)
          swal(error?.response?.data)
      })
}
onMounted(()=>{
    getProducts()
})
</script>

<template>
  <div>
    景點頁面
    <div class="container">
      <div class="row">
        <template v-if="products.length > 0">
          <div v-for="product in products" :key="product.id" class="col-4">
            <div class="card">
              <img :src="product.imageUrl" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text">{{ product.content }}</p>
                <router-link :to="`/product/${product.id}`" class="btn btn-primary">看詳細</router-link>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          沒有景點
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
