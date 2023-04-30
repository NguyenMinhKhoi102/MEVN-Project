<template>
    <div v-if="category" class="page">
        <h4>Hiệu chỉnh Danh mục</h4>
        <CategoryForm :category="category" @submit:category="updateCategory" @delete:category="deleteCategory" />
        <p>{{ message }}</p>
    </div>
</template>

<script>

import CategoryForm from "@/components/admin/CategoryForm.vue";
import CategoryService from "@/services/category.service";
import { useRouter } from "vue-router"
import { defineComponent, onMounted, reactive, ref, toRef } from 'vue';
export default defineComponent({
    components: {
        CategoryForm,
    },
    props: {
        id: { type: String, required: true },
    },
    setup(props, context) {
        const category = ref(null);
        const message = ref("");
        const router = useRouter();

        const getCategory = async () => {
            try {
                category.value = await CategoryService.get(props.id);
            } catch (error) {
                console.log(error);
            }
        }
        const updateCategory = async (data) => {
            try {
                console.log(1);
                await CategoryService.update(category.value._id, data);
                console.log(2);
                message.value = "Danh mục được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        }
        const deleteCategory = async () => {
            if (confirm("Bạn muốn xóa Danh mục này?")) {
                try {
                    await CategoryService.delete(category.value._id);
                    router.push({ name: "admin.category.all" });
                } catch (error) {
                    console.log(error);
                }
            }
        }
        onMounted(async () => {
            await getCategory();
        });
        return {
            category,
            message,
            getCategory,
            updateCategory,
            deleteCategory,
        }
    },
});
</script>
