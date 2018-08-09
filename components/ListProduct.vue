<template lang="html">
  <div>
    <div class="box_card" v-for="(item, index) in items.products" :key="index">
      <v-card class="box_card_2">
        <v-container>
          <div class="box_cart_list">
            <v-layout class="content_cart_list" row wrap>
              <v-flex xs12 sm12 md12 class="p10 center-res">
                <v-layout row wrap>
                  <v-flex xs12 sm2 md2>
                    <div class="center-res w100">
                      <img :src="`https://pharol.s3.amazonaws.com/media/${item.image}`" width="100%" v-bind:alt="item.name">
                    </div>
                  </v-flex>
                  <v-flex xs12 sm5 md5>
                    <h3 class="title_cart_list_title_1">{{ item.name }}</h3>
                    <p class="title_cart_list_title_2">Laboratorio: {{ item.laboratory }} </p>
                    <div class="RXS-img" v-show="item.prescription_type == 'NP'">
                      <!--<img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rx.png">-->
                      <span class="rxs-title fs13">Medicamento de venta Libre</span>
                    </div>
                    <div class="RXS-img" v-show="item.prescription_type == 'WP'">
                      <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rx.png" alt="Receta Medica Simple">
                    </div>
                    <div class="RXS-img" v-show="item.prescription_type == 'RP'">
                      <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rr-2.png" alt="Receta Medica Retenida con Control de Stock">
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
                    <div class="RXS-img" v-show="item.prescription_type == 'RMRSCS'">
                      <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rr.png" alt="Receta Médica Retenida sin Control de Stock">
                    </div>
                    <div class="RXS-img" v-show="item.prescription_type == 'APR'">
                      <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rr.png" alt="Antibiótico Presentación de Receta">
                    </div>
                    <div class="RXS-img" v-show="item.bioequivalent == true">
                      <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-bioequivalente.png" alt="Bioequivalente">
                    </div>
                  </v-flex>
                  <v-flex xs12 sm1 md1 class="center">
                    <h3 class="cart_list_price">
                      {{ formatNumber (item.price) }}
                    </h3>
                  </v-flex>
                  <v-flex xs12 sm3 md3 class="center">
                    <div class="cart_list_box_number">
                      <v-btn fab dark small color="naranja" @click="deleteElement(item)">
                        <v-icon dark class="icon-ffw">remove</v-icon>
                      </v-btn>
                      <input type="number" placeholder="0" class="form-control detail_number_cart_list" :value="item.quantity">
                      <v-btn fab dark small color="naranja" @click="addElement(item)">
                        <v-icon dark class="icon-ffw">add</v-icon>
                      </v-btn>
                    </div>
                  </v-flex>
                  <v-flex xs12 sm1 md1 class="center">
                    <v-btn class="cart_list_clear" @click="deleteItemCart(item)" >
                      <i class="material-icons custon-delete-cfs">delete</i>
                    </v-btn>
                    <!-- <span class="line_list_cart">|</span>
                    <v-btn class="cart_list_clear">
                      <i class="material-icons custon-delete-cfs">av_timer</i>
                    </v-btn> -->
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </div>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

  <script>
  import format from 'format-number'

  export default {
    props: ['items'],
    components: {

    },
    data () {
      return {
        init: null
      }
    },
    methods: {
      deleteItemCart(item) {
        this.$store.commit('deleteItemCart', item)
        this.$store.commit('updateOrderOnServer')
      },
      addElement(item){
        this.$store.commit('addItemCart', item)
        this.$store.commit('updateOrderOnServer');
      },
      deleteElement(item){
        this.$store.commit('deleteQuantityCart', item)
        this.$store.commit('updateOrderOnServer');
      },
      formatNumber(item){
        return format({prefix: '$', integerSeparator: '.'})(item);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .custon-delete-cfs{
    color: #ff004c;font-size: 20px;
  }
  .icon-ffw{
    font-size:15px; 
    font-weight: bold;
  }
  .w100{
    width:100%;
  }
  .box_card{
    padding: 20px;
  }
  .box_card_2{
    padding: 10px;
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
    text-transform: capitalize;
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
  .RXS-img{
    float:left;
    padding:3px;
  }
  @media (max-width: 776px){
    .RXS-img{
      float:none;
    }
  }
  @media (max-width: 950px){
    .center-res{
      text-align: center;
    }
  }

</style>
