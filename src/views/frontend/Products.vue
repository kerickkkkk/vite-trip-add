<script setup>
import { ref, computed, onMounted, inject } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/users";

const store = useUserStore();
const baseUrl = import.meta.env.VITE_BASE_URL;
const swal = inject("$swal");
const { user, token } = JSON.parse(localStorage.getItem("ttshop"));


const products = ref([]);
const favorites = ref([])

const getProducts = () => {
  axios
    .get(`${baseUrl}/products`)
    .then(({ data }) => {
      products.value = data;
    })
    .catch((error) => {
      console.dir(error);
      swal(error?.response?.data);
    });
};
const favoriteSwitch = (productId) => {
  axios({
      method : 'GET',
      url: `${baseUrl}/600/users/${user.id}/likes?productId=${productId}`,
      headers: {
          Authorization: `Bearer ${token}`
      },
  }).then(({data}) => {
    const favoriteId = data.length > 0 ? data[0].id : null
    toggleFavorite(favoriteId, user.id, productId)
  }).catch( (error) => {
      console.dir(error)
      swal(error?.response?.data)
  })
};
const toggleFavorite = (favoriteId, userId, productId) => {
  const method = favoriteId === null ? 'POST' : 'DELETE' 
  const url = favoriteId === null ? `${baseUrl}/600/likes/` : `${baseUrl}/600/likes/${favoriteId}`
  const data = favoriteId === null ?{
      userId, productId
    } : {}
  axios({
      method,
      url,
      data,
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then(res => {
    getUserProductFavorite()
  }).catch( (error) => {
      console.dir(error)
      swal(error?.response?.data)
  })
};
const getUserProductFavorite = () =>{
  axios({
      method : 'get',
      url : `${baseUrl}/600/users/${user.id}/likes?_expanded=post`,
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then(({data}) => {
    // 處理型態 因為 inlcude 型態敏感
    favorites.value = data.map( item => ({...item, userId :item.userId * 1}))
    getProducts()
  }).catch( (error) => {
      console.dir(error)
      swal(error?.response?.data)
  })
}
const checkFavorite = (productId) => {
  return (favorites.value.find( favorite => favorite.productId === productId)) === undefined
}
onMounted(() => {
  getProducts();
  if(user){
    getUserProductFavorite()
  }
});
</script>

<template>
  <div>
    景點頁面
    <div class="container">
      <div class="row">
        <template v-if="products.length > 0">
          <div v-for="product in products" :key="product.id" class="col-4">
            <div class="card">
              <img :src="product.imageUrl" class="card-img-top" />
              <div class="card-body">
                <div class="d-flex">
                  <h5 class="card-title">{{ product.title }}</h5>
                  <button
                    v-if="user"
                    @click="favoriteSwitch(product.id)"
                    class="btn btn-outline-primary"
                  >
                    <span>{{ checkFavorite(product.id) ? '加入' : '取消' }}</span>最愛
                  </button>
                </div>
                <p class="card-text">{{ product.content }}</p>
                <router-link :to="`/product/${product.id}`" class="btn btn-primary"
                  >看詳細</router-link
                >
              </div>
            </div>
          </div>
        </template>
        <template v-else> 沒有景點 </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
