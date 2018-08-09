<template>
  <div>
    <v-toolbar class="navbar-fixed-pharol hidden-sm-and-down" fixed>
      <v-toolbar-title>
          <div
          class="logo-header">
          <router-link :to="{ path: '/' }">
            <img src="https://s3-us-west-2.amazonaws.com/pharol-v2/bank-image/pharol-logo-1000px-compressor.png" alt="Pharol logo" class="size-logo">
          </router-link>
        </div>
      </v-toolbar-title>
      <v-spacer><search-component class="search-header"></search-component></v-spacer>
      <v-toolbar-items class="">
        <div class="text-md-center text-sm-center btn-top w30px">
          <router-link :to="{ path: '/' }" class="home-icon" v-show="$nuxt.$route.name != 'index'">
            <v-icon class="pharol-icon home-icon-i" >home</v-icon>
          </router-link>
        </div>
        <div class="text-md-center text-sm-center btn-top">
          <v-menu offset-y class="mt-10">
            <v-btn
              icon
              color="deep-orange darken-1"
              dark slot="activator"
              class="btn-settings-toolbar"
              v-show="auth != false"
            >
              <v-icon class="pharol-icon">settings</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="(item, index) in userOptions"
                :key="index"
                :to="item.path"
              >
                <v-list-tile-avatar>
                  <v-icon :color="item.iconColor">{{ item.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile
                @click="logout()"
              >
                <v-list-tile-avatar>
                  <v-icon color="grey lighten-1">power_settings_new</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Cerrar sesión</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <router-link :to="{ path: '/auth/' }" class="btn-iniciar" v-show="auth == false">
            <v-icon class="pharol-icon-toolbar cf-init">&#xe85e;</v-icon>
            <span class="init-sesion">Iniciar</span>
            <!-- <span class="login-header">Iniciar</span> -->
          </router-link>
        </div>
        <div class="text-md-center text-sm-center">
          <v-btn icon
            class="btn-top btn-card-toolbar"
            @click.stop="sideCart = !sideCart">
            <v-badge color="red badge-header">
              <span slot="badge">{{ $store.state.cart.length}}</span>
              <v-icon class="pharol-icon-card">&#xe8cc;</v-icon>
            </v-badge>
          </v-btn>
        </div>
      </v-toolbar-items>
    </v-toolbar>

    <v-flex xs12 sm12 md12 class="mt-res-toolbar">

      <v-toolbar
        dark
        class="indigo darken-1">

        <v-toolbar-items class="hidden-sm-and-down pl30">
          <v-btn
            flat
            @click.stop="sideMenu = !sideMenu"
            class="category_title">
            Categorias
          </v-btn>

        </v-toolbar-items>

        <v-flex xs12 sm12 md12 class="p30hr hidden-sm-and-down mt8">
          <v-btn
            flat
            v-for="(item, index) in menuOptions"
            :key="index"
            router
            :to="item.path"
            class="btn-menu-toolbar menu_title"
          >
            {{ item.title }}
          </v-btn>
        </v-flex>

        <!-- <v-flex xs1 sm2 md2 class="p30hr hidden-sm-and-down">
          <v-btn
            flat
            router
            to="/products"
            class="btn-menu-toolbar  menu_title"
          >
            Búsqueda Inteligente
          </v-btn>
        </v-flex> -->
      </v-toolbar>

      <!-- Movil -->
      <v-toolbar
        dark fixed
        class="hidden-md-and-up movil-navbar">
        <!-- BOTONES -->

        <router-link :to="{ path: '/' }" class="navbar-logo-movil">
          <img src="https://s3-us-west-2.amazonaws.com/pharol-v2/bank-image/pharol-logo-1000px.png" class="size-logo-movil" alt="Pharol logo">
        </router-link>

        <v-spacer></v-spacer>

        <v-toolbar-items class="item-navbar-movil">

          <v-btn v-show="$nuxt.$route.name != 'index'"
            icon
            class="icon-navbar-movil"
            to="/">
            <v-icon>home</v-icon>
          </v-btn>

          <v-btn
            icon
            class="icon-navbar-movil icon-navbar-movil-custom"
            @click.stop="searchNavbar = !searchNavbar"
            >
            <v-icon>search</v-icon>
          </v-btn>

          <v-btn
            icon
            class="icon-navbar-movil"
            @click.stop="sideCart = !sideCart">
            <v-badge color="red">
              <span slot="badge">{{ $store.state.cart.length}}</span>
                <v-icon>shopping_cart</v-icon>
            </v-badge>
          </v-btn>

          <v-btn
            icon
            class="icon-navbar-movil icon-navbar-movil-custom"
            to="/auth/"
            v-show="auth == false"
          >
            <v-icon>assignment_ind</v-icon>
          </v-btn>

          <v-menu offset-y class="menu-navbar-settings" v-show="auth != false">
            <v-btn
              icon
              color="deep-orange darken-1"
              dark slot="activator"
              class=""
            >
              <v-icon class="pharol-icon">settings</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="(item, index) in userOptions"
                :key="index"
                :to="item.path"
              >
                <v-list-tile-avatar>
                  <v-icon :color="item.iconColor">{{ item.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile
                @click="logout()"
              >
                <v-list-tile-avatar>
                  <v-icon color="grey lighten-1">power_settings_new</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Cerrar sesión</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

        </v-toolbar-items>

      </v-toolbar>

    </v-flex>

    <v-dialog class="zi6"
       v-model="searchNavbar"
       fullscreen
       hide-overlay
       transition="dialog-bottom-transition"
       scrollable
     >
       <v-card tile>
         <v-toolbar card dark class="bg-3949ab">
           <div class="search-box-modals">
             <v-btn icon dark @click.native="clearSearchNavbar()">
               <v-icon class="c-9a9a9a">arrow_back</v-icon>
             </v-btn>
             <!-- Ocultar modals al Buscar -->
             <search-component class="search-header-movil" @change.native="clearSearchNavbar()"></search-component>
           </div>
         </v-toolbar>
         <v-card-text class="search-box-modals-co">
           <div class="row-custon-col">
             <div class="col-md-6">
               <v-btn
                 class="btn-movil-header-co"
                 @click.stop="sideMenu = !sideMenu">
                 Categorias <span class="cate-span-mf">▾</span>
               </v-btn>
             </div>
             <div class="col-md-6">
               <!--<v-btn
                 class="btn-movil-header-co"
                 >
                 Ofertar
               </v-btn>-->
             </div>
           </div>
         </v-card-text>
         <div class="flexauto"></div>
       </v-card>
     </v-dialog>

    <!-- CART -->
    <v-navigation-drawer
      temporary
      right
      v-model="sideCart"
      fixed
      >
      <v-list>
        <side-nav-cart/>
      </v-list>
    </v-navigation-drawer>

    <!-- CATEGORIES -->
    <v-navigation-drawer class="zi999"
      temporary
      left
      v-model="sideMenu"
      fixed
      >
      <v-list class="header_avatar">
        <v-list-tile avatar>
          <h3>Categorías principales</h3>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list class="header_list">
        <div
          v-for="(item, index) in menuCategories"
          :key="index"
          >
          <v-list-tile class="header-list-item" avatar :to="`/category/${item.slug}`" @click.native="onSearchNavbar()">
            <v-list-tile-action>
              <img :src="item.image" width="25px" class="filter-color" v-bind:alt="item.name">
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="title-categoria-header"> {{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <i class="material-icons filter-color">expand_more</i>
            </v-list-tile-action>

          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from 'axios';
import SideNavCart from '~/components/SideNavCart'
import Search from '~/components/Search.vue'


export default {
  components: {
    'side-nav-cart': SideNavCart,
    'search-component': Search
  },
  asyncData (context) {
    // console.warn('context');
    // console.log(context);
  },
  data(){
    return  {
      sideCart: false,
      sideMenu: false,
      searchNavbar:false,
      menuOptions: [
        // { path: '/recent-search', title: 'Búsquedas' },
        // { path: '/special-offer', title: 'Ofertas' },
        { path: '/contact', title: 'Contacto' },
        // { path: '/service', title: 'Servicio' },
      ],
      userOptions: [
        { path: '/auth/profile', title: 'Perfil', icon: 'perm_identity', iconColor: 'grey lighten-1', },
        { path: '/auth/update', title: 'Modificar contraseña', icon: 'vpn_key', iconColor: 'grey lighten-1', },
      ],
      menuCategories: [],
      subCategories: [],
    }
  },
  mounted: function() {
    let self = this;
    axios({
      method:'GET',
      url:`https://banners.pharol.cl/categories/`,
    })
    .then(function(response) {
      self.menuCategories = response.data.data;
    });
  },
  methods:{
    clearSearchNavbar: function (event) {
      console.log("clearSearchNavbar");
      this.searchNavbar = false;
    },
    onSearchNavbar: function (event) {
      console.log('onSearchNavbar');
      this.searchNavbar = false;
    },
    submit(event){
      this.$router.push({ path: `/results/${this.findWord}` })
    },
    stringToSlug(item){
      return item.toString().toLowerCase().replace(/ /g, '-')
    },
    logout(){
      this.$store.commit('logout')
      this.$router.push({ path: '/auth'})
    }
  },
  computed: {
    auth(){
      return this.$store.state.login
    }
  }
}

</script>

<style lang="stylus" scoped>
  .zi999{
    z-index: 999!important;
  }
  .flexauto{
    flex: 1 1 auto;
  }
  .c-9a9a9a{
    color:#9a9a9a;
  }
  .cate-span-mf{
    margin-left: 10px;
    font-size: 10px;
  }
  .zi6{
    z-index: 6!important;
  }
  .icon-navbar-movil-custom{
    height: 38px;
    margin-top: 8px;
  }
  .mt8{
    margin-top: 8px;
  }
  .pl30{
   padding-left:30px; 
  }
  .cf-init{
    color:#ccc;font-size: 30px;
  }
  .bg-3949ab{
    background-color: #3949ab !important;
  }
  .mt-10{
    margin-top:-10px;
  }
  .w30px{
   width:30px; 
  }
  .menu_title {
    text-transform: capitalize;
    font-size: 12px;
  }
  .category_title {
    text-transform: capitalize;
    font-size: 16px;
  }
  .global_header {
    margin-bottom: 10px;
    margin-top: -25px!important;
  }
  .main-toolbar {
    background: #3f51b5 !important;
  }
  .header-right {
    margin-top: 15px;
  }
  .badge-header {
    top: -6px;
    left: 17px;
    width: 18px;
    height: 18px;
    font-size: 13px;
  }
  .login-header {
    font-size: 14px;
    text-transform: capitalize;
  }
  .logo-header {
    text-align: center;
    margin-left:40px;
    margin-top:15px;
  }
  .option-header {
    margin-top: 12px;
  }
  .search-header {
    margin: 5px 10px 0px;
    text-align: center;
    padding: 0 80px;
  }
  .toolbar-header {
    height: 111px;
    background: #ffffff;
    padding-top: 8px;
  }
  .card-header {
    height: 111px !important;
    background-color: #fbfbfb;
    box-shadow: 2.5px 1.6px 5px 0 rgba(1, 1, 1, 0.11);
    border: solid 1px rgba(1, 1, 1, 0.05);
    z-index: 999;
    background: none;
  }
  .logo {
    margin: 24px 30px 0px;
  }
  .size-logo {
    width: 150px;
  }
  .size-logo-movil {
    width: 90px;
  }
  .input-group--text-field input {
    height: 43px;
  }
  .input:focus {
    outline: none !important;
  }
  .input-group--text-field input {
    line-height: 43px;
    padding: 0px 10px;
    width: 778px;
    height: 43px;
    background-color: #f3f3f3;
    margin: 15px 10px 0px;
  }
  .btn-search {
    width: 100%;
    height: 40px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #ff5722;
    border: solid 1px #ff5722;
    font-size: 14px;
    line-height: 1.14;
    letter-spacing: 0.4px;
    color: #fbfbfb;
  }
  .init-sesion{
    text-transform: none;
    padding-left: 5px;
    color: #6f6f6f;
    font-size: 13px;
    font-weight: 500;
  }
  .btn-top {
    margin-top: 20px;
    margin-right: 37px;
  }
  .header_avatar{
    background-color: #3949ab !important;
    border-color: #3949ab !important;
    padding-top: 7px;
  }
  .header_avatar h3{
    color: #fff;
    font-weight: 500;
  }
  .header_list{
    padding:0px!important;
  }

    .p30hr{
      padding: 30px;
    }

  .filter-color{
    filter: grayscale(100%);
    opacity: 0.3;
  }
  .list__tile--active img{
    filter: grayscale(0%);
    opacity: 1;
  }
  .title-categoria-header{
    color: #9a9a9a;
  }
  .btn-iniciar{
    background-color: transparent!important;
    margin-top: 8px;
    box-shadow: none;
  }
  .btn__content:before{
    background-color: #fff!important;
  }
  .home-icon:hover{
    border-radius: 50%;
  }
  .home-icon-i:hover{
    color:#3949ab;
  }
  .home-icon-i{
    color: #ccc;font-size: 30px;
  }
  .pharol-icon-card{
    color: #ccc!important;font-size: 30px;
  }
  .pharol-icon-card:hover{
    color:#3949ab!important;
    border-radius: 50%;
  }
  .btn-iniciar:hover{
  }
  
  .navbar-fixed-pharol{
    background: #fff;
    height: 70px!important;
    opacity: 0.9;
  }
  .pharol-icon-toolbar:hover{
    color:#3949ab!important;
  }
  .btn-settings-toolbar{
    padding: 5px 10px;
    margin-top: 7px;
  }
  .movil-navbar{
    background-color: #f1f1f1!important;
  }
  .icon-navbar-movil{
    color:#ababab!important;
  }
  .item-navbar-movil{
    margin-right:5px!important;
  }
  .icon-navbar-movil{
    margin-left: 10px;
  }
  .navbar-logo-movil{
    margin-left:10px!important;
  }
  .menu-navbar-settings{
    height: 38px;
    margin-top: 7px;
    margin-left: 20px;
  }
  .header-search-box-movil{
    background-color: #3949ab !important;
    padding: 10px 0;
    text-align: center;
    transition: all .3s;
    position: fixed;
    z-index: 2;
    width: 100%;
  }
  .pt10{
    padding-top:10px;
  }
  .btn-movil-header-co{
    color:#fff;
    text-transform: capitalize;
    background-color: transparent!important;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0), 0px 1px 5px 0px rgba(0, 0, 0, 0);
  }
  .search-box-modals{
    display: -webkit-box;
    background: #ffff;
    width: 100%;
    margin: 0px 6px;
    border-radius: 4px;
  }
  .search-box-modals-co{
    background-color: #3949ab !important;
    padding:0px;
  }
  .row-custon-col{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    text-align: center;
  }
  .col-md-6{
    width: 50%;
  }

  .list__tile{
    padding: 15px 5px!important;
  }

  @media only screen and (min-width: 960px) {
      .mt-res-toolbar{
        margin-top:70px;
      }
  }
  @media only screen and (max-width: 550px) {

  }
</style>
