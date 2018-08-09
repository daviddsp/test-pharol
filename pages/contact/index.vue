<template lang="html">
  <div>
    <v-container>
      <v-layout row wrap class="pt20">
        <v-flex xs12 md4 sm4>
          <h1 class="title_slider">Nuestras Redes</h1>
          <br>
          <div class="contact_redes">
            <a href="https://www.facebook.com/PharolFarmacias" target="_blank">
              <img src="~/assets/images/contact/ic-contacto-facebook.png" alt="facebook" class="img_redes">
            </a>
            <a href="https://twitter.com/PharolFarmacias" target="_blank">
              <img src="~/assets/images/contact/ic-contacto-twitter.png" alt="twitter" class="img_redes">
            </a>
            <a href="https://www.instagram.com/pharolfarmacias/" target="_blank">
              <img src="~/assets/images/contact/ic-contacto-instagram.png" alt="instagram" class="img_redes">
            </a>
            <a href="https://www.linkedin.com/company/22285548/" target="_blank">
              <img src="~/assets/images/contact/ic-contacto-linkedin.png" alt="linkedin" class="img_redes">
            </a>
          </div>
          <br><br>
          <h2 class="title_slider">Información de contacto</h2>
          <br>
          <v-layout row wrap class="pt20">
            <v-flex xs12 md1 sm1 class="icon_contact_text">
              <div class="">
                <i class="material-icons">location_on</i>
              </div>
            </v-flex>
            <v-flex xs12 md10 sm10 class="">
              <p class="text_location">San Pablo 3136, Santiago, Región Metropolitana</p>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="pt20">
            <v-flex xs12 md1 sm1 class="icon_contact_text">
              <div class="">
                <i class="material-icons">email</i>
              </div>
            </v-flex>
            <v-flex xs12 md10 sm10 class="">
              <a href="maito:contacto@pharol.cl" class="text_location">contacto@pharol.cl</a>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="pt20">
            <v-flex xs12 md1 sm1 class="icon_contact_text">
              <div class="">
                <i class="material-icons">phone</i>
              </div>
            </v-flex>
            <v-flex xs12 md10 sm10 class="">
              <p class="text_location">+56226827613</p>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="pt20">
            <v-flex xs12 md1 sm1 class="icon_contact_text">
              <div class="">
                <img src="~/assets/images/whatsapp.png" class="img_redes_w" alt="whatsapp">
              </div>
            </v-flex>
            <v-flex xs12 md10 sm10 class="">
              <a class="text_location" href="https://api.whatsapp.com/send?phone=56961588213&text=Hola" target="_blank">+56961588213</a>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md8 sm8>
          <h3 class="title_slider">Contacto</h3>
          <br>
          <v-layout row wrap>
            <v-flex xs12 sm5 md5>
              <v-text-field
                label="Nombre (*)"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
              <v-text-field
                label="RUT (*)"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm5 md5>
              <v-text-field
                label="Teléfono (*)"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
              <v-text-field
                label="Email (*)"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm11 md11>
              <v-text-field
                name="input-1"
                label="Mensaje (*)"
                textarea rows="10"
              ></v-text-field>
            </v-flex>
            <br>
            <v-flex xs12 sm11 md11 class="btn_contant_enviar">
              <v-btn class="btn_contant_envia"
                dark
                color="deep-orange darken-1">
                Enviar
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--<v-layout row wrap class="pt20">
        <v-flex xs12 md12 md12>
          <h3 class="title_slider">Donde estamos</h3>
          <br>

        </v-flex>
      </v-layout>-->
    </v-container>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.pt20{
  padding-top: 20px;
}
.title_slider {
    color: #3f51b5;
    font-weight: 500;
}
.contact_redes img{
  padding-right: 25px;
}
.text_location{
  font-size: 12px;
}
.icon_contact_text i{
  color: #ff5722;
  font-size: 25px;
  text-align: center;
}
.theme--light .input-group.input-group--textarea:not(.input-group--full-width) .input-group__input, .application .theme--light.input-group.input-group--textarea:not(.input-group--full-width) .input-group__input {
    border: 1px solid rgba(62, 62, 62, 0.54);
}
.btn_contant_enviar{
  text-align: right;
}
.btn_contant_envia{
  text-transform: none;
  padding-left: 20px;
  padding-right: 20px;
}
.img_redes_w{
  width: 30px;
}
.img_redes:hover{
  transform: scale(1.05);
}
</style>
