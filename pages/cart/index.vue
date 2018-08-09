<template lang="html">
  <div>
    <v-layout row wrap>
      <v-flex x12 sm12 md12 v-if="myCart.length <= 0">
        <v-container class="center ptb100"><!-- fluid grid-list-md -->
          <div class="icon_thx">
            <i class="material-icons">remove_shopping_cart</i>
          </div>
          <br>
          <h1 class="text_thx_1">¡No tienes productos agregados al carrito!</h1>
          <br>
          <div class="box_btn_thx">
            <!-- <v-btn class="btn_thx_2">Ver detalle</v-btn> -->
            <v-btn to="/" class="btn_thx_3">Volver</v-btn>
          </div>
        </v-container>
      </v-flex>
      <v-flex xs12 sm9 md9 v-if="myCart.length >= 1">
        <list-product-component :items="{ products: myCart }" />
      </v-flex>
      <v-flex xs12 sm3 md3 v-if="myCart.length >= 1">
        <v-container>
          <v-card>
            <v-subheader class="bg-e8e8e8">Tu  Orden</v-subheader>
            <v-card-title primary-title>
              <div>
                <p>
                  Sub total: {{ formatNumber(total) }}
                </p>
              </div>
            </v-card-title>
          </v-card>
          <v-btn
            dark
            block
            color="deep-orange darken-1"
            :to="{ path: '/checkout/retirement'}"
            v-if="myCart.length >= 1">
            continuar
          </v-btn>
        </v-container>
      </v-flex>
    </v-layout>


    <!-- Facebook Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '2031103367167369');
      fbq('track', 'AddToCart');
    </script>
    <!-- End Facebook Pixel Code -->



  </div>
</template>

<script>

  import format from 'format-number'
  import ListProduct from '~/components/ListProduct.vue'

  export default {
    components: {
      'list-product-component': ListProduct,
    },
    asyncData (context) {
      return {
        apiPurchase: context.env.apiPurchase,
        imgAws: context.env.imgAws,
      }
    },
    data () {
      return {

      }
    },
    methods: {
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
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .bg-e8e8e8{
    background:#e8e8e8;
  }
  .fab_bottom{
    margin-bottom: 50px;
  }
  .icon_thx{
    border-radius: 50px;
    border: 5px solid #3949ab;
    text-align: center;
    padding: 25px;
    width: 100px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .icon_thx i{
    color: #ff5722;
    font-size: 35px;
  }
  .text_thx_1{
    color: #3949ab;
    font-size: 35px;
    font-weight: 100;
  }
  .btn_thx_3{
    text-transform: none;
    background-color: #ff5722!important;
    color: #fff!important;
  }
  .ptb100{
    padding: 100px 0;
  }
</style>
