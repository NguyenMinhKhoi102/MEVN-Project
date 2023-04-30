<template>
    <div class="footer">
        <div class="content">
            <div class="contact">

                <ul>
                    <div class="title">Công ty cổ phần vật tư nông nghiệp ZFARM</div>
                    <li>
                        <i class="fas fa-map-marker" aria-hidden="true"></i>
                        <p>Trường đại học Cần Thơ</p>
                    </li>
                    <li>
                        <i class="fas fa-phone" aria-hidden="true"></i>
                        <p>Hotline: 0123456789 - 0987654321</p>
                    </li>
                    <li>
                        <i class="fas fa-envelope" aria-hidden="true"></i>
                        <p>Email: khoib1910241@student.ctu.edu.vn</p>
                    </li>
                    <li>
                        <i class="fas fa-earth-americas" aria-hidden="true"></i>
                        <p>Website: http://localhost:3001</p>
                    </li>
                </ul>
                <img width="70" class="ml-5" src="http://localhost:3000/uploads/logo.png" alt="chưa load">
            </div>
            <iframe class="mt-4"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15729855.42909206!2d96.7382165931671!3d15.735434000981483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2zVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1445179448264"
                width="300" height="300" frameborder="0" style="border: 0" scrolling="no" marginheight="0"
                marginwidth="0"></iframe>
            <div>
                <div class="category">
                    <ul>
                        <div class="title">Danh mục</div>
                        <li>Thuốc trừ sâu</li>
                        <li>Phân bón hoá học</li>
                        <li>Dụng cụ nông nghiệp</li>
                    </ul>
                </div>
                <div class="hot-link">
                    <ul>
                        <div class="title">Liên kết nhanh</div>
                        <li>Trang chủ</li>
                        <li>Giới thiệu</li>
                        <li>Sản phẩm</li>
                        <li>Liên hệ</li>
                    </ul>
                </div>
            </div>

            <div class="social-network">
                <div class="title">Mạng xã hội</div>
                <div class="logo"><img src="http://localhost:3000/uploads/facebook.png" alt=""></div>
                <div class="logo p-2"><img src="http://localhost:3000/uploads/youtube.png" alt=""></div>
                <div class="logo"><img src="http://localhost:3000/uploads/twitter.png" alt=""></div>
                <div class="logo"><img src="http://localhost:3000/uploads/instagram.png" alt=""></div>
            </div>
        </div>
        <div class="copyright">&copy; Bản quyền thuộc về Công ty cổ phần vật tư nông nghiệp ZFARM - Nguyễn Minh Khôi -
            B1910241</div>
    </div>
</template>
<style>
.footer {
    margin-top: 50px;
    background-color: rgba(0, 74, 0, 0.753);
}

.footer .content {
    display: flex;
    justify-content: space-between;
    padding-block: 20px;
    padding-inline: 50px;
}

li {
    list-style: none;
}

.footer li {
    display: flex;
    gap: 10px;
    padding-block: 5px;
}

.footer .content .title {
    color: rgba(255, 166, 0, 0.682);
    text-shadow: black;
    font-size: 20px;
    font-weight: bold;
    margin-block: 20px;
}

.footer .content .social-network .logo {
    width: 120px;
    margin-block: 20px;
    border-radius: 10px;
    background-color: aliceblue;
}

.footer .content .social-network .logo img {
    width: 100%;
    padding: 10px;
}

.copyright {
    font-size: 13px;
    background-color: orange;
    padding: 5px;
    text-align: center;
}
</style>