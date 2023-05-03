<template>
    <div class="container-fluid">
        <div class="row py-3 border-header align-center">
            <div class="col-lg-6 col-md-12 col-12">
                <div class="row mx-auto">
                    <div class="col-lg-3 col-md-3 align-self-center">
                        <p class="header-contact d-inline">
                            <v-icon icon="mdi:mdi-phone header border-0"/>
                            (84-869) 633 830
                        </p>
                    </div>
                    <div class="col-lg-4 col-md-4 align-self-center">
                        <p class="header-contact d-inline" id="location">
                            <v-icon icon="mdi:mdi-map-marker-outline header border-0"/>
                            {{ $t('header.location') }}
                        </p>
                    </div>
                    <div class="col-lg-4 col-md-3 align-self-center">
                        <p class="header-contact d-inline">
                            <v-icon icon="mdi:mdi-email-outline header border-0"/>
                            contact@dodientu.vn
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-12 col-12 ms-auto">
                <div class="row mx-auto justify-content-end">
                    <div class="col-lg-5 col-md-2 col-sm-3 col-5 align-self-center">
                        <span class="span-notification float-end"><v-icon icon="mdi:mdi-bell-outline"/> {{ $t('header.notification') }}</span>
                    </div>
                    <div class="col-lg-3 col-md-2 col-sm-3 col-3 align-self-center px-0">
                        <v-btn class="span-login float-end px-0" variant="text" v-if="!this.loggedIn"
                               @click="$router.push('login')">
                            <v-icon icon="fa fa-user-circle"/>
                            {{ $t('header.signInOut') }}
                        </v-btn>
                        <v-btn class="span-login px-0 float-end" v-if="this.loggedIn" variant="text">
                            <v-icon icon="fa fa-user-circle"/>
                            {{firstName + ' ' + lastName}}
                            <v-menu open-on-hover
                                    activator="parent">
                                <v-list>
                                    <v-list-item
                                            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                                            :title="firstName  + ' ' + lastName"
                                            :subtitle="phone"
                                            value="username"
                                    >
                                    </v-list-item>
                                    <v-list-item>
                                        <v-btn variant="text" prepend-icon="mdi:mdi-table-edit"
                                               @click="$router.push({name: 'user-list-post'}) ">
                                            {{ $t('header.managePost') }}
                                        </v-btn>
                                    </v-list-item>

                                    <v-list-item
                                    >
                                        <v-btn variant="text" prepend-icon="mdi:mdi-account-outline"
                                               @click="goToInfoAccount">
                                            {{ $t('header.changeInfo') }}
                                        </v-btn>
                                    </v-list-item>
                                    <v-list-item v-if="showChangePass">
                                        <v-btn variant="text" prepend-icon="mdi:mdi-account-key"
                                               @click="gotoChangePass">
                                            {{ $t('changePass') }}
                                        </v-btn>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-btn variant="text" prepend-icon="fa fa-light fa-money-bills"
                                               @click="gotoRecharge">
                                            {{ $t('header.recharge') }}
                                        </v-btn>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item>
                                        <v-btn variant="text" @click="logOut" prepend-icon="fa fal fa-sign-out-alt">
                                            {{loggedIn == null ? $t('header.login') : $t('header.logout') }}
                                        </v-btn>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-btn>
                    </div>
                    <div class="col-lg-3 col-md-2 col-sm-3 col-3 ">
                        <div class="float-end">
                            <span v-if="$i18n.locale== 'vi'" class="fi fi-vn fi"></span>
                            <span v-if="$i18n.locale== 'en'" class="fi fi-nz fi"></span>
                            <select v-model="language" class="language float-end text-black">
                                <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
                                    &nbsp;{{ locale }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EventBus from "../common/EventBus";

    export default {
        name: "Header",
        data() {
            return {
                locales: ["en", "vi"],
                loggedIn: [],
                lastName: "",
                firstName: "",
                phone: "",
                id: "",
                status: "",
                language: 'vi'
            }
        },
        mounted() {

        },
        watch: {
            language() {
                this.$i18n.locale = this.language
                window.localStorage.setItem('language', this.language);
            }
        },
        computed: {
            showChangePass() {
                if (this.status == 0)
                    return true
                else
                    return false
            },
        },
        created() {
            EventBus.on("logout", () => {
                this.logOut();
            });
            let data = JSON.parse(localStorage.getItem("user"))
            this.loggedIn = data
            if (data === null)
                this.lastName = null
            else {
                this.lastName = data.lastName
                if (data.firstName === null) {
                    this.firstName = ""
                } else {
                    this.firstName = data.firstName
                }
                this.phone = data.phone
                this.id = data.id
                this.status = data.status
            }
            let test = localStorage.getItem("language");
            this.language = test
            this.$i18n.locale = this.language
        },
        beforeUnmount() {
            EventBus.remove("logout");
        },
        methods: {
            logOut() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/ddt/login');
            },
            goToInfoAccount() {
                this.$router.push({
                    name: 'profile',
                    params: {id: this.id}
                })
            },
            gotoChangePass() {
                this.$router.push({
                    name: 'change-pass',
                    params: {id: this.id}
                })
            },
            gotoRecharge() {
                this.$router.push({
                    name: 'recharge',
                    params: {id: this.id}
                })
            }
        },
    }
</script>

<style scoped>
    @import "../assets/css/Header.css";
</style>