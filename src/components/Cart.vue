<template>
    <v-col lg="10" class="px-5 rounded bg-background">
        <v-breadcrumbs :items="items" class="breadcrumbs">
        </v-breadcrumbs>
        <h1>Giỏ hàng</h1>
        <v-table fixed-header lg="12" id="table" class="table-cart">
            <thead class="bg-primary-tb text-tb-header">
            <tr>
                <th>
                    <label class="form-checkbox">
                    <input :disabled="this.disabledCheck" type="checkbox" v-model="selectAll" @click="select">
                    <i class="form-icon"></i>
                    </label>
                </th>
                <th>Tên sản phẩm</th>
                <th>Tên người đăng</th>
                <th>Số lượng mua</th>
                <th>Tổng tiền (đ)</th>
                <th>Hình ảnh</th>
                <th>Hành động</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="cart in carts" :key="cart.id" class="">
                <td v-if="getActivate(cart.data.post.endDate) === 'Hết hạn'">Tin đăng đã hết hạn</td>
                <td v-else>
                    <label class="form-checkbox">
                        <input type="checkbox" :value="cart.data.id" v-model="selected" @change="totalPay">
                        <i class="form-icon"></i>
                    </label>
                </td>
                <td>{{cart.data.post.title}}</td>
                <td>{{cart.hoTen}}</td>
                <td>{{cart.data.qualityPay}}</td>
                <td>{{formatCurrency(cart.data.totalPrice)}}</td>
                <td><img :src=getUrlImage(cart.data.post.thumbnail)
                         class="d-block rounded" style="height: 100px"></td>
                <td class="sdt-action-btn">
                    <v-btn class="ma-2 btn-icon"
                           color="red"
                           icon="fa fa-trash"
                           size="x-small"
                           @click="deletebyId(cart.data.id)"
                    ></v-btn>
                </td>
            </tr>
            </tbody>
        </v-table>
        <div v-if="showMes" class="text-center mt-2">
            <p class="card-text post-description">{{this.message}}</p>
        </div>

        <v-divider></v-divider>
        <div class="justify-content-end d-flex">
            <span class="text-red">Tổng thanh toán: {{formatCurrency(money)}} VNĐ</span>
            <v-btn
                    color="info"
                    type="submit"
                    variant="flat"
                    class="btn-forgotPass"
                    @click="saveCart"
                    :disabled="selected.length === 0 ? true : false"
            >
                <span class="txt-forgotPass"> Mua hàng</span>
            </v-btn>
        </div>
    </v-col>

</template>
<script>

    import CartService from "../services/cart";
    import UserService from "../services/user";
    import ImageService from "../services/image";
    import swal from "sweetalert";

    export default {
        data() {
            return {
                items: [
                    {
                        title: this.$t('table.user.hrefHome'),
                        disabled: false,
                        href: '/ddt/home',
                    },
                    {
                        title: "Danh sách sản phẩm",
                        disabled: true,
                        color: "#1479FF",
                        href: 'list-cart',
                    },
                ],
                carts: [],
                loggedIn: "",
                selected: [],
                selectAll: false,
                money: 0,
                message: "",
                showMes: false,
                disabledCheck: false,
                status1: "",
                status2: ""
            }
        },
        mounted() {
            this.getCart();
            let data = JSON.parse(localStorage.getItem("user"))
            this.loggedIn = data
        },
        watch: {
            status1() {
                if (this.status1 === 2) {
                    let data = []
                    data.push({multiId: this.selected, totalMoney: this.money})
                    localStorage.setItem("listCart", JSON.stringify(data));
                    this.$router.push({
                        name: 'check-out',
                    })
                }
            },
        },
        methods: {
            saveCart() {
                this.status1 = ""
                let data = []
                data.push({multiId: this.selected, totalMoney: this.money})
                let size = data[0].multiId.length
                for (let i = 0; i < size; i++) {
                    CartService.findCartById(data[0].multiId[i]).then(response => {
                        let qualityPay = response.data.qualityPay
                        let qualityPrPost = response.data.post.quantity

                        if (qualityPay > qualityPrPost) {
                            swal({
                                text: "Số lượng hiện tại không đáp ứng nhu cầu!!",
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            }).then(result => {
                                if (result) {
                                    this.$router.push({name: 'cart'})
                                }
                            });
                        } else {
                            this.status1 = 2
                        }
                    })
                }
            },
            select() {
                this.selected = [];
                if (!this.selectAll) {
                    for (let i in this.carts) {
                        this.selected.push(this.carts[i].data.id);
                    }
                }
                this.totalPay()
            },
            totalPay() {
                var size = this.selected.length
                if (size === 0) {
                    this.money = 0
                } else {
                    let dem = 0
                    for (let i = 0; i < size; i++) {
                        CartService.findCartById(this.selected[i]).then(response => {
                            let data = response.data.totalPrice
                            dem = dem + data
                            this.money = dem
                        })
                    }
                }
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
                            CartService.deleteCart(id).then()
                            swal(this.$t('message.swal.icon.success'), {
                                icon: "success",
                            }).then((result) => {
                                if (result) window.location.reload()
                            });
                        }
                    });
            },
            getCart() {
                CartService.list().then((response) => {
                    var user = this.loggedIn
                    let size = response.data.length
                    for (let i = 0; i < size; i++) {
                        if (user.id === response.data[i].userId) {
                            let data = response.data[i]
                            UserService.findUserById(response.data[i].post.userId).then(response => {
                                let hoTen = response.data.firstName + " " + response.data.lastName
                                this.carts.push({data, hoTen: hoTen})

                                if (this.getActivate(data.post.endDate) === 'Hết hạn') {
                                    this.disabledCheck = true
                                }

                                if (this.carts.length === 0) {
                                    this.showMes = true
                                    this.message = "Không có sản phẩm nào"
                                } else {
                                    this.showMes = false
                                    this.message = ""
                                }
                            })
                        }
                    }
                });
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
            getUrlImage(name) {
                return ImageService.getImage(name);
            },
            formatCurrency(money) {
                const amount = parseInt(money.toString().replace(/\D/g, ""));
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(amount).replace('₫', '')
            },
        }
    }
</script>
<style>
</style>