/* eslint-disable */
import {createRouter, createWebHistory} from "vue-router"
import LoginReg from "./components/LoginReg.vue"
import Profile from "./components/Profile"
import ChangePass from "./components/ChangePass"
import LayoutAdmin from "./components/LayoutAdmin"
import ListUser from "./components/User/List"
import Recharge from "./components/Recharge"
import Payment from "./components/Payment"
import HomeWeb from "./components/HomeWeb"
import CreatePost from "./components/Post/Create"
import UserListPost from "./components/Post/UserList"
import ListPost from "./components/Post/ListPost"
import PostDetailAdmin from "./components/Post/PostDetail"
import PostDetail from "./components/PostDetail"
import PostEdit from "./components/Post/EditPost"
import GetPost from "./components/ListPost"
import Cart from "./components/Cart"
import CheckOut from "./components/CheckOut"
import UserListCheckOut from "./components/UserListCheckOut"
import TypePost from "./components/Categories/TypePost"
import Province from "./components/Categories/Province"
import District from "./components/Categories/District"
import Ward from "./components/Categories/Ward"
import ReportByMonth from "./components/Report/Mounth"
import ReportByProvice from "./components/Report/Provice"
import ReportByCategory from "./components/Report/Category"
import ReportByAdminDuyet from "./components/Report/AdminDuyet"
import ReportByUserPayment from "./components/Report/UserPayment"

const routes = [
    {
        path: "/ddt/login",
        name: "login",
        component: LoginReg,
    },
    {
        path: "/ddt/",
        name: "home",
        component: HomeWeb,
    },
    {
        path: "/ddt/home",
        component: HomeWeb,
    },
    {
        path: '/ddt/admin/',
        name: 'admin',
        component: LayoutAdmin,
        children: [
            {path: 'list-user', name: 'list-user', component: ListUser},
            {path: 'admin-list-post', name: 'admin-list-post', component: ListPost},
            {path: 'province', name: 'province', component: Province},
            {path: 'district', name: 'district', component: District},
            {path: 'ward', name: 'ward', component: Ward},
            {path: 'typepost', name: 'typepost', component: TypePost},
            {path: 'report/month', name: 'report-month', component: ReportByMonth},
            {path: 'report/provice', name: 'report-provice', component: ReportByProvice},
            {path: 'report/browse', name: 'report-browse', component: ReportByAdminDuyet},
            {path: 'report/payment', name: 'report-payment', component: ReportByUserPayment},
            {path: 'report/category', name: 'report-category', component: ReportByCategory},
        ]
    },
    {path: '/ddt/admin/postdetail/:id', name: "post-detail-admin", component: PostDetailAdmin},
    {path: '/ddt/user/checkout', name: "check-out", component: CheckOut},
    {
        path: '/ddt/user/',
        name: 'users',
        component: LayoutAdmin,
        children: [
            {path: "profile", name: 'profile', component: Profile},
            {path: "change-pass", name: 'change-pass', component: ChangePass},
            {path: "recharge", name: 'recharge', component: Recharge},
            {path: "create-post", name: 'create-post', component: CreatePost},
            {path: "user-list-post", name: 'user-list-post', component: UserListPost},
            {path: 'edit', name: 'edit-post', component: PostEdit},
            {path: 'cart', name: 'cart', component: Cart},
            {path: 'purchase', name: 'purchase', component: UserListCheckOut},
        ]
    },
    {
        path: "/ddt/post/detail/:title",
        name: "post-detail",
        component: PostDetail,
    },
    {
        path: "/ddt/mua-ban",
        name: "get-post",
        component: GetPost,
    },
    {
        path: "/ddt/payment",
        name: 'payment',
        component: Payment
    },
    {
        path: "/:catchAll(.*)",
        component: Error,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    const authRequired = to.path.indexOf('/ddt/user') >= 0 || to.path.indexOf('/ddt/admin') >= 0;
    const loggedIn = JSON.parse(localStorage.getItem("user"))

    if (!authRequired) {
        next();
    } else {
        if (!loggedIn) {
            next('login');

        } else {
            let checkpatadmin = to.path.indexOf('/ddt/admin') >= 0;

            if (checkpatadmin) {
                if (loggedIn.roles.includes('ROLE_ADMIN')) {
                    next()
                } else {
                    next('home')
                }
            } else {
                next()
            }
        }
    }
});

export default router;
