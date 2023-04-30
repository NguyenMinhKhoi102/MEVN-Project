<template>
    <div>
        <ProductList :products="products" @rerender:products="retrieveProducts" />

        <div v-if="!products.length">Không có sản phẩm.</div>

        <!-- <div class="my-3 ">
            <button type="button" class="btn btn-info" @click="goToAddProduct">Thêm sản phẩm</button>
        </div> -->
    </div>
</template>
  
<script>
import ProductList from "@/components/admin/ProductList.vue";
import ProductService from "@/services/product.service";
import { useRouter } from "vue-router";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        ProductList,
    },

    setup() {
        const products = ref([]);
        const activeIndex = ref(-1);
        const router = useRouter();

        const retrieveProducts = async () => {
            try {
                products.value = await ProductService.all();
            } catch (error) {
                console.log(error);
            }
        };

        const goToAddProduct = () => {
            router.push({ name: "admin.product.add" });
        };

        retrieveProducts();

        return {
            products,
            activeIndex,
            retrieveProducts,
            goToAddProduct
        };
    },
});
</script>