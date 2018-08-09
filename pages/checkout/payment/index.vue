<template lang="html">
  <div class="">
    <v-flex xs12 sm12 md12>
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
            <v-stepper-content step="3">
              <v-layout row wrap>
                <v-flex xs12 sm8 md8>
                  <p class="payment_title_stfp">Selecciona tu forma de pago</p>
                  <div class="center">
                    <img class="resposive_img" src="~/assets/images/webpay.png" alt="WebPay">
                  </div>
                </v-flex>
                <v-flex xs12 sm4 md4 class="p10">
                  <v-card>
                    <v-subheader class="bg-e8e8e8">Tu  Orden</v-subheader>
                    <v-card-title primary-title>
                      <div class="payment_box_card">
                        <p>
                          Sub total: <span class="f-right">{{ formatNumber(subTotal) }}</span>
                        </p>
                        <p>Descuento: <span class="f-right">{{ discount }} % </span></p>
                        <p>Envío: <span class="f-right">{{ formatNumber(send) }}</span></p>
                        <p v-if="sendExpress">Envío Express: <span class="f-right">{{ formatNumber(sendExpress) }}</span></p>
                      </div>
                      <div class="payment_box_card_2">
                        <p v-if="total == null">
                          Total: <span class="f-right">{{ formatNumber(subTotal) }}</span>
                        </p>
                        <p v-else>
                          Total: <span class="f-right">{{ formatNumber(total) }}</span>
                        </p>
                      </div>
                    </v-card-title>
                  </v-card>
                  <form class="" action="https://transbank.pharol.cl/v1/tbk-normal.php" method="post">
                    <v-card class="box_cupon">
                      <v-layout row wrap>
                        <v-flex xs12 sm8>
                          <v-text-field
                            label="Cupon de descuento"
                            v-model="cupon"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4>
                          <v-btn @click="aplicar(cupon)" class="btn_cupon">Aplicar</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card>
                    <div class="carru_add_cart_btn">
                      <v-btn color="naranja detail_btn_add" type="submit">Finalizar compra <span class="line_add_cart">|</span> <i class="material-icons">keyboard_arrow_right</i></v-btn>
                    </div>
                    <input type="hidden" id="webpay_image" name="webpay_value" value="">
                    <input type="hidden" id="username" name="username" v-model="email">
                    <input type="hidden" id="email" name="email" v-model="email">
                    <input type="hidden" id="amount" name="amount" v-model="total">
                    <input type="hidden" id="purchase_id" name="purchase_id" v-model="orderId">
                    <input type="hidden" id="url_final" name="url_final" v-model="path">
                  </form>
                </v-flex>
              </v-layout>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </v-flex>


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
      fbq('track', 'AddPaymentInfo');
    </script>
    <!-- End Facebook Pixel Code -->

  </div>
</template>

<script>
  import format from 'format-number'
  import axios from 'axios';

  export default {
    asyncData (context) {
      return {
        apiPurchase: context.env.apiPurchase,
      }
    },
    mounted(){
      this.orderId = localStorage.getItem('orderId')
      this.email = localStorage.getItem('email')
      // console.warn('LOCAL STORAGE');
      // console.log(this.orderId);
      // console.log(this.email);
      this.getData(this.email)
      this.getOrder(this.orderId)
      this.total = this.subTotal;
    },
    data() {
      return {
        step: 3,
        cupon: '',
        orderId: null,
        email: null,
        discount: 0,
        amount: null,
        total: null,
        send: 0,
        sendExpress: null,
        path: 'https://www.pharol.cl/checkout/resume', // Url return method payment
        // path: 'http://localhost:3000/checkout/resume',
      }
    },
    methods: {
      formatNumber(item){
        return format({prefix: '$ ', integerSeparator: '.'})(item);
      },
      aplicar(item){
        if (item) {
          console.log(item);
          let self = this;
          axios({
            method: 'POST',
            url:`${this.apiPurchase}/offer/user/add`,
            data: {
              code: this.cupon,
              subscribers_mail: [
                {
                  email: this.email
                }
              ]
            }
          })
          .then(function(response) {
            if (response.data.error) {
              self.$notify({
                title: 'Error',
                message: `${response.data.msj}`,
                type: 'danger',
                horizontalAlign: 'right',
                showClose: false
              })
            }

            if (response.data.error == false) {
              // console.warn('APLICANDO DESCUENTO');
              self.discount = response.data.offer[0].discount;
              self.total = self.subTotal - ((self.subTotal * response.data.offer[0].discount) / 100);
            }


          })
          .catch(function (error) {
            console.log(error);
          });
        }

        if (!item) {
          console.log('ingrese cupon');
        }

      },
      getData(item){
        let self = this;
        axios({
          method: 'GET',
          url:`${this.apiPurchase}/purchase/myShoppingPending/`,
          headers: {
            email: item,
            status: 3,
            auth: true,
          }
        })
        .then(function(response) {
          if (response.data.error != true) {
            // console.warn('SE APLICA COSTO DE ENVIO');
            self.send = 1800;
            self.total = self.subTotal + self.send;
          }
        })
      },
      getOrder(item){
        let self = this;
        axios({
          method: 'GET',
          url:`${this.apiPurchase}/purchase/id/${item}`,
        })
        .then(function(response) {
          // console.log(response.data.data[0].info.mix_order);
          if (response.data.data[0].info.mix_order == true) {
            self.sendExpress = 1800;
            self.total = self.total + self.sendExpress;
          };
        })
      },
    },
    computed: {
      subTotal() {
        let sum = 0;
        return this.$store.state.cart.reduce((sum, item) => sum + item.sub_total, 0)
      },
    }
  }
</script>

<style lang="css">
.f-right{
  float: right;
}
.bg-e8e8e8{
  background: #e8e8e8;
}
.payment_btn_continue{
  color: #fff!important;
}
.detail_btn_add {
  font-size: 15px;
}
.p10{
  padding: 10px;
}
.payment_box_card{
  width: 100%;
  border-bottom: 1px solid #cccccc61;
}
.payment_box_card_2{
  width: 100%;
  padding-top: 20px;
}
.payment_box_card_2 p{
  font-weight: 600;
}
.payment_title_stfp{
  padding-bottom: 20px;
  font-size: 13px;
}
.box_cupon{
  margin-top: 20px;
  padding-top: 15px;
  padding-left:15px;
  padding-right:15px;
  text-align: center;
}
.btn_cupon{
  text-transform: none;
}
</style>
