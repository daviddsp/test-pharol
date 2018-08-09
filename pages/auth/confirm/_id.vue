<template>
  <!--<v-layout align-center>

    <v-flex xs12 sm6 offset-xs0 offset-sm3>
      <br><br>
      <blockquote>
        &#8220;Confirm.&#8221;
        <p> {{ msg }}</p>
        <footer>
          <small>
            <em>&mdash;Pharol</em>
          </small>
        </footer>

        <div class="">
          <h1>confirm token -> id ->  <span>token {{ $route.params.id }}</span></h1>
        </div>

      </blockquote>
    </v-flex>

  </v-layout>-->
  <div class="">
    <v-container class="center ptb100"><!-- fluid grid-list-md -->
      <div class="icon_thx">
        <i class="material-icons">verified_user</i>
      </div>
      <br>
      <h1 class="text_thx_1">{{ msg }}</h1>
      <br>
      <footer>
        <small>
          <em>&mdash;Pharol</em>
        </small>
      </footer>
      <br>
      <div class="box_btn_thx">
        <!-- <v-btn class="btn_thx_2">Ver detalle</v-btn> -->
        <v-btn to="/auth" class="btn_thx_3">Volver</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data () {
    return {
      msg: null,
    }
  },
  mounted: function() {
    console.log(this.$route.params.id);
    axios({
      method: 'get',
      url: `https://users.pharol.cl/auth/confirm/${this.$route.params.id}`,
    }).then(response => {
      console.log(response);
    })
    .catch((err) => {
      this.msg = '¡El usuario ya existe!'
    });
  }
}
</script>

<style lang="css">
.center{
  text-align: center;
}
.ptb100{
  padding: 100px 0;
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
  font-size: 30px;
  font-weight: 100;
}
.text_thx_1::first-letter {
  text-transform: capitalize
}
.btn_thx_3{
  text-transform: none;
  background-color: #ff5722!important;
  color: #fff!important;
}
</style>
