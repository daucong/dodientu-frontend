<template>
    <v-col lg="10" class="px-5 rounded bg-background">
        <v-breadcrumbs :items="items" class="breadcrumbs">
        </v-breadcrumbs>
        <h1>Thống kê</h1>
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
            <tr v-for="(item, stt) in posts" :key="item.id" class="br-none ">
                <td>{{ stt + 1 }}</td>
                <td>{{ item.year }}</td>
                <td>{{ item.month }}</td>
                <td>{{ item.provinceName }}</td>
                <td>{{ item.totalQuantity }}</td>
            </tr>
            </tbody>
        </v-table>
    </v-col>
</template>
<script>

    import PostService from "../../services/post";

    export default {
        data() {
            return {
                items: [
                    {
                        title: this.$t('table.user.hrefHome'),
                        disabled: false,
                        href: '/ddt/home',
                    },
                    {
                        title: "Thống kê theo các tháng",
                        disabled: true,
                        color:"#1479FF",
                        href: 'list-post-month',
                    },
                ],
                headers: [
                    {
                        name: '#',
                    },
                    {
                        name: 'Năm'
                    },
                    {
                        name: 'Tháng'
                    },
                    {
                        name: 'Tỉnh thành'
                    },
                    {
                        name: 'Số lượng bài đăng'
                    },
                ],
                posts: [],
            }
        },
        mounted() {
            this.getPostByProvice();
        },
        methods: {
            getPostByProvice() {
                PostService.countPostByProvince().then((response) => {
                    this.posts = response.data;
                });
            },
        }
    }
</script>
<style>
    @import '@/assets/css/TableUser.css';
</style>