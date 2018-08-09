<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 md6 class="mx-auto">
        <h1 class="auth_title">Recuperación de contraseña</h1>
        <v-card class="p30">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="[
                (v) => !!v || 'E-mail es obligatorio',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
              ]"
              required
            ></v-text-field>
            <br>
            <div class="center">
              <v-btn class="auth_btn_is"
                @click="submit"
                :disabled="!valid"
              >
                Enviar
              </v-btn>
            </div>
          </v-form>
        </v-card>
        <p> {{ msg }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import axios from 'axios';

export default {
  asyncData (context) {
    return {
      apiUser: context.env.apiUser,
    }
  },
  data: () => ({
    valid: true,
    email: '',
    msg: null,
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        axios({
          method:'post',
          url:`${this.apiUser}/auth/recover`,
          data: {
            email: this.email,
          }
        })
        .then(response => {
          console.log(response);
          this.$router.push({ path: '/auth/recover/password' })
        })
        .catch((err) => {
          console.error(err)
        });
      }
    },
  }
}
</script>

<style>
  a {
    text-decoration: none;
  }
  .p30{
    padding: 30px;
  }
  .pb30{
    padding-bottom: 30px;
  }
  .mx-auto{
    margin-left: auto!important;
    margin-right: auto!important;
  }
  .auth_title{
    font-size: 18px;
    font-weight: 500;
    color: #3949ab;
    margin-bottom: 20px;
  }
  .auth_btn_redes{
    text-transform: none;
    background-color: #fff!important;
  }
  .auth_btn_redes img{
    padding-right: 10px;
  }
  .auth_btn_is{
    background-color: #fd5621!important;
    text-transform: none;
    color: #fff!important;
  }
  .auth_clickaqui{
    font-size: 14px;
  }
</style>
