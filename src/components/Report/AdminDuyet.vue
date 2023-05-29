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
            <tr v-for="(item, stt) in reports" :key="item.id" class="br-none ">
                <td>{{ stt + 1 }}</td>
                <td>{{ item.dataReport[stt].post.title }}</td>
                <td>{{ item.nameUser }}</td>
                <td>{{ item.dataReport[stt].createDate }}</td>
                <td>{{ item.dataReport[stt].post.typePost.typePostName }}</td>
                <td>{{ item.dataReport[stt].totalQuality }}</td>
                <td>{{ formatCurrency(item.dataReport[stt].totalMoneyPost) }}</td>
                <td>{{ formatCurrency(item.dataReport[stt].totalMoneyToTypePost) }}</td>
            </tr>
            </tbody>
        </v-table>
    </v-col>
</template>
<script>

    import PostService from "../../services/post";
    import UserService from "../../services/user";

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
                        title: "Thống kê theo các bài đăng được duyệt",
                        disabled: true,
                        color: "#1479FF",
                        href: 'list-post-month',
                    },
                ],
                headers: [
                    {
                        name: '#',
                    },
                    {
                        name: 'Tên bài đăng'
                    },
                    {
                        name: 'Tên người đăng'
                    },
                    {
                        name: 'Thời gian duyệt'
                    },
                    {
                        name: 'Loại tin'
                    },
                    {
                        name: 'Số lượng sản phẩm'
                    },
                    {
                        name: 'Tiền 1/sản phẩm (đ)'
                    },
                    {
                        name: 'Tiền nhận được (đ)'
                    },
                ],
                reports: [],
            }
        },
        mounted() {
            this.getReport();
        },
        methods: {
            getReport() {
                PostService.findByReportToDuyet().then((response) => {
                    let data = response.data;

                    let size = response.data.length
                    for (let i = 0; i < size; i++) {

                        UserService.findUserById(response.data[i].post.userId).then((response) => {
                            let nameUser = response.data.firstName + " " + response.data.lastName
                            this.reports.push({nameUser: nameUser, dataReport: data})
                        })
                    }

                });
            },
            formatCurrency(money) {
                const amount = parseInt(money.toString().replace(/\D/g, ""));
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(amount).replace('₫', '')
            },
        }
    }
</script>
<style>
    @import '@/assets/css/TableUser.css';
</style>