<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Image from '@/components/pure/Image.vue'
const route = useRoute()

const baseUrl= import.meta.env.VITE_BASE_URL

const router = useRoute()
const swal = inject('$swal')

const product = ref([])

const getProduct = () => {
  const {id} = route.params
  axios.get(`${baseUrl}/products/${id}`)
      .then( ({data}) => {
          product.value = data
      })
      .catch( (error) => {
          console.dir(error)
          swal(error?.response?.data)
      })
}

onMounted(()=>{
    getProduct()
})
</script>

<template>
  <div>
    景點詳細
      <div class="container">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <Image :src="product.imageUrl" className="img-fluid rounded-start" :alt="product.title"></Image>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title"> {{ product.title }}</h5>
                <p class="card-text">{{ product.content }}</p>
                <router-link to="/products"> 返回列表 </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
  </div>
</template>

<style scoped>

</style>
