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
                <td>{{ item.dataPost.title }}</td>
                <td>{{ item.userBan }}</td>
                <td>{{ item.userMua }}</td>
                <td>{{ item.dataReport[stt].createDate }}</td>
                <td>{{ item.dataReport[stt].totalQuality }}</td>
                <td>{{ formatCurrency(item.dataReport[stt].totalMoney) }}</td>
            </tr>
            </tbody>
        </v-table>
    </v-col>
</template>
<script>

    import CheckOutService from "../../services/checkout";
    import UserService from "../../services/user";
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
                        title: "Thống kê Theo đơn hàng thanh toán thành công",
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
                        name: 'Tên người mua'
                    },
                    {
                        name: 'Thời gian thanh toán'
                    },
                    {
                        name: 'Số lượng mua'
                    },
                    {
                        name: 'Tổng tiền đơn (đ)'
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
                CheckOutService.findByReportUserToPayment().then((response) => {
                    let data = response.data;

                    let size = response.data.length
                    for (let i = 0; i < size; i++) {
                        let postId = response.data[i].post
                        UserService.findUserById(response.data[i].userId).then((response) => {
                            let nameUserMua = response.data.firstName + " " + response.data.lastName

                            var params = {};
                            params["isDelete"] = 'false';
                            PostService.findByID(params, postId).then(response => {
                                let dataPost = response.data
                                UserService.findUserById(response.data.userId).then((response) => {
                                    let nameUserBan = response.data.firstName + " " + response.data.lastName
                                    this.reports.push({
                                        userMua: nameUserMua,
                                        userBan: nameUserBan,
                                        dataReport: data,
                                        dataPost: dataPost
                                    })

                                    console.log(this.reports)
                                })
                            })
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