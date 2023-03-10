import {createApp} from "vue";
import App from "./App.vue";

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import CKEditor from '@mayasabha/ckeditor4-vue3'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import i18n from './i18n'
import {aliases, fa} from 'vuetify/iconsets/fa'
import {mdi} from 'vuetify/iconsets/mdi'
import "flag-icons/css/flag-icons.min.css";
import router from "./router";
import store from "./store";
import setupInterceptors from './services/setupInterceptors';

setupInterceptors(store);
import vue3GoogleLogin from 'vue3-google-login'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
            mdi,
        }
    },
})

const app = createApp(App).use(i18n);
app.use(vue3GoogleLogin, {
    clientId: '399589284808-t24kj18ogdpqfsqe132d1e82nft9a52a.apps.googleusercontent.com'
})
app.use(router);
app.use(store);
app.use(vuetify);
app.use(CKEditor)
app.component('Datepicker', Datepicker);
app.mount("#app");