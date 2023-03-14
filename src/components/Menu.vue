<template>
    <div class="container-fluid px-0">
        <div class="row mx-auto px-3 py-2 menu">
            <nav class="">
                <div class="d-xxl-flex ms-xxl-5" >
                    <div class="d-flex col-4">
                        <img @click="goToHome" class="logo-findhome" src="../assets/images/logo-dodientu.png"/>
                    </div>
                    <div class="collapse navbar-collapse d-flex col-8 row" id="navbarSupportedContent" >
                        <v-card-text style="padding: 0px;" class="col-6">
                            <v-text-field
                                    :loading="loading"
                                    density="compact"
                                    variant="solo"
                                    label="Tìm kiếm..."
                                    append-inner-icon="mdi:mdi-magnify"
                                    single-line
                                    hide-details
                                    @click:append-inner="onClick"
                            ></v-text-field>
                        </v-card-text>
                        <div class="d-flex align-items-center ms-auto col-6">
                            <v-icon icon="mdi:mdi-cart-variant me-3" style="font-size:25px !important; cursor: pointer"/>
                            <v-btn variant="outlined" class="btn-post-menu"
                                   @click="loggedIn == null ? $router.push('login') : $router.push({name: 'createPost'}) ">
                                <span class="color777777 text-capitalize">{{ $t('menu.postNews') }}</span></v-btn>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>

    export default {
        data: () => ({
            loggedIn: "",
            loaded: false,
            loading: false,
        }),
        methods: {
            goToHome() {
                this.$router.push({
                    name: 'home',
                })
            },
            onClick () {
                this.loading = true

                setTimeout(() => {
                    this.loading = false
                    this.loaded = true
                }, 2000)
            },
        },
        mounted() {
            let data = JSON.parse(localStorage.getItem("user"))
            this.loggedIn = data
        }
    };
</script>

<style scoped>
    @import "../assets/css/Menu.css";
</style>