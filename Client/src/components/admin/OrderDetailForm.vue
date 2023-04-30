<template>
    <div>
        <div class="form-group">
            <label for="total">Mã đơn hàng</label>
            <Field name="total" type="text" class="form-control" v-model="orderLocal._id" readonly />
        </div>

        <div v-for="(product, index) in orderLocal.products" :key="index">
            <!-- <div class="form-group">
                <label for="product_id">Mã sản phẩm</label>
                <Field name="product_id" type="text" class="form-control" v-model="product.product_id" />
            </div> -->
            <div class="form-group">
                <label for="name">Tên sản phẩm</label>
                <Field name="name" type="text" class="form-control" v-model="product.name" readonly />
            </div>
            <div class="form-group">
                <label for="description">Mô tả</label>
                <Field name="description" type="text" class="form-control" v-model="product.description" readonly />
            </div>
            <div class="form-group">
                <label for="image">Hình ảnh</label>
                <td><img :src="'http://localhost:3000/' + product.image" alt="" style="width:200px"></td>
                <!-- <Field name="image" type="file" class="form-control" v-model="product.image" /> -->

            </div>
            <div class="form-group">
                <label for="price">Giá</label>
                <Field name="price" type="text" class="form-control" v-model="product.price" readonly />
            </div>
            <div class="form-group">
                <label for="quantity">Số lượng</label>
                <Field name="quantity" type="text" class="form-control" v-model="product.quantity" readonly />
            </div>
            <div class="form-group">
                <label for="category_id">Mã danh mục</label>
                <Field name="category_id" type="text" class="form-control" v-model="product.category_id" readonly />
            </div>
            <div class="form-group">
                <label for="subtotal">Tổng tiền</label>
                <Field name="subtotal" type="text" class="form-control" v-model="product.subtotal" readonly />
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, reactive } from "vue";
import { Field } from "vee-validate";

export default defineComponent({
    components: {
        Field,
    },
    props: {
        order: { type: Object, required: true },
    },

    setup(props, context) {
        const orderLocal = reactive(props.order);
        return {
            orderLocal,
        };
    },
});
</script>
  
<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url(https://www.w3schools.com/w3css/4/w3.css);
@import url(https://fonts.googleapis.com/css?family=Raleway);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
</style>
  