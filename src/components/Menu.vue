<template>
  <div class="container-fluid px-0">
  <div class="row mx-auto px-3 py-2 menu">
    <nav class="navbar navbar-expand-lg navbar-light justify-content-center w-100">
      <div class="container-fluid">
        <img class="logo-findhome" src="../assets/images/logo-findhome.jpg"/>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item pe-5">
              <a class="nav-link active raleway-500-16 text-black" aria-current="page" href="/home">{{ $t('menu.homepage') }}</a>
            </li>
            <li class="nav-item dropdown pe-3">
              <a class="nav-link dropdown-toggle raleway-500-16 text-black" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ $t('menu.buy.title') }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li >
                    <a class="dropdown-item" href="#"></a>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown pe-3">
              <a class="nav-link dropdown-toggle raleway-500-16 text-black" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ $t('menu.lease.title') }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li >
                    <a class="dropdown-item" href="#"></a>
                </li>
              </ul>
            </li>
            <li class="nav-item pe-3">
              <a class="nav-link raleway-500-16 text-black" href="/news">{{ $t('menu.news') }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link raleway-500-16 text-black" href="#">{{ $t('menu.contact') }}</a>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <v-icon icon="mdi:mdi-heart-outline icon-heart-menu me-3"/>
            <v-btn variant="outlined" class="btn-post-menu"  @click="loggedIn == null ? $router.push('login') : $router.push({name: 'create-post'}) "><span class="color777777 text-capitalize">{{ $t('menu.postNews') }}</span> </v-btn>
          </div>
        </div>
      </div>
    </nav>
  </div>
  </div>
</template>

<script>

    export default {
        data: () => ({
          loggedIn: "",
        }),
      methods: {
      },
        mounted() {
          let data = JSON.parse(localStorage.getItem("user"))
          this.loggedIn = data
        }
    };
</script>

<style scoped>
    @import "../assets/css/Menu.css";
</style>