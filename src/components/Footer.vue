<template>
  <v-footer class="bg-black">
    <v-row>
      <v-container fluid>
        <v-row>
          <v-col class=".col-xl-3 .col-lg-4 .col-sm-12 .col-md-6">
            <img class="logo-findhome" src="../assets/images/logo-dodientu-ft.png">
            <p class="company">{{ $t('footer.company') }}</p>
            <v-div class="item">
              <p>
                <i class="fa fa-map-marker custom"></i> {{ $t('header.location') }}
              </p>
              <p><i class="fa fa-phone custom"></i> (84-869) 633 830</p>
              <p>{{ $t('footer.connect') }}</p>
            </v-div>
            <v-div class="contact-social-network">
              <img src="../assets/images/facebook-4-32.png"/>
              <img src="../assets/images/linkedin-4-24.png"/>
              <img src="../assets/images/twitter-4-24.png"/>
            </v-div>
          </v-col>
          <v-col class=".col-3 .col-sm-6 .col-md-8">
            <v-row class="head">
              <v-col cols="1" class="icon-head">
                <i class="fa fa-phone footer"></i>
              </v-col>
              <v-col cols="10" class="title-col">
                <p>Hotline</p>
                <p>1900 1009</p>
              </v-col>
            </v-row>
            <p class="mt-2">{{ $t('footer.about-findhome.title') }}</p>
            <v-div class="item">
              <p>{{ $t('footer.about-findhome.introduce') }}</p>
              <p>{{ $t('footer.about-findhome.newspapers') }}</p>
              <p>{{ $t('footer.about-findhome.recruitment') }}</p>
              <p>{{ $t('footer.about-findhome.regulation') }}</p>
              <p>{{ $t('footer.about-findhome.security') }}</p>
              <p>{{ $t('footer.about-findhome.feedback') }}</p>
              <p>{{ $t('footer.about-findhome.help') }}</p>
            </v-div>
          </v-col>
          <v-col class=".col-3 .col-sm-6 .col-md-8">
            <v-row class="head">
              <v-col cols="1" class="icon-head">
                <i class="fa fa-headphones footer"></i>
              </v-col>
              <v-col cols="10" class="title-col">
                <p>{{ $t('footer.support') }}</p>
                <p>hotro@dodientu.com.vn</p>
              </v-col>
            </v-row>
            <p class="mt-2">{{ $t('footer.about-service.title') }}</p>
            <v-div class="item">
              <p>{{ $t('menu.postNews') }}</p>
              <p>{{ $t('footer.about-service.buy') }}</p>
              <p>{{ $t('sidebar.money') }}</p>
              <p>{{ $t('footer.about-service.coupon') }}</p>
              <p>{{ $t('footer.about-service.quotes') }}</p>
              <p>{{ $t('footer.about-service.news') }}</p>
              <p>{{ $t('footer.about-findhome.help') }}</p>
            </v-div>
          </v-col>
          <v-col class=".col-3 .col-sm-6 .col-md-8">
            <v-row class="head">
              <v-col cols="1" class="icon-head">
                <i class="fa fa-user footer"></i>
              </v-col>
              <v-col cols="10" class="title-col">
                <p>{{ $t('footer.care') }}</p>
                <p>trogiup@dodientu.com.vn</p>
              </v-col>
            </v-row>
            <p class="mt-2">{{ $t('footer.download') }}</p>
            <img src="../assets/images/icon-ch-play.png" class="icon-download"/>
            <img src="../assets/images/icon-app-store.jpg" class="icon-download"/>
            <p id="label">{{ $t('footer.register') }}</p>
            <input type="text" id="email" placeholder="Email..."/>
            <button class="btn-register">{{ $t('footer.btn-register') }}</button>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-footer>
</template>

<script>
export default {};
</script>
<style scoped>
@import "../assets/css/Footer.css";
</style>