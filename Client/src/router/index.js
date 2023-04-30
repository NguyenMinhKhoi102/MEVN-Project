import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFoundPage.vue"),
    },

    {
        path: "/admin/signup",
        name: "admin.signup",
        component: () => import("@/views/admin/SignUp.vue"),
    },

    {
        path: "/admin/signin",
        name: "admin.signin",
        component: () => import("@/views/admin/SignIn.vue"),
    },

    {
        path: "/admin",
        component: () => import("@/components/admin/AdminHomePage.vue"),
        children: [
            {
                path: "/admin/dashboard",
                name: "admin.dashboard.show",
                component: () => import("@/views/admin/DashBoardOverView.vue"),
            },
            {
                path: "/admin/category",
                name: "admin.category.all",
                component: () => import("@/views/admin/CategoryOverView.vue"),
            },
            //admin

            {
                path: "/admin/category",
                name: "admin.category.add",
                component: () => import("@/views/admin/CategoryAdd.vue"),
            },

            {
                path: "/admin/category/:id",
                name: "admin.category.edit",
                component: () => import("@/views/admin/CategoryEdit.vue"),
                props: true,
            },

            {
                path: "/admin/product",
                name: "admin.product.all",
                component: () => import("@/views/admin/ProductOverView.vue"),
            },


            {
                path: "/admin/product",
                name: "admin.product.add",
                component: () => import("@/views/admin/ProductAdd.vue"),
            },

            {
                path: "/admin/product/:id",
                name: "admin.product.edit",
                component: () => import("@/views/admin/ProductEdit.vue"),
                props: true
            },
            {
                path: "/admin/customer",
                name: "admin.customer.all",
                component: () => import("@/views/admin/CustomerOverView.vue"),
            },

            {
                path: "/admin/order",
                name: "admin.order.all",
                component: () => import("@/views/admin/OrderOverView.vue"),
            },

            {
                path: "/admin/order/:id",
                name: "admin.order.detail",
                component: () => import("@/views/admin/OrderDetail.vue"),
                props: true
            },
        ]
    },



    //customer
    {
        path: "/",
        component: () => import("@/views/customer/CustomerPage.vue"),
        children: [
            {
                path: "/",
                name: "home",
                component: () => import("@/components/customer/Home.vue"),
            },
            {
                path: "/product",
                name: "product",
                component: () => import("@/views/customer/Product.vue"),
            },
            {
                path: "/signup",
                name: "signup",
                component: () => import("@/views/customer/SignUp.vue"),
            },

            {
                path: "/signin",
                name: "signin",
                component: () => import("@/views/customer/SignIn.vue"),
            },
        ]
    },


];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// router.beforeEach((to, from, next) => {
//     const isAuthenticated = localStorage.getItem("token");

//     //Nếu cố gắng ra khỏi trang signin,signup, notfound thì quay về signin
//     if (to.name !== "admin.signin" && to.name !== "admin.signup" && to.name !== "notfound" && !isAuthenticated)
//         next({ name: "admin.signin" });
//     else
//         next();

// });

export default router;