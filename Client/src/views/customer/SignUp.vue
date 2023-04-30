<template>
    <div class="page">
        <SignUpForm @submit:signup="submitSignUp" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import SignUpForm from "@/components/customer/SignUpForm.vue";
import customerService from "@/services/customer.service";
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
                await customerService.signUp(data);
                router.push({ name: 'signin' });
            } catch (error) {
                console.log(error);
                message.value = "Đăng ký thất bại. Vui lòng thử lại.";
            }
        };
        return { message, submitSignUp, }
    },
});
</script>