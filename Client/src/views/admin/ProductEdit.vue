<template>
    <div v-if="product" class="page">
        <h4>Chỉnh sửa Sản phẩm</h4>
        <ProductForm :product="product" :categories="categories" @submit:product="updateProduct" />
        <p>{{ message }}</p>
    </div>
</template>

<script>

import { defineComponent, reactive, toRefs, onMounted } from "vue";
import ProductForm from "@/components/admin/ProductForm.vue";
import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service";
import { useRouter } from "vue-router"

export default defineComponent({
    components: {
        ProductForm,
    },
    props: {
        id: { type: String, required: true },
    },
    setup(props, context) {
        const state = reactive({
            product: null,
            message: "",
            categories: [],
        });
        const router = useRouter();

        console.log(props._id)

        const onFileChange = (event) => {
            const formData = new FormData();
            formData.append("image", event.target.files[0]);
            state.product.image = formData;
        };

        const getProduct = async () => {
            try {
                state.product = await ProductService.get(props.id);
            } catch (error) {
                console.log(error);
            }
        };

        const getCategories = async () => {
            try {
                state.categories = await CategoryService.all();
            } catch (error) {
                console.log(error);
            }
        };

        const updateProduct = async (data) => {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("quantity", data.quantity);
            formData.append("category_id", data.category_id);
            formData.append("image", data.image, data.image.name);
            try {
                await ProductService.update(props.id, formData);
                state.message = "Sản phẩm được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(async () => {
            await getProduct();
            await getCategories();
        });

        return {
            ...toRefs(state),
            onFileChange,
            updateProduct,
        };
    },
});

</script>
