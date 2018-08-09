<template lang="html">
  <div class="">
    <notifications></notifications>

    <v-container class="">
      <br>
      <h1 class="title-services">Servicios</h1>
      <br>
      <v-layout row wrap>
        <v-flex x12 sm6 md6 class="">
          <div class="services-box p3425">
            <span>Busca, cotizar y comprar </span>desde la comodidad de donde te encuentres.
          </div>
        </v-flex>
        <v-flex x12 sm6 md6 class="">
          <div class="services-box">
            Retira en nuestra farmacia o recibe tus productos a domicilio mediante nuestro <span>servicio de despacho a domicilio</span>
          </div>
        </v-flex>
        <v-flex x12 sm12 md12 class="">
          <div class="services-box">
            <span>Contáctanos </span> através de nuestros distintos canales de comunicación
            <br><br>
            <v-layout row wrap>
              <v-flex x12 sm2 md2 class=""></v-flex>
              <v-flex x12 sm2 md2 class="">
                <div class="serv-box-icon">
                  <img src="~/assets/images/serve/1.png" alt="">
                  <br>
                  <span>contacto@pharoL-</span>
                </div>
              </v-flex>
              <v-flex x12 sm2 md2 class="">
                <div class="serv-box-icon">
                  <img src="~/assets/images/serve/2.png" alt="">
                  <br>
                  <span>+56961588213</span>
                </div>
              </v-flex>
              <v-flex x12 sm2 md2 class="">
                <div class="serv-box-icon">
                  <img src="~/assets/images/serve/3.png" alt="">
                  <br>
                  <span>+56961588213</span>
                </div>
              </v-flex>
              <v-flex x12 sm2 md2 class="">
                <div class="serv-box-icon">
                  <img src="~/assets/images/serve/red.png" alt="">
                  <br>
                  <span>@PharolFarmacias</span>
                </div>
              </v-flex>
            </v-layout>
            <br><br>
            en caso de dudas o consulta y nuestro profesionales farmacéuticos se pondrán a tu disposición
          </div>
        </v-flex>
        <v-flex x12 sm6 md6 class="">
          <div class="services-box">
            Establece recodatorios de administración o de compra para productos que consumas frecuentemente mediante el servicio <span>#MisRecordatorios</span>
          </div>
        </v-flex>
        <v-flex x12 sm6 md6 class="">
          <div class="services-box p3425">
            Verifica y controla tus gastos en farmacia mediante el servicio <span>#MisPedidos</span>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  mounted(){
    this.showNotification()
  },
  data(){
    return {

    }
  },
  methods: {
    showNotification() {
      this.$notify({
        title: 'Registro',
        message: 'Bienvenido David',
        type: 'info',
        horizontalAlign: 'right',
        verticalAlign: 'bottom',
        showClose: false,
      })
    }
  },
}
</script>

<!-- <style src="vue-notifyjs/themes/default.css"></style> -->

<style>
.p3425{
  padding: 34px 25px;
}
.title-services {
    color: #3f51b5;
    font-weight: 500;
    padding-left: 21px;
    font-size: 20px;
    margin-top: 5px;
  }
.services-box{
  background: #f4f4f4;
  padding: 25px 20px;
  text-align: center;
  margin: 5px;
  font-size: 13px;
  color:#404040;
}
.services-box span{
  font-weight: 500;
  color:#2b2b2b;
}
.serv-box-icon{
  padding: 10px;
}
</style>
