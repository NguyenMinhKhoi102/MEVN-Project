<template>
    <div>
        <CustomerList :customers="customers" @rerender:customers="retrieveCustomers"></CustomerList>
        <div v-if="!customers.length">Không có khách hàng.</div>

    </div>
</template>

<script>
import CustomerList from "@/components/admin/CustomerList.vue";
import CustomerService from "@/services/customer.service";
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        CustomerList,
    },

    setup(props, context) {
        const customers = ref([]);
        const activeIndex = ref(-1);

        const retrieveCustomers = async () => {
            try {
                customers.value = await CustomerService.findAll();
            } catch (error) {
                console.log(error);
            }
        };

        retrieveCustomers();

        return {
            customers,
            activeIndex,
            retrieveCustomers,
        };
    },
});
</script>