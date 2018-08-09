<template>
  <div>
    <v-layout row wrap v-if="myCart.length > 0">
      <v-flex xs12 sm10 sm12 class="sidenavcart_top">
        <i class="icon pharol-icon material-icons">shopping_cart</i>
      </v-flex>
      <v-flex xs12 sm10 sm12 class="sidenavcart_top_2">
        <p>Productos: {{ myCart.length }}</p>
        <p>Subtotal: {{ formatNumber(total) }}</p>
        <v-btn color="naranja sidenav_comprar_btn" to="/checkout/retirement">Comprar</v-btn>
      </v-flex>
      <v-list>
        <div
          v-for="(item, index) in myCart"
          :key="index" >
            <v-list-tile class="sidenav_list_item">
              <v-list-tile-avatar>
                <img :src="`https://pharol.s3.amazonaws.com/media/${item.image}`" width="100%" v-bind:alt="item.name">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="sidebav_text1">{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ formatNumber(item.price) }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click="deleteItemCart(item)">
                  <i class="material-icons c-b3b3b3">delete</i>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <div class="sidenav_list_item_line"></div>
          </div>
      </v-list>
      <v-footer height="auto" class="indigo darken-1 sidenar_footer">
        <v-flex xs12 sm10 sm12>
          <v-btn class="sidenav_carrito_btn" to="/cart">Ver mi carrito</v-btn>
        </v-flex>
      </v-footer>
    </v-layout>



    <v-layout row wrap v-else>
      <v-flex xs12 sm10 sm12 class="sidenavcart_top">
        <i class="icon pharol-icon material-icons">shopping_cart</i>
      </v-flex>
      <v-flex xs12 sm10 sm12 class="sidenavcart_top_2">
        <p>Productos: {{ myCart.length }}</p>
        <p>Subtotal: {{ formatNumber(total) }}</p>
        <v-btn color="naranja sidenav_comprar_btn" to="/cart">Comprar</v-btn>
      </v-flex>
      <v-list>

      </v-list>
      <v-footer height="auto" class="indigo darken-1 sidenar_footer">
        <v-flex xs12 sm10 sm12>
          <v-btn class="sidenav_carrito_btn" to="/cart">Ver mi carrito</v-btn>
        </v-flex>
      </v-footer>
    </v-layout>
  </div>
</template>


<script>
  import format from 'format-number'
  import Product from '~/components/Product.vue'

  export default {
    components: {
      'product-component': Product,
    },
    mounted(){

    },
    data () {
      return {

      }
    },
    methods: {
      deleteItemCart(item) {
        this.$store.commit('deleteItemCart', item)
        this.$store.commit('updateOrderOnServer');
        this.$notify({
          title: 'Producto eliminado',
          message: 'Se ha eliminado su Producto con éxito.',
          type: 'danger',
          horizontalAlign: 'right',
          showClose: false,
        })
      },
      addElement(item){
        this.$store.commit('addItemCart', item)
      },
      deleteElement(item){
        this.$store.commit('deleteQuantityCart', item)
      },
      formatNumber(item){
        return format({prefix: '$', integerSeparator: '.'})(item);
      }
    },
    computed: {
      myCart(){
        return this.$store.state.cart;
      },
      total() {
        return this.$store.state.totalStore
      },
    },
  }
</script>

<style lang="stylus" scoped>
  /*
  * Carrito
  */
  .vue-notifyjs .alert-danger {
      background-color: #fd5621;
      color: #FFF!important;
      border: 1px solid #fff!important;
  }
  .sidenavcart_top{
    background-color: #3949ab !important;
    color: #fff;
    padding: 15px;
    text-align: center;
    margin-top: -8px;
  }
  .sidenavcart_top i{
    color: #fff;
  }
  .sidenavcart_top_2{
    padding: 15px;
    text-align: center;
    margin-top: 5px;
    color: #3949ab;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
  }
  .sidebav_text1{
    width: 150px;
  }
  .sidenav_comprar_btn{
    color: #fff !important;
    text-transform: none;
    width: 70%;
  }
  .sidenar_footer {
    bottom: 0px;
    position: relative;
    width: 100%;
    background-color: #fff!important;
    text-align: center;
  }
  .sidenav_carrito_btn{
    text-transform: none;
    width: 70%;
    color: #fd5621!important;
    margin-bottom: 20px;
  }
  .sidenav_carrito_btn:hover{
    background: #fd5621!important;
    color: #fff!important;
  }
  .sidenav_list_item{
    padding: 20px 0 20px 0px;
  }
  .sidenav_list_item_line{
    border-bottom: 1px solid rgb(221, 221, 221);
    width: 90%;
    margin-left: 20px;
  }
  .c-b3b3b3{
    color:#b3b3b3;
  }

</style>
