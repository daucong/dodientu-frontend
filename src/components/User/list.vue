<template>
    <v-col lg="10" class="px-5 rounded bg-background">
        <v-breadcrumbs :items="items" class="breadcrumbs">
        </v-breadcrumbs>
        <h1>{{ $t('table.user.title') }}</h1>
        <v-table fixed-header lg="12" id="table" class="table-user">
            <thead class="bg-primary-tb text-tb-header">
            <tr>
                <th class="color-tb bg-primary-tb" v-for="item in headers"
                    :key="item.name">
                    {{ item.name }}
                    <span class="arrow asc"></span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, stt) in users" :key="user.id" class="br-none ">
                <td>{{ stt + 1 }}</td>
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.userName }}</td>
                <td>{{ user.address }}</td>
                <td>{{ user.typeUserId.name }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.email }}</td>
            </tr>
            </tbody>
        </v-table>
    </v-col>
</template>
<script>

    import UserService from "../../services/user";

    export default {
        data() {
            return {
                items: [
                    {
                        title: this.$t('table.user.hrefHome'),
                        disabled: false,
                        href: 'home',
                    },
                    {
                        title: this.$t('table.user.hrefList'),
                        disabled: true,
                        color:"#1479FF",
                        href: 'listUser',
                    },
                ],
                headers: [
                    {
                        name: '#',
                    },
                    {
                        name: this.$t('table.user.FirstName'),
                    },
                    {
                        name: this.$t('table.user.LastName'),
                    },
                    {
                        name: this.$t('table.user.UserName'),
                    },
                    {
                      name: this.$t('table.user.Address')
                    },
                    {
                        name: this.$t('table.user.TypeUser'),
                    },
                    {
                        name: this.$t('table.user.Phone'),
                    },
                    {
                        name: 'Email',
                    },
                ],
                users: [],
            }
        },
        mounted() {
            this.getUser();
        },
        methods: {
            getUser() {
                UserService.list().then((response) => {
                    this.users = response.data;
                });
            },
        }
    }
</script>
<style>
    @import '@/assets/css/TableUser.css';
</style>