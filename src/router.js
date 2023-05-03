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
        ]
    },
    {path: '/ddt/admin/postdetail/:id', name: "post-detail-admin", component: PostDetailAdmin},
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
        ]
    },
    {
        path: "/ddt/postdetail",
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
