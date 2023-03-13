<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="sidebar">
        <div v-if="showBigMenu" class="big-side-bar">
            <v-icon icon="fa fa-angle-left sidebar" @click="showMenu()"/>
            <div class="account d-flex">
                <div class="avatar">
                    <img src="../assets/images/avatar.jpeg">
                </div>
                <div class="info">
                    <h3 class="name">{{firstName +" "+ lastName}}</h3>
                    <p>{{this.phone}}</p>
                </div>
            </div>
            <div class="balance">
                <h4 class="account-balance">{{ $t('sidebar.balance') }}</h4>
                <p class="text-balance">{{ $t('sidebar.main-account') }}: <span
                        class="float-right main">{{surplus}}</span></p>
                <p class="text-balance">{{ $t('sidebar.promotion-account') }}: <span
                        class="float-right promotion">0</span>
                </p>
                <div class="d-flex justify-center">
                    <button class="btn-balance" @click="gotoRecharge">
                        <v-icon icon="fa fa-duotone fa-money-check-dollar sidebar"/>
                        {{ $t('sidebar.money') }}
                    </button>
                </div>
            </div>
            <div class="menu-sidebar">
                <v-expansion-panels
                        v-model="panel"
                        multiple
                >
                    <v-expansion-panel bg-color="white">
                        <v-expansion-panel-title expand-icon="fa fa-angle-down" collapse-icon="fa fa-angle-up"
                                                 class="panel-title-sidebar">
                            <v-icon icon="fa fa-server sidebar"/>&nbsp; {{ $t('sidebar.news-management.title') }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <router-link :to="{ name: 'create-post' }" class="d-block">{{
                                $t('sidebar.news-management.post') }}
                            </router-link>
                            <router-link :to="{ name: 'user-list-post' }" class="d-block">{{
                                $t('sidebar.news-management.list') }}
                            </router-link>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel v-if="showAdminBoard">
                        <v-expansion-panel-title expand-icon="fa fa-angle-down" collapse-icon="fa fa-angle-up"
                                                 class="panel-title-sidebar">
                            <v-icon icon="fa fa-list-alt sidebar"/>&nbsp; {{ $t('sidebar.admin.categories.title') }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <router-link :to="{ name: 'classfiedreatly' }" class="d-block">{{
                                $t('sidebar.admin.categories.type-classified') }}
                            </router-link>
                            <router-link :to="{ name: 'typepost' }" class="d-block">{{
                                $t('sidebar.admin.categories.type-post') }}
                            </router-link>
                            <router-link :to="{ name: 'typeinterior' }" class="d-block">{{
                                $t('sidebar.admin.categories.type-interior') }}
                            </router-link>
                            <router-link :to="{ name: 'typereatly' }" class="d-block">{{
                                $t('sidebar.admin.categories.type-reatly') }}
                            </router-link>
                            <router-link :to="{ name: 'province' }" class="d-block">{{
                                $t('sidebar.admin.categories.province') }}
                            </router-link>
                            <router-link :to="{ name: 'district' }" class="d-block">{{
                                $t('sidebar.admin.categories.district') }}
                            </router-link>
                            <router-link :to="{ name: 'ward' }" class="d-block">{{ $t('sidebar.admin.categories.ward')
                                }}
                            </router-link>
                        </v-expansion-panel-text>

                    </v-expansion-panel>

                    <v-expansion-panel v-if="showAdminBoard">
                        <v-expansion-panel-title expand-icon="fa fa-angle-down" collapse-icon="fa fa-angle-up"
                                                 class="panel-title-sidebar">
                            <v-icon icon="fa-solid fa-earth-asia sidebar"/>&nbsp; {{ $t('sidebar.admin.reatly.title') }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <router-link :to="{ name: 'admin-list-post' }" class="d-block">{{
                                $t('sidebar.admin.reatly.title') }}
                            </router-link>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-expansion-panel v-if="showAdminBoard">
                        <v-expansion-panel-title expand-icon="fa fa-angle-down" collapse-icon="fa fa-angle-up"
                                                 class="panel-title-sidebar">
                            <v-icon icon="fa-regular fa-newspaper sidebar"/>&nbsp; {{ $t('sidebar.admin.news.title') }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <router-link :to="{ name: 'category-news' }" class="d-block">{{
                                $t('sidebar.admin.news.category') }}
                            </router-link>
                            <router-link :to="{ name: 'manage-tags' }" class="d-block">{{ $t('bread.manage-tags') }}
                            </router-link>
                            <router-link :to="{ name: 'manage-news' }" class="d-block">{{ $t('sidebar.admin.news.list')
                                }}
                            </router-link>
                        </v-expansion-panel-text>

                    </v-expansion-panel>

                    <v-expansion-panel v-if="showAdminBoard">
                        <v-expansion-panel-title expand-icon="fa fa-angle-down" collapse-icon="fa fa-angle-up"
                                                 class="panel-title-sidebar">
                            <v-icon icon="fa fa-solid fa-user sidebar"/>&nbsp; {{ $t('sidebar.admin.user.title') }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <a class="d-block"><span class="click-user" @click="gotoListUser">{{ $t('sidebar.admin.user.title') }}</span></a>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                    <v-expansion-panel v-if="showAdminBoard">
                        <v-expansion-panel-title expand-icon="fa fa-angle-down" collapse-icon="fa fa-angle-up"
                                                 class="panel-title-sidebar">
                            <v-icon icon="fa fa-light fa-user-group sidebar"/>&nbsp; {{
                            $t('sidebar.admin.manage-customer') }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <router-link :to="{ name: 'manage-feedback' }" class="d-block">{{
                                $t('sidebar.admin.manage-feedback') }}
                            </router-link>
                            <router-link :to="{ name: 'manage-partner' }" class="d-block">{{ $t('bread.manage-partner')
                                }}
                            </router-link>
                        </v-expansion-panel-text>

                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </div>
        <div class="small-sidebar" v-else>
            <v-icon icon="fa fa-angle-right sidebar" @click="showMenu()"/>
            <button class="btn-balance">
                <v-icon icon="fa fa-duotone fa-money-check-dollar" class="icon-money-small-sidebar"/>
                Nạp tiền
            </button>
            <hr class="line-sidebar"/>
            <div class="small-sidebar-item">
                <v-icon icon="fa fa-database"/>
                <p class="text-small-sidebar">{{ $t('sidebar.news-management.post') }}</p>
            </div>
            <div class="small-sidebar-item">
                <v-icon icon="fa fa-server"/>
                <p class="text-small-sidebar">{{ $t('sidebar.transactions.title') }}</p>
            </div>
            <div class="small-sidebar-item">
                <v-icon icon="fa fa-light fa-user-group"/>
                <p class="text-small-sidebar">{{ $t('sidebar.customers.title') }}</p>
            </div>
            <div class="small-sidebar-item">
                <v-icon icon="fa fa-book"/>
                <p class="text-small-sidebar">{{ $t('sidebar.quotes&instructions.title') }}</p>
            </div>
            <div class="small-sidebar-item">
                <v-icon icon="fa fa-sliders"/>
                <p class="text-small-sidebar">{{ $t('sidebar.utilities.title') }}</p>
            </div>
        </div>
    </div>
</template>
<script>

    import UserService from "../services/user"

    export default {
        data() {
            return {
                showBigMenu: true,
                panel: [],
                surplus: "",
                firstName: "",
                lastName: "",
                phone: ""
            }
        },
        created() {
            let data = JSON.parse(localStorage.getItem("user"))
            if (data.firstName === null) {
                this.firstName = ""
            } else {
                this.firstName = data.firstName
            }
            this.lastName = data.lastName
            this.phone = data.phone
            this.showMoney();
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            showAdminBoard() {
                if (this.currentUser && this.currentUser['roles']) {
                    return this.currentUser['roles'].includes('ROLE_ADMIN');
                }
                return false;
            },
        },
        methods: {
            showMenu() {
                this.showBigMenu = !this.showBigMenu;
            },
            showMoney() {
                let data = JSON.parse(localStorage.getItem("user"))
                let id = data.id;
                UserService.findUserById(id).then((response) => {
                    this.surplus = response.data.surplus
                    this.surplus = new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "VND"
                    }).format(this.surplus);
                })
            },
            gotoListUser() {
                this.$router.push({
                    name: 'listUser',
                });
            },
            gotoRecharge() {
                this.$router.push({
                    name: 'recharge',
                })
            }
        }
    }
</script>
<style scoped>
    @import "../assets/css/Sidebar.css";
</style>
<style>
    .v-expansion-panel__shadow {
        box-shadow: none !important;
    }

    span.v-expansion-panel-title__overlay {
        background: none;
        padding-bottom: 0;
    }

    .v-expansion-panel.v-expansion-panel--active {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
    }

    .v-expansion-panel-text {
        padding-left: 8px;
    }

    button.v-expansion-panel-title.v-expansion-panel-title {
        color: black;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 130%;
        letter-spacing: 0.0125em;
    }
</style>
