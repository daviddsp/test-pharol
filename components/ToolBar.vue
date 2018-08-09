<!-- <template>
  <div>
    <v-flex xs12 sm12 md12>
      <v-toolbar
        dark
        class="main-toolbar">
        <v-flex xs2 sm2 md2>
          <v-btn
            icon
            @click.stop="sideMenu = !sideMenu">
            <v-icon>menu</v-icon>
          </v-btn>
        </v-flex>

        <v-toolbar-items>

          <v-btn
            flat
            v-for="item in menuOptions"
            :key="item.title"
            router
            :to="item.path"
            class="btn-menu-toolbar"
          >
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>

        <v-flex xs8>

        </v-flex>

        <v-flex xs1 sm1 md1>
          <v-btn
            icon
            to="/products">
            <v-icon>search</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs1 sm1 md1>
          <v-btn
            icon
            @click.stop="sideCart = !sideCart">
            <v-badge color="red">
              <span slot="badge">{{ $store.state.cart.length}}</span>
                <v-icon>shopping_cart</v-icon>
            </v-badge>
          </v-btn>
        </v-flex>
      </v-toolbar>
    </v-flex>



    <v-navigation-drawer
      temporary
      right
      v-model="sideCart"
      fixed
      >
      <v-list>
        <side-nav-cart></side-nav-cart>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      temporary
      left
      v-model="sideMenu"
      fixed
      >
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://vuetifyjs.com/static/vuetify-logo-300.png" alt="vue">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Categorias principales</v-list-tile-title>
            <v-list-tile-sub-title>Disfruta de nuestras promociones</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn
              icon
            >
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list >
        <div
          v-for="(item, index) in allCategories"
          :key="item.id"
          >

          <v-list-tile avatar :to="`/category/${item.slug}`">
            <v-list-tile-content>
              <v-list-tile-title> {{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon color="deep-orange darken-1">keyboard_arrow_right</v-icon>
            </v-list-tile-action>

          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template> -->

<!-- // <script>
//   import axios from 'axios';
//   import SideNavCart from '~/components/SideNavCart'
//   import Search from '~/components/Search.vue'
//
//
//   export default {
//     props:['item'],
//     components: {
//       'side-nav-cart': SideNavCart,
//       'search-component': Search
//     },
//     mounted: function() {
//       let self = this;
//       // console.warn('mounted');
//       console.log(this.$store.getters.isAuth);
//       this.$store.commit('login', this.$store.getters.isAuth)
//
//       axios({
//         method:'GET',
//         url:`http://localhost:1339/categories`,
//       })
//       .then(function(response) {
//         console.warn('results');
//         console.log(response.data.data);
//         self.allCategories = response.data.data;
//       });
//     },
//     data(){
//       return  {
//         sideCart: false,
//         sideMenu: false,
//         menuOptions: [
//           { path: '/', title: 'ini' },
//           { path: '/products', title: 'prod'},
//           { path: '/category', title: 'cat'},
//           { path: '/cart', title: 'cart'},
//           // { path: '/offer', title: 'offer'},
//           // { path: '/notification', title: 'noti'},
//           // { path: '/reminder', title: 'record'},
//           // { path: '/auth', title: 'login'},
//         ],
//         allCategories: [],
//         subCategories: [],
//       }
//     },
//     methods:{
//       submit(event){
//         console.warn('hello world');
//         console.log(this.findWord);
//         this.$router.push({ path: `/results/${this.findWord}` })
//       },
//       stringToSlug(item){
//         return item.toString().toLowerCase().replace(/ /g, '-')
//       },
//     },
//     computed: {
//
//     }
//   }
// </script> -->

<!-- /* <style>
  .list__tile__title .toolbar-sub-category {
    text-transform: lowercase;
  }
  .toolbar-component.input-sesarch input {
    height: 40px;
    width: 100%;
    line-height: 40px;
    border: solid 1px #ffffff;
    border-radius: 3px;
    padding: 0px 10px;
    color: #ffffff;
  }

  .toolbar-component.input-sesarch input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #ffffff;
    opacity: 0.7;
  }
  .menu__content.menuable__content__active {
    width: 80%;
    position: absolute;
    z-index: 9999 !important;
  }
  .menu-layout-toolbar {
    margin-top: -8px;
  }
  .btn-category-toolbar{
    font-size: 16px !important;
  }
  .main-toolbar {
    background: #3f51b5 !important;
  }
  .btn-menu-toolbar {
    font-size: 12px;
    text-transform: capitalize;
  }
</style> */ -->
