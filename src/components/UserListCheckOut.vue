<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-col lg="10" class="px-6 rounded bg-background main-view">
        <v-breadcrumbs :items="items" class="bread">
            <template v-slot:title="{ item }">
                {{ item.title }}
            </template>
        </v-breadcrumbs>

        <div class="container">
            <div class="row">

                <v-tabs
                        v-model="tab"
                        color="deep-purple-accent-4"
                        align-tabs="left"
                        class="custom-tab"
                >

                    <v-tab @click="refuse = false,setRefuse()" :value="0">chờ xác nhận
                    </v-tab>
                    <v-tab @click="refuse = false,setRefuse()" :value="1">Đã xác nhận
                    </v-tab>
                    <v-tab @click="refuse = false,setRefuse()" :value="2">Đã giao
                    </v-tab>
                    <v-tab @click="refuse = true,setRefuse()" :value="3">Đã hủy
                    </v-tab>
                </v-tabs>


                <v-table fixed-header lg="12" id="table" class="table-cart">
                    <thead class="bg-primary-tb text-tb-header">
                    <tr>
                        <th>#</th>
                        <th>Tên sản phẩm</th>
                        <th>Tên người mua</th>
                        <th>Số lượng mua</th>
                        <th>Tổng tiền (đ)</th>
                        <th>Phương thức thanh toán</th>
                        <th>Hình ảnh</th>
                        <th>Trạng thái đơn hàng</th>
                        <th v-if="adminMessage" class="text-red-darken-2">
                            Lý do hủy
                            <span class="arrow asc"></span>
                        </th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr v-for="(item, index) in listCheckOut" :key="item.id" class="">
                        <td>{{index + 1}}</td>
                        <td>{{item.post.title}}</td>
                        <td>{{item.hoTen}}</td>
                        <td v-if="item.status===1">{{item.dataCart.qualityPay}} / {{item.totalQuality}}</td>
                        <td v-else>{{item.dataCart.qualityPay}}</td>
                        <td>{{formatCurrency(item.dataCart.totalPrice)}}</td>
                        <td>{{item.dataCart.type}}</td>
                        <td><img :src=getUrlImage(item.post.thumbnail)
                                 class="d-block rounded" style="height: 100px"></td>
                        <td><span v-if="item.dataCart.status ===0">Chờ xác nhận</span>
                            <span v-if="item.dataCart.status ===1">Đã xác nhận</span>
                            <span v-if="item.dataCart.status ===2">Đã giao hàng</span>
                            <span v-if="item.dataCart.status ===3">Đã từ chối</span>
                        </td>
                        <td v-if="adminMessage"> {{item.dataCart.messageDestroy}}</td>
                        <td class="sdt-action-btn">
                            <v-btn class="ma-2 btn-icon text-center"
                                   color="success"
                                   icon="fa fa-eye"
                                   size="x-small"
                                   @click="handleDetail(item.dataCart.checkOut.id)"
                            ></v-btn>
                            <v-btn class="ma-2 btn-icon text-center"
                                   color="warning"
                                   icon="fa fa-check"
                                   size="x-small"
                                   v-if="item.status===1 && item.dataCart.status ===0"
                                   @click="handleConfirm(item.dataCart.id)"
                            ></v-btn>
                            <v-btn class="ma-2 btn-icon"
                                   color="red"
                                   icon="fa fa-trash"
                                   size="x-small"
                                   @click="deleteDetailbyId(item.dataCart.id)"
                                   v-if="statusDetelte===1 || statusDetelte===2"
                                   :disabled="item.status===1"
                            ></v-btn>
                            <v-btn class="ma-2 btn-icon"
                                   color="primary"
                                   icon="fa fa-trash"
                                   size="x-small"
                                   @click="destroyById(item.dataCart.id)"
                                   v-if="item.status===1 && item.dataCart.status ===0"
                            ></v-btn>
                            <v-btn class="ma-2 btn-icon text-center"
                                   color="warning"
                                   icon="fa fa-check"
                                   size="x-small"
                                   v-if="statusUserPost===1 && item.dataCart.status ===1"
                                   @click="handleDeliver(item.dataCart.id)"
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

                <v-dialog
                        persistent
                        v-model="dialog"
                        transition="dialog-top-transition"
                        class="" style="width: 530px"
                >
                    <v-card>
                        <v-toolbar
                                class="toolbar-forgotPass"
                        >
                            <h2 class="txt-header-forgotPass">Thông tin đơn hàng</h2>
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

                        <div class="d-grid" style="background: aliceblue;">
                            <div class="" >
                                <h3>Thông tin người nhận</h3>
                                <div class="ml-4">
                                    <div class="d-flex">
                                        <span>- Họ tên: </span>
                                        <span class="ml-1">{{infoCheckOut[0].dataCheckOutForId.hoTen}}</span>
                                    </div>
                                    <div class="d-flex">
                                        <span>- Số điện thoại: </span>
                                        <span class="ml-1">{{infoCheckOut[0].dataCheckOutForId.phone}}</span>
                                    </div>
                                    <div class="d-flex">
                                        <span>- Địa chỉ: </span>
                                        <span class="ml-1">{{infoCheckOut[0].dataCheckOutForId.ward.name}},
                                            {{infoCheckOut[0].dataCheckOutForId.ward.district.name}},
                                            {{infoCheckOut[0].dataCheckOutForId.ward.district.province.name}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4">
                                <h3>Thông tin đơn hàng</h3>
                                <div class="ml-4">
                                    <div class="d-flex">
                                        <span>- Tài khoản mua hàng: </span>
                                        <span class="ml-1">{{infoCheckOut[0].dataDetailForId.hoTen}}</span>
                                    </div>
                                    <div class="d-flex">
                                        <span>- Tên sản phẩm: </span>
                                        <span class="ml-1">{{infoCheckOut[0].dataDetailForId.post.title}}</span>
                                    </div>
                                    <div class="d-flex">
                                        <span>- Số lượng mua: </span>
                                        <span class="ml-1">{{infoCheckOut[0].dataDetailForId.dataCart.qualityPay}} sản phẩm</span>
                                    </div>
                                    <div class="d-flex">
                                        <span>- Tổng tiền: </span>
                                        <span class="ml-1">{{formatCurrency(infoCheckOut[0].dataDetailForId.dataCart.totalPrice)}} đ</span>
                                    </div>
                                    <div class="d-flex">
                                        <span>- Phương thức thanh toán: </span>
                                        <span class="ml-1">{{infoCheckOut[0].dataDetailForId.dataCart.type}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-dialog>

                <v-dialog
                        v-model="dialogDestroy"
                        persistent
                        max-width="500"
                        class="form-container"
                >
                    <v-toolbar
                            class="toolbar-forgotPass"
                    >
                        <h2 class="txt-header-forgotPass">Từ chối đơn hàng</h2>
                        <v-btn
                                icon
                                dark
                                @click="dialog = false"
                                class="btn-ext-dialog"
                        >
                            <v-icon>mdi:mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>

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
                                                    v-model="formItem.messageDestroy"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    class="btn-cancel"
                                    @click="dialogDestroy = false"
                            >{{ $t('button.close') }}
                            </v-btn>
                            <v-btn
                                    class="btn-save"
                                    @click="saveDestroy"
                                    :disabled="!form"
                            >{{ $t('button.save') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                </v-dialog>
            </div>
        </div>
    </v-col>


</template>
<script>
    import swal from "sweetalert";
    import PostService from "../services/post";
    import UserService from "../services/user";
    import CheckOutService from "../services/checkout";
    import ImageService from "../services/image";


    export default {
        data() {
            return {
                statusList: [0, 1, 2],
                tab: 0,
                page: 1,
                totalPages: [],
                items: [
                    {
                        title: this.$t('table.user.hrefHome'),
                        disabled: false,
                        href: '/ddt/home',
                    },
                    {
                        title: "Đơn mua",
                        disabled: true,
                        href: 'breadcrumbs_link_2',
                    },
                ],
                loading: true,
                refuse: false,
                listCheckOut: [],
                status: "",
                statusUserPost: "",
                infoCheckOut: [],
                dialog: false,
                adminMessage: false,
                idDetailCart: "",
                dialogDestroy: false,
                form: false,
                messageRules: [
                    v => !!v || ' Text Is required',
                    v => (v && v.length >= 6) || 'Text Is must be more than 6 characters',
                ],
                formItem: [],
                statusDetelte: 0
            }
        },
        mounted() {
            this.getCheckOutList()
        },
        methods: {
            onSubmit() {
                if (!this.form) return
            },
            setRefuse() {
                if (this.refuse) {
                    this.adminMessage = true
                }
                else this.adminMessage = false
            },
            notification(message, type) {
                swal({
                    text: message,
                    icon: type,
                    timer: 5000,
                })
            },
            getCheckOutList() {
                this.loading = true

                var params = {};
                params["page"] = this.page;
                params["limit"] = 5
                params["status"] = this.tab
                CheckOutService.listDetail(params)
                    .then(response => {
                        this.totalPages = response.data.totalPages;
                        this.loading = false
                        let size = response.data.content.length;
                        for (let i = 0; i < size; i++) {
                            let dataCart = response.data.content[i]
                            let idPost = response.data.content[i].postId

                            var params = {};
                            params["isDelete"] = 'false';
                            PostService.findByID(params, idPost)
                                .then(response => {
                                    let totalQuality = response.data.quantity
                                    let dataPost = response.data
                                    let user = JSON.parse(localStorage.getItem("user"))
                                    if (dataCart.userId === user.id) {
                                        if (dataCart.status === 1) {
                                            this.statusUserPost = 0
                                        }
                                        UserService.findUserById(dataCart.userId).then(response => {
                                            let hoTen = response.data.firstName + " " + response.data.lastName
                                            this.listCheckOut.push({
                                                post: dataPost,
                                                dataCart: dataCart,
                                                hoTen: hoTen,
                                                totalQuality: totalQuality,
                                                status: 0
                                            })
                                        })

                                    }
                                    if (response.data.userId === user.id) {
                                        if (dataCart.status === 1) {
                                            this.statusUserPost = 1
                                        }
                                        UserService.findUserById(dataCart.userId).then(response => {
                                            let hoTen = response.data.firstName + " " + response.data.lastName
                                            this.listCheckOut.push({
                                                post: dataPost,
                                                dataCart: dataCart,
                                                totalQuality: totalQuality,
                                                hoTen: hoTen,
                                                status: 1
                                            })
                                        })
                                    }
                                })
                        }
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
            },

            destroyById(id) {
                this.idDetailCart = id;
                this.dialogDestroy = true;
            },

            deleteDetailbyId(id) {
                CheckOutService.deleteDetail(id).then(() => {
                    swal({
                        text: "Xóa thành công",
                        icon: this.$t('message.swal.icon.success'),
                        timer: 5000,
                    }).then((result) => {
                        if (result) {
                            window.location.reload();
                        }
                    })
                })
            },

            saveDestroy() {
                var data = {
                    detailId: this.idDetailCart,
                    status: 3,
                    messageDestroy: this.formItem.messageDestroy
                }
                CheckOutService.setStatus(data)
                    .then(() => {
                        CheckOutService.findByIdDetail(this.idDetailCart).then(response=>{
                            let data = {
                                postId: response.data.postId,
                                quality: response.data.qualityPay
                            }
                            PostService.plusCheckout(data)

                            this.dialogDestroy = false;
                            swal({
                                text: "Từ chối đơn hàng thành công",
                                icon: "success",
                                timer: 5000,
                            }).then(result => {
                                if (result) {
                                    this.tab = 3
                                }
                            })
                        })
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });

            },

            handleConfirm(id) {
                var data = {
                    detailId: id,
                    status: 1,
                    messageDestroy: ""
                }
                CheckOutService.setStatus(data)
                    .then(() => {
                        swal({
                            text: "Xác nhận đơn hàng thành công",
                            icon: "success",
                            timer: 5000,
                        }).then(result => {
                            if (result) {
                                this.tab = 1
                            }
                        })
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });

            },
            handleDeliver(id) {
                var data = {
                    detailId: id,
                    status: 2,
                    messageDestroy: ""
                }
                CheckOutService.setStatus(data)
                    .then(() => {
                        swal({
                            text: "Đơn hàng đã giao thành công",
                            icon: "success",
                            timer: 5000,
                        }).then(result => {
                            if (result) {
                                this.tab = 2
                            }
                        })
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });

            },
            handleDetail(id) {
                this.infoCheckOut = []
                CheckOutService.findByID(id).then(response => {
                    let sizeDataCheckout = this.listCheckOut.length
                    let dataCheckout = this.listCheckOut
                    for (let i = 0; i < sizeDataCheckout; i++) {
                        let idCheckOut = dataCheckout[i].dataCart.checkOut.id
                        let dataDetailForId = dataCheckout[i]
                        if (idCheckOut === id) {
                            this.infoCheckOut.push({dataCheckOutForId: response.data, dataDetailForId: dataDetailForId})
                            console.log(this.infoCheckOut)
                            this.dialog = true
                        }
                    }
                })
            },

            formatCurrency(money) {
                const amount = parseInt(money.toString().replace(/\D/g, ""));
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(amount).replace('₫', '')
            },
            getUrlImage(name) {
                return ImageService.getImage(name);
            },
            convertStatus(status) {
                if (status == 0) {
                    return "Chờ xác nhận"
                }
                if (status == 1) {
                    return "Đã xác nhận"
                }
                if (status == 2) {
                    return "Đã giao"
                }
                if (status == 2) {
                    return "Đã hủy"
                }
            },


        },
        watch: {
            tab() {
                if (this.tab === 2) {
                    this.statusDetelte = 1
                }
                if (this.tab === 3) {
                    this.statusDetelte = 2
                }
                if (this.tab === 0 || this.tab === 1) {
                    this.statusDetelte = 0
                }
                this.listCheckOut = []
                this.getCheckOutList()
            },
            page() {
                this.listCheckOut = []
                this.getCheckOutList()
            }

        },
    }
</script>

<style>
    .sdt-action-btn {
        width: 150px !important;
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

</style>