<template>
    <Form @submit="submitProduct" :validation-schema="productFormSchema" enctype="multipart/form-data">

        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="productLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="description">Mô tả</label>
            <Field name="description" type="text" class="form-control" v-model="productLocal.description" />
            <ErrorMessage name="description" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="price">Giá</label>
            <Field name="price" type="number" class="form-control" v-model="productLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="quantity">Số lượng</label>
            <Field name="quantity" type="number" class="form-control" v-model="productLocal.quantity" />
            <ErrorMessage name="quantity" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="image">Hình ảnh</label>
            <input type="file" name="image" class="form-control" @change="onFileChange" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="category">Danh mục</label>
            <select name="category" class="form-control" v-model="productLocal.category_id">
                <option :value="null">--Chọn danh mục--</option>
                <option v-for="category in categories" :value="category._id">{{ category.name }}</option>
            </select>
            <ErrorMessage name="category" class="error-feedback" />
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
        </div>
    </Form>
</template>

<script>
import { defineComponent, reactive } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default defineComponent({

    props: {
        categories: { type: Array, required: true },
        product: { type: Object, required: true }
    },

    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup(props, context) {
        const productFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            description: yup
                .string()
                .required("Mô tả sản phẩm phải có giá trị.")
                .min(2, "Mô tả sản phẩm phải ít nhất 2 ký tự.")
                .max(500, "Mô tả sản phẩm có nhiều nhất 500 ký tự."),
            price: yup
                .number()
                .required("Giá sản phẩm phải có giá trị.")
                .min(0, "Giá sản phẩm phải lớn hơn hoặc bé hơn 0."),
            quantity: yup
                .number()
                .required("Số lượng sản phẩm phải có giá trị.")
                .min(0, "Số lượng sản phẩm phải lớn hơn hoặc bằng 0."),
            image: yup
                .mixed()
                .test("fileSize", "Kích thước hình ảnh phải nhỏ hơn 2MB.", (value) => {
                    if (!value) return true;
                    return value.size <= 2000000;
                }),
        });

        const productLocal = reactive(
            props.product,
            props.categories
        );

        const onFileChange = (event) => {
            const files = event.target.files;
            if (files.length > 0) {
                const file = files[0];
                productLocal.image = file;
            } else {
                productLocal.image = null;
            }
        };

        const submitProduct = () => {
            context.emit("submit:product", productLocal);
        };

        return {
            productLocal,
            productFormSchema,
            submitProduct,
            onFileChange
        };
    },
});
</script>

<style scoped>
@import "@/assets/form.css";
</style>