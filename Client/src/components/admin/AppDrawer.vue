<template>
    <div class="w3-bar w3-top w3-black w3-large" style="z-index: 4">
        <button class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onclick="w3_open();">
            <i class="fa fa-bars"></i> Menu
        </button>
    </div>

    <nav class="w3-sidebar w3-white" style="z-index: 3; width: 300px">
        <br />
        <div class="w3-container w3-row">
            <div class="w3-col s4">
                <img src="https://hanoimoi.com.vn/Uploads/tuandiep/2018/4/8/1(1).jpg" class="w3-circle w3-margin-right"
                    style="width: 100px; margin-left: 70px;" />
            </div>
        </div>
        <hr />

        <div class="w3-bar-block">
            <a class="w3-bar-item w3-button w3-padding menu-item" @click="goToDashBoard">
                <i class="fa fa-tachometer fa-fw"></i> DASH BOARD
            </a>
            <a class="w3-bar-item w3-button w3-padding menu-item" @click="goToCategory">
                <i class="fa fa-list-alt fa-fw"></i> QUẢN LÝ DANH MỤC
            </a>
            <a class="w3-bar-item w3-button w3-padding menu-item" @click="goToProduct">
                <i class="fa fa-shopping-cart fa-fw"></i> QUẢN LÝ SẢN PHẨM
            </a>
            <a class="w3-bar-item w3-button w3-padding menu-item" @click="goToCustomer">
                <i class="fa fa-users fa-fw"></i> QUẢN LÝ KHÁCH HÀNG
            </a>
            <a class="w3-bar-item w3-button w3-padding menu-item" @click="goToOrder">
                <i class="fa fa-file-text fa-fw"></i> QUẢN LÝ HÓA ĐƠN
            </a>
        </div>

    </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { defineComponent } from 'vue';

export default defineComponent({
    components: {

    },
    setup() {

        const router = useRouter();

        const goToDashBoard = () => {
            router.push({ name: "admin.dashboard.show" });
        };

        const goToCategory = () => {
            router.push({ name: "admin.category.all" });
        };

        const goToProduct = () => {
            router.push({ name: "admin.product.all" });
        };

        const goToCustomer = () => {
            router.push({ name: "admin.customer.all" });
        };

        const goToOrder = () => {
            router.push({ name: "admin.order.all" });
        };

        return {
            goToDashBoard,
            goToCategory,
            goToProduct,
            goToCustomer,
            goToOrder,
        };
    },
});
</script>

<style>
.w3-sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
}

.menu-item:hover {
    background-color: #f5f5f5;
}

.menu-item {
    margin-bottom: 10px;
}

.w3-bar-block {
    font-family: "Roboto", sans-serif;
    font-size: 16px;

}

@import url(https://fonts.googleapis.com/css?family=Open+Sans);
@import url(https://www.w3schools.com/w3css/4/w3.css);
@import url(https://fonts.googleapis.com/css?family=Raleway);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);
</style>