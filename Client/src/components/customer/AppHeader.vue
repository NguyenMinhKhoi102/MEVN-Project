<template>
    <div class="header px-5 mb-2">
        <div class="logo"><img src="http://localhost:3000/uploads/logo.png" alt="chưa load">
        </div>
        <ul class="nav">
            <router-link :to="{ name: 'home' }">
                <li class="nav-item">Trang chủ</li>
            </router-link>
            <!-- <router-link :to="{ name: 'home' }"> -->
            <li class="nav-item">Giới thiệu</li>
            <!-- </router-link> -->
            <router-link :to="{ name: 'product' }">
                <li class="nav-item">Sản phẩm</li>
            </router-link>
            <!-- <router-link :to="{ name: 'home' }"> -->
            <li class="nav-item">Liên hệ</li>
            <!-- </router-link> -->
        </ul>
        <div class="customer">
            <input class="search" placeholder="Search">
            <!-- <router-link :to="{ name: 'signin' }"> -->
            <!-- <i class="fas fa-user icon"></i> -->
            <!-- </router-link> -->

            <!-- <i class="fas fa-cart-shopping icon"></i> -->
            <router-link :to="{ name: 'signin' }">
                <button class="signin">Đăng nhập</button>
            </router-link>
            <router-link :to="{ name: 'signup' }">
                <button class="signup">Đăng ký</button>
            </router-link>

        </div>
    </div>
</template>
<style>
.header {
    height: 60px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0.1px 10px rgba(0, 0, 0, 0.179);
}

.header .logo img {
    width: 60px;
}

.header .nav {
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 50px;
}

.header .nav .nav-item {
    cursor: pointer;
    transition: all ease-in-out 0.3s;
}

.header .nav .nav-item:hover {
    color: orange;
}

.header .customer input,
.signin,
.signup {
    height: 30px;
    border: 1px solid orange;
    border-radius: 20px;
    font-size: 14px;
    padding-inline: 10px;
    margin-right: 15px;
    background-color: white;
    transition: all ease-in-out 0.3s;
}

.signin:hover,
.signup:hover {
    background-color: orange;
    color: white;
}

.header .customer .icon {
    color: orange;
    font-size: 18px;
    margin-inline: 10px;
}

.header li {
    color: black;
}

a:hover {
    text-decoration: none;
}
</style>
