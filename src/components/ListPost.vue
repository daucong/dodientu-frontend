<template>
    <div class="container-fluid p-0">
        <Header/>
        <Menu/>

        <div class="row px-5 py-0 align-self-center sdt-seach-bar">
            <div class="col-0 col-sm-12 col-md-2 col-lg-2 col-xl-2 align-self-center h-100 sdt-border-right">
                <button class="btn btn-outline text-white" type="button"><i class="fa-solid fa-circle-plus"></i> {{
                    $t('form.label-explance') }}
                </button>
            </div>
        </div>

        <div class="sdt-bg-primary">
            <div class="container sdt-web-list-post">
                <div class="">
                    <v-breadcrumbs :items="items" class="breadcrumbs">
                    </v-breadcrumbs>
                </div>

                <div class="row">
                    <h2 class="sdt-text-font-600">{{ titlePage}}</h2>
                </div>

                <div class="row">
                    <div class="col-12 col-sm-12 col-md-8 col-lg-9 sdt-card-item">
                        <div class="row mb-3 w-100 mx-0">
                            <div class="col-md-12 col-lg-4 col-xl-4 ps-0 align-self-center"><span>{{ $t('search.label.nowHave') }} <span
                                    class="sdt-text-font-600">{{ totalElements == null?0:totalElements}}</span> Sản phẩm</span>
                            </div>
                            <div class="col-md-12 col-lg-8 col-xl-8">
                                <div class="row">
                                    <div class="col-md-12 col-lg-3 col-xl-3 px-0 align-self-center text-end"><span
                                            class="sdt-text-font-500">{{ $t('search.label.sort') }}</span></div>
                                    <div class="col-md-12 col-lg-4 col-xl-4 pr-0">
                                        <select class="form-select" v-model="sortName">
                                            <option value="asc">{{ $t('search.label.asc') }}</option>
                                            <option value="desc">{{ $t('search.label.desc') }}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-12 col-lg-5 col-xl-5 pr-0">
                                        <select class="form-select" v-model="sortBy">
                                            <option value="post_date">{{ $t('search.label.date-post') }}</option>
                                            <option value="view_count">{{ $t('search.label.view-count') }}</option>
                                            <option value="price">{{ $t('search.label.min-price') }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="showMes" class="text-center mt-5 card">
                            <p class="card-text post-description">{{this.message}}</p>
                        </div>
                        <div class="card mb-3 " v-for="entry in listPost" :key="entry.id">
                            <router-link :to="{ name: ''}" class="d-block text-decoration-none" target="_blank">
                                <div class="row g-0">
                                    <div class="col-12 col-sm-12 col-md-12 col-lg-5 col-xxl-3 sdt-image-container">
                                        <img
                                                :src=getUrlImage(entry.thumbnail)
                                                class="sdt-card-image img-fluid rounded-start h-100 w-100"
                                        >
                                        <div class="sdt-image-note">
                                            <div class="sdt-image-note-text">
                                                <img src="../../src/assets/images/ic_image_logo.png">
                                                <span>{{ entry.images.length }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-12 col-lg-7 col-xxl-9 d-grid">
                                        <div class="card-body ct-display">
                                            <h5 class="card-title font-weight-bold">{{entry.title}}</h5>
                                            <div class="sdt-card-text-header pb-2">
                                                <span>{{formatCurrency(entry.price)}} VNĐ</span>
                                                <span class="float-end">
                                                <span class="point"></span>
                                                {{entry.address}}, {{entry.ward.name}}, {{entry.ward.district.name}}, {{entry.ward.district.province.name}}
                                            </span>
                                            </div>
                                            <p class="card-text post-description">{{entry.description}}</p>

                                            <div class="sdt-card-footer justify-content-between align-self-end">
                                                <div class="card-text">
                                                    <small class="">
                                                        <i class="fa-regular fa-clock pe-1"></i>
                                                        <span v-if="dateDiff(entry.postDate) < 1"> {{ $t('table.news.today') }}</span>
                                                        <span v-else> {{ dateDiff(entry.postDate) }} {{ $t('news.day-ago') }}</span>
                                                    </small>
                                                    <small class="ms-2"><i class="fa-regular fa-eye"></i>
                                                        {{entry.viewCount}} {{ $t('form.label-viewCount') }}
                                                    </small>
                                                </div>
                                                <button class="btn btn-favourite"><i
                                                        class="fa-regular fa-heart"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>

                        <div class="row" v-if="showPage">
                            <div class="text-center">
                                <v-pagination
                                        class="sdt-pagination"
                                        v-model="page"
                                        :length="totalPages"
                                ></v-pagination>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-sm-12 col-md-4 col-lg-3">
                        <div class="row sdt-options-search mb-3">
                            <v-subheader class="sdt-options-search-title">Lọc theo thể loại
                            </v-subheader>
                            <v-select
                                    v-model="formItem.category"
                                    placeholder="Tất cả"
                                    :items="categories"
                                    item-title="name"
                                    item-value="id"
                                    variant="outlined"
                                    density="comfortable"
                                    @update:modelValue=onChangeListPost
                            ></v-select>
                        </div>
                        <div class="row sdt-options-search mb-3">
                            <h5 class="sdt-options-search-title">{{$t('search.label.sort-by-price') }}</h5>
                            <p v-for="item in sortByPrice" :key="item">
                                <router-link :to="{ name: 'get-post',
                                query: { q: toSlug(item) } }" class="d-block text-decoration-none" target="_blank">
                                    {{item}}
                                </router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>

</template>

<script>
    import Header from "../components/Header";
    import Menu from "../components/Menu";
    import Footer from "../components/Footer";
    import swal from "sweetalert";
    import PostService from "../services/post";
    import ImageService from "../services/image";
    import CategoryService from "../services/category";

    export default {
        name: "ListPost",
        components: {Header, Menu, Footer},
        data() {
            return {
                sortByPrice: ['Dưới 2 triệu', 'Từ 2-4 triệu', 'Từ 4-7 triệu', 'Từ 7-13 triệu', 'Từ 13-20 triệu', 'Trên 20 triệu'],
                listPost: [],
                categories: [],
                formItem: [],
                page: 1,
                totalPages: [],
                options: {},
                itemsPerPage: 5,
                toggle: 1,
                totalElements: null,
                items: [
                    {
                        title: this.$t('table.user.hrefHome'),
                        disabled: false,
                        href: '/ddt/home',
                    },
                    {
                        title: "Tất cả danh mục",
                        disabled: true,
                        color: "#1479FF",
                    },
                ],
                titlePage: null,
                sortName: 'desc',
                sortBy: 'post_date',
                searchText: '',
                provinceId: '',
                message: "",
                showMes: false,
                showPage: false
            }
        },
        created() {
            this.searchText = this.$route.query.q
            this.getPostList(this.searchText)
            this.getCategory()
        },
        mounted() {

        },
        methods: {
            toSlug(str) {
                // Chuyển hết sang chữ thường
                str = str.toLowerCase();

                // xóa dấu
                str = str
                    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
                    .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

                // Thay ký tự đĐ
                str = str.replace(/[đĐ]/g, 'd');

                // Xóa ký tự đặc biệt
                str = str.replace(/([^0-9a-z-\s])/g, '');

                // Xóa khoảng trắng thay bằng ký tự -
                str = str.replace(/(\s+)/g, '-');

                // Xóa ký tự - liên tiếp
                str = str.replace(/-+/g, '-');

                // xóa phần dư - ở đầu & cuối
                str = str.replace(/^-+|-+$/g, '');

                // return
                return str;
            },
            getCategory() {
                CategoryService.list()
                    .then(reponse => {
                        this.categories = reponse.data
                        var name = "Tất cả"
                        this.categories.push({name: name})
                    })
            },
            onEnter() {
                this.getPostList(this.searchText);
            },
            notification(message, type) {
                swal({
                    text: message,
                    icon: type,
                    timer: 5000,
                })
            },
            onChangeListPost() {
                if (this.formItem.category === "Tất cả") {
                    this.getPostList(this.searchText = "");
                }
                else {
                    var params = {};
                    params["categoryId"] = this.formItem.category;
                    PostService.list(params).then(response => {
                        this.listPost = response.data.content;
                        this.totalPages = response.data.totalPages;
                        this.totalElements = response.data.totalElements;
                        var sizeData = response.data.content.length
                        if (sizeData === 0) {
                            this.showMes = true
                            this.showPage = false
                            this.message = "Không tìm thấy sản phẩm nào"
                        } else {
                            this.showMes = false
                            this.message = ""
                            this.showPage = true
                        }
                    })
                }
            },
            formatCurrency(value) {
                if (!value) return "";
                const amount = parseInt(value.toString().replace(/\D/g, ""));
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(amount).replace('₫', '')
            },
            getPostList(query) {
                var params = {};
                params["page"] = this.page;
                params["limit"] = this.itemsPerPage
                params["sortBy"] = this.sortBy;
                params["sortName"] = this.sortName;
                params["query"] = query;
                PostService.list(params)
                    .then(response => {
                        this.listPost = response.data.content;
                        this.totalPages = response.data.totalPages;
                        this.totalElements = response.data.totalElements
                        var sizeData = response.data.content.length
                        if (sizeData === 0) {
                            this.showMes = true
                            this.showPage = false
                            this.message = "Không tìm thấy sản phẩm nào"
                        } else {
                            this.showMes = false
                            this.message = ""
                            this.showPage = true
                        }
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
            // showDetail(id) {
            //     this.$router.push({name:'post-detail', params:{id: id}})
            // },
        },
        watch: {
            options: {
                handler() {
                    this.getPostList(this.searchText)
                },
                deep: true,
            },
            page() {
                this.getPostList(this.searchText)
            },
            sortBy() {
                this.getPostList(this.searchText)
            },
            sortName() {
                this.getPostList(this.searchText)
            }
        }
    }
</script>

<style scoped>
    @import '@/assets/css/WebListPost.css';

    .ct-display{
        display: grid !important;
    }
</style>