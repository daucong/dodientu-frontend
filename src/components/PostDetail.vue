<template>
    <div class="container-fluid p-0">
        <Header/>
        <Menu :bell="cartList"/>
        <div class="container">
            <div class="sdt-post-detail">
                <div class="">
                    <v-breadcrumbs :items="items" class="breadcrumbs">
                    </v-breadcrumbs>
                </div>

                <div class="row">
                    <div class=""><i class="fa-solid fa-location-dot mr-1"></i>
                        <span class="sdt-text-address"> {{post.address}}, {{post.ward.name}}, {{post.ward.district.name}}, {{post.ward.district.province.name}}</span>
                    </div>
                    <div class="col-6">
                        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active ">
                                    <img :src=getUrlImage(this.post.thumbnail)
                                         class="d-block rounded sdt-image-thumbnail">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 d-grid align-content-around mt-5">
                        <v-carousel
                                hide-delimiter-background
                                height="300">
                            <v-carousel-item
                                    v-for="item in post.images"
                                    :key="item.id"
                                    cover
                            >
                                <div class="d-flex justify-content-center"><img :src=getUrlImage(item.urlImage)
                                                                                style="height: 200px"
                                                                                alt="item.nameImage"></div>
                            </v-carousel-item>
                        </v-carousel>
                    </div>
                </div>

                <div class="row">
                    <div class=""><h2 class="sdt-title-page">
                        {{post.title}}</h2></div>
                    <div class=""><span
                            class="sdt-text-acreage">{{formatCurrency(post.price)}} VNĐ</span>
                    </div>
                    <div class="mt-2">
                        <small class="">
                            <i class="fa-regular fa-clock pe-1"></i>
                            {{calculateElapsedTime(post.postDate)}}
                            {{elapsedTime }} trước
                        </small>
                        <small class="px-2"><i class="fa-regular fa-eye"></i>
                            {{post.viewCount}} {{ $t('form.label-viewCount') }}
                        </small>
                    </div>
                </div>
            </div>
        </div>

        <div class="sdt-detail-content">
            <div class="container">
                <div class="row">
                    <div class="col-8 mt-4">
                        <div class="card sdt-post-base-information">
                            <div class="card-body p-4">
                                <h5 class="card-title sdt-card-title">THÔNG TIN MÔ TẢ</h5>
                                <p class="card-text sdt-card-text mt-3 font-weight-bold">Mô tả chi tiết</p>
                                <p class="card-text sdt-card-text mt-3">{{post.description}}</p>
                            </div>
                        </div>

                        <div class="card sdt-post-address-information mt-3">
                            <div class="card-body p-4">
                                <h5 class="card-title sdt-card-title">ĐỊA CHỈ LIÊN HỆ</h5>
                                <div class="d-grid ">
                                    <div class="sdt-label-item-overview font-weight-bold">
                                        <span>Quốc gia: Việt Nam</span>
                                    </div>
                                    <div class="sdt-label-item-overview font-weight-bold my-3">
                                        <span>Địa chỉ liên hệ: {{post.address}}, {{post.ward.name}}, {{post.ward.district.name}}, {{post.ward.district.province.name}}</span>
                                    </div>
                                    <div class="sdt-label-item-overview font-weight-bold">
                                        <span>Số điện thoại liên hệ: {{post.sdtContact}}</span>
                                    </div>
                                    <div class="sdt-label-item-overview font-weight-bold mt-3">
                                        <span>Email liên hệ: {{post.emailContact}}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <v-overlay
                            :model-value="overlay"
                            class="align-center justify-center"
                    >
                        <v-progress-circular
                                color="white"
                                indeterminate
                                size="64"
                        ></v-progress-circular>
                    </v-overlay>
                    <div class="col-4 mt-4 card sdt-post-base-information">
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="card-title sdt-card-title">THÔNG TIN NGƯỜI ĐĂNG</h5>
                                <div class="avatar">
                                    <img style="height: 100px;width: 100px " src="../assets/images/avt.jpg">
                                </div>
                            </div>
                            <div class="ms-3">
                                <div class="d-flex mt-5">
                                    <span class="card-text sdt-card-text font-weight-bold mr-3">Họ và tên: </span>
                                    <span class="card-text sdt-card-text">{{user.firstName}}{{" "}}{{user.lastName}}</span>
                                </div>
                                <div class="d-flex mt-3">
                                    <span class="card-text sdt-card-text font-weight-bold mr-3">Thuộc loại: </span>
                                    <span class="card-text sdt-card-text">{{user.typeUserId.name}}</span>
                                </div>
                                <div class="d-flex mt-3">
                                    <span class="card-text sdt-card-text font-weight-bold mr-3">Email: </span>
                                    <span class="card-text sdt-card-text">{{user.email}}</span>
                                </div>
                                <div class="d-flex mt-3">
                                    <span class="card-text sdt-card-text font-weight-bold mr-3">Số điện thoại: </span>
                                    <span class="card-text sdt-card-text">{{user.phone}}</span>
                                </div>
                                <div class="d-flex mt-3">
                                    <span class="card-text sdt-card-text font-weight-bold mr-3">Địa chỉ: </span>
                                    <span class="card-text sdt-card-text">{{user.address}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showPay" class="text-center mt-2">
                <v-btn
                        rounded="lg"
                        color="danger"
                        class="me-3"
                        type="submit"
                        :loading="loading"
                        @click="loggedIn == null ? $router.push({name:'login'}) : dialog = !dialog"
                >
                    <span class="text-white">Mua hàng</span>
                </v-btn>
            </div>
            <v-dialog
                    persistent
                    v-model="dialog"
                    transition="dialog-top-transition"
                    class="dialog-forgotPass"
            >
                <v-card>
                    <v-form
                            v-model="form"
                            @submit.prevent="saveToCart"
                    >
                        <v-toolbar
                                class="toolbar-forgotPass"
                        >
                            <span class="txt-header-forgotPass">Thông tin mua hàng</span>
                            <v-btn
                                    icon
                                    dark
                                    @click="dialog = false"
                                    class="btn-ext-dialog"
                            >
                                <v-icon>mdi:mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-text-field
                                v-model="post.title"
                                :readonly="loading"
                                class="forgot-email-txt"
                                clearable
                                label="Tên sản phẩm"
                                variant="outlined"
                                disabled
                        ></v-text-field>
                        <v-text-field
                                v-model="formItem.qualityPay"
                                :readonly="loading"
                                class="forgot-email-txt"
                                clearable
                                label="Nhập số lượng"
                                variant="outlined"
                                type="number"
                                :rules="[requiredD]"
                                @update:modelValue="checkQuality"
                        ></v-text-field>
                        <span v-if="requiredTotalMoney" class="text-red-darken-2 ms-1">Tổng tiền: {{formatCurrency(totalMoney)}} VNĐ</span>
                        <span v-if="requiredQuality" class="text-red-darken-2 ms-1">Số lượng vượt quá giới hạn</span>
                        <div class="group-btn-forgotPass">
                            <v-btn
                                    :disabled="!form"
                                    :loading="loading"
                                    color="info"
                                    type="submit"
                                    variant="flat"
                                    class="btn-forgotPass"
                            >
                                <span class="txt-forgotPass"> <v-icon icon="mdi:mdi-cart-variant me-3"
                                                                      style="font-size:25px !important; cursor: pointer"/></span>
                            </v-btn>
                        </div>
                    </v-form>
                </v-card>
            </v-dialog>
            <div class="mt-3"></div>
            <Footer/>
        </div>
    </div>


</template>

<script>
    import Header from "@/components/Header";
    import Menu from "@/components/Menu";
    import Footer from "@/components/Footer";
    import swal from "sweetalert";
    import ImageService from "../services/image";
    import PostService from "../services/post";
    import CategoryService from "../services/category";
    import UserService from "../services/user";
    import CartService from "../services/cart"

    export default {
        name: "PostDetail",
        components: {Header, Menu, Footer},
        data() {
            return {
                requiredD(v) {
                    return !!v || this.$t('rules.require.rules')
                },
                form: false,
                loading: false,
                dialog: false,
                overlay: false,
                items: [
                    {
                        title: this.$t('table.user.hrefHome'),
                        disabled: false,
                        href: '/ddt/home',
                    },
                    {
                        title: "Thông tin sản phẩm",
                        disabled: true,
                        color: "#1479FF",
                    },
                ],
                imageThumbnail: null,
                titlePage: null,
                searchText: null,
                post: {
                    id: null,
                    title: null,
                    description: null,
                    thumbnail: null,
                    address: null,
                    price: null,
                    postPrice: null,
                    quantity: null,
                    viewCount: null,
                    postDate: null,
                    endDate: null,
                    status: null,
                    userId: null,
                    emailContact: null,
                    sdtContact: null,
                    ward: {
                        id: null,
                        name: null,
                        district: {
                            id: null,
                            name: null,
                            province: {
                                id: null,
                                name: null,
                                lat: null,
                                lng: null
                            }
                        }
                    },
                    typePost: {
                        id: null,
                    },
                    category: {
                        id: null
                    }
                },
                user: [],
                formItem: [],
                requiredQuality: false,
                requiredTotalMoney: false,
                totalMoney: "",
                loggedIn: "",
                showPay: true,
                elapsedTime: '',
                interval: null,
            }
        },
        watch: {
            'formItem[quality]'() {
                if (this.formItem['quality'] === ""){
                    this.form = false
                }else {
                    this.checkQuality()
                }

            }
        },

        created() {
            var paramTitle = this.$route.params.title;
            if (typeof (paramTitle) !== 'undefined') {
                this.findByTitle(paramTitle);
            }
            this.imageThumbnail = this.post.thumbnail

        },
        mounted() {
            let data = JSON.parse(localStorage.getItem("user"))
            this.loggedIn = data
            this.getCategory()
        },
        methods: {
            saveToCart() {
                var data = {
                    post: {id: this.post.id},
                    qualityPay: this.formItem.qualityPay,
                    totalPrice: this.totalMoney,
                    userId: this.loggedIn.id
                }
                var CartDTO = {
                    postId: data.post.id,
                    userId: data.userId
                }
                CartService.findByPostId(CartDTO).then((response) => {
                    if (response.data.length !== 0){
                        var dataNew = {
                            id: response.data.id,
                            post: {id: this.post.id},
                            qualityPay: parseInt(this.formItem.qualityPay) + parseInt(response.data.qualityPay),
                            totalPrice: this.totalMoney,
                            userId: this.loggedIn.id
                        }
                        CartService.addCart(dataNew).then(() => {
                            this.$router.push({name: 'cart'})
                        })
                    }
                    else {
                        CartService.addCart(data).then(() => {
                            this.$router.push({name: 'cart'})
                        })
                    }
                })

            },
            checkQuality() {
                if (this.formItem.qualityPay.includes("--")) {
                    this.formItem.qualityPay = this.formItem.qualityPay.replace("--", "");
                    this.form = false
                }
                if (this.formItem.qualityPay <= 0){
                    this.formItem.qualityPay = ""
                    this.form = false
                }
                else {
                    if (this.formItem.qualityPay > this.post.quantity) {
                        this.form = false
                        this.requiredQuality = true
                        this.requiredTotalMoney = false
                    } else {
                        this.requiredQuality = false
                        this.requiredTotalMoney = true
                        this.form = true
                        var quality = this.formItem.qualityPay + '.00'
                        var data = this.post.price * quality
                        this.totalMoney = data
                    }
                }
            },
            findUserById(id) {
                UserService.findUserById(id).then(reponse => {
                    this.user = reponse.data
                })
            },

            countView(id) {
                PostService.countAccess(id).then()
            },

            dateDiff(date) {
                var date1 = new Date(date.slice(0, 10));
                var date2 = new Date();

                var Difference_In_Time = date2 - date1.getTime();

                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
                return Math.round(Difference_In_Days);
            },

            notification(message, type) {
                swal({
                    text: message,
                    icon: type,
                    timer: 5000,
                })
            },
            formatCurrency(money) {
                const amount = parseInt(money.toString().replace(/\D/g, ""));
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(amount).replace('₫', '')
            },
            formatDate(dateNew) {
                const day = dateNew.getDate()
                const month = dateNew.getMonth() + 1
                const year = dateNew.getFullYear()

                return `${year}-${month}-${day}`
            },
            getUrlImage(name) {
                return ImageService.getImage(name);
            },

            getCategory() {
                var params = {};
                params["isDelete"] = 'false';
                CategoryService.list()
                    .then(reponse => {
                        this.categories = reponse.data
                    })
            },

            findByTitle(title) {
                PostService.findByTitle(title)
                    .then(response => {
                        this.post = response.data;
                        this.countView(response.data.id)
                        this.findUserById(response.data.userId)

                        let data = JSON.parse(localStorage.getItem("user"))
                        if (response.data.userId === data.id) {
                            this.showPay = false
                        }
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
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
    }
</script>

<style scoped>
    .sdt-post-detail {
        font-family: 'Raleway';
    }

    .sdt-title-page {
        font-family: 'Playfair Display';
        font-size: 24px;
        line-height: 32px;
        letter-spacing: 0.25px;
        text-transform: capitalize;
    }

    .sdt-text-acreage {
        font-weight: 600;
        font-size: 20px;
        line-height: 130%;
        letter-spacing: 0.001em;
    }

    .sdt-text-address {
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        letter-spacing: 0.0125em;
        color: #696969;
    }

    .sdt-image-thumbnail {
        min-height: 400px;
        max-height: 400px;
        object-fit: cover;
    }

    .sdt-image-list img {
        min-height: 120px;
        max-height: 120px;
        object-fit: cover;
    }

    .sdt-detail-content {
        background: #F2F2F2;
        font-family: 'Raleway';
    }

    .sdt-card-title {
        font-family: 'Playfair Display';
        font-size: 24px;
        line-height: 32px;
        letter-spacing: 0.25px;
    }

    .sdt-card-text {
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        letter-spacing: 0.0015em;
        color: #222222;
    }

    .sdt-post-overview {

    }

    .sdt-img-item-overview {
        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(105, 105, 105, 0.25);
        border-radius: 4px;

    }

    .sdt-img-item-overview img {

    }

    .sdt-label-item-overview {
        display: block;
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        letter-spacing: 0.0015em;
        color: #696969;
    }

    .sdt-text-item-overview {
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
        letter-spacing: 0.0015em;
        color: #000000;
    }

    .sdt-post-address-information {
        font-weight: 500;
        font-size: 14px;
    }

    .sdt-post-map .row {
        height: 500px;
        background: #38E54D;
    }

    .sdt-post-near-area {
        position: relative;
    }

    .sdt-post-near-area .btn-pre, .btn-next {
        border: 1.5px solid #717171;
        position: absolute;
        top: 10px;
    }

    .sdt-post-near-area .btn-pre {
        right: 65px;
    }

    .sdt-post-near-area .btn-next {
        right: 15px;
    }

    .sdt-post-near-area .btn-favourite {
        display: inline;
        float: right;
        padding: 4px;
        padding-left: 8px;
        padding-right: 8px;
    }

    .sdt-post-near-area .card {
        border: none !important;
        background: none !important;
    }

    .sdt-post-near-area .card img {
        min-height: 236px;
    }

    .sdt-post-near-area .card h5 {
        font-weight: 600;
        font-size: 14px;
        line-height: 150%;
        letter-spacing: 0.0125em;
    }

    .sdt-post-near-area .card .text-card-note {
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        letter-spacing: 0.0015em;
    }

    .sdt-post-near-area .sdt-text-day {
        font-family: 'Playfair Display';
        font-weight: 500;
        line-height: 19px;
        letter-spacing: 0.15px;
        color: #000000;
    }

    .btn-category {
        position: absolute;
        margin-top: 10px;
        margin-left: 10px;
    }

    .ct-group-img {
        flex: 1 0 auto;
        justify-content: space-around;
    }
</style>