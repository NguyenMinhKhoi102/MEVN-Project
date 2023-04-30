<template>
    <div class="page">
        <h4>Đăng ký</h4>
        <SignUpForm @submit:signup="submitSignUp" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import SignUpForm from "@/components/admin/SignUpForm.vue";
import adminService from "@/services/admin.service";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    components: {
        SignUpForm,
    },
    setup(props, context) {
        const message = ref("");
        const router = useRouter();

        const submitSignUp = async (data) => {
            try {
                await adminService.signUp(data);
                router.push({ name: 'admin.signin' });
            } catch (error) {
                console.log(error);
                message.value = "Đăng ký thất bại. Vui lòng thử lại.";
            }
        };
        return { message, submitSignUp, }
    },
});
</script>