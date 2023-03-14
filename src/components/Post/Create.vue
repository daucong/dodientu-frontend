<template>
    <div class="d-flex">
        <div class="container">
            <div class="top-table-profile">
                <v-breadcrumbs :items="items" class="breadcrumbs">
                </v-breadcrumbs>
                <h1>Đăng tin</h1>
            </div>
            <v-form v-model="form" @submit.prevent="">

            </v-form>
        </div>
    </div>
</template>
<script>

    export default ({
        data() {
            return {
                items: [
                    {
                        title: this.$t('table.user.hrefHome'),
                        disabled: false,
                        href: '/home',
                    },
                    {
                        title: "Đăng tin",
                        disabled: true,
                        color: "#1479FF",
                    },
                ],
                loading: false,
                form: false,
            }
        },
        methods: {}
    })
</script>