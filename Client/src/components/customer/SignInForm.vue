<template>
    <Form @submit="submitSignIn" :validation-schema="signInFormSchema" class="w-25 m-auto">
        <h4 class="text-center">Đăng nhập</h4>
        <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" v-model="signInLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="signInLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary w-100">Đăng nhập</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup(props, context) {
        const signInLocal = reactive({
            email: "",
            password: "",
        });

        const signInFormSchema = yup.object().shape({
            email: yup.string().required("Email không được để trống."),
            password: yup.string().required("Mật khẩu không được để trống."),
        });

        const submitSignIn = () => {
            context.emit("submit:signin", signInLocal);
        }

        return {
            signInLocal,
            signInFormSchema,
            submitSignIn,
        }
    },
});
</script>

<style scoped>
@import "@/assets/form.css";
</style>