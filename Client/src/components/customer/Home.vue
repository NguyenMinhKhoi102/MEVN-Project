<template>
    <div class="main">
        <div class="slider text-center mx-5">
            <img width="100%" src="http://localhost:3000/uploads/slide2.jpg" alt="">
        </div>
        <hr class="m-5">
        <h2 class="gradient-text">VỀ SẢN PHẨM</h2>
        <p class="text-center">Chúng tôi cung cấp 3 loại sản phẩm bao gồm: Thuốc bảo vệ thực vật, phân bón và dụng cụ làm
            vườn.</p>
        <div class="category">
            <div class="category-card">
                <div class="title">
                    <h3>Thuốc bảo vệ thực vật</h3>
                    <p>Thuốc trừ sâu, thuốc trừ bệnh, ....</p>
                </div>
                <img width="100%" src="http://localhost:3000/uploads/thuoctrusau.png" alt="">
            </div>
            <div class="category-card">
                <div class="title">
                    <h3>Phân bón</h3>
                    <p>Phân bón lá, phân bón gốc, phân bón thủy canh, phân bón hữu cơ,...</p>
                </div>
                <img width="100%" src="http://localhost:3000/uploads/phanbon.png" alt="">
            </div>
            <div class="category-card">
                <div class="title">
                    <h3>Dụng cụ làm vườn</h3>
                    <p>Bao trái, Bình phun, Phụ kiện bình, chậu, ...</p>
                </div>
                <img width="100%" src="http://localhost:3000/uploads/dungcu.png" alt="">
            </div>
        </div>
        <hr class="m-5">
        <h2 class="gradient-text">VỀ CHÚNG TÔI</h2>
        <p class="mx-5">Với mong muốn góp phần xây dựng và phát triển nền nông nghiệp nước nhà theo hướng sạch, an toàn và
            chất lượng. Chúng tôi đã và đang hoàn thiện về kiến thức nông nghiệp tiến tiến nhằm đáp ứng tốt nhất như cầu của
            nông dân thời đại 4.0</p>
        <div class="about mx-5">
            <div class="logo">
                <img src="http://localhost:3000/uploads/support-icon.png" alt="">
                <h4 class="mt-2 text-center">Tư vấn tận tình</h4>
            </div>
            <div class="logo">
                <img src="http://localhost:3000/uploads/chinh-hang.png" alt="">
                <h4 class="mt-2 text-center">Sản phẩm chính hãng</h4>
            </div>
            <div class="logo">
                <img src="http://localhost:3000/uploads/cart-png-clipart-icon-removebg-preview.png" alt="">
                <h4 class="mt-2 text-center">Đa dạng sản phẩm</h4>
            </div>
            <div class="logo">
                <img src="http://localhost:3000/uploads/png-transparent-removebg-preview.png" alt="">
                <h4 class="mt-2 text-center">Kinh nghiệm</h4>
            </div>
        </div>
    </div>
</template>
<style>
h2 {
    text-align: center;
}

.gradient-text {
    font-weight: bold;
    background: -webkit-linear-gradient(-90deg, orange, green 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-bottom: 10px;
}

.main .category {
    display: flex;
    gap: 50px;
    justify-content: center;
    align-items: center;
}

.main .category .category-card {
    width: 350px;
    height: 400px;
    background-color: black;
}


.category-card {
    cursor: pointer;
    position: relative;
    color: white;
}

.category-card h3 {
    text-shadow: 0px 0px 5px black;
    color: yellow;
}

.category-card img {
    opacity: 0.5;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.category-card:hover img {
    opacity: 1;
    transition: 1s opacity;
}

.category-card .title {
    position: absolute;
    opacity: 1;
    z-index: 1;
    top: 10px;
    left: 10px;
}

.about {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px;
    color: rgb(149, 97, 0);
    font-weight: bold;
}

.about .logo {
    text-align: center;
}

.about .logo img {
    width: 200px;
}
</style>