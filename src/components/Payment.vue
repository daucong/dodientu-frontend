<template>
    <div class="container d-grid justify-content-center mb-5">
        <v-div class="d-flex ms-auto">
            <div>
                <span v-if="$i18n.locale== 'vi'" class="fi fi-vn fi"></span>
                <span v-if="$i18n.locale== 'en'" class="fi fi-nz fi"></span>
            </div>
            <select v-model="$i18n.locale" class="language">
                <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
                    &nbsp;{{ locale }}
                </option>
            </select>
        </v-div>
        <div class="">
            <h1 class="mt-4">{{ $t('payment.payment') }}</h1>
            <v-divider></v-divider>
            <div class="d-flex">
                <div class="bg-light p-4 d-grid w-75">
                    <h3>{{ $t('payment.billInfo') }}</h3>
                    <v-divider></v-divider>
                    <span>{{ $t('payment.paymentAmount') }}</span>
                    <span class="text-info fw-bold">{{formatPrice(money)}}</span>
                    <span class="mt-3">{{ $t('payment.orderValue') }}</span>
                    <span class="fw-bold">{{formatPrice(money)}}</span>
                    <span class="mt-3">{{ $t('payment.transactionFee') }}</span>
                    <span class="fw-bold">{{formatPrice(0)}}</span>
                    <span class="mt-3">{{ $t('payment.codeOrders') }}</span>
                    <span class="fw-bold">{{randomFixedInteger(6)}}</span>
                    <span class="mt-3">{{ $t('payment.supplier') }}</span>
                    <span class="fw-bold">{{ $t('payment.sdt') }}</span>
                </div>
                <div class="d-grid p-4 ms-5 w-100">
                    <div class="d-grid text-center">
                        <h3>{{ $t('payment.title') }}</h3>
                        <h3>{{nameBank}}</h3>
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
                    <v-form v-model="form" @submit.prevent="checkRecharge">
                        <v-card-text class="">{{$t('payment.cardNumber')}}</v-card-text>
                        <v-text-field
                                v-model="recharge.cardNumber"
                                :rules="cardNumberRules"
                                :label="$t('payment.etCardNumber')"
                                clearable
                                class="ms-3"
                                variant="outlined"
                                :readonly="loading"
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
                        <v-card-text class="">{{$t('payment.cardName')}}</v-card-text>
                        <v-text-field
                                v-model="recharge.cardName"
                                :rules="cardNameRules"
                                :label="$t('payment.etCardName')"
                                clearable
                                class="ms-3"
                                variant="outlined"
                                :readonly="loading"
                        >
                        </v-text-field>
                        <v-card-text class="">{{$t('payment.yearMonth')}}</v-card-text>
                        <v-text-field
                                v-model="recharge.yearMonth"
                                :rules="yearMonthRules"
                                :label="$t('payment.etYearMonth')"
                                clearable
                                class="ms-3"
                                variant="outlined"
                                :readonly="loading"
                        >
                        </v-text-field>
                        <v-dialog
                                persistent
                                v-model="dialog"
                                transition="dialog-top-transition"
                                class="dialog-forgotPass"
                        >
                            <v-card>
                                <v-form
                                        v-model="form"
                                        @submit.prevent="paymentBill"
                                >
                                    <v-toolbar
                                            class="toolbar-forgotPass"
                                    >
                                        <span class="txt-header-forgotPass">{{ $t('dialog.otp') }}</span>
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
                                            v-model="this.otpNo"
                                            :readonly="loading"
                                            :rules="OTPRules"
                                            class="forgot-email-txt"
                                            clearable
                                            label="Code OTP"
                                            variant="outlined"
                                    ></v-text-field>
                                    <div class="group-btn-forgotPass">
                                        <v-btn
                                                :disabled="!form"
                                                :loading="loading"
                                                color="info"
                                                type="submit"
                                                variant="flat"
                                                class="btn-forgotPass"
                                        >
                                            <span class="txt-forgotPass">Submit</span>
                                        </v-btn>
                                    </div>
                                </v-form>
                            </v-card>
                        </v-dialog>
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
                                    @click="overlay = !overlay"
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

    import UserService from "../services/user"
    import swal from "sweetalert";

    export default {
        data() {
            return {
                emailRules: [
                    (v) => !!v || this.$t('rules.require.email'),
                    (v) => /.+@.+/.test(v) || this.$t('rules.valid.email'),
                ],
                cardNameRules: [
                    (v) => !!v ||  this.$t('rules.require.cardName'),
                ],
                cardNumberRules: [
                    (v) => !!v || this.$t('rules.require.cardNumber'),
                ],
                yearMonthRules: [
                    (v) => !!v || this.$t('rules.require.yearMonth'),
                ],
                OTPRules: [
                    v => !!v || this.$t('rules.require.otp'),
                    v => v.length >= 6 || this.$t('rules.characters.otp'),
                ],
                locales: ["en", "vi"],
                dialog : false,
                loading: false,
                form: false,
                overlay: false,
                recharge: [],
                payment: [],
                money: "",
                idBank: "",
                nameBank: "",
                logoBank: "",
                otpNo:"",
                email:""
            }
        },
        methods: {
            randomFixedInteger(length) {
                return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
            },
            gotoBack() {
                this.$router.push({
                    name: 'recharge',
                })
            },
            formatPrice(value) {
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(value);
            },
            checkRecharge() {
                var data = {
                    cardNumber: this.recharge.cardNumber,
                    cardName: this.recharge.cardName,
                    email: this.email,
                    yearMonth: this.recharge.yearMonth,
                    bankId: {id: this.idBank},
                }
                UserService.recharge(data)
                    .then((response) => {
                        let data = response.data
                        if (data.data === "Otp sent on email account") {
                            this.overlay = true
                            swal({
                                text: data.data,
                                icon: this.$t('message.swal.icon.success'),
                                timer: 5000,
                            })
                            this.dialog = true
                        } else {
                            swal({
                                text: data.message,
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            })
                        }
                    })
                    .catch((e) => {
                        if (e.response.status == 500) {
                            swal({
                                text: this.$t('message.swal.yearMonth'),
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            });
                        }
                    })
            },
            paymentBill() {
                var data = {
                    email: this.email,
                    otpNo: this.otpNo,
                    money: this.money
                }
                UserService.payment(data).then((response) => {
                    let data = response.data
                    if (data.message === "Payment success") {
                        swal({
                            text: data.message,
                            icon: this.$t('message.swal.icon.success'),
                            timer: 5000,
                        })
                        this.$router.push("/ddt/home");
                    } else {
                        swal({
                            text: data.message,
                            icon: this.$t('message.swal.icon.warning'),
                            timer: 5000,
                        })
                    }
                })
            }
        },
        created() {
            this.idBank = localStorage.idBank
            this.money = localStorage.money
            this.nameBank = localStorage.nameBank
            this.logoBank = localStorage.logoBank
        },
        mounted(){
            let data = JSON.parse(localStorage.getItem("user"))
            this.email = data.email;
        }
    }
</script>