<template>
    <Form @submit="submitCategory" :validation-schema="categoryFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="categoryLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <!-- <button v-if="categoryLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteCategory">
                Xóa
            </button> -->
        </div>
    </Form>
</template>

<script>
import { defineComponent, reactive } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        category: { type: Object, required: true }
    },
    setup(props, context) {
        const categoryFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
        });

        const categoryLocal = reactive(props.category);

        const submitCategory = () => {
            context.emit("submit:category", categoryLocal);
        };

        return {
            categoryLocal,
            categoryFormSchema,
            submitCategory,
            // deleteCategory,
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