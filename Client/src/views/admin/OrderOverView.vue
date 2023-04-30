<template>
    <div>
        <OrderList :orders="orders" @rerender:orders="retrieveOrders"></OrderList>
        <div v-if="!orders.length" class="text-center">Không có hóa đơn.</div>
    </div>
</template>

<script>
import OrderList from "@/components/admin/OrderList.vue";
import OrderService from "@/services/order.service";
import { useRouter } from "vue-router";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        OrderList,
    },

    setup(props, context) {
        const orders = ref([]);
        const activeIndex = ref(-1);
        const router = useRouter();

        const retrieveOrders = async () => {
            try {
                orders.value = await OrderService.all();
            } catch (error) {
                console.log(error);
            }
        };

        retrieveOrders();

        return {
            orders,
            activeIndex,
            retrieveOrders,
        };
    },
});
</script>