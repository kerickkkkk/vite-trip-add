<script setup>
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Modal from 'bootstrap/js/dist/modal'
import Image from '@/components/pure/Image.vue'
const baseUrl = import.meta.env.VITE_BASE_URL


const router = useRouter()
const swal = inject('$swal')
const token = localStorage.getItem('token')
let addEditModal = null

const baseProduct = {
    title: '',
    imageUrl: '',
    content: '',
    isEnabled: false,
}

const products = ref([])
const addEditModalDom = ref(null)
const tempProduct = ref({...baseProduct})
const modelType = ref('')

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

const addEditModalOpen = (type, product) => {
    if(type==='edit'){
        tempProduct.value = {...product}
    }
    modelType.value = type
    addEditModal.show()
}

const resetProducts = () => {
    tempProduct.value = { ...baseProduct }
    addEditModal.hide()
}
const addEditProduct = () => {
    const data = {
        title: tempProduct.value.title ,
        imageUrl: tempProduct.value.imageUrl ,
        content: tempProduct.value.content ,
        isEnabled: tempProduct.value.isEnabled,
    }
    const method  = modelType.value === 'new' ? 'POST' : 'PATCH'
    const url =  `${baseUrl}/products${ modelType.value === 'new' ? '' : `/${tempProduct.value.id}` }`
    axios({
        method,
        url,
        headers: {
            Authorization: `Bearer ${token}` // Bearer 跟 token 中間有一個空格
        },
        data
    }).then(res => {
        resetProducts()
        getProducts()
    }).catch( (error) => {
        console.dir(error)
        swal(error?.response?.data)
    })

}

const deleteProduct = (id) => {
    axios({
        method : 'DELETE',
        url: `${baseUrl}/products/${id}`,
        headers: {
            Authorization: `Bearer ${token}` // Bearer 跟 token 中間有一個空格
        }
    }).then(res => {
        swal('刪除成功')
        getProducts()
    }).catch( (error) => {
        console.dir(error)
        swal(error?.response?.data)
    })
}

onMounted(()=>{
    getProducts()
    addEditModal = new Modal( addEditModalDom.value, {
        keyboard: false
    })
})

</script>

<template>
<div>
    <div ref="addEditModalDom" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> {{modelType === 'new' ? '新增' : '修改'}}景點</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="title" class="form-label">標題</label>
                        <input v-model="tempProduct.title" type="text" class="form-control" id="title">
                    </div>
                    <div class="mb-3">
                        <label for="url" class="form-label">圖片連結</label>
                        <input  v-model="tempProduct.imageUrl" type="text" class="form-control" id="url">
                    </div>
                    <div class="mb-3">
                        <label for="content" class="form-label">內容</label>
                        <input v-model="tempProduct.content" type="text" class="form-control" id="content">
                    </div>
                    <div class="mb-3 form-check">
                        <input v-model="tempProduct.isEnabled" type="checkbox" class="form-check-input" id="isEnabled">
                        <label class="form-check-label" for="isEnabled">啟用</label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                <button @click ="addEditProduct" type="button" class="btn btn-primary">儲存</button>
            </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="text-end">
            <button @click="addEditModalOpen('new')" class="btn btn-sm btn-primary">新增貼文</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>標題</th>
                    <th>圖片連結</th>
                    <th>內容</th>
                    <th>啟用</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="products.length > 0">
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.title }}</td>
                        <td>
                            <Image :src="product.imageUrl" style="width: 100px;"></Image>
                        </td>
                        <td>{{ product.content }}</td>
                        <td>
                            <!-- 暫時備用 -->
                            <!-- 注意這邊需要用 checked -->
                            <!-- <div class="form-check form-switch">
                                <input
                                    :id="`customSwitch${product.id}`"
                                    :checked="product.isEnabled"
                                    class="form-check-input"
                                    type="checkbox"
                                    @change="enableProduct(product.id)"
                                >
                                <label
                                    class="form-check-label"
                                    :class="{'text-success': product.isEnabled }"
                                    :for="`customSwitch${ product.id }`"
                                >{{ product.isEnabled ? "啟用" : "未啟用" }}</label>
                            </div> -->
                            <div :class="{'text-success': product.isEnabled }">
                                {{ product.isEnabled ? "啟用" : "未啟用" }}
                            </div>
                        </td>
                        <td>
                            <div class="btn-group" role="group">
                                <button @click="addEditModalOpen('edit', product)" type="button" class="btn btn-sm btn-outline-success">編輯</button>
                                <button @click="deleteProduct(product.id)" type="button" class="btn btn-sm btn-outline-danger">刪除</button>
                            </div>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="100" class="text-center"> 查無資料 </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</div>
</template>

<style scoped lang="scss">

</style>
