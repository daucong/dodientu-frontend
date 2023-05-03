<template>
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
                                   @click="handleNew"
                            >
                                <span class="text-white" @click="$router.push('post')">{{ $t('button.new') }}</span>
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
            <v-tab :value="1">{{ $t('post-form.post-list-tab-admin.unpprove') }}</v-tab>
            <v-tab :value="2">{{ $t('post-form.post-list-tab-admin.approve') }}</v-tab>
            <v-tab :value="3">{{ $t('post-form.post-list-tab-admin.deny') }}</v-tab>

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

                <td class="sdt-action-btn-admin">
                    <v-btn class="ma-2 btn-icon text-center"
                           color="error"
                           icon="fa fa-circle-xmark"
                           v-if="tab==1"
                           size="x-small"
                           @click="handleDeny(entry.id)"
                    ></v-btn>
                    <v-btn class="ma-2 btn-icon text-center"
                           color="warning"
                           icon="fa fa-check"
                           v-if="tab==1"
                           size="x-small"
                           @click="handleAppect(entry.id)"
                    ></v-btn>
                    <v-btn class="ma-2 btn-icon text-center"
                           color="success"
                           icon="fa fa-eye"
                           size="x-small"
                           @click="handleDetail(entry.id)"
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
                </div>
            </div></div>
    </v-col>

    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                persistent
                max-width="500"
                class="form-container"
        >

            <v-card>
                <v-card-text>
                    <v-container>
                        <v-form v-model="form"
                                @submit.prevent="onSubmit">
                            <v-row>
                                <v-col cols="2" class="align-self-center"><span
                                        class="text-label-form">Nhập lý do</span>
                                </v-col>
                                <v-col cols="9">
                                    <v-text-field
                                            variant="outlined"
                                            :placeholder="$t('form.place-text')"
                                            :rules="messageRules"
                                            v-model="message"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            class="btn-cancel"
                            @click="dialog = false"
                    >{{ $t('button.close') }}
                    </v-btn>
                    <v-btn
                            class="btn-save"
                            @click="saveDeny"
                            :disabled="!form"
                    >{{ $t('button.save') }}
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-row>

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
                message: null,
                postId: null,
                dialog: false,
                form: false,
                messageRules: [
                    v => !!v || ' Text Is required',
                    v => (v && v.length >= 6) || 'Text Is must be more than 6 characters',
                ],

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
            }
        },
        mounted() {
            this.getPostList();
        },
        methods: {
            onSubmit() {
                if (!this.form) return
            },
            notification(message, type) {
                swal({
                    text: message,
                    icon: type,
                    timer: 5000,
                })
            },
            formatPrice(value) {
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(value);
            },
            formatCurrency(money) {
                return money.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.')
            },
            formatDate(date) {
                var dateFormat = new Date(date);
                const day = dateFormat.getDate()
                const month = dateFormat.getMonth() + 1
                const year = dateFormat.getFullYear()

                return `${day}-${month}-${year}`
            },
            getPostList() {
                var params = {};
                params["isDelete"] = 'false';
                params["page"] = this.page;
                params["limit"] = 5
                params["status"] = this.tab
                PostService.listAdmin(params)
                    .then(response => {
                        this.postList = response.data.content;
                        this.totalPages = response.data.totalPages;

                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });

            },
            findByID(id) {
                var params = {};
                params["isDelete"] = 'false';
                PostService.findByID(params, id)
                    .then(response => {
                        this.post = response.data;
                        console.log(this.post)
                        console.log(response.data)
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
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
                    return "Đã từ chối"
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
                this.$router.push({name: 'edit-post', params: {id: id}});
            },
            handleAppect(id) {
                swal(this.cofrimApprove)
                    .then(() => {
                        var params = {};
                        params["status"] = 2;
                        params["message"] = "";
                        PostService.approve(params, id)
                            .then(response => {
                                UserService.bonusAdmin(response.data.postPrice).then()
                                this.post = response.data
                                this.getPostList()
                            })
                            .catch(e => {
                                this.notification(e.response.data.message, "error");
                            });
                    });
            },
            handleDeny(id) {
                this.postId = id;
                this.dialog = true;
            },
            handleNew(){
                this.$router.push({name: 'create-post'})
            },
            saveDeny() {
                var params = {};
                params["status"] = 3;
                params["message"] = this.message;
                console.log(params)
                PostService.approve(params, this.postId)
                    .then(response => {
                        this.post = response.data
                        var data = {
                            userId: response.data.userId,
                            moneyPost: response.data.postPrice
                        }
                        UserService.plushPost(data).then()
                        this.getPostList()
                        this.dialog = false
                        this.notification("Success", "success");
                    })
                    .catch(e => {
                        this.notification(e.response.data.message
                            , "error");
                    });
            },

            handleDetail(id){
                let route = this.$router.resolve({ path: "/ddt/admin/postdetail/" + id});
                window.open(route.href);
            }
        },
        watch: {
            tab() {
                this.getPostList()
            },
            page() {
                this.getPostList()
            }
        },
    }
</script>

<style>
    .pagination {

    }

    .custom-tab {
        margin-bottom: 10px;
    }

    .custom-tab span {
        font-weight: 500;
        font-size: 16px;
        color: #000000;
        font-family: 'Raleway';
    }

    .custom-tab .v-tab__slider {
        background: #B53C12;
    }
    .sdt-dates {
        min-width: 150px;
    }
    .sdt-action-btn-admin {
        width: 200px!important;
    }
</style>