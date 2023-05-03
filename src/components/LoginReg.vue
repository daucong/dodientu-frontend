<template>
    <Header/>
    <Menu/>
    <v-card class="containerLogin d-flex flex-row">
        <v-sheet>
            <v-card class="group_left">
                <v-img
                        cover="false"
                        class="imgAsset"
                        :src="require('../assets/images/logo-findhome.png')"
                ></v-img>
                <v-img
                        cover="false"
                        class="imgFrame"
                        :src="require('../assets/images/frame-1.png')"
                ></v-img>
                <v-card-text class="txtGroup"
                >{{ $t('login.welcome') }}
                </v-card-text
                >
            </v-card>
        </v-sheet>
        <v-card class="formLogin">
            <v-tabs v-model="tab" class="tabText">
                <v-tab value="one" slider-color="red"><span class="span_tab">{{ $t('header.login') }}</span></v-tab>
                <v-tab value="two" slider-color="red"><span class="span_tab">{{ $t('header.register') }}</span></v-tab>
            </v-tabs>

            <v-card-text style="line-height: inherit">
                <v-window v-model="tab">
                    <v-window-item value="one">
                        <div>
                            <v-card-text class="cardText_1">{{ $t('login.hello') }}</v-card-text>
                            <v-card-text class="cardText_2"
                            >{{ $t('login.continue-login') }}
                            </v-card-text
                            >
                            <v-form v-model="form"
                                    @submit.prevent="handleLogin">
                                <v-text-field
                                        v-model="userName"
                                        :label="$t('login.place-username')"
                                        prepend-inner-icon="fa fa-thin fa-user"
                                        class="inforLogin"
                                        density="compact"
                                        bg-color="white"
                                        :rules="[required]"
                                        id="userName"
                                        variant="outlined"
                                ></v-text-field>
                                <v-text-field
                                        v-model="password"
                                        bg-color="white"
                                        density="compact"
                                        :append-inner-icon="visible ? 'fa fa-solid fa-eye-slash' : 'fa fa-solid fa-eye'"
                                        :type="visible ? 'text' : 'password'"
                                        :label="$t('register.password')"
                                        prepend-inner-icon="fa fa-thin fa-lock"
                                        @click:append-inner="visible = !visible"
                                        class="inforPass"
                                        :rules="[required]"
                                        variant="outlined"
                                        id="password"
                                ></v-text-field>
                                <v-btn variant="flat" color="error" class="btnLogin" type="submit"
                                       :loading="loading" @click="lsRememberMe">
                                    <span class="span_login">{{ $t('header.login') }}</span>
                                </v-btn>

                                <v-card-text class="item_Login">
                                    <v-checkbox
                                            v-model="checkbox"
                                            :label="$t('login.remember-pass')"
                                            class="checkboxLogin"
                                            value="lsRememberMe" id="rememberMe"
                                    ></v-checkbox>
                                    <v-row>
                                        <v-dialog
                                                persistent
                                                v-model="dialog"
                                                activator="parent"
                                                transition="dialog-top-transition"
                                                class="dialog-forgotPass"
                                        >
                                            <v-card>
                                                <v-form
                                                        v-model="form"
                                                        @submit.prevent="SendgenerateOtp"
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
                                                            v-model="this.generateOtp.email"
                                                            :readonly="loading"
                                                            :rules="emailRules"
                                                            class="forgot-email-txt"
                                                            clearable
                                                            label="Email"
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
                                        <v-dialog
                                                persistent
                                                v-model="dialog_2"
                                                activator="parent"
                                                transition="dialog-top-transition"
                                                class="dialog-forgotPass"
                                        >
                                            <v-card>
                                                <v-form
                                                        v-model="form"
                                                        @submit.prevent="sendVerificationMail"
                                                >
                                                    <v-toolbar
                                                            class="toolbar-forgotPass"
                                                    >
                                                        <span class="txt-header-forgotPass">{{ $t('dialog.code') }}</span>
                                                        <v-btn
                                                                icon
                                                                dark
                                                                @click="dialog_2 = false"
                                                                class="btn-ext-dialog"
                                                        >
                                                            <v-icon>mdi:mdi-close</v-icon>
                                                        </v-btn>
                                                    </v-toolbar>
                                                    <v-divider></v-divider>
                                                    <v-text-field
                                                            v-model="this.generateOtp.email"
                                                            :rules="emailRules"
                                                            :readonly="loading"
                                                            disabled
                                                            class="forgot-email-txt"
                                                            label="Email"
                                                            variant="outlined"
                                                    ></v-text-field>
                                                    <v-text-field
                                                            v-model="this.verificationMail.otpNo"
                                                            :readonly="loading"
                                                            :rules="OTPRules"
                                                            class="forgot-email-txt"
                                                            clearable
                                                            label="Code OTP"
                                                            variant="outlined"
                                                    ></v-text-field>
                                                    <div class="group-btn-forgotPass">
                                                        <v-btn
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
                                        <v-dialog
                                                persistent
                                                v-model="dialog_3"
                                                activator="parent"
                                                transition="dialog-top-transition"
                                                class="dialog-forgotPass"
                                        >
                                            <v-card>
                                                <v-form
                                                        v-model="form"
                                                        @submit.prevent="processResetPassword"
                                                >
                                                    <v-toolbar
                                                            class="toolbar-forgotPass"
                                                    >
                                                        <span class="txt-header-forgotPass">{{ $t('dialog.resetPass') }}</span>
                                                        <v-btn
                                                                icon
                                                                dark
                                                                @click="dialog_3 = false"
                                                                class="btn-ext-dialog"
                                                        >
                                                            <v-icon>mdi:mdi-close</v-icon>
                                                        </v-btn>
                                                    </v-toolbar>
                                                    <v-divider></v-divider>
                                                    <v-text-field
                                                            v-model="this.resetPassword.token"
                                                            :readonly="loading"
                                                            :rules="rules"
                                                            class="forgot-email-txt"
                                                            clearable
                                                            label="Code"
                                                            variant="outlined"
                                                    ></v-text-field>
                                                    <v-text-field
                                                            v-model="this.pw1"
                                                            :readonly="loading"
                                                            :rules="passwordRules"
                                                            class="forgot-email-txt"
                                                            :label="$t('newPass')"
                                                            variant="outlined"
                                                            :append-inner-icon="visible ? 'fa fa-solid fa-eye-slash' : 'fa fa-solid fa-eye'"
                                                            :type="visible ? 'text' : 'password'"
                                                            @click:append-inner="visible = !visible"
                                                    ></v-text-field>
                                                    <v-text-field
                                                            v-model="this.resetPassword.newPassword"
                                                            :rules="passwordRulesConfirm"
                                                            class="forgot-email-txt"
                                                            :label="$t('confirmPass')"
                                                            :readonly="loading"
                                                            persistent-hint
                                                            variant="outlined"
                                                            :append-inner-icon="visible2 ? 'fa fa-solid fa-eye-slash' : 'fa fa-solid fa-eye'"
                                                            :type="visible2 ? 'text' : 'password'"
                                                            @click:append-inner="visible2 = !visible2"
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
                                    </v-row>
                                    <v-card-text class="textForgot" @click="dialog = true">
                                        {{ $t('login.forgot-password') }}
                                    </v-card-text>
                                </v-card-text>
                            </v-form>
                            <v-img
                                    class="imgFrame1250"
                                    :src="require('../assets/images/frame-2.png')"
                            ></v-img>
                            <div style="display: flex">
                                <v-btn prepend-icon="fa fa-brands fa-facebook" class="btnFacebook" @click="loginWithFB(); overlay = !overlay">
                                    Facebook
                                </v-btn>
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
                                <v-btn prepend-icon="fa fa-brands fa-google" class="btnGoogle" @click="loginWithGG(); overlay = !overlay">
                                    Google
                                </v-btn>
                            </div>
                            <div class="txt-bottom">
                                <v-card-text>{{ $t('login.no-member') }}</v-card-text>
                                <v-card-text class="v-card-itemBottom1">{{ $t('header.register') }}
                                </v-card-text>
                                <v-card-text class="v-card-itemBottom2">{{ $t('login.here') }}</v-card-text>
                            </div>
                        </div>
                    </v-window-item>

                    <v-window-item value="two">
                        <v-card style="height: auto; background: #ffffff">
                            <v-card-text class="cardText_1">{{ $t('login.hello') }}</v-card-text>
                            <v-card-text class="cardText_2"
                            >{{ $t('register.new-register') }}
                            </v-card-text
                            >
                            <v-form v-model="form"
                                    @submit.prevent="register" class="formRegister">
                                <div class="itemForm">
                                    <v-card-text class="txt_Form">{{ $t('register.username') }}</v-card-text>
                                    <v-text-field
                                            v-model="userNameReg"
                                            :rules="nameRules"
                                            :counter="10"
                                            :placeholder="$t('register.place-username')"
                                            clearable
                                            :readonly="loading"
                                            class="txt-reg"
                                    ></v-text-field>
                                </div>
                                <div class="itemForm">
                                    <v-card-text class="txt_Form">{{ $t('register.firstname') }}</v-card-text>
                                    <v-text-field
                                            v-model="firstName"
                                            :rules="nameRules"
                                            :counter="10"
                                            :placeholder="$t('register.place-firstname')"
                                            clearable
                                            :readonly="loading"
                                            class="txt-reg"
                                    ></v-text-field>
                                </div>
                                <div class="itemForm">
                                    <v-card-text class="txt_Form">{{ $t('register.lastname') }}</v-card-text>
                                    <v-text-field
                                            v-model="lastName"
                                            :rules="nameRules"
                                            :counter="10"
                                            :placeholder="$t('register.place-lastname')"
                                            clearable
                                            :readonly="loading"
                                            class="txt-reg"
                                    ></v-text-field>
                                </div>
                                <div class="itemForm">
                                    <v-card-text class="txt_Form">{{ $t('register.email') }}</v-card-text>
                                    <v-text-field
                                            v-model="email"
                                            :rules="emailRules"
                                            :placeholder="$t('register.place-email')"
                                            clearable
                                            :readonly="loading"
                                            class="txt-reg"
                                    ></v-text-field>
                                </div>
                                <div class="itemForm">
                                    <v-card-text class="txt_Form">{{ $t('register.phone') }}</v-card-text>
                                    <v-text-field
                                            v-model="phone"
                                            :rules="phoneRules"
                                            :placeholder="$t('register.place-phone')"
                                            :counter="11"
                                            clearable
                                            :readonly="loading"
                                            class="txt-reg"
                                    ></v-text-field>
                                </div>
                                <div class="itemForm">
                                    <v-card-text class="txt_Form"
                                    >{{ $t('register.from') }}
                                    </v-card-text
                                    >
                                    <v-select v-model="typeUserId"
                                              :items="type_user" item-title="name"
                                              item-value="id"
                                              :placeholder="$t('register.place-typeuser')"
                                              :readonly="loading"
                                              class="txt-reg"
                                    ></v-select>
                                </div>
                                <div class="itemForm">
                                    <v-card-text class="txt_Form">{{ $t('register.password') }}</v-card-text>
                                    <v-text-field
                                            v-model="passwordReg"
                                            :rules="passwordRules"
                                            :placeholder="$t('register.place-pass')"
                                            :readonly="loading"
                                            :append-inner-icon="visible ? 'fa fa-solid fa-eye-slash' : 'fa fa-solid fa-eye'"
                                            :type="visible ? 'text' : 'password'"
                                            @click:append-inner="visible = !visible"
                                            class="txt-reg"
                                    ></v-text-field>
                                </div>

                                <v-btn variant="flat" color="error" class="btnLogin" :disabled="!form"
                                       :loading="loading" type="submit">
                                    <span class="span_login">{{ $t('header.register') }}</span>
                                </v-btn>
                            </v-form>
                            <v-img
                                    class="imgFrame1250_2"
                                    :src="require('../assets/images/frame-2.png')"
                            ></v-img>
                            <div style="display: flex">
                                <v-btn prepend-icon="fa fa-brands fa-facebook" class="btnFacebook">
                                    Facebook
                                </v-btn>
                                <v-btn prepend-icon="fa fa-brands fa-google" class="btnGoogle">
                                    Google
                                </v-btn>
                            </div>
                            <div style="display: flex">
                                <v-card-text class="item-reg-accept1"
                                >{{ $t('register.accept') }}
                                </v-card-text
                                >
                                <v-card-text
                                        class="item-reg-accept2"
                                >{{ $t('register.rules') }}
                                </v-card-text
                                >
                                <v-card-text class="item-reg-accept3"
                                >{{ $t('register.of-we') }}
                                </v-card-text
                                >
                            </div>
                            <div class="bottomReg">
                                <v-card-text>{{ $t('register.already-account') }}</v-card-text>
                                <v-card-text
                                        class="itemBottomReg1"
                                >{{ $t('header.login') }}
                                </v-card-text>
                                <v-card-text class="itemBottomReg2"> {{ $t('login.here') }}</v-card-text>
                            </div>
                        </v-card>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-card>
    <Footer/>
</template>
<script>
    import swal from "sweetalert";
    import Header from "../components/Header";
    import Menu from "../components/Menu";
    import Footer from "../components/Footer";
    import TypeUserService from "../services/type-user.js";
    import AuthService from "../services/auth";
    import { googleTokenLogin  } from "vue3-google-login"

    export default {
        components: {Header, Menu, Footer},
        data() {
            return {
                dialog: false,
                dialog_2: false,
                dialog_3: false,
                valid: false,
                form: false,
                loading: false,
                tab: null,
                visible: false,
                visible2: false,
                checkbox: false,
                pw1: "",
                email: "",
                emailRules: [
                    (v) => !!v || this.$t('rules.require.email'),
                    (v) => /.+@.+/.test(v) || this.$t('rules.valid.email'),
                ],
                nameRules: [
                    v => !!v || this.$t('rules.require.name'),
                    v => v.length <= 10 || this.$t('rules.characters.name'),
                ],
                phoneRules: [
                    v => !!v || this.$t('rules.require.phone'),

                ],
                passwordRules: [
                    v => !!v || this.$t('rules.require.password'),
                ],
                passwordRulesConfirm: [
                    v => !!v || this.$t('rules.require.password'),
                    v => v === this.pw1 || this.$t('rules.require.confirmPass')
                ],
                OTPRules: [
                    v => !!v || this.$t('rules.require.otp'),
                    v => v.length >= 6 || this.$t('rules.characters.otp'),
                ],
                rules: [
                    v => !!v || this.$t('rules.require.rules'),
                ],
                type_user: [],
                typeUserId: "",
                userName: "",
                userNameReg: "",
                firstName: "",
                lastName: "",
                phone: "",
                password: "",
                passwordReg: "",
                user: [],
                generateOtp: [],
                verificationMail: [],
                resetPassword: [],
                message: "",
                overlay: false,
                google: [],
                language: 'vi'
            };
        },
        methods: {
            loginWithGG(){
                googleTokenLogin().then((response) => {
                    this.google = response.access_token
                    this.acceptLoginGG()
                })
            },
            acceptLoginGG() {
                let code = this.google
                if (code != null){
                    this.overlay = true
                }
                AuthService.loginGoogle(code)
                    .then((response) => {
                        var user = {
                            userName: response.data.email,
                            typeAccount: "google"
                        }
                        this.$store.dispatch("auth/login", user).then(
                            () => {
                                this.$router.push("/ddt/home");
                            },
                        )
                    });
            },
            loginWithFB() {
                 AuthService.createFacebookAuthorization()
                    .then((response) => {
                        window.location.assign(response.data)
                    })
            },
            acceptLoginFB() {
                let code = this.$route.query.code
                if (code != null){
                    this.overlay = true
                }
                AuthService.createFacebookAccessToken(code)
                    .then((response) => {
                        var user = {
                            userName: response.data.email,
                            typeAccount: "facebook"
                        }
                        this.$store.dispatch("auth/login", user).then(
                            () => {
                                this.$router.push("/ddt/home");
                            },
                        )
                    });
            },
            lsRememberMe() {
                const rmCheck = document.getElementById("rememberMe"),
                    emailInput = document.getElementById("userName"),
                    passInput = document.getElementById("password");
                if (rmCheck.checked && emailInput.value !== "") {
                    localStorage.userName = emailInput.value;
                    localStorage.checkbox = rmCheck.value;
                    localStorage.password = passInput.value;
                } else {
                    localStorage.userName = "";
                    localStorage.checkbox = "";
                    localStorage.password = "";
                }
            },
            getTypeUser() {
                TypeUserService.list()
                    .then((response) => {
                        this.type_user = response.data;
                    })
            },
            handleLogin() {
                if (!this.form) return
                this.loading = true
                setTimeout(() => (this.loading = false), 2000)
                var user = {
                    userName: this.userName,
                    password: this.password
                }
                this.$store.dispatch("auth/login", user).then(
                    () => {
                        this.$router.push("/ddt/home");
                    },
                    (error) => {
                        if (error.response.status == 401) {
                            swal({
                                text: this.$t('message.swal.incorrect.usernameOrPass'),
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            });
                        }
                        this.message =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                    }
                )
            },
            required(v) {
                return !!v || this.$t('rules.require.rules')
            },
            register() {
                var user = {
                    userName: this.userNameReg,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    phone: this.phone,
                    password: this.passwordReg,
                    typeUserId: this.typeUserId

                }
                this.$store.dispatch("auth/register", user).then(
                    () => {
                        setTimeout(function () {
                            window.location.reload();
                        }, 2000);
                        swal({
                            text: this.$t('message.swal.txt_register'),
                            icon: this.$t('message.swal.icon.success'),
                            timer: 5000,
                        });
                    })
                    .catch((e) => {
                        if (e.response.status == 400) {
                            swal({
                                text: this.$t('message.swal.alreadyExist.username'),
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            });
                        }
                    })
            },
            SendgenerateOtp() {
                if (!this.form) return
                this.loading = true
                setTimeout(() => (this.loading = false), 4000)
                var data = {
                    email: this.generateOtp.email
                }
                AuthService.generateOtp(data)
                    .then((response) => {
                        this.dialog = false
                        if (response.data.status === 1){
                            swal({
                                text: this.$t('message.swal.showPassword'),
                                icon: this.$t('message.swal.icon.success'),
                                timer: 5000,
                            });
                        } else {
                            this.dialog_2 = true
                            swal({
                                text: this.$t('message.swal.sendOtp'),
                                icon: this.$t('message.swal.icon.success'),
                                timer: 5000,
                            });
                        }
                    })
                    .catch((e) => {
                        if (e.response.status == 400) {
                            swal({
                                text: this.$t('message.swal.notFound.email'),
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            });
                        }
                    });
            },
            sendVerificationMail() {
                if (!this.form) return
                this.loading = true
                setTimeout(() => (this.loading = false), 4000)
                var data = {
                    email: this.generateOtp.email,
                    otpNo: this.verificationMail.otpNo
                }
                AuthService.sendVerificationMail(data)
                    .then(() => {
                        this.dialog_3 = true
                        this.dialog_2 = false
                        swal({
                            text: this.$t('message.swal.token'),
                            icon: this.$t('message.swal.icon.success'),
                            timer: 5000,
                        });
                    })
                    .catch((e) => {
                        if (e.response.status == 400) {
                            swal({
                                text: this.$t('message.swal.incorrect.otp'),
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            });
                        }
                    });
            },
            processResetPassword() {
                if (!this.form) return
                this.loading = true
                setTimeout(() => (this.loading = false), 4000)
                var data = {
                    token: this.resetPassword.token,
                    newPassword: this.resetPassword.newPassword
                }
                AuthService.processResetPassword(data)
                    .then(() => {
                        this.dialog_3 = false
                        swal({
                            text: this.$t('message.swal.txt_pass'),
                            icon: this.$t('message.swal.icon.success'),
                            timer: 5000,
                        });
                    })
                    .catch((e) => {
                        if (e.response.status == 400) {
                            swal({
                                text: this.$t('message.swal.incorrect.code'),
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            });
                        }
                    });
            },
        },
        mounted() {
            this.getTypeUser();
            this.userName = localStorage.userName
            this.password = localStorage.password
            this.checkbox = localStorage.checkbox
            let codeFb = this.$route.query.code
            if (codeFb != null){
                this.acceptLoginFB();
            }
        }
        ,
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
            ,
        }
        ,
        created() {
            if (this.loggedIn) {
                this.$router.push("/home");
            }
            this.$i18n.locale = this.language
            window.localStorage.setItem('language', this.language);
        },
        watch: {
            overlay (val) {
                val && setTimeout(() => {
                    this.overlay = false
                }, 9000)
            },
        },
    }
    ;
</script>
<style>
    @import "../assets/css/Login.css";
</style>
