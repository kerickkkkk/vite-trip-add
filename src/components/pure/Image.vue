<script setup>
import { computed } from 'vue'

const props = defineProps({
    src : {
      type: String,
      default: ''
    },
    className : {
        type: String,
        default: ''
    },
    // 進入會是物件需再轉換
    style : {
        type: Object,
        default: {}
    },
    alt : {
        type: String,
        default: ''
    },
})
// 物件轉換字串
const styleName = computed( () => {
    const keys = Object.keys(props.style)
    if( keys.length > 0 ){
        return keys.map( key => `${key} : ${props.style[key]}`).join(' ;')
    }else{
        return ''
    }
})

</script>

<template>
    <img v-if="props.src !== ''" 
        :src="props.src" 
        :class="props.className" 
        :style="styleName"
        :alt="props.alt">
    <div v-else class="d-flex justify-content-center align-items-center w-100 h-100">
        not found
    </div>
</template>

<style scoped>

</style>
