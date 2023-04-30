<template>
    <!-- Form sử dụng thư viện VeeValidate để hiển thị validation error message và emit event khi submit -->
    <Form @submit="submitSignUp" :validation-schema="signUpFormSchema">
        <!-- Tạo ra input field cho tên -->
        <div class="form-group">
            <label for="username">Tài khoản</label>
            <Field name="username" type="text" class="form-control" v-model="signUpLocal.username" />
            <!-- Hiển thị validation error message nếu có -->
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="signUpLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="passwordConfirmation">Xác nhận mật khẩu</label>
            <Field name="passwordConfirmation" type="password" class="form-control"
                v-model="signUpLocal.passwordConfirmation" />
            <ErrorMessage name="passwordConfirmation" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Đăng ký</button>
        </div>
    </Form>
</template>
  
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineComponent, reactive } from "vue";

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup(props, context) {
        const signUpLocal = reactive({
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        });

        const signUpFormSchema = yup.object().shape({
            username: yup.string().required("Username không được để trống."),
            password: yup.string().required("Mật khẩu không được để trống."),
            passwordConfirmation: yup
                .string()
                .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp.")
                .required("Mật khẩu xác nhận không được để trống."),
        });

        const submitSignUp = () => {
            context.emit("submit:signup", signUpLocal);
        }

        return {
            signUpLocal,
            signUpFormSchema,
            submitSignUp,
        }

    },

});
</script>
  
<style scoped>
@import "@/assets/form.css";
</style>
  