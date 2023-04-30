<template>
    <div class="product-card" v-for="(product, index) in products" :key="product._id">
        <img :src="'http://localhost:3000/' + product.image" alt="">
        <h5 class="title text-center" style="font-size: 20px;">{{ product.name }}</h5>
        <div class="price text-danger" style="font-size: 20px;">{{ formatCurrentcy(product.price) }}</div>
        <div class="card-footer text-center">
            <button class="btn btn-outline-success">
                <i class="fas fa-cart-shopping"></i>
                Thêm vào giỏ
            </button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        products: { type: Object, required: true }
    },
    setup(props, context) {
        const formatCurrentcy = (number) => {
            return Number(number).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }
        return {
            formatCurrentcy,
        }
    }
});
</script>
<style>
.product-list {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
}

.product-card {
    width: 250px;
    height: 310px;
    border: 1px solid gainsboro;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.product-card .card-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: gainsboro;
    border-radius: 0 0 8px 8px;
    height: 60px;

}

.product-card img {
    width: 150px;
    height: 150px;
    border-radius: 10px 10px 0 0;
}

.product-card .title {
    margin-top: 10px;
}
</style>