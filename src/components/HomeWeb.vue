<template>
    <Header/>
    <Menu class="pb-2"/>
    <v-app>
        <v-main>
            <v-carousel :show-arrows="false" cycle height="600" style="border-radius: 5px;">
                <v-carousel-item
                        v-for="(item,i) in item_banners"
                        :key="i"
                        :src="item.src"

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
                            <router-link :to="{ name: 'get-post',
                                query: { category: item.name} }" class="d-block text-decoration-none" target="_blank">
                                <a class="text-decoration-none">
                                    <div class="d-grid ms-xxl-3 bg-light" style="border-radius: 20%;">
                                        <img class="mt-3" :src="item.image" style="justify-self: center; height: 60px"/>
                                        <span class="txt-category">{{item.name}}</span>
                                    </div>
                                </a>
                            </router-link>

                        </v-slide-group-item>
                    </v-slide-group>
                </v-sheet>
            </div>
            <div class="mt-4 d-grid justify-content-center">
                <span class="title-home">Tin đăng mới</span>
                <div class="row container">
                    <div class="card col-3" v-for="entry in listPostJustNow" :key="entry.id">
                        <v-hover
                                v-slot="{ isHovering, props }"
                                open-delay="200"
                        >
                            <v-card
                                    :elevation="isHovering ? 16 : 2"
                                    :class="{ 'on-hover': isHovering }" v-bind="props">
                                <router-link :to="{name: 'post-detail', params: {title: entry.title,},}"
                                             class="d-block text-decoration-none" target="_blank">
                                    <div class="g-0 d-grid justify-content-center">
                                        <div class="sdt-image-container d-grid"
                                             style="width: 155px; justify-self: center">
                                            <img
                                                    :src=getUrlImage(entry.thumbnail)
                                                    class="sdt-card-image img-fluid rounded-start h-100 w-100"
                                                    style="height: 130px !important"
                                            >
                                        </div>
                                        <div class="">
                                            <div class="card-body ct-display text-center">
                                                <h5 class="card-title font-weight-bold" style="white-space: nowrap;overflow: hidden; text-overflow: ellipsis;max-width: 200px;">{{entry.title}}</h5>
                                                <div class="sdt-card-text-header pb-2 d-flex">
                                                    <span class="text-red">{{formatCurrency(entry.price)}} VNĐ</span>
                                                    <span class="float-end">
                                                <span class="point"></span>
                                                {{entry.ward.district.province.name}}
                                            </span>
                                                </div>

                                                <div class="sdt-card-footer justify-content-between align-self-end">
                                                    <div class="card-text d-flex justify-content-between">
                                                        <small class="">
                                                            <i class="fa-regular fa-clock pe-1"></i>
                                                            {{calculateElapsedTime(entry.postDate)}}
                                                            {{elapsedTime }} trước
                                                        </small>
                                                        <small class="ms-2"><i class="fa-regular fa-eye"></i>
                                                            {{entry.viewCount}} {{ $t('form.label-viewCount') }}
                                                        </small>
                                                        <button style="margin-top: -5px" class="btn btn-favourite"><i
                                                                class="fa-regular fa-heart"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </v-card>
                        </v-hover>
                    </div>
                </div>
            </div>

            <div class="mt-5 d-grid justify-content-center">
                <span class="title-home">Tin xem nhiều</span>
                <div class="row container">
                    <div class="card col-3" v-for="entry in listPostForView" :key="entry.id">
                        <v-hover
                                v-slot="{ isHovering, props }"
                                open-delay="200"
                        >
                            <v-card
                                    :elevation="isHovering ? 16 : 2"
                                    :class="{ 'on-hover': isHovering }" v-bind="props">
                                <router-link :to="{name: 'post-detail', params: {title: entry.title,},}"
                                             class="d-block text-decoration-none" target="_blank">
                                    <div class="g-0 d-grid justify-content-center">
                                        <div class="sdt-image-container d-grid"
                                             style="width: 155px; justify-self: center">
                                            <img
                                                    :src=getUrlImage(entry.thumbnail)
                                                    class="sdt-card-image img-fluid rounded-start h-100 w-100"
                                                    style="height: 130px !important"
                                            >
                                        </div>
                                        <div class="">
                                            <div class="card-body ct-display text-center">
                                                <h5 class="card-title font-weight-bold " style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 200px;">{{entry.title}}</h5>
                                                <div class="sdt-card-text-header pb-2 d-flex">
                                                    <span class="text-red">{{formatCurrency(entry.price)}} VNĐ</span>
                                                    <span class="float-end">
                                                <span class="point"></span>
                                                {{entry.ward.district.province.name}}
                                            </span>
                                                </div>

                                                <div class="sdt-card-footer justify-content-between align-self-end">
                                                    <div class="card-text d-flex justify-content-between">
                                                        <small class="">
                                                            <i class="fa-regular fa-clock pe-1"></i>
                                                            {{calculateElapsedTime(entry.postDate)}}
                                                            {{elapsedTime }} trước
                                                        </small>
                                                        <small class="ms-2"><i class="fa-regular fa-eye"></i>
                                                            {{entry.viewCount}} {{ $t('form.label-viewCount') }}
                                                        </small>
                                                        <button style="margin-top: -5px" class="btn btn-favourite"><i
                                                                class="fa-regular fa-heart"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </v-card>
                        </v-hover>
                    </div>
                </div>
            </div>

            <div class="mt-5 d-grid justify-content-center">
                <span class="title-home">Đồ điện tử - Website Mua Bán Trực Tuyến Chất lượng</span>
                <div class="row container">
                <span>Đồ điện tử chính thức gia nhập thị trường Việt Nam vào đầu năm 2023, với mục đích tạo ra cho bạn một kênh rao vặt trung gian, kết nối người mua với người bán lại với nhau bằng những giao dịch cực kỳ đơn giản, tiện lợi, nhanh chóng, an toàn, mang đến hiệu quả bất ngờ.
                Với Đồ điện tử, bạn có thể dễ dàng mua bán, trao đổi bất cứ một loại mặt hàng nào, dù đó là đồ cũ hay đồ mới với nhiều lĩnh vực:
                Đồ điện tử: điện thoại di động, máy tính bảng, laptop, tivi, loa, amply...; uy tín được phát triển bởi lập trình viên chất lượng.
                Và còn rất nhiều mặt hàng khác nữa đã và đang được rao bán tại Đồ điện tử.
                Mỗi người trong chúng ta đều có những sản phẩm đã qua sử dụng và không cần dùng tới nữa. Vậy còn chần chừ gì nữa mà không để nó trở nên giá trị hơn với người khác. Rất đơn giản, bạn chỉ cần chụp hình lại, mô tả cụ thể về sản phẩm và sử dụng ứng dụng Đăng tin miễn phí của Đồ điện tử là đã có thể đến gần hơn với người cần nó.
                Không những thế, website dodientu.com còn cung cấp cho bạn thông tin về giá cả các mặt hàng để bạn có thể tham khảo. Đồng thời, thông qua Blog kinh nghiệm, Đồ điện tử sẽ tư vấn, chia sẻ cho bạn những thông tin bổ ích, bí quyết, mẹo vặt giúp bạn có những giao dịch mua bán an toàn, đảm bảo. Đồ điện tử cũng sẵn sàng hỗ trợ bạn trong mọi trường hợp cần thiết.
               </span>
                    <span class="title-home mt-3"> Chúc các bạn có những trải nghiệm mua bán tuyệt vời trên website.</span>
                </div>
            </div>
        </v-main>
    </v-app>
    <Footer/>
</template>

<script>
    import Header from "@/components/Header";
    import Menu from "@/components/Menu";
    import Footer from "@/components/Footer";
    import CategoryService from "../services/category"
    import PostService from "../services/post";
    import ImageService from "../services/image";

    export default {
        data() {
            return {
                item_banners: [
                    {
                        src: 'https://vn-test-11.slatic.net/p/bd65d979ca539f5f234571cde1aff6b3.jpg',
                    },
                    {
                        src: 'https://vn-test-11.slatic.net/p/84b1a611b18783d673534f6c75669773.jpg',
                    },
                    {
                        src: 'https://vn-test-11.slatic.net/p/e9712f2528fddec293f533c907ef83e6.png',
                    },
                    {
                        src: 'https://vn-test-11.slatic.net/p/134493c68d61a5855965f95e09d2f2af.jpg',
                    },
                    {
                        src: 'https://vn-test-11.slatic.net/p/55d14f445ad0623a043aff917649e82a.jpg',
                    },
                    {
                        src: 'https://vn-test-11.slatic.net/p/41523bc3a01d4854ff5a6183d3f18e6d.jpg',
                    },
                ],
                item_category: [],
                listPostJustNow: [],
                listPostForView: [],
                elapsedTime: '',
                interval: null,
            }
        },
        components: {Header, Menu, Footer},
        created() {
            this.getListCategory()
            this.getPostJustNow()
            this.getPostForView()
        },
        methods: {
            getListCategory() {
                CategoryService.list().then(response => {
                    this.item_category = response.data
                })
            },
            getPostJustNow() {
                var params = {};
                params["page"] = 1;
                params["limit"] = 8
                params["sortBy"] = 'post_date'
                params["sortName"] = 'desc'
                PostService.list(params)
                    .then(response => {
                        this.listPostJustNow = response.data.content;
                        this.totalPages = response.data.totalPages;
                        this.totalElements = response.data.totalElements
                    })
            },

            getPostForView() {
                var params = {};
                params["page"] = 1;
                params["limit"] = 8
                params["sortBy"] = 'view_count'
                params["sortName"] = 'desc'
                PostService.list(params)
                    .then(response => {
                        this.listPostForView = response.data.content;
                        this.totalPages = response.data.totalPages;
                        this.totalElements = response.data.totalElements
                    })
            },

            getUrlImage(name) {
                return ImageService.getImage(name);
            },

            dateDiff(date) {
                var date1 = new Date(date.slice(0, 10));
                var date2 = new Date();

                var Difference_In_Time = date2 - date1.getTime();

                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
                return Math.round(Difference_In_Days);
            },

            formatCurrency(value) {
                if (!value) return "";
                const amount = parseInt(value.toString().replace(/\D/g, ""));
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(amount).replace('₫', '')
            },

            calculateElapsedTime(postDate) {
                const currentTime = new Date();
                const inputTime = new Date(postDate);

                const elapsedTime = currentTime - inputTime;
                const secondsElapsed = parseInt(elapsedTime / 1000, 10);

                if (secondsElapsed <= 60) {
                    this.elapsedTime = `${secondsElapsed} giây`;
                } else {
                    const minutesElapsed = parseInt(secondsElapsed / 60, 10);
                    if (minutesElapsed < 60) {
                        this.elapsedTime = `${minutesElapsed} phút`;
                    } else {
                        const hoursElapsed = parseInt(minutesElapsed / 60, 10);
                        if (hoursElapsed < 24) {
                            this.elapsedTime = `${hoursElapsed} giờ`;
                        } else {
                            const daysElapsed = parseInt(hoursElapsed / 24, 10);
                            this.elapsedTime = `${daysElapsed} ngày`;
                        }
                    }
                }
            },
        },
        beforeUnmount() {
            clearInterval(this.interval);
        }
    }
</script>

<style>
    @import '@/assets/css/StyleHome.css';
</style>