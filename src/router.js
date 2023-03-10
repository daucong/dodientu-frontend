import {createRouter, createWebHistory} from "vue-router"
import LoginReg from "./components/LoginReg.vue"
import Profile from "./components/Profile"
import ChangePass from "./components/ChangePass"
import  LayoutAdmin from "./components/LayoutAdmin"
import CategoryNews from "@/components/News/CategoryNews"
import ClassReatly from "./components/Categories/ClassifiedReatly"
import TypePost from "./components/Categories/TypePost"
import TypeReatly from "./components/Categories/TypeReatly"
import TypeInterior from "./components/Categories/TypeInterior"
import Province from "./components/Categories/Province"
import District from "./components/Categories/District"
import AddNews from "@/components/News/AddNews";
import NewsList from "@/components/News/NewsList";
import NewsDetails from "@/components/News/NewsDetails";
import ManageNews from "@/components/News/ManageNews";
import Ward from "./components/Categories/Ward"
import ListUser from "./components/User/list"
import PostCreate from "./components/Post/CreatePost"
import PostEdit from "./components/Post/EditPost"
import ListPost from "./components/Post/ListPost"
import ManageTags from "@/components/News/ManageTags";
import UserListPost from "./components/Post/UserListPost"
import LandingPage from "@/components/LandingPage";
import ListPartner from "@/components/Partner/ListPartner";
import ManageFeedback from "@/components/Partner/ManageFeedback";
import Recharge from "./components/Recharge"
import Payment from "./components/Payment"

import GetPost from "./components/PostSearch/WebListPost"
import PostDetail from "./components/Post/PostDetail"
const routes = [
    {
        path: "/login",
        name: "login",
        component: LoginReg,
    },
    {
        path: "/news",
        alias: "/news/:id",
        name: "news",
        component: NewsList,
    },
    {
        path: "/news-details/:id",
        name: "newsdetails",
        component: NewsDetails,
    },
    {
        path: "/home",
        name: "home",
        component: LandingPage,
    },

    {
        path: "/user/payment",
        name: 'payment',
        component: Payment
    },
    {
        path: '/admin/',
        name: 'admin',
        component: LayoutAdmin,
        children: [
            { path: 'manage-feedback',name: 'manage-feedback',component: ManageFeedback },
            { path: 'manage-partner',name: 'manage-partner',component: ListPartner },
            { path: 'manage-tags',name: 'manage-tags',component: ManageTags },
            { path: 'category-news',name: 'category-news',component: CategoryNews },
            { path: 'manage-news',name: 'manage-news',component: ManageNews },
            { path: 'add-news',name: 'add-news',component: AddNews },
            { path: 'update-news/:id',name: 'update-news',component: AddNews },
            { path: 'classfiedreatly',name: 'classfiedreatly',component: ClassReatly },
            { path: 'province',name: 'province',component: Province },
            { path: 'district',name: 'district',component: District },
            { path: 'ward',name: 'ward',component: Ward },
            { path: 'typepost',name: 'typepost',component: TypePost },
            { path: 'typereatly',name: 'typereatly',component: TypeReatly },
            { path: 'typeinterior',name: 'typeinterior',component: TypeInterior },
            { path: 'listUser',name: 'listUser',component: ListUser },
            { path: 'admin-list-post',name: 'admin-list-post',component: ListPost },
        ]
    },
    {
        path: '/user/',
        name: 'users',
        component: LayoutAdmin,
        children: [
            {path: 'post', name: 'create-post', component: PostCreate},
            { path: 'edit',name: 'edit-post',component: PostEdit },
            {path: 'list-post', name: 'user-list-post', component: UserListPost},
            {path: "profile", name: 'profile', component: Profile},
            {path: "changePass", name: 'changePass', component: ChangePass},
            {path: "recharge", name: 'recharge', component: Recharge},
        ]
    },
    {
        path: "/getpost",
        name: "get-post",
        component: GetPost,
    },
    {
        path: "/postdetail/:id",
        name: "post-detail",
        component: PostDetail,
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
