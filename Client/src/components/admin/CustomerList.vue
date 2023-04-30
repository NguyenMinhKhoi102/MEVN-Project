<template>
    <div class="page-heading" style="">
        <div class="page-title">
            <div class="row mb-3">
                <div class="col-12 col-md-8 order-md-1 order-last">
                    <h3>QUẢN LÝ KHÁCH HÀNG</h3>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="card">
                <div class="card-header d-flex justify-content-between row">
                    <div class="row">
                        <h4 class="col-4 mt-1">

                        </h4>
                        <div class="col-8">
                            <input class="form-control" type="text" placeholder="search" v-model="searchText" />
                        </div>
                    </div>

                    <div class="col-2"></div>
                </div>
                <div class="card-body">
                    <table class="table table-striped text-center" id="table1">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Email</th>
                                <th>Họ tên</th>
                                <th>SĐT</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Địa chỉ</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(customer, index) in filteredCustomers" :key="customer._id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ customer.email }}</td>
                                <td>{{ customer.name }}</td>
                                <td>{{ customer.phone }}</td>
                                <td>{{ customer.birthday }}</td>
                                <td>{{ customer.sex === 1 ? 'Nam' : 'Nữ' }}</td>
                                <td>{{ customer.address }}</td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <button type="button" @click="deleteCustomer(customer._id)"
                                            class="btn btn-danger ms-3">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
import { defineComponent, reactive, ref, computed } from "vue";
import CustomerService from "@/services/customer.service";

export default defineComponent({
    props: {
        customers: { type: Array, default: [] },
    },

    setup(props, context) {
        const searchText = ref("");
        const filteredCustomers = computed(() => {
            if (!searchText.value) {
                return reactive(props.customers);
            }
            return props.customers.filter((customer) =>
                Object.values(customer).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });
        const deleteCustomer = async (id) => {
            if (confirm("Bạn muốn xóa khách hàng này?")) {
                try {
                    await CustomerService.delete(id);
                    context.emit("rerender:customers", reactive(props.customers));
                } catch (error) {
                    console.log(error);
                }
            }
        };
        return {
            searchText,
            filteredCustomers,
            deleteCustomer,
        };
    },
});
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";
</style>