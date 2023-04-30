<template>
    <div>
        <CategoryList :categories="categories" @rerender:categories="retrieveCategories"></CategoryList>

        <div v-if="!categories.length">Không có danh mục.</div>

        <!-- <div class="my-3">
            <button type="button" class="btn btn-info" @click="goToAddCategory">Thêm danh mục</button>
        </div> -->
    </div>
</template>

<script>
import CategoryList from "@/components/admin/CategoryList.vue";
import CategoryService from "@/services/category.service";
import { useRouter } from "vue-router";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        CategoryList,
    },

    setup(props, context) {
        const categories = ref([]);
        const activeIndex = ref(-1);
        const router = useRouter();

        const retrieveCategories = async () => {
            try {
                categories.value = await CategoryService.all();
            } catch (error) {
                console.log(error);
            }
        };
        const goToAddCategory = () => {
            router.push({ name: "admin.category.add" });
        };

        retrieveCategories();

        return {
            categories,
            activeIndex,
            retrieveCategories,
            goToAddCategory
        };
    },
});
</script>