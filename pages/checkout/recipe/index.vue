<template lang="html">
  <div>
    <v-layout row wrap>
      <v-container>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="step > 1">Entrega</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="step > 2">Receta médica</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Pago</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="2" class="box_card">
              <v-flex xs12 sm12>
                <div v-for="(item, index) in myCart" :key="index">
                  <div class="box_card_2">
                    <v-container>
                      <div class="box_cart_list">
                        <v-alert :value="true" v-if="item.prescription_type == 'WP'" class="receta-alert wp-alert">
                          <v-layout row wrap>
                            <v-flex xs12 md3 class="report-icon-alert">
                              <i class="material-icons">report_problem</i>
                            </v-flex>
                            <v-flex xs12 md6 class="msn-alert-recipe">
                               Este producto requiere receta médica
                            </v-flex>
                            <v-flex xs12 md3 class="error-icon-alert">
                              <v-tooltip bottom>
                                <v-icon slot="activator" class="white">error</v-icon>
                                <span>Para productos antibióticos debes adjuntar la imagen de la receta y,<br> en caso de que deses utilizar tu seguro complementario,<br> junto con adjuntar la imagen, tendremos que retener tu receta.</span>
                              </v-tooltip>
                            </v-flex>
                          </v-layout>
                        </v-alert>
                        <v-alert :value="true" v-if="item.prescription_type == 'APR' || item.prescription_type == 'RMRSCS'" class="receta-alert arp-alert">
                          <v-layout row wrap>
                            <v-flex xs12 md3 class="report-icon-alert">
                              <i class="material-icons">report_problem</i>
                            </v-flex>
                            <v-flex xs12 md6 class="msn-alert-recipe">
                               Este producto requiere receta retenida sin control de slock
                            </v-flex>
                            <v-flex xs12 md3 class="error-icon-alert">
                              <v-tooltip bottom>
                                <v-icon slot="activator" class="white">error</v-icon>
                                <span>Debes adjuntar la imagen de la receta médica.</span>
                              </v-tooltip>
                            </v-flex>
                          </v-layout>
                        </v-alert>
                        <v-alert :value="true" v-if="item.prescription_type == 'RP'" class="receta-alert rp-alert">
                          <v-layout row wrap>
                            <v-flex xs12 md3 class="report-icon-alert">
                              <i class="material-icons">report_problem</i>
                            </v-flex>
                            <v-flex xs12 md6 class="msn-alert-recipe">
                               Este producto requiere receta retenida con control de stock
                            </v-flex>
                            <v-flex xs12 md3 class="error-icon-alert">
                              <v-tooltip bottom>
                                <v-icon slot="activator" class="white">error</v-icon>
                                <span>Debes adjuntar la imagen de la receta médica y<br> recuerda que sólo puedes retirar este <br>producto desde la farmacia asignada con tu carnet de identidad.</span>
                              </v-tooltip>
                            </v-flex>
                          </v-layout>
                        </v-alert>
                        <v-alert :value="true" v-if="item.prescription_type == 'RCH'" class="receta-alert rp-alert">
                          <v-layout row wrap>
                            <v-flex xs12 md3 class="report-icon-alert">
                              <i class="material-icons">report_problem</i>
                            </v-flex>
                            <v-flex xs12 md6 class="msn-alert-recipe">
                               Este prodcuto requiere receta cheque
                            </v-flex>
                            <v-flex xs12 md3 class="error-icon-alert">
                              <v-tooltip bottom>
                                <v-icon slot="activator" class="white">error</v-icon>
                                <span>Debes adjuntar la imagen de la receta médica y<br> recuerda que sólo puedes retirar este <br>procducto desde la farmacia asignada con las dos copias de la receta y tu carnet de identidad.</span>
                              </v-tooltip>
                            </v-flex>
                          </v-layout>
                        </v-alert>
                        <v-card class="p30">
                          <v-layout row wrap class="content_cart_list">
                            <v-flex xs12 sm2 class="p10 center-res">
                              <div >
                                <img :src="`https://pharol.s3.amazonaws.com/media/${item.image}`" width="100%" class="img_list" v-bind:alt="item.name">
                              </div>
                            </v-flex>
                            <v-flex xs12 sm5 md5>
                              <h3 class="title_cart_list_title_1">{{ item.name }}</h3>
                              <p class="title_cart_list_title_2">Laboratorio: {{ item.laboratory }} </p>

                              <div class="RXS-img" v-show="item.prescription_type == 'WP'">
                                <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rx.png" alt="Receta Medica Simple">
                              </div>
                              <div class="RXS-img" v-show="item.prescription_type == 'RP'" alt="Receta Medica Retenida con Control de Stock">
                                <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rr-2.png">
                              </div>
                              <div class="RXS-img" v-show="item.prescription_type == 'RCH'">
                                <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rch.png" alt="Receta Medica Cheque">
                              </div>
                              <div class="RXS-img" v-show="item.prescription_type == 'RRCS'">
                                <img class="resposive_img" width="44px" src="~/assets/images/RX/RX.png" alt="Receta retenida con control de stock">
                              </div>
                              <div class="RXS-img" v-show="item.prescription_type == 'VDPR'">
                                <img class="resposive_img" width="44px" src="~/assets/images/RX/RX.png" alt="Venta directa presentación de Receta">
                              </div>
                              <div class="RXS-img" v-show="item.prescription_type == 'APR'" alt="Antibiótico Presentación de Receta">
                                <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rr.png">
                              </div>
                              <div class="RXS-img" v-show="item.prescription_type == 'RMRSCS'">
                                <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rr.png" alt="Receta Médica Retenida sin Control de Stock">
                              </div>
                              <div class="RXS-img" v-show="item.bioequivalent == true">
                                <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-bioequivalente.png" alt="Bioequivalente">
                              </div>
                            </v-flex>
                            <v-flex xs12 sm5 md5 class="price_recipe">
                              <h3 class="cart_list_price"> {{ formatNumber(item.price) }}</h3>
                            </v-flex>
                          </v-layout>
                          <br>
                          <v-layout row wrap>
                            <v-flex xs12 sm12 md12 class="center" v-show="item.recipe == null">
                              <upload-component :item="item"></upload-component>
                            </v-flex>
                            <v-flex xs12 sm12 md12 class="center" v-show="item.recipe">
                              <img :src="item.recipe" width="100%">
                              <v-btn
                                @click="deleteImage(item)"
                                dark
                                color="deep-orange darken-1">
                                Eliminar
                              </v-btn>
                            </v-flex>
                          </v-layout>
                          <br>
                        </v-card>
                      </div>
                    </v-container>
                  </div>
                </div>
              </v-flex>

              <v-flex xs12 sm12 md12 class="center">
                <v-btn
                  @click="order()"
                  dark
                  color="deep-orange darken-1">
                  continuar
                </v-btn>
              </v-flex>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-container>
      <v-flex x12 sm12 md12 v-if="myCart.length <= 0">
        <p>No tienes ningun producto que presetar receta.</p>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
import axios from 'axios';
import format from 'format-number'
import Upload from '~/components/Upload.vue'

export default {
  components: {
    'upload-component': Upload,
  },
  asyncData (context) {
    return {
      apiPurchase: context.env.apiPurchase,
      imgAws: context.env.imgAws,
    }
  },
  mounted (){
    // console.warn('state purchase');
    // console.log(this.$store.state.purchase);
  },
  data () {
    return {
      step: 2,
      rp: true,
      check: '',
    }
  },
  methods: {
    formatNumber(item){
      return format({prefix: '$', integerSeparator: '.'})(item);
    },
    deleteItemCart: function (item) {
      this.$store.commit('deleteItemCart', item)
    },
    deleteImage(item){
      console.log(item);
      this.$store.commit({
        type: 'deleteImage',
        objectID: item.objectID,
      })
      this.$forceUpdate();
    },
    order(){
      let recipe = this.checkRecipe();
      if (recipe == false) {
        this.$notify({
          title: 'Error',
          message: 'Debe subir la receta obligatoriamente.',
          type: 'danger',
          horizontalAlign: 'right',
          showClose: false,
        })
      }

      let presentation = this.checkPresentation();
      if (presentation == false) {
        this.$notify({
          title: 'Error',
          message: 'Debe aceptar la condición de presentar la receta al momento de la entrega.',
          type: 'danger',
          horizontalAlign: 'right',
          showClose: false,
        })
      }

      if (recipe == true && presentation == true) {
        let self = this;
        axios({
          method: 'PUT',
          url:`${this.apiPurchase}/purchase/update/order/${localStorage.getItem('orderId')}`,
          data: {
            info: this.$store.state.purchase.info,
            products:  this.$store.state.cart
          }
        })
        .then(function(response) {
          self.$router.push({ path: '/checkout/payment' })
        })
        .catch(function (error) {
          console.log(error);
        });
      }


    },
    checkRecipe(){
      // console.warn('entro den la funcion de chequear recipe');
      function fitlerRecipe(obj) {
        // Esta funcion filtra los productos que requieren receta obligatoria
        if (
             obj.prescription_type == 'RP'
          || obj.prescription_type == 'RCH'
          || obj.prescription_type == 'RRCS'
          || obj.prescription_type == 'APR'
          || obj.prescription_type == 'RMRSCS'
       ){
          return true
        }
      }

      var check = this.$store.state.cart.filter(fitlerRecipe);

      for (let i = 0; i < check.length; i++) {
        // se verifica si tiene imagen subida
        if (!check[i].recipe) {
          // console.warn('no subio la imagen');
          return false
        }
      }

      return true
    },
    checkPresentation(){
      // console.warn('entro den la funcion de chequear la presentacion');
      function fitlerRecipe(obj) {
        // Esta funcion filtra los productos que requieren presentación de receta
        if (obj.prescription_type == 'WP'){
          return true
        }
      }

      var check = this.$store.state.cart.filter(fitlerRecipe);

      for (let i = 0; i < check.length; i++) {
        // se verifica que el usuario presentara la receta
        if (check[i].physical_presentation == false) {
          // console.log('no presentara la receta');
          return false
        }
      }

      return true
    },

  },
  computed: {
    myCart(){
      // Se verfica si el carro de compras tiene productos
      // que requieran algun tipo de receta
      function fitlerRecipe(obj) {
        if (
             obj.prescription_type == 'WP'
          || obj.prescription_type == 'VDPR'
          || obj.prescription_type == 'RP'
          || obj.prescription_type == 'RCH'
          || obj.prescription_type == 'RRCS'
          || obj.prescription_type == 'APR'
          || obj.prescription_type == 'RMRSCS'
        ){
          return true;
        }
      }
      var filterCart = this.$store.state.cart.filter(fitlerRecipe);

      return filterCart;
    },
    total() {
      let sum = 0;
      return this.$store.state.cart.reduce((sum, item) => sum + item.sub_total, 0);
    }
  },
}
</script>

<style >/*lang="stylus" scoped*/
  .white{
    color:#fff;
  }
  .fab_bottom{
    margin-bottom: 50px;
  }
  .img_list{
    width: 100px;
    margin: 0px 0px;
    height: 100px;
    border-radius: 100%;
    border: 1px solid #e1e1e1;
  }
  .box_card{
    padding: 20px;
  }
  .box_cart_list{
    padding: 10px;
  }
  .title_cart_list_title_1{
    font-size: 14px;
    font-weight: 300;
    color: #268ae0;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-transform: uppercase;
  }
  .title_cart_list_title_2{
    font-size: 12px;
    color:#757575;
    margin-bottom: 5px;
  }
  .cart_list_price{
    font-size: 22px;
  }
  .detail_number_cart_list{
    border: 1px solid #ddd;
    width: 35px;
    text-align: center;
    border-radius: 0px;
    margin-top: 2px;
  }
  .cart_list_clear{
    box-shadow: none!important;
    background-color: transparent!important;
    min-width: 10px!important;
  }
  .line_list_cart{
    color: #ebebeb;
    padding-left: 0px;
    padding-right: 1px;
  }
  .box_card{
    background: rgba(221, 221, 221, .13);
    padding: 50px;
  }
  .dropzone.dz-clickable {
    cursor: pointer;
    border-width: 2px;
    border-style: dashed;
    border-color: #E5E5E5;
  }
  .price_recipe{
    text-align: right;
    color: rgba(0, 0, 0, .54);
  }
  .dropzone .dz-message {
    text-align: center;
    margin: 1em 0;
  }
  .vue-dropzone .dz-preview .dz-remove {
  }
  .p30{
    padding: 30px;
  }
  .text_align_right{
    text-align: right;
  }
  .receta-alert{
    margin: 0px auto;
    text-align: center;
    border-width: 2px 0 0 0;
    font-size: 13px;
  }
  .wp-alert{
    background-color: #4caf50 !important;
    border-color: #4caf50 !important;
  }
  .report-icon-alert i{
    color:#00000047;
  }
  .report-icon-alert{
    text-align: right;
  }
  .msn-alert-recipe{
    margin-top:5px;
  }
  .error-icon-alert i{
    font-size: 14px;
    margin-top: 7px;
  }
  .error-icon-alert{
    text-align: left;
  }
  .arp-alert{
    background-color: #fdd835 !important;
    border-color: #fdd835 !important;
  }
  .rp-alert{
    background-color: #e53935 !important;
    border-color: #e53935 !important;
  }
  @media (max-width: 550px){
    .center-res{
      text-align: center;
    }
    .box_card{
      padding: 10px;
    }
  }
  @media (max-width: 767px){
    .report-icon-alert, .error-icon-alert{
      text-align: center;
    }
  }
  @media (max-width: 950px){
    .flex.sm5 {
      flex-basis: 100%!important;
      max-width: 100%!important;
    }
  }
</style>
