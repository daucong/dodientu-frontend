<template>
    <div class="container ms-0">
        <v-form v-model="form" @submit.prevent="SaveListBillBank">
            <div class="top-table-profile">
                <v-breadcrumbs :items="items" class="breadcrumbs">
                </v-breadcrumbs>
                <h1>{{ $t('recharge.recharge') }}</h1>
            </div>
            <div class="d-grid ms-3">
                <v-row class="d-grid ms-1">
                    <span class="w-auto ms-3 mt-3">{{ $t('recharge.money') }}</span>
                    <v-col class="w-50">
                        <v-text-field
                                      type="number"
                                      :rules="rules"
                                      variant="outlined"
                                      clearable
                                      :readonly="loading"
                                      v-model="money"
                                      :value="money"
                                      @input="formatPrice"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <div class="d-flex flex-column ms-3 bg-grey-lighten-4 pa-6 me-5">
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

                <v-row class="d-grid ms-3 mt-2">
                    <v-switch
                            v-model="showMessages"
                            :label="$t('recharge.showBill')"
                            @click="listBillBank"
                    ></v-switch>
                    <v-table v-if="showMessages" class="d-grid">
                        <div class="d-flex w-50">
                            <span class="w-auto me-3 mt-3">{{ $t('recharge.nameUser') }}:</span>
                            <span class="w-auto me-3 mt-3">{{this.billBank.nameUser}}</span>
                        </div>
                        <div class="d-flex w-50">
                            <span class="w-auto me-3 mt-3">{{ $t('recharge.nameBank') }}:</span>
                            <span class="w-auto me-3 mt-3">{{this.billBank.nameBank}}</span>
                        </div>
                        <div class="d-flex w-50">
                            <span class="w-auto me-3 mt-3">{{ $t('recharge.money') }}:</span>
                            <span class="w-auto me-3 mt-3">{{formatPrice(this.billBank.money)}}</span>
                        </div>
                    </v-table>
                    <v-divider class="d-flex me-5"></v-divider>
                    <v-btn class="col-1"
                           variant="flat"
                           color="danger"
                           type="submit"
                           :disabled="!form"
                           :loading="loading"
                    >
                        <span class="text-white">{{ $t('recharge.continue') }}</span>
                    </v-btn>
                </v-row>
            </div>
        </v-form>
    </div>
</template>
<script>

    import swal from "sweetalert";
    import BankService from "../services/bank"

    export default {
        data() {
            return {
                items: [
                    {
                        title: this.$t('table.user.hrefHome'),
                        disabled: false,
                        href: '/home',
                    },
                    {
                        title: this.$t('recharge.recharge'),
                        disabled: true,
                        color: "#1479FF",
                    },
                ],
                rules: [
                    v => !!v || this.$t('rules.require.rules'),
                ],
                loading: false,
                form: false,
                showMessages: false,
                bank: [],
                bankWithId: [],
                money: null,
                id: "",
                billBank: []
            }
        },
        methods: {
            listBank() {
                BankService.list().then((response) => {
                    this.bank = response.data
                })
            },
            formatPrice() {
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(this.money);
            },
            listBankById(id) {
                BankService.findBankById(id).then((response) => {
                    this.bankWithId = response.data
                    this.billBank.nameBank = this.bankWithId.name
                })
            },
            listBillBank() {
                if (this.showMessages === false) {
                    const data = JSON.parse(localStorage.getItem("user"))
                    this.billBank.nameUser = data.lastName
                    this.billBank.money = this.money
                    this.billBank.nameBank = this.bankWithId.name
                }
            },
            SaveListBillBank(){
                localStorage.money = this.money
                localStorage.nameBank = this.bankWithId.name
                localStorage.idBank = this.bankWithId.id
                localStorage.logoBank = this.bankWithId.logo
                if (localStorage.nameBank === "undefined"){
                    swal({
                        text: this.$t('message.swal.selectBank'),
                        icon: this.$t('message.swal.icon.warning'),
                        timer: 5000,
                    });
                } else {
                    this.gotoPaymet()
                }
            },
            gotoPaymet(){
                this.$router.push({
                    name: 'payment',
                })
            }
        },
        computed: {
            messages() {
                return this.showMessages ? ['Message'] : undefined
            },

        },
        created() {
            this.listBank();
        },
    }
</script>
<style scoped>
    @import "../assets/css/Recharge.css";
</style>