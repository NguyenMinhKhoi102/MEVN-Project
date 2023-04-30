<template>
    <div class="row m-0">
        <div class="col-2 p-3">
            <div class="card category-list">
                <CategoryCard :categories="state.categories" :selectedCategory="state.selectedCategory"
                    @filter:category="setSelectedCategory" />
            </div>
        </div>
        <div class="col-10 p-3 product-list">
            <ProductCard :products="filteredProducts" />
        </div>
    </div>
</template>
<script>

import { defineComponent, reactive, computed } from 'vue';
import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service";
import ProductCard from '@/components/customer/ProductCard.vue';
import CategoryCard from '@/components/customer/CategoryCard.vue';

export default defineComponent({
    components: {
        ProductCard,
        CategoryCard,
    },
    setup(props, context) {
        const state = reactive({
            products: [],
            categories: [],
            selectedCategory: null,
        });
        const retrieveProducts = async () => {
            try {
                state.products = await ProductService.all();
                console.log(state.products);
                // console.log(products.value);
            } catch (error) {
                console.log(error);
            }
        };
        const retrieveCategories = async () => {
            try {
                state.categories = await CategoryService.all();
            } catch (error) {
                console.log(error);
            }
        };
        const filteredProducts = computed(() => {
            if (!state.selectedCategory) {
                return state.products;
            }
            return state.products.filter(product => product.category._id === state.selectedCategory._id);
        });

        const setSelectedCategory = (categories) => {
            state.selectedCategory = categories;
            console.log(state.selectedCategory);
        }


        retrieveProducts();
        retrieveCategories();
        return {
            state,
            retrieveProducts,
            retrieveCategories,
            filteredProducts,
            setSelectedCategory,
        }
    }
});

</script>
<style>
.category-list {
    position: fixed;
}

.product-list {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
}
</style>