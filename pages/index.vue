<template>
  <div>
    <div v-show="allBanner.length <= 0">
      <v-progress-linear :indeterminate="true" size="4px"></v-progress-linear>
    </div>
    <v-layout row wrap>
      <v-flex x12 sm12 md12>
        <v-carousel class="hidden-xs-only h360" hide-controls v-if="bannersWeb.length > 1">
          <v-carousel-item class="slider-pc"
            v-for="(item, index) in bannersWeb"
            :key="index"
            :src="item.image_web">
          </v-carousel-item>
        </v-carousel>

        <v-carousel class="hidden-sm-and-up h160" hide-controls v-if="bannersMobile.length > 1">
          <v-carousel-item class="movil-slider"
            v-for="(item, index) in bannersMobile"
            :key="index"
            :src="item.image_web">
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row v-show="allCategories.length > 0" class="ptr15tabs">
      <v-flex xs12 sm12 md12>
        <v-tabs class="detail_container_tabs"
          v-model="active"
          dark
          slider-color="blue_app"
          centered
          show-arrows>
          <v-tab class="detail_title_tabs_2"
            ripple
            v-for="(item, index) in allCategories" :key="index"
            @click="changeCategories(item)">
            <div class="circle-tabs-index">
              <img :src="item.image" width="36px" class="tabs-color-no-active" v-bind:alt="item.name">
            </div>
            <h3 class="title_tabs2 hidden-sm-and-down">{{ item.name }}</h3>
          </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-show="productByCatgories.length > 0" class="bg-e4e4e">
      <v-container class="pb0 pt20">
        <h1 class="title_slider">Productos Destacados <nuxt-link :to="`/category/${currentCategory}`" class="title_slider_more">Ver más</nuxt-link></h1>
      </v-container>
      <product-carousel-component :items="{ products: productByCatgories } " class="bg-e4e4e"/>
    </v-layout>

    <!--<v-layout row wrap class="bg-f5f5f5" v-show="allProducts.length > 0">
      <v-container class="pb0 pt20">
        <h1 class="title_slider">Productos Nuevos <a class="title_slider_more"> Ver más</a></h1>
      </v-container>
      <product-carousel-component :items="{ products: allProducts } "/>
    </v-layout>

    <v-layout row wrap v-show="allPatologies.length > 0">
      <v-container class="pb0 pt20">
        <h1 class="title-slider-p">Patologías <a class="title_slider_more">Ver más</a></h1>
      </v-container>
      <patologias-carousel-component :items="{ patologies: allPatologies } "/>
    </v-layout>-->

    <v-layout row wrap class="bg-f5f5f5 pb50" v-show="allLaboratories.length > 0">
      <v-container class="pb0 pt20">
       <h2 class="title_slider">Laboratorios Farmacéuticos Destacados <!--<a class="title_slider_more" href="/laboratories">Ver más</a>--></h2>
      </v-container>
      <brands-carousel-component :items="{ laboratories: allLaboratories }" />
    </v-layout>

    <!-- <v-layout row wrap v-show="allCategories.length > 0">
      <v-container>
        <br>
        <h1 class="title_slider">Testimonios <a class="title_slider_more">Ver más</a></h1>
      </v-container>
      <v-carousel class="carousel_master_p">
       <v-carousel-item v-for="n in 4" :key="n">
         <v-container>
           <v-layout>
             <v-flex xs12 sm8 md8  offset-sm2 offset-md2 class="p10">
               <v-layout row wrap>
                <v-flex xs12 sm2 sm2 class="p10 center">
                  <img class="resposive_img img_testimoneo" src="https://raw.githubusercontent.com/armikhael/vuetifyjs/master/src/assets/testimo.png" width="100%">
                </v-flex>
                <v-flex xs12 sm10 sm10>
                  <h1 class="title_testimoneo">title</h1>
                  <p class="title_testimoneo_2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </v-flex>
               </v-layout>
             </v-flex>
           </v-layout>
         </v-container>
       </v-carousel-item>
      </v-carousel>
    </v-layout> -->
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import ProductCarousel from '~/components/ProductCarousel/CarouselResponsive.vue'
import PatologiasCarousel from '~/components/PatologiasCarousel/CarouselResponsive.vue'
import BrandsCarousel from '~/components/BrandsCarousel/CarouselResponsive.vue'
import AppLogo from '~/components/AppLogo.vue'


export default {

  components: {
    'app-logo': AppLogo,
    'product-carousel-component': ProductCarousel,
    'patologias-carousel-component': PatologiasCarousel,
    'brands-carousel-component': BrandsCarousel,
  },
  asyncData (context) {
    return {
      apiPurchase: context.env.apiPurchase,
      apiTag: context.env.apiTag,
    }
  },
  data() {
    return {
      active: null,
      allProducts: [],
      allLaboratories: [],
      allPatologies: [],
      allBanner: [],
      allCategories: [],
      productByCatgories: [],
      currentCategory: null,
    }
  },
  mounted: function() {
    this.getBanners();
    // One Signal
    // Inside page components
    this.$OneSignal.push(() => {
        this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
        if (isEnabled) {
          console.log('Push notifications are enabled!')
        } else {
          console.log('Push notifications are not enabled yet.')
        }
      })
    })

    // Using window and array form
    window.$OneSignal.push(['addListenerForNotificationOpened', (data) => {
      console.log('Received NotificationOpened:', data )}
    ]);
  },
  methods: {
    getBanners(){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiTag}/banners/`,
      })
      .then(function(response) {
        self.allBanner = response.data.data;
        self.getCategories()
      });
    },
    getCategories(){
      let self = this;
      axios({
        method:'GET',
        url:`${this.apiTag}/categories`,
      })
      .then(function(response) {
        self.allCategories = response.data.data;
        self.currentCategory = self.allCategories[0].slug;
        self.getProducts()
      });
    },
    getProducts(){
      let self = this;
      axios({
        method: 'GET',
        url:`${self.apiPurchase}/home`,
      })
      .then(function(response) {
        self.allProducts = response.data;
        self.productByCatgories = response.data;
        self.getLaboratories()
      });
    },
    getPatologies(){
      let self = this;
      axios({
        method: 'GET',
        url:`${self.apiTag}/patologies/`,
      })
      .then(function(response) {
        self.allPatologies = response.data.data;
      });
    },
    getLaboratories(){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiPurchase}/laboratories/`,
      })
      .then(function(response) {
        self.allLaboratories = response.data;
        console.log(self.allLaboratories);
      });
    },
    changeCategories(item){
      this.currentCategory = item.slug;

      if (item.slug == 'medicamentos') {
        this.$router.push({ path: '/category/medicamentos' })
      }

      let self = this;
      axios({
        method:'GET',
        url:`${this.apiPurchase}/products/find`,
        params: {
          q: item.name
        }
      })
      .then(function(response) {
        self.productByCatgories = response.data;
      });
    },
  },
  computed: {
    bannersMobile(){
      function filterBanner(obj) {
        if (obj.mobile == true){
          return true;
        }
      }
      let filter = this.allBanner.filter(filterBanner);
      let orderBy = _.orderBy(filter, ['position'],['desc']);
      return filter;
    },
    bannersWeb(){
      function filterBanner(obj) {
        if (obj.mobile == false){
          return true;
        }
      }
      let filter = this.allBanner.filter(filterBanner);
      let orderBy = _.orderBy(filter, ['position'],['desc']);
      return filter;
    }
  }

}
</script>

<style>

  /*
  * Testimonio
  */
  .img_testimoneo{
    border-radius: 50%;
    margin-top: -10px;
  }
  .title_testimoneo{
    font-style: italic;
    font-size: 15px;
    font-weight: 400;
  }
  .title_testimoneo_2{
    font-size: 13px;
  }
  @media (max-width: 550px){
    .img_testimoneo{
      width: 100px;
    }
    .title_testimoneo, .title_testimoneo_2 {
      text-align: center;
    }
    .tabs-color-no-active{
          margin-bottom: -30px!important;
    }
  }

  /*
  * Tabs
  */
  .detail_title_tabs_2{
    color: #8a8a8a!important;
  }
  .tabs__slider {
      display: none;
  }
  .detail_title_tabs_2 a{
    display: block;
  }
  .title_tabs2{
    text-transform: capitalize;
  }
  .tabs__item{
    padding-top: 2px;
  }
  .tabs__item i{
    font-size: 30px;
    margin-bottom: 10px;
  }
  .tabs__item--active i{
    color: #268ae0;
    padding-bottom: 5px;
  }
  .tabs__item--active{
    background: #e4e4e4;
    border-top: 3px solid #268ae0;
    padding-top: 10px;
    color: #212121!important;
  }
  .card_tabs2{
    background-color: #e5e5e5!important;
  }
  .tabs__container{
    height: 90px;
    border-bottom: 1px solid #cacaca;
  }
  .progress-linear{
    height: 4px!important;
  }
  .hidden-sm-and-down{
        margin-top: 0px!important;
  }
  .pb0{
    padding-bottom: 0px;
  }
  .pt20{
    padding-top: 20px;
  }
  .tabs-color-no-active{
    filter: grayscale(100%);
    opacity: 0.3;
    margin-bottom: 5px;
  }
  .tabs__item--active img{
    filter: grayscale(0%);
    opacity: 1;
  }
  .movil-slider img{
    width: 100%;
    height: 160px;
  }
  .slider-pc img{
    width: 100%;
  }
  @media only screen and (max-width: 900px) {
    .tabs__item{
      padding-top: 12px;
    }
  }

  .tabs__icon--next {
      right: 4px;
      background: #ddd;
      width: 25px;
      height: 25px;
      margin-top: 29px;
      border-radius: 50%;
  }
  .tabs__icon--prev {
      left: 4px;
      background: #ddd;
      width: 25px;
      height: 25px;
      margin-top: 29px;
      border-radius: 50%;
  }
  .tabs__wrapper--show-arrows {
      margin-left: 30px;
      margin-right: 40px;
  }
  .detail_title_tabs_2{
    background: #fff;
  }
  .detail_container_tabs{
    background: #fff;
  }
  .theme--dark .tabs__bar, .application .theme--dark.tabs__bar {
      background-color: #fff;
  }
  .ptr15tabs{
    padding-top: 15px;
  }
  @media only screen and (max-width: 550px) {
    .circle-tabs-index{
      background: #fff;
      width: 100%;
      height: 52px;
      border-radius: 50%;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid #ddd;
      box-shadow: 1px 2px #888888b8;
    }
    .ptr15tabs{
      padding-top: 0px;
    }
    .detail_title_tabs_2{
      background: #f1f1f1;
    }
    .detail_container_tabs{
      background: #f1f1f1;
    }
    .theme--dark .tabs__bar, .application .theme--dark.tabs__bar {
        background-color: #f1f1f1;
    }
  }

  .h360{
    height: 360px;
  }
  .h160{
    height: 160px;
  }
  .bg-e4e4e{
    background: #e4e4e4;
  }
  .bg-f5f5f5{
    background: #F5F5F5
  }
  .pb50{
    padding-bottom:50px;
  }

</style>
