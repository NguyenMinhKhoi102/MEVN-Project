<template>
    <div>
        <div class="row mb-3">
            <div class="col-12 col-md-8">
                <h3>QUẢN LÝ SẢN PHẨM</h3>
            </div>
        </div>
        <section class="section">
            <div class="card">
                <div class="card-header d-flex justify-content-between row">
                    <div class="row">
                        <div class="col-4 mt-1">
                            <button type="button" class="btn btn-success" @click="goToAddProduct">Thêm sản phẩm</button>
                        </div>
                        <div class="col-8 mt-1">
                            <input class="form-control" v-model="searchText" type="text" placeholder="search" />
                        </div>
                    </div>

                    <div class="col-2"></div>
                </div>
                <div class="card-body">
                    <table class="table table-striped text-center" id="table1">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Danh mục</th>
                                <th>SL</th>
                                <th>Giá</th>
                                <th>Mô tả</th>
                                <th>Ngày tạo</th>
                                <th>Ngày chỉnh sửa</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in filteredProducts" :key="product._id">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <img :src="'http://localhost:3000/' + product.image" alt="" style="width: 75px" />
                                </td>
                                <td>{{ product.name }}</td>
                                <td>{{ product.category.name }}</td>
                                <td>{{ product.quantity }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.description }}</td>
                                <td>{{ product.created_at }}</td>
                                <td>{{ product.updated_at }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <router-link :to="{
                                            name: 'admin.product.edit',
                                            params: { id: product._id },
                                        }">
                                            <button type="button" class="btn btn-info">Sửa</button>
                                        </router-link>
                                        <button type="button" @click="deleteProduct(product._id)"
                                            class="btn btn-danger ms-3">
                                            Xóa
                                        </button>
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
import ProductService from "@/services/product.service";
import { useRouter } from "vue-router";

export default defineComponent({
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },

    setup(props, context) {
        const router = useRouter();
        const searchText = ref("");
        const filteredProducts = computed(() => {
            if (!searchText.value) {
                return reactive(props.products);
            }
            return props.products.filter((product) =>
                Object.values(product).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const deleteProduct = async (productId) => {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await ProductService.delete(productId);
                    context.emit("rerender:products", reactive(props.products));
                } catch (error) {
                    console.log(error);
                }
            }
        };

        const goToAddProduct = () => {
            router.push({ name: "admin.product.add" });
        };

        return {
            searchText,
            filteredProducts,
            deleteProduct,
            goToAddProduct
        };
    },
});
</script>