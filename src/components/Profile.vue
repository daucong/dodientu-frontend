<template>
    <div class="d-flex">
        <div class="container">
            <div class="top-table-profile">
                <v-breadcrumbs :items="items" class="breadcrumbs">
                </v-breadcrumbs>
                <h1>{{ $t('profile.infoPersonal') }}</h1>
            </div>
            <v-form v-model="form" class="form-profile" @submit.prevent="SaveUser">
                <div class="name_login">
                    <v-text-field
                            class="txt_name_login"
                            v-model="this.user.userName"
                            :counter="10"
                            :label="$t('table.user.UserName')"
                            disabled
                            variant="outlined"
                    ></v-text-field>
                    <v-text-field
                            class="txt_name_login"
                            v-model="this.user.firstName"
                            :rules="nameRules"
                            :counter="10"
                            :label="$t('table.user.FirstName')"
                            clearable
                            :readonly="loading"
                            variant="outlined"
                    ></v-text-field>
                    <v-text-field
                            class="txt_name_login"
                            v-model="this.user.lastName"
                            :rules="rules"
                            :label="$t('table.user.LastName')"
                            clearable
                            :readonly="loading"
                            variant="outlined"
                    ></v-text-field>
                </div>
                <div class="item_Login">
                    <v-text-field
                            class="txt_item_profile"
                            v-model="this.user.address"
                            :rules="rules"
                            :label="$t('table.user.Address')"
                            clearable
                            :readonly="loading"
                            variant="outlined"
                    ></v-text-field>
                    <v-text-field
                            class="txt_item_profile"
                            v-model="this.user.email"
                            :rules="emailRules"
                            label="E-mail"
                            clearable
                            :readonly="loading"
                            variant="outlined"
                    ></v-text-field>
                    <v-text-field
                            class="txt_item_profile"
                            v-model="this.user.phone"
                            :rules="phoneRules"
                            :label="$t('table.user.Phone')"
                            :counter="11"
                            clearable
                            :readonly="loading"
                            variant="outlined"
                    ></v-text-field>
                    <v-select
                            class="txt_item_profile"
                            v-model="this.typeUserId"
                            :items="type_user" item-title="name"
                            item-value="id"
                            :readonly="loading"
                            variant="outlined"
                    ></v-select>

                    <v-btn variant="flat" color="info" :disabled="!form"
                           :loading="loading" type="submit">
                        <span class="span_saveProfile">{{ $t('button.save') }}</span>
                    </v-btn>
                </div>
            </v-form>

        </div>
    </div>
</template>
<script>
    import swal from "sweetalert";
    import UserService from "../services/user";
    import TypeUserService from "../services/type-user.js";

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
                        title: this.$t('profile.infoPersonal'),
                        disabled: true,
                        color: "#1479FF",
                    },
                ],
                isEditing: null,
                loading: false,
                form: false,
                type_user: [],
                user: [],
                typeUserId: "",
                id: "",
                password: "",
                role: "",
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
                rules: [
                    v => !!v || this.$t('rules.require.rules'),
                ],
            }
        },
        methods: {
            getUser() {
                UserService.findUserById(this.id)
                    .then((response) => {
                        this.user = response.data;
                        this.role = response.data.roles[0].name;
                        this.typeUserId = response.data.typeUserId.id;
                    })
            },
            getTypeUser() {
                TypeUserService.list()
                    .then((response) => {
                        this.type_user = response.data;
                    })
            },
            SaveUser() {
                let role_ = "";
                if (this.role == "ROLE_ADMIN") {
                    role_ = "admin"
                }
                else {
                    role_ = this.role
                }
                var data = {
                    id: this.id,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    address: this.user.address,
                    email: this.user.email,
                    phone: this.user.phone,
                    password: this.password,
                    typeUser: {id: this.typeUserId},
                    role: [role_]
                };
                UserService.addUser(data)
                    .then(() => {
                        swal({
                            text: this.$t('message.swal.txt_user'),
                            icon: this.$t('message.swal.icon.success'),
                            timer: 5000,
                        })
                        let data = JSON.parse(localStorage.getItem("user"))
                        data.email = this.user.email
                        data.firstName = this.user.firstName
                        data.lastName = this.user.lastName
                        data.address = this.user.address
                        data.typeUser = {id: this.typeUserId}
                        data.phone = this.user.phone
                        localStorage.setItem("user", JSON.stringify(data));
                    })
            },
        },
        mounted() {
            let data = JSON.parse(localStorage.getItem("user"))
            this.id = data.id;
            this.getTypeUser();
            this.getUser();
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
    }
</script>
<style scoped>
    @import "../assets/css/Profile.css";
</style>