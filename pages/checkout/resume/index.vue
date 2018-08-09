<template lang="html">
  <div class="">
    <v-dialog
        v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable
      >
        <v-card tile>
          <v-container class="center"  v-show="msg == false"><!-- fluid grid-list-md -->
            <div class="icon_thx">
              <i class="material-icons">thumb_down</i>
            </div>
            <br>
            <h1 class="text_thx_1">¡No se pudo completar la operación por el siquiente motivo: {{ transaction }}</h1>
            <br>
            <div class="box_btn_thx">
              <!-- <v-btn class="btn_thx_2">Ver detalle</v-btn> -->
              <v-btn to="/" class="btn_thx_3">Volvera intentar</v-btn>
            </div>
          </v-container>
          <v-container class="center" v-show="msg == true">
            <div class="icon_thx">
              <i class="material-icons">thumb_up</i>
            </div>
            <br>
            <h1 class="text_thx_1">¡Gracias por tu compra!</h1>
            <br>
            <h2 class="text_thx_2">
              Estamos muy contentos y agradecidos de que nos hayas preferido<br>
              !Te estaremos esperando para tu próxima compra!
            </h2>
            <!-- <br>
            <h2 class="text_thx_2">
              Con el fin de mejorar día a día te experiencia de usuario,te pedimos que por favor llenes una<br>
              pequeña encuesta haciendo click en el siguiente link
            </h3>
            <br>
            <v-btn href="https://goo.gl/LJ1Bqz" target="_blank" class="btn_thx_1">Llenar encuesta</v-btn> -->
            <br><br>
            <div class="box_btn_thx">
              <!-- <v-btn class="btn_thx_2">Ver detalle</v-btn> -->
              <v-btn to="/" class="btn_thx_3">Seguir comprando</v-btn>
            </div>
          </v-container>
          <div class="f-auto"></div>
        </v-card>
      </v-dialog>


       <!-- CODGIO DE GOOGLE ANALITYCS -->
      <script>
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        ga('create', 'UA-106856678-1', 'auto');
        ga('send', 'pageview');
      </script>
      <script async src='https://www.google-analytics.com/analytics.js'></script>

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
      </script>
      <!-- End Facebook Pixel Code -->

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    asyncData (context) {
      return {
        apiPurchase: context.env.apiPurchase,
      }
    },
    data () {
      return {
        dialog: true,
        msg: null,
        pay: null,
        transaction: null,
        orderId: null,
        email: null,
        googleTracker: {},
      }
    },
    mounted() {
      this.orderId = localStorage.getItem('orderId');
      // this.orderId = '5b099e6bdc2d9b4c302177d2';
      this.email = localStorage.getItem('email');
      this.getTBK(this.orderId)
    },
    methods: {
      getTBK(item){
        let self = this;
        axios({
          method: 'GET',
          url:`${self.apiPurchase}/transbank/order/${item}`,
        })
        .then(function(response) {
          console.log(response);
          self.pay = response.data;
          if (response.data.length > 0) {
            self.googleTracker.id = response.data[0].buy_order;
            self.googleTracker.affiliation = 'Pharol SPA WebPay';
            self.googleTracker.revenue = response.data[0].amount;
            self.googleTracker.shipping = 0;
            self.googleTracker.tax = 0;
            self.codeCase(response.data[0].response_code)

            fbq('track', 'Purchase', {
              value: response.data[0].amount, currency: 'CLP'
            });

          } else {
            self.transaction = 'Error de comunicación'
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      updateOrder(){
        let self = this;
        axios({
          method: 'GET',
          url:`${this.apiPurchase}/purchase/update/status`,
          headers: {
            id: this.orderId,
            status: 3
          }
        })
        .then(function(response) {
          // console.warn('ACTUALIZANDO EN SERVER');
          // console.log(response.data);
          self.googleTrackerEcommerce()
          self.pendingOrders();
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      googleTrackerEcommerce(){
        let self = this;
        axios({
          method: 'GET',
          url:`${this.apiPurchase}/purchase/id/${this.orderId}`,
        })
        .then(function(response) {

          // ga('ecommerce:clear');
          ga('require', 'ecommerce');

          // console.warn('MongoDB');
          // console.log(response.data);
          self.googleTracker.products = response.data.data[0].products;
          // console.warn('googleTracker');
          // console.log(self.googleTracker);

          // start the transaction
          ga('ecommerce:addTransaction', {
            'id': self.googleTracker.id,
            'affiliation': self.googleTracker.affiliation,
            'revenue': self.googleTracker.revenue,
            'shipping': self.googleTracker.shipping,
            'tax': self.googleTracker.tax
          });

          // add item 1
          for (var i = 0; i < self.googleTracker.products.length; i++) {
            ga('ecommerce:addItem', {
              'id': self.googleTracker.id,
              'name': self.googleTracker.products[i].name,
              'sku': self.googleTracker.products[i].sku,
              'category': self.googleTracker.products[i].category,
              'price': self.googleTracker.products[i].price,
              'quantity': self.googleTracker.products[i].quantity
            });
          }

          // send transaction
          ga('ecommerce:send');

        })
        .catch(function (error) {
          console.log(error);
        });
      },
      pendingOrders(){
        // console.warn('consultar ordenes pendientes');
        var self = this;
        axios({
          method: 'GET',
          url:`${this.apiPurchase}/purchase/myShoppingPending/`,
          headers: {
            email: this.email,
            status: 2,
            auth: true,
          }
        })
        .then(function(response) {
          // console.warn('pendingOrders');
          if (response.data.error) {
            // console.warn('NO TIENE ORDEN EN EL SERVIDOR');
            self.createOrder();
          }

          if (!response.data.error) {
            // console.warn('YA EXISTE ORDEN EN EL SERVIDOR');
          }

        })
        .catch(function (error) {
          console.warn('error');
          console.log(error);
        });
      },
      createOrder(){
        var self = this;
        axios({
          method: 'POST',
          url:`${this.apiPurchase}/purchase/add`,
          data: {
            status: 2,
            process: 1,
            auth: true,
            info: {
              email: this.email
            },
            products: []
          }
        })
        .then(function(response) {
          // console.warn('SE CREA LA ORDEN NUEVA');
          // console.log(response.data);
          localStorage.setItem('orderId', response.data.id);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      codeCase(item){
        // console.warn('codeCase');
        // console.log(item);
        switch (item){

          case null:
            // this.transaction = 'No completo la operación';
            this.transaction = 'Transacción aprobada. (carita de feliz o de abrazo)';
            this.msg = true;
            this.updateOrder();
            break;

          case 0:
            var self = this;
            this.msg = true;
            this.transaction = 'Transacción aprobada. (carita de feliz o de abrazo)';
            this.updateOrder();
            break;

          case -1:
            this.transaction = '¡Ups! (carita de golpe) Parece que hubo un problema con la conexión. Vuelve a intentarlo. ¡Te estaremos esperando!';
            this.msg = false;
            break;

          case -2:
            this.transaction = 'Ups! (carita de golpe) Parece que hubo un problema con la conexión. Vuelve a intentarlo. ¡Te estaremos esperando!';
            this.msg = false;
            break;

          case -3:
            this.transaction = '¡Ups! (carita de golpe) Parece que hubo un problema con la conexión. Vuelve a intentarlo. ¡Te estaremos esperando! ';
            this.msg = false;
            break;

          case -4:
            this.transaction = 'No completaste tu compra. (carita triste) ¡Te estaremos esperando!';
            this.msg = false;
            break;

          case -5:
            this.transaction = 'Lamentamos informarte que la transacción supera tu cupo máximo mensual. ¡Por favor consulta con tu Banco mientras nosotros te esperamos!';
            this.msg = false;
            break;

          case -6:
            this.transaction = 'Ups! (carita de golpe) Parece que hubo un problema con la conexión. Vuelve a intentarlo. ¡Te estaremos esperando!';
            this.msg = false;
            break;

          case -7:
            this.transaction = 'Lamentamos informarte que la transacción supera tu límite diario por transacción. ¡Por favor consulta con tu Banco mientras nosotros te esperamos!';
            this.msg = false;
            break;

          case -6:
            this.transaction = 'No se aplica';
            this.msg = false;
            break;
        }
      },
    },
    computed: {

    }
  }
</script>

<style lang="css">
.f-auto{
  flex: 1 1 auto;
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
.text_thx_2{
  color: #a0a0a0;
  font-weight: 100;
}
.btn_thx_1{
  text-transform: none;
  color: #3949ab!important;
}
.btn_thx_2{
  text-transform: none;
  padding-left: 20px;
  padding-right: 20px;
  color: #ff5722!important;
}
.btn_thx_3{
  text-transform: none;
  background-color: #ff5722!important;
  color: #fff!important;
}
.dialog--scrollable > .card {
  background: #fffffff0;
}
.card {
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
