<template>
    <Header/>
    <Menu class="pb-2"/>
    <v-app>
        <v-main>
            <v-carousel :show-arrows="false" cycle height="400" style="border-radius: 5px;">
                <v-carousel-item
                        v-for="(item,i) in item_banners"
                        :key="i"
                        :src="item.src"
                        cover
                ></v-carousel-item>
            </v-carousel>
            <div class="d-grid mt-4">

                <v-sheet
                        class="mx-auto"
                        max-width="800"
                >
                    <div class="d-grid">
                        <span class="title-home">Khám phá danh mục</span>
                    </div>
                    <v-slide-group
                            show-arrows
                            class="mt-3"
                    >
                        <v-slide-group-item
                                v-for="item in item_category"
                                :key="item"
                        >
                            <a :href="/category/+item.name" class="text-decoration-none">
                                <div class="d-grid ms-xxl-3 bg-light" style="border-radius: 20%;">
                                    <img class="mt-3" :src="item.src" style="justify-self: center; height: 60px"/>
                                    <span class="txt-category">{{item.name}}</span>
                                </div>
                            </a>
                        </v-slide-group-item>
                    </v-slide-group>
                </v-sheet>
            </div>
            <div class="mt-4">
                <span class="title-home">Tin đăng mới</span>
            </div>
        </v-main>
    </v-app>
    <Footer/>
</template>

<script>
    import Header from "@/components/Header";
    import Menu from "@/components/Menu";
    import Footer from "@/components/Footer";

    export default {
        data() {
            return {
                item_banners: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                    },
                ],
                item_category: [
                    {
                        name: "Điện thoại",
                        src: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/icon-phone-96x96-2.png'
                    },
                    {
                        name: "Tablet",
                        src: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/icon-tablet-96x96-1.png'
                    },
                    {
                        name: "Laptop",
                        src: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/icon-laptop-96x96-1.png'
                    },
                    {
                        name: "Phụ kiện",
                        src: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/icon-phu-kien-96x96-1.png'
                    },
                    {
                        name: "Đồng hồ",
                        src: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/watch-icon-96x96.png'
                    },
                    {
                        name: "Đồng hồ",
                        src: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/watch-icon-96x96.png'
                    },
                    {
                        name: "Đồng hồ",
                        src: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/watch-icon-96x96.png'
                    },
                    {
                        name: "Đồng hồ",
                        src: 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/watch-icon-96x96.png'
                    },
                ],
            }
        },
        components: {Header, Menu, Footer},
        methods: {},
    }
</script>

<style>
    @import '@/assets/css/StyleHome.css';
</style>