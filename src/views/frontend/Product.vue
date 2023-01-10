<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useUserStore } from "@/stores/users"
import Image from '@/components/pure/Image.vue'

const store = useUserStore();
const route = useRoute()
const {user, token} = store

const baseUrl= import.meta.env.VITE_BASE_URL

const productId = route.params.id
const product = ref([])
const favoriteId = ref(null)

const getProduct = () => {
  axios.get(`${baseUrl}/products/${productId}`)
      .then( ({data}) => {
          product.value = data
      })
      .catch( (error) => {
          console.dir(error)
          swal(error?.response?.data)
      })
}
const checkIsFavorite = () => {
  axios({
      method : 'get',
      url : `${baseUrl}/600/users/${user.id}/likes?productId=${productId}`,
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then(({data}) => {
    favoriteId.value = data.length > 0 ? data[0].id : null 
  }).catch( (error) => {
      console.dir(error)
      swal(error?.response?.data)
  })
}
const toggleFavorite = () => {
  const method = favoriteId.value === null ? 'POST' : 'DELETE' 
  const url = favoriteId.value === null ? `${baseUrl}/600/likes/` : `${baseUrl}/600/likes/${favoriteId.value}`
  const data = favoriteId.value === null ?{
      userId : user.id , productId
    } : {}
  axios({
      method,
      url,
      data,
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then(({data}) => {
    favoriteId.value = data.id ? data.id : null 
  }).catch( (error) => {
      console.dir(error)
      swal(error?.response?.data)
  })
};

onMounted(()=>{
  getProduct()
  checkIsFavorite()
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
                <div class="card-body__header d-flex justify-content-between aligin-items-center">
                  <h5 class="card-title"> {{ product.title }}</h5>
                  <button v-if="user" @click="toggleFavorite" class="btn btn-sm btn-outline-primary">
                    <span v-if="favoriteId">取消</span>
                    <span v-else>加入</span>
                    最愛
                  </button>
                </div>
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
