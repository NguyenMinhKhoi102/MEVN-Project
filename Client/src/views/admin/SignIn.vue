<template>
    <div class="page">
        <SignInForm @submit:signin="submitSignIn" />
        <p>{{ message }}</p>
    </div>
</template>

<script>

import adminService from "@/services/admin.service";
import SignInForm from "@/components/admin/SignInForm.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "@/stores/store";
import { useRouter } from "vue-router";

export default defineComponent({
    components: {
        SignInForm,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const message = ref("");
        const submitSignIn = async (data) => {
            try {
                const response = await adminService.signIn(data);
                const token = response.token;
                localStorage.setItem("token", token);
                store.setIsAuthenticated(true);
                store.setIsAuthorizated(true);
                // router.push({ name: 'admin.category.all' });
                router.push({ name: 'admin.product.all' });
            } catch (error) {
                console.log(error);
                message.value = "Tài phản hoặc mật khẩu. Vui lòng thử lại.";
            }
        };
        return { store, message, submitSignIn }
    },
});
</script>