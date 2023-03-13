<template>
    <div class="d-flex">
        <div class="container">
            <div class="top-table">
                <v-breadcrumbs :items="items" class="breadcrumbs">
                </v-breadcrumbs>
                <h1>{{ $t('changePass') }}</h1>
            </div>
            <v-form v-model="form" class="form-changePass" @submit.prevent="SaveChange">
                <div class="item_changePass">
                    <v-text-field
                            v-model="this.updatePassword.oldPassword"
                            :rules="passwordRules"
                            :label="$t('password')"
                            :readonly="loading"
                            persistent-hint
                            variant="outlined"
                            :append-inner-icon="visible ? 'fa fa-solid fa-eye-slash' : 'fa fa-solid fa-eye'"
                            :type="visible ? 'text' : 'password'"
                            @click:append-inner="visible = !visible"
                            class="text_changPass"
                    ></v-text-field>
                    <v-text-field
                            v-model="this.pw1"
                            :rules="passwordRules"
                            :label="$t('newPass')"
                            :readonly="loading"
                            persistent-hint
                            variant="outlined"
                            :append-inner-icon="visible1 ? 'fa fa-solid fa-eye-slash' : 'fa fa-solid fa-eye'"
                            :type="visible1 ? 'text' : 'password'"
                            @click:append-inner="visible1 = !visible1"
                            class="text_changPass"
                    ></v-text-field>
                    <v-text-field
                            v-model="this.updatePassword.newPassword"
                            :rules="passwordRulesConfirm"
                            :label="$t('confirmPass')"
                            :readonly="loading"
                            persistent-hint
                            variant="outlined"
                            :append-inner-icon="visible2 ? 'fa fa-solid fa-eye-slash' : 'fa fa-solid fa-eye'"
                            :type="visible2 ? 'text' : 'password'"
                            @click:append-inner="visible2 = !visible2"
                            class="text_changPass"
                    ></v-text-field>
                </div>
                <v-btn variant="flat" color="info" :disabled="!form"
                       :loading="loading" type="submit">
                    <span class="span_saveChangPass">Save</span>
                </v-btn>

            </v-form>

        </div>
    </div>
</template>
<script>
    import swal from "sweetalert";
    import UserService from "../services/user";

    export default {
        data() {
            return {
                items: [
                    {
                        title: this.$t('table.user.hrefHome'),
                        disabled: false,
                        href: '/home'
                    },
                    {
                        title: this.$t('changePass'),
                        disabled: true,
                        color: "#1479FF",
                    },
                ],
                isEditing: null,
                loading: false,
                form: false,
                visible: false,
                visible1: false,
                visible2: false,
                updatePassword: [],
                id: "",
                pw1: "",
                emailRules: [
                    (v) => !!v || this.$t('rules.require.email'),
                    (v) => /.+@.+/.test(v) || this.$t('rules.valid.email'),
                ],
                passwordRules: [
                    v => !!v || this.$t('rules.require.password'),
                ],
                passwordRulesConfirm: [
                    v => !!v || this.$t('rules.require.password'),
                    v => v === this.pw1 || this.$t('rules.require.confirmPass')
                ]
            }
        },
        methods: {
            SaveChange() {
                var data = {
                    id: this.id,
                    oldPassword: this.updatePassword.oldPassword,
                    newPassword: this.updatePassword.newPassword,
                };
                UserService.updateUserPassword(data)
                    .then(() => {
                        this.$router.push("/home");
                        swal({
                            text: this.$t('message.swal.txt_pass'),
                            icon: this.$t('message.swal.icon.success'),
                            timer: 5000,
                        });
                    })
                    .catch((e) => {
                        if (e.response.status == 500) {
                            swal({
                                text: this.$t('message.swal.notFound.email'),
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            });
                        }
                        if (e.response.status == 417) {
                            swal({
                                text: this.$t('message.swal.incorrect.password'),
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            });
                        }
                        if (e.response.status == 400) {
                            swal({
                                text: this.$t('message.swal.confirmPass'),
                                icon: this.$t('message.swal.icon.warning'),
                                timer: 5000,
                            });
                        }
                    });
            },
        },
        mounted() {
            let data = JSON.parse(localStorage.getItem("user"))
            this.id = data.id;
        }
    }
</script>
<style scoped>
    @import "../assets/css/ChangePass.css";
</style>
