<template>
    <Header/>
    <div class="container d-grid p-2 mb-5">
        <div class="">
            <h1 class="mt-4">{{ $t('payment.payment') }}</h1>
            <v-divider></v-divider>
            <div class="d-flex row">
                <div class="bg-light col-6">
                    <h3>{{ $t('payment.billInfo') }}</h3>
                    <v-divider></v-divider>
                    <v-table fixed-header id="table" class="table-cart">
                        <thead class="bg-primary-tb ">
                        <tr>
                            <th class="col-5">Sản phẩm</th>
                            <th class="col-2">Đơn giá</th>
                            <th class="col-2">Số lượng</th>
                            <th class="col-2">Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="cart in listCart" :key="cart.id" class="">
                            <td>{{cart.post.title}}</td>
                            <td>{{formatCurrency(cart.post.price)}}đ</td>
                            <td>{{cart.qualityPay}}</td>
                            <td>{{formatCurrency(cart.totalPrice)}}đ</td>
                        </tr>
                        </tbody>
                    </v-table>
                    <div class="d-flex mt-2" style="background: #fafdff">
                        <span style="color: #00bfa5;">Đơn vị vận chuyển: </span>
                        <div class="ms-5 d-grid">
                            <span>Nhanh</span>
                            <span class="mt-2" style="color: #888; font-size: 12px">Nhận hàng vào {{getDateAfterDays(3)}} - {{getDateAfterDays(4)}}</span>
                        </div>
                        <div class="ms-auto" style="margin-right: 23px">
                            <span>{{formatCurrency(moneyShip)}}đ</span>
                        </div>
                    </div>
                    <div class="justify-content-end d-flex mt-2">
                        <span style="color: #929292">Tổng số tiền ({{totalProduct}} sản phẩm):</span>
                        <span class="ms-1" style="color:#ee4d2d;margin-right: 23px">{{formatCurrency(totalMoneyCheckOut)}}đ</span>
                    </div>
                </div>
                <div class="d-grid col-6">
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
                    <v-form v-model="form" @submit.prevent="saveCheckOut">
                        <h3 class="ml-3">Địa chỉ nhận hàng</h3>
                        <v-card-text class="">Họ và tên</v-card-text>
                        <v-text-field
                                v-model="formItem.hoTen"
                                :rules="rulesDefault"
                                label="Nhập họ tên"
                                clearable
                                class="ms-3"
                                variant="outlined"
                                :readonly="loading"
                        ></v-text-field>

                        <v-card-text class="">Số điện thoại</v-card-text>
                        <v-text-field
                                v-model="formItem.phone"
                                :rules="rulesDefault"
                                label="Nhập số điện thoại"
                                clearable
                                class="ms-3"
                                variant="outlined"
                                :readonly="loading"
                        ></v-text-field>

                        <v-card-text class="">{{ $t('form.label-province') }}
                        </v-card-text>

                        <v-select
                                v-model="formItem.province"
                                :placeholder="$t('form.place-select')"
                                :items="provinces"
                                item-title="name"
                                item-value="id"
                                variant="outlined"
                                density="comfortable"
                                class="ms-3"
                                :rules="rulesDefault"
                                :readonly="loading"
                                @update:modelValue=onChangeProvince
                        ></v-select>

                        <v-card-text class="">{{ $t('form.label-district') }}
                        </v-card-text>
                        <v-select
                                v-model="formItem.district"
                                :placeholder="$t('form.place-select')"
                                :items="districts"
                                item-title="name"
                                item-value="id"
                                variant="outlined"
                                density="comfortable"
                                class="ms-3"
                                ref="selectedDistrict"
                                :rules="rulesDefault"
                                :readonly="loading"
                                @update:modelValue=onChangeDistrict
                        ></v-select>

                        <v-card-text class="">{{ $t('form.label-ward') }}
                        </v-card-text>
                        <v-select
                                v-model="formItem.ward"
                                :placeholder="$t('form.place-select')"
                                :items="wards"
                                item-title="name"
                                item-value="id"
                                variant="outlined"
                                density="comfortable"
                                class="ms-3"
                                ref="selectedWard"
                                :rules="rulesDefault"
                                :readonly="loading"
                        ></v-select>

                        <div class="d-grid text-center">
                            <h3>Phương thức thanh toán</h3>
                        </div>
                        <div class="d-grid justify-content-center">
                            <v-radio-group inline v-model="formItem.radios">
                                <v-radio label="Thanh toán khi nhận hàng" value="1"></v-radio>
                                <v-radio label="Thanh toán bằng thẻ ngân hàng" value="2"></v-radio>
                            </v-radio-group>
                        </div>
                        <div v-if="formItem.radios === '2' ? true : false">
                            <v-card-text class="">Ngân hàng</v-card-text>
                            <div class="ms-3 d-flex flex-column bg-grey-lighten-4 ">
                                <v-btn-toggle
                                        class="justify-content-between w-80 h-100"
                                >
                                    <tr v-for="entity in bank" :key="entity.id" class="d-flex">
                                        <v-btn :value="entity.id" class="bds-btn-bank" @click="listBankById(entity.id)">
                                            <img class="bds-logo-bank" :src="entity.logo"/>
                                        </v-btn>
                                    </tr>
                                </v-btn-toggle>
                            </div>
                            <v-card-text class="">{{$t('payment.cardNumber')}}</v-card-text>
                            <v-text-field
                                    v-model="formItem.cardNumber"
                                    :rules="cardNumberRules"
                                    :label="$t('payment.etCardNumber')"
                                    clearable
                                    class="ms-3"
                                    variant="outlined"
                                    :readonly="loading"
                                    :disabled="checkCard"
                            >
                                <template v-slot:append-inner>
                                    <img
                                            height="30"
                                            width="40"
                                            :src="logoBank"
                                            alt=""
                                    >
                                </template>
                            </v-text-field>

                            <v-card-text class="">Email</v-card-text>
                            <v-text-field
                                    v-model="formItem.email"
                                    label="email"
                                    clearable
                                    class="ms-3"
                                    variant="outlined"
                                    :readonly="loading"
                                    :disabled="checkCard"
                                    :rules="emailRules"
                            >
                            </v-text-field>

                            <v-card-text class="">{{$t('payment.cardName')}}</v-card-text>
                            <v-text-field
                                    v-model="formItem.cardName"
                                    :label="$t('payment.etCardName')"
                                    clearable
                                    class="ms-3"
                                    variant="outlined"
                                    :readonly="loading"
                                    :disabled="checkCard"
                                    :rules="cardNameRules"
                            >
                            </v-text-field>

                            <v-card-text class="">{{$t('payment.yearMonth')}}</v-card-text>
                            <v-text-field
                                    v-model="formItem.yearMonth"
                                    :rules="yearMonthRules"
                                    :label="$t('payment.etYearMonth')"
                                    clearable
                                    class="ms-3"
                                    variant="outlined"
                                    :readonly="loading"
                                    :disabled="checkCard"
                            >
                            </v-text-field>
                        </div>
                        <div class="ms-3 d-flex justify-content-between mt-4">
                            <v-btn
                                    rounded="lg"
                                    color="light"
                                    class="w-50 me-2"
                                    @click="gotoBack"
                            >
                                <span>{{ $t('payment.cancel') }}</span>
                            </v-btn>
                            <v-btn
                                    rounded="lg"
                                    color="danger"
                                    class="w-50 me-3"
                                    type="submit"
                                    :disabled="!form"
                                    :loading="loading"
                            >
                                <span class="text-white">{{ $t('recharge.continue') }}</span>
                            </v-btn>
                        </div>
                    </v-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import swal from "sweetalert";
    import CartService from "../services/cart";
    import BankService from "../services/bank"
    import Header from "./Header";
    import UserService from "../services/user"
    import DoDienTuService from "../services/dodientu";
    import CheckOutTuService from "../services/checkout";
    import PostService from "../services/post";

    export default {
        components: {Header},
        data() {
            return {
                rulesDefault: [
                    (v) => !!v || this.$t('rules.require.rules')
                ],
                emailRules: [
                    (v) => !!v || this.$t('rules.require.email'),
                    (v) => /.+@.+/.test(v) || this.$t('rules.valid.email'),
                ],
                cardNameRules: [
                    (v) => !!v || this.$t('rules.require.cardName'),
                ],
                cardNumberRules: [
                    (v) => !!v || this.$t('rules.require.cardNumber'),
                ],
                yearMonthRules: [
                    (v) => !!v || this.$t('rules.require.yearMonth'),
                ],
                formItem: [],
                loading: false,
                form: false,
                overlay: false,
                listCart: [],
                dataItem: [],
                totalProduct: "",
                moneyShip: 36500,
                totalMoneyCheckOut: "",
                bank: [],
                logoBank: "",
                checkCard: true,
                districts: [],
                wards: [],
                provinces: [],
                idBank: ""
            }
        },
        methods: {
            checkCardBank() {
                var card = {
                    cardNumber: this.formItem.cardNumber,
                    cardName: this.formItem.cardName,
                    email: this.formItem.email,
                    yearMonth: this.formItem.yearMonth,
                    bankId: {id: this.idBank},
                }
                UserService.recharge(card)
                    .then((response) => {
                        let data = response.data
                        if (data.data === "Otp sent on email account") {
                            let user = JSON.parse(localStorage.getItem("user"))
                            let type = ""
                            if (this.formItem.radios === '1') {
                                type = "Thanh toán khi nhận hàng"
                            } else type = "Thanh toán bằng thẻ ngân hàng"
                            var dataCheckOut = {
                                userId: user.id,
                                totalMoneyCheckOut: this.totalMoneyCheckOut + '.00',
                                hoTen: this.formItem.hoTen,
                                phone: this.formItem.phone,
                                ward: {id: this.formItem.ward},
                            }

                            let size = this.listCart.length
                            
                            CheckOutTuService.add(dataCheckOut).then(response => {
                                if (response.data.id !== undefined) {
                                    for (let i = 0; i < size; i++) {
                                        let postId = this.listCart[i].post.id

                                        var detailCheckOut = {
                                            checkOut: {id: response.data.id},
                                            postId: postId,
                                            qualityPay: this.listCart[i].qualityPay,
                                            totalPrice: this.listCart[i].totalPrice,
                                            userId: user.id,
                                            status: 0,
                                            type: type,
                                        }

                                        var dataSubtractCheckout = {
                                            postId: this.listCart[i].post.id,
                                            quality: this.listCart[i].qualityPay
                                        }
                                        PostService.subtractCheckout(dataSubtractCheckout).then(response => {
                                            if (response.data.message === "Số lượng hiện tại không đáp ứng nhu cầu") {
                                                swal({
                                                    text: "Số lượng hiện tại không đáp ứng nhu cầu",
                                                    icon: this.$t('message.swal.icon.warning'),
                                                    timer: 5000,
                                                }).then(result => {
                                                    if (result) {
                                                        this.$router.push({name: 'cart'})
                                                    }
                                                });
                                            }
                                            else {
                                                CheckOutTuService.addDetail(detailCheckOut).then()
                                                this.deleteByIdCart(this.listCart[i].id)
                                            }
                                        })

                                    }
                                }
                            })


                            var dataPaymentNotOtp = {
                                email: this.formItem.email,
                                money: this.totalMoneyCheckOut + '.00',
                            }
                            UserService.paymentNotOtp(dataPaymentNotOtp).then(() => {
                                swal({
                                    text: "Mua hàng thành công",
                                    icon: this.$t('message.swal.icon.success'),
                                    timer: 5000,
                                }).then(result => {
                                    if (result) {
                                        this.$router.push({
                                            name: 'purchase',
                                        })
                                    }
                                })
                            })
                        } else {
                            swal({
                                text: data.message,
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            })
                        }
                    })
                    .catch((e) => {
                        if (e.response.status === 500) {
                            swal({
                                text: this.$t('message.swal.yearMonth'),
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            });
                        }
                    })

            },
            saveCheckOut() {
                this.overlay = true
                let user = JSON.parse(localStorage.getItem("user"))
                if (this.formItem.cardNumber !== undefined) {
                    this.checkCardBank()
                } else {
                    let type = ""
                    if (this.formItem.radios === '1') {
                        type = "Thanh toán khi nhận hàng"
                    } else type = "Thanh toán bằng thẻ ngân hàng"
                    var data = {
                        userId: user.id,
                        totalMoneyCheckOut: this.totalMoneyCheckOut + '.00',
                        hoTen: this.formItem.hoTen,
                        phone: this.formItem.phone,
                        ward: {id: this.formItem.ward},
                    }

                    let size = this.listCart.length
                    CheckOutTuService.add(data).then(response => {
                        if (response.data.id !== undefined) {
                            for (let i = 0; i < size; i++) {
                                let postId = this.listCart[i].post.id

                                var detailCheckOut = {
                                    checkOut: {id: response.data.id},
                                    postId: postId,
                                    qualityPay: this.listCart[i].qualityPay,
                                    totalPrice: this.listCart[i].totalPrice,
                                    userId: user.id,
                                    status: 0,
                                    type: type
                                }

                                var dataSubtractCheckout = {
                                    postId: this.listCart[i].post.id,
                                    quality: this.listCart[i].qualityPay
                                }
                                PostService.subtractCheckout(dataSubtractCheckout).then(response => {
                                    if (response.data.message === "Số lượng hiện tại không đáp ứng nhu cầu") {
                                        swal({
                                            text: "Số lượng hiện tại không đáp ứng nhu cầu!!",
                                            icon: this.$t('message.swal.icon.warning'),
                                            timer: 5000,
                                        }).then(result => {
                                            if (result) {
                                                this.$router.push({name: 'cart'})
                                            }
                                        });
                                    }
                                    else {
                                        swal({
                                            text: "Mua hàng thành công",
                                            icon: this.$t('message.swal.icon.success'),
                                            timer: 5000,
                                        }).then(result => {
                                            if (result) {
                                                CheckOutTuService.addDetail(detailCheckOut).then()
                                                this.deleteByIdCart(this.listCart[i].id)
                                                this.$router.push({
                                                    name: 'purchase',
                                                })
                                            }
                                        })
                                    }
                                })

                            }
                        }
                    })
                }

            },
            deleteByIdCart(id) {
                CartService.deleteCart(id).then()
            },
            findById(id) {
                this.totalMoneyCheckOut = 36500
                CartService.findCartById(id).then(response => {
                    this.totalMoneyCheckOut = this.totalMoneyCheckOut + response.data.totalPrice
                    this.listCart.push(response.data)
                })
            },
            gotoBack() {
                this.$router.push({
                    name: 'cart',
                })
            },
            listBank() {
                BankService.list().then((response) => {
                    this.bank = response.data
                })
            },
            listBankById(id) {
                BankService.findBankById(id).then((response) => {
                    this.logoBank = response.data.logo
                    this.idBank = response.data.id
                    this.checkCard = false
                })
            },
            getDateAfterDays(days) {
                const today = new Date()
                this.today = today.toLocaleDateString('en-IN')
                const threeDaysLater = new Date(today.setTime(today.getTime() + (days * 24 * 60 * 60 * 1000)))
                let date = threeDaysLater.toLocaleDateString('en-IN')
                return date.toLocaleString()
            },
            formatCurrency(money) {
                const amount = parseInt(money.toString().replace(/\D/g, ""));
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(amount).replace('₫', '')
            },
            getProvince() {
                var params = {};
                params["isDelete"] = 'false'
                DoDienTuService.list("province", params)
                    .then(response => {
                        this.provinces = response.data;
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
            },
            getDistrictsByProvinceId() {
                var params = {};
                params["isDelete"] = 'false'
                DoDienTuService.findByParentId("district", "province", params, this.formItem.province)
                    .then(response => {
                        this.districts = response.data
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
            },
            getWardsByDistrictId() {
                var params = {};
                params["isDelete"] = 'false'
                DoDienTuService.findByParentId("ward", "district", params, this.formItem.district)
                    .then(response => {
                        this.wards = response.data
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error")
                    });
            },

            onChangeProvince() {
                this.getDistrictsByProvinceId()
                this.districts = []
                this.wards = []
                this.$refs["selectedDistrict"].reset();
                this.$refs["selectedWard"].reset();
            },
            onChangeDistrict() {
                if (this.formItem.district != null) {
                    this.getWardsByDistrictId(this.formItem.district)
                }

                this.wards = []
                this.$refs["selectedWard"].reset();
            }
        },
        created() {
            this.listBank()
            this.getProvince()
        },
        mounted() {
            let carts = JSON.parse(localStorage.getItem("listCart"));
            let size = carts[0].multiId.length
            for (let i = 0; i < size; i++) {
                this.findById(carts[0].multiId[i])
            }
            this.totalProduct = size
            this.formItem.radios = '1'
        }
    }
</script>
<style>
    .bds-logo-bank {
        width: 60px;
        height: 40px;
    }
</style>