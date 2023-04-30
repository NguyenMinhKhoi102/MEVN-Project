<template>
    <div class="w3-light-grey" style="min-height: 800px;">
        <AppBar></AppBar>
        <AppDrawer></AppDrawer>
        <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor: pointer"
            title="close side menu" id="myOverlay"></div>

        <div class="w3-main" style="margin-left: 310px; margin-top: 43px">
            <router-view v-slot="{ Component }">
                <transition name="fade">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script>
var mySidebar = document.getElementById("mySidebar");

var overlayBg = document.getElementById("myOverlay");

function w3_open() {
    if (mySidebar.style.display === "block") {
        mySidebar.style.display = "none";
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = "block";
        overlayBg.style.display = "block";
    }
}
// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}
import AppDrawer from "@/components/admin/AppDrawer.vue";
import AppBar from "@/components/admin/AppBar.vue";
export default {
    components: {
        AppBar,
        AppDrawer,
    },
};
</script>
<style>
@import url(https://www.w3schools.com/w3css/4/w3.css);
@import url(https://fonts.googleapis.com/css?family=Raleway);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* .fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-out;
} */
</style>