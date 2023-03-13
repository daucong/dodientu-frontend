<template>
    <Header/>
    <Menu class="pb-3"/>
  <v-app>
    <v-main>
      <div class="d-flex">
        <Sidebar/>
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
    <Footer/>
</template>

<script>
    import Header from "@/components/Header";
    import Menu from "@/components/Menu";
    import Footer from "@/components/Footer";
    import Sidebar from "@/components/Sidebar"

    export default {
        data() {
            return {}
        },
        components: {Header, Menu, Footer, Sidebar}
    }
</script>

<style>
    @import '@/assets/css/Style.css';
</style>