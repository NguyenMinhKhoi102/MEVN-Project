<template>
    <div v-if="store.isAuthenticated" class="appbar">
        <div>
            <nav class="navbar navbar-dark bg-dark">
                <button class="navbar-toggler" type="button">
                    <span class="navbar-toggler-icon ms-2"></span>
                </button>
                <div class="btn-group">

                    <button class="btn btn-primary me-2" type="button" @click="signOut">Đăng xuất</button>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/stores/store';
import { defineComponent } from "vue";
import { useRouter } from "vue-router"
import adminService from "@/services/admin.service";
export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const signOut = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                };
                await adminService.signOut({ headers });
                localStorage.removeItem('token');
                store.setIsAuthenticated(false)
                router.push({ name: 'admin.signin' });
            } catch (error) {
                console.log(error);
            }
        };
        return { store, signOut, }
    },
});
</script>