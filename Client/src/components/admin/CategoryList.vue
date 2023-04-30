<template>
    <div class="page-heading" style="">
        <div class="page-title">
            <div class="row mb-3">
                <div class="col-12 col-md-8 order-md-1 order-last">
                    <h3>QUẢN LÝ DANH MỤC</h3>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="card">
                <div class="card-header d-flex justify-content-between row">
                    <div class="row">
                        <div class="col-4 mt-1">
                            <button type="button" class="btn btn-success" @click="goToAddCategory">Thêm danh mục</button>
                        </div>
                        <div class="col-8 mt-1">
                            <input class="form-control" v-model="searchText" type="text" placeholder="search" />
                        </div>
                    </div>

                    <div class="col-2"></div>
                </div>
                <div class="card-body">
                    <table class="table table-striped" id="table1">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên danh mục</th>
                                <th>Ngày tạo</th>
                                <th>Ngày chỉnh sửa</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(category, index) in filteredCategories" :key="category._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ category.name }}</td>
                                <td>{{ category.created_at }}</td>
                                <td>{{ category.updated_at }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="{ name: 'admin.category.edit', params: { id: category._id } }">
                                            <button type="button" class="btn btn-info">Sửa</button>
                                        </router-link>
                                        <button type="button" @click="deleteCategory(category._id)"
                                            class="btn btn-danger ms-3">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
import { defineComponent, reactive, ref, computed } from "vue";
import CategoryService from "@/services/category.service";
import { useRouter } from "vue-router";

export default defineComponent({
    props: {
        categories: { type: Array, default: [] },
    },
    setup(props, context) {
        const router = useRouter();
        const categories = reactive(props.categories);
        const searchText = ref("");
        const filteredCategories = computed(() => {
            if (!searchText.value) {
                return reactive(props.categories);
            }
            return props.categories.filter((category) =>
                Object.values(category).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const deleteCategory = async (id) => {
            if (confirm("Bạn muốn xóa Danh mục này?")) {
                try {
                    await CategoryService.delete(id);
                    context.emit("rerender:categories", categories);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        const goToAddCategory = () => {
            router.push({ name: "admin.category.add" });
        };
        return {
            searchText,
            filteredCategories,
            deleteCategory,
            goToAddCategory,
        };
    },
});
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";
</style>