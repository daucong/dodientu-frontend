import {createRouter, createWebHistory} from "vue-router"
import LoginReg from "./components/LoginReg.vue"
import Profile from "./components/Profile"
import ChangePass from "./components/ChangePass"
import LayoutAdmin from "./components/LayoutAdmin"
import ListUser from "./components/User/List"
import Recharge from "./components/Recharge"
import Payment from "./components/Payment"
import HomeWeb from "./components/HomeWeb"
import CreatePost from  "./components/Post/Create"

const routes = [
    {
        path: "/login",
        name: "login",
        component: LoginReg,
    },
    {
        path: "/home",
        name: "home",
        component: HomeWeb,
    },
    {
        path: '/admin/',
        name: 'admin',
        component: LayoutAdmin,
        children: [
            { path: 'listUser',name: 'listUser',component: ListUser },
        ]
    },
    {
        path: '/user/',
        name: 'users',
        component: LayoutAdmin,
        children: [
            {path: "profile", name: 'profile', component: Profile},
            {path: "changePass", name: 'changePass', component: ChangePass},
            {path: "recharge", name: 'recharge', component: Recharge},
            {path: "createPost", name: 'createPost', component: CreatePost},
        ]
    },
    {
        path: "/payment",
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
    const authRequired = to.path.indexOf('/user') >= 0 || to.path.indexOf('/admin') >= 0;
    const loggedIn = JSON.parse(localStorage.getItem("user"))

    if (!authRequired) {
        next();
    }else {
        if(!loggedIn) {
            next('login');

        }else {
            let checkpatadmin = to.path.indexOf('/admin') >= 0;

           if(checkpatadmin){
               if (loggedIn.roles.includes('ROLE_ADMIN')) {
                   next()
               }else {
                   next('home')
               }
           }else {
               next()
           }
        }
    }
});

export default router;
