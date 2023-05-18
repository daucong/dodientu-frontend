<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-col lg="10" class="px-6 rounded bg-background main-view">
        <v-breadcrumbs :items="items" class="bread">
            <template v-slot:title="{ item }">
                {{ item.title }}
            </template>
        </v-breadcrumbs>

        <div class="container">
            <div class="row mb-3">
                <div class="col-12">
                    <div class="row">
                        <div class="col-5"><h2 class="listNews">{{ $t('sidebar.admin.reatly.title') }}</h2></div>
                        <div class="col-2 offset-5">
                            <v-btn class="btn-icon float-end"
                                   color="success"
                                   prepend-icon="fa fa-plus-circle"
                                   @click="this.$router.push('create-post')"
                            >
                                <span class="text-white">{{ $t('button.new') }}</span>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">

        <v-tabs
                v-model="tab"
                color="deep-purple-accent-4"
                align-tabs="left"
                class="custom-tab"
        >

            <v-tab @click="refuse = false,setRefuse()" :value="1">{{ $t('post-form.post-list-tab-admin.unpprove') }}</v-tab>
            <v-tab @click="refuse = false,setRefuse()" :value="2">{{ $t('post-form.post-list-tab-admin.approve') }}</v-tab>
            <v-tab @click="refuse = false,setRefuse()" :value="0">{{ $t('post-form.post-list-tab-admin.draft') }}</v-tab>
            <v-tab @click="refuse = true,setRefuse()" :value="3">{{ $t('post-form.post-list-tab-admin.deny') }}</v-tab>
            <v-tab @click="refuse = false,setRefuse()" :value="4">Đã xóa</v-tab>
        </v-tabs>


        <v-table fixed-header lg="12" id="table" class="br-none bg-white">
            <thead class="bg-primary-tb text-tb-header">
            <tr>
                <th class="color-tb bg-primary-tb">
                   STT
                    <span class="arrow asc"></span>
                </th>
                <th class="color-tb bg-primary-tb">
                    {{$t('form.label-title')}}
                    <span class="arrow asc"></span>
                </th>
                <th class="color-tb bg-primary-tb">
                    {{$t('form.label-type-post')}}
                    <span class="arrow asc"></span>
                </th>

                <th class="color-tb bg-primary-tb">
                    {{$t('form.label-post-times')}}
                    <span class="arrow asc"></span>
                </th>
                <th class="color-tb bg-primary-tb">
                    {{$t('form.label-situation')}}
                    <span class="arrow asc"></span>
                </th>
                <th v-if="adminMessage" class="color-tb bg-primary-tb">
                    Lý do từ chối
                    <span class="arrow asc"></span>
                </th>
                <th class="color-tb bg-primary-tb">{{ $t('table.action') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(entry,index) in postList" :key="entry.id" class="br-none ">
                <td class="row-tb text-tb-content">{{index+1}}</td>
                <td class="row-tb text-tb-content">{{entry.title}}</td>
                <td class="row-tb text-tb-content">{{entry.typePost.typePostName}}</td>
                <td class="row-tb text-tb-content sdt-dates">Từ {{formatDate(entry.postDate)}}<br> Đến {{formatDate(entry.endDate)}}</td>
                <td class="row-tb text-tb-content">{{getActivate(entry.endDate)}}</td>
                <td v-if="adminMessage" class="row-tb text-tb-content">{{entry.adminMessage}}</td>
                <td class="sdt-action-btn">
                    <v-btn class="ma-2 btn-icon"
                           color="warning"
                           icon="fa fa-edit"
                           size="x-small"
                           :disabled="entry.status!=2 || getActivate(entry.endDate)==this.hetHan?false:true"
                           @click="handleEdit(entry.id)"
                    ></v-btn>

                    <v-btn class="ma-2 btn-icon"
                           color="red"
                           icon="fa fa-trash"
                           size="x-small"
                           @click="deletebyId(entry.id)"
                    ></v-btn>
                </td>
            </tr>
            </tbody>
        </v-table>

        <div class="text-center">
            <v-pagination
                    class="sdt-pagination"
                    v-model="page"
                    :length="totalPages"
            ></v-pagination>
        </div></div></div>
    </v-col>


</template>
<script>
    import swal from "sweetalert";
    import PostService from "../../services/post";
    import ImageService from "../../services/image";
    import UserService from "../../services/user";

    export default {
        data() {
            return {
                statusList: [0, 1, 2],
                statusMessage: {
                    draft: this.$t('post-form.status.draft'),
                    approve: this.$t('post-form.status.approve'),
                    deny: this.$t('post-form.status.deny'),
                    unpprove: this.$t('post-form.status.unpprove'),
                },
                cofrimApprove: this.$t('post-form.cofrim-approve'),
                dueDay: this.$t('post-form.due-day'),
                expiredDay: this.$t('post-form.exprired-day'),
                tab: 1,
                dataList: [],
                postList: [],
                page: 1,
                totalPages: [],
                items: [
                    {
                        title: this.$t('table.user.hrefHome'),
                        disabled: false,
                        href: '/ddt/home',
                    },
                    {
                        title: this.$t('sidebar.admin.reatly.post'),
                        disabled: true,
                        href: 'breadcrumbs_link_2',
                    },
                ],
                totalData: 0,
                loading: true,
                options: {},
                statusPost: '',
                headers: [
                    {
                        name: 'ID',
                        code: 'id',
                        type: 'text'
                    },
                    {
                        name: this.$t('form.label-title'),
                        code: 'title',
                        type: 'text'
                    },
                    {
                        name: this.$t('form.label-type-post'),
                        code: 'lng',
                        type: 'text'
                    },
                    {
                        name: this.$t('form.label-acreage-min'),
                        code: 'minAcreage',
                        type: 'text'
                    },
                    {
                        name: this.$t('form.label-acreage-max'),
                        code: 'maxAcreage',
                        type: 'text'
                    },
                    {
                        name: this.$t('form.label-price-min'),
                        code: 'lat',
                        type: 'text'
                    },
                    {
                        name: this.$t('form.label-price-max'),
                        code: 'lat',
                        type: 'text'
                    },
                    {
                        name: this.$t('form.label-status'),
                        code: 'lat',
                        type: 'text'
                    },
                    {
                        name: this.$t('form.label-date-start'),
                        code: 'lat',
                        type: 'text'
                    },
                    {
                        name: this.$t('form.label-date-end'),
                        code: 'lat',
                        type: 'text'
                    },
                    {
                        name: this.$t('form.label-situation'),
                        code: 'lat',
                        type: 'text'
                    },
                ],
                adminMessage: false,
                refuse: false,
                hetHan: "Hết hạn"
            }
        },
        setup() {
            let user = JSON.parse(localStorage.getItem("user"))
            return {
                user
            }
        },

        mounted() {
            this.getPostList();
        },
        methods: {
            formatPrice(value) {
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(value);
            },
            formatCurrency(money) {
                return money.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.')
            },
            notification(message, type) {
                swal({
                    text: message,
                    icon: type,
                    timer: 5000,
                })
            },
            formatDate(date) {
                var dateFormat = new Date(date);
                const day = dateFormat.getDate()
                const month = dateFormat.getMonth() + 1
                const year = dateFormat.getFullYear()

                return `${day}-${month}-${year}`
            },
            getPostList() {
                this.loading = true

                var params = {};
                params["isDelete"] = 'false';
                params["page"] = this.page;
                params["limit"] = 5
                params["status"] = this.tab
                if (this.tab === 4){
                    params["isDelete"] = 'true';
                }
                params["userId"] = this.user.id
                PostService.getAllByUserId(params)
                    .then(response => {
                        this.postList = response.data.content;
                        this.totalPages = response.data.totalPages;
                        this.loading = false
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
            },
            setRefuse(){
                if(this.refuse){
                    this.adminMessage = true
                }
                else this.adminMessage = false
            },
            getUrlImage(name) {
                return ImageService.getImage(name);
            },
            convertStatus(status) {
                if (status == 0) {
                    return "Tin nháp"
                }
                if (status == 1) {
                    return "Chưa duyệt"
                }
                if (status == 2) {
                    return "Đã duyệt"
                }
                if (status == 3) {
                    return "Bị Từ chối"
                }
            },
            getActivate(dateEnd) {
                const date1 = new Date().getTime();
                const date2 = new Date(dateEnd).getTime();

                if (date2 > date1) {
                    return "Còn hạn"
                } else {
                    return "Hết hạn"
                }
            },
            handleEdit(id) {

                localStorage.setItem('postEdit', id)
                this.$router.push({name: 'edit-post'});
            },
            handleNew(){
                this.$router.push({name: 'create-post'})
            },
            deletebyId(id) {
                swal({
                    title: this.$t('message.swal.delete'),
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            PostService.delete(id).then(response => {
                                this.findByID(id)

                                this.getPostList();
                                if (response.data.status === "BAD_REQUEST") {
                                    swal(this.$t('message.swal.delete-error'), {
                                        title: "Xóa thành công",
                                        icon: "error",
                                    });
                                }
                            }).catch(e => {
                                this.notification(e.response.data.message, "error");
                            });

                            swal(this.$t('message.swal.icon.success'), {
                                icon: "success",
                            });
                        }
                    });
            },
            findByID(id) {
                var params = {};
                params["isDelete"] = 'false';
                PostService.findByID(params, id)
                    .then(response => {
                        let dataCha = response.data
                        this.statusPost = response.data.status;
                        if(dataCha.status === 3){
                            var data = {
                                userId: dataCha.userId,
                                moneyPost: dataCha.postPrice
                            }
                            UserService.plushPost(data).then((response) => {
                                console.log(response)
                            })
                        }
                        if(dataCha.status === 1){
                            if(this.getActivate(response.data.endDate) === "Hết hạn"){
                                UserService.findUserById(dataCha.userId).then(response =>{
                                    var data1 = {
                                        userId: dataCha.userId,
                                        moneyPost: dataCha.postPrice,
                                        statusPlus: response.data.status
                                    }
                                    UserService.plushPost(data1).then(() => {
                                        UserService.setStatus(dataCha.userId, 1).then()
                                    })
                                })
                            }
                        }
                    })
                    .catch(e => {
                        this.notification(e, "error");
                    });
            }
        },
        watch: {
            tab() {
                this.getPostList()
            },
            page(){
                this.getPostList()
            }

        },
    }
</script>

<style>
    .sdt-action-btn {
        width: 150px!important;
    }

    .custom-tab {
        margin-bottom: 10px;
    }
    .custom-tab span{
        font-weight: 500;
        font-size: 16px;
        color: #000000;
        font-family: 'Raleway';
    }
    .custom-tab .v-tab__slider {
        background: #B53C12;
    }

</style>