<template>
  <div>
    <v-footer class="footer_pharol">
      <v-container>
        <v-layout row wrap class="footer_row_resposive" >
          <v-flex xs12 sm4 md4>
            <br>
            <h3 class="title_footer">Newsletter</h3>
            <hr class="hr_footer">
            <br>
            <div class="input-group">
              <input type="text" class="form-control footer_email" placeholder="Tu email">
              <span class="input-group-addon"><i class="material-icons">&#xE163;</i></span>
            </div>
            <!--<br>
            <p class="title_footer_2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <p class="title_footer_3"><i class="material-icons">radio_button_unchecked</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>-->
            <br>
            <h3 class="title_footer">Redes</h3>
            <hr class="hr_footer">
            <br>
            <div class="footer_redes">
              <a href="https://www.facebook.com/PharolFarmacias" target="_blank">
                <img src="~/assets/images/ic-footer-facebook.png" class="img_redes" alt="Facebook pharol">
              </a>
              <a href="https://www.instagram.com/pharolfarmacias/" target="_blank">
                <img src="~/assets/images/ic-footer-instagram.png" class="img_redes" alt="Instagram pharol">
              </a>
              <a href="https://twitter.com/PharolFarmacias" target="_blank">
                <img src="~/assets/images/ic-footer-twitter.png" class="img_redes" alt="Twitter pharol">
              </a>
              <a href="https://medium.com/@pharolfarmacias" target="_blank">
                <img src="~/assets/images/ic-footer-m.png" class="img_redes" alt="Medium pharol">
              </a>
              <a href="https://www.linkedin.com/company/22285548/" target="_blank">
                <img src="~/assets/images/ic-footer-linkedin.png" class="img_redes" alt="Linkedin pharol">
              </a>
            </div>
          </v-flex>
          <v-flex xs12 sm3 md3>
            <br>
            <h3 class="title_footer">Contáctanos</h3>
            <hr class="hr_footer">
            <br>
            <p class="title_footer_3"><i class="material-icons footer_azul">person_pin</i> Dirección</p>
            <p class="title_footer_3">San Pablo 3136, Santiago, Región Metropolitana</p>
            <br>
            <p class="title_footer_3"><i class="material-icons footer_azul">person_pin</i> Teléfono / WhatsApp </p>
            <p class="title_footer_3">+56226827613 / +56961588213</p>
            <br>
            <p class="title_footer_3"><i class="material-icons footer_azul">person_pin</i> Email</p>
            <p class="title_footer_3">contacto@pharol.cl</p>
          </v-flex>
          <v-flex xs12 sm2 md2>
            <br>
            <h3 class="title_footer">Nosotros</h3>
            <hr class="hr_footer">
            <br>
            <div class="footer_nosotros">
              <p class="title_footer_3"><router-link :to="{ path: '/about' }" class="router-footer">Quiénes somos</router-link></p>
              <p class="title_footer_3">Mapa del sitio</p>
              <p class="title_footer_3"><router-link :to="{ path: '/terms-conditions' }" class="router-footer">Terminos y condiciones</router-link></p>
              <p class="title_footer_3"><router-link :to="{ path: '/policies' }" class="router-footer">Políticas de privacidad</router-link></p>
              <p class="title_footer_3">Envíos</p>
            </div>
          </v-flex>
          <v-flex xs12 sm3 md3>
            <!--<br>
            <p class="title_footer">App</p>
            <hr class="hr_footer">
            <br>
            <a href="https://play.google.com/store/apps/details?id=com.pharol&hl=es" target="_blank">
              <img class="resposive_img" src="~/assets/images/android.png" alt="Play Store Android">
            </a>
            <a href="https://itunes.apple.com/us/app/pharol-t%C3%BA-farmacia/id1163099681?l=es&ls=1&mt=8" target="_blank">
              <img class="resposive_img" src="https://s3-us-west-2.amazonaws.com/pharol-v2/bank-image/apple.png" alt="Itunes Apple">
            </a>-->
            <br>
            <h3 class="title_footer">Medios de pago</h3>
            <hr class="hr_footer">
            <br>
            <img class="resposive_img" src="https://raw.githubusercontent.com/armikhael/vuetifyjs/master/src/assets/webpage.png" alt="Webpay">
            <br>
            <h3 class="title_footer">Navegación Segura</h3>
            <hr class="hr_footer">
            <br>
            <img class="resposive_img" src="https://raw.githubusercontent.com/armikhael/vuetifyjs/master/src/assets/seguro.png" alt="Digicert">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 class="footer_proy">
            <br>
            <h3 class="title_footer">Proyecto aprobado por</h3>
            <br>
            <img class="resposive_img" src="https://raw.githubusercontent.com/armikhael/vuetifyjs/master/src/assets/inu.png" alt="Corfo Incuba UC ">
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
    <div class="footer_bottom">
      <p class="title_footer_2">Copyright Pharol 2018 @ Derechos reservados</p>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {

      }
    }
  }
</script>

<style lang="stylus" scoped>

  /*Footer*/
  .img_redes {
    margin:0px 5px;
  }
  .footer_pharol{
    background: #161616!important;
    height: auto!important;
  }
  .title_footer{
    color: #fff;
    font-size: 14px;
    font-weight:500;
  }
  .hr_footer{
    margin-top: 10px;
    margin-bottom: 10px;
    width: 70px;
    border: 1px solid #268ae0;
  }
  .title_footer_2{
    color: #fff;
    margin-bottom: 0px;
    padding-bottom: 10px;
  }
  .title_footer_3{
    color: #fff;
    font-size: 12px;
  }
  .title_footer_3 i{
    font-size: 13px;
    font-weight: 900;
    padding-right: 5px;
  }
  .footer_redes i{
    font-size: 40px;
    padding-right: 10px;
  }
  .footer_azul{
    color: #268ae0;
  }
  .footer_proy{
    text-align: center;
  }
  .footer_bottom{
    text-align: center;
    background: #02050c;
    padding-top: 10px;
  }
  .input-group {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
  }
  .form-control {
    display: block;
    width: 100%;
    padding: .5rem .75rem;
    font-size: 1rem;
    line-height: 1.25;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 0px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  }
  .input-group-addon {
    padding: .5rem .75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25;
    color: #fff;
    text-align: center;
    background-color: #268ae0;

    border-radius: 0px 2px 2px 0px;
  }
  .footer_email{
    width: 75%!important;
    border-radius: 2px 0px 0px 2px;
  }
  .router-footer{
    color:#fff;
  }

  @media (max-width: 550px){
    .footer_row_resposive{
      text-align: center;
    }
    .hr_footer {
      margin: 0 auto;
    }
    .title_footer {
      margin-bottom: 15px;
    }
    .footer_email{
      width: 100%;
    }
  }

</style>
