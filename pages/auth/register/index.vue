<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 md6 class="mx-auto">
        <h1 class="auth_title">Registro</h1>
        <v-card class="p30">
          <!-- <div class="center pb30">
            <v-btn class="auth_btn_redes"><img src="~/assets/images/facebook.png" width="30px" alt="facebook"> Iniciar con Facebook</v-btn>
            <v-btn class="auth_btn_redes"><img src="~/assets/images/google.png" width="30px" alt="google"> Iniciar con Google+</v-btn>
          </div> -->
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              label="Usuario"
              v-model="userName"
              :rules="[
                (v) => !!v || 'Usuario es obligatorio',
                (v) => !!v || v.length <= 3 || 'El usuario debe contener al menos 3 caracteres'
              ]"
              required
            ></v-text-field>
            <v-text-field
              label="Nombre"
              v-model="firstName"
              :rules="[
                (v) => !!v || 'Usuario es obligatorio',
              ]"
              required
            ></v-text-field>
            <v-text-field
              label="Apellido"
              v-model="lastName"
              :rules="[
                (v) => !!v || 'Usuario es obligatorio',
              ]"
              required
            ></v-text-field>
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="[
                (v) => !!v || 'E-mail es obligatorio',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
              ]"
              required
            ></v-text-field>
            <v-text-field
              type="password"
              label="Password"
              v-model="password"
              :rules="[
                (v) => !!v || 'Password es obligatorio',
              ]"
              required
            ></v-text-field>
            <br>
            <v-checkbox
              label="Acepto los terminos y Condiciones."
              v-model="policies"
              :rules="[
                v => !!v || '¿Acepta las condiciones para continuar?'
              ]"
              required
            ></v-checkbox>
            <router-link :to="{ path: '/policies' }" class="police">Politicas de Privacidad</router-link>
            <br><br>
            <div class="center">
              <v-btn class="auth_btn_is"
                @click="submit"
                :disabled="!valid"
              >Registrarme</v-btn>
            </div>
          </v-form>
        </v-card>
        <p> {{ msg }}</p>
        <br>
        <div class="center auth_clickaqui">
          <br>
          ¿Ya tienes cuenta?
          <router-link
            to="/auth"
          >
            Haz click aquí
          </router-link>
          <br><br>
        </div>
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
    msg: null,
    valid: true,
    userName: '',
    password: '',
    email: '',
    policies: false,
    firstName: '',
    lastName: '',
    // checkbox: false
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        axios({
          method:'post',
          url:`${this.apiUser}/user`,
          data: {
            username: this.userName,
            email: this.email,
            password: this.password,
            path: `https://www.pharol.cl/auth/confirm/`
          }
        }).then(response => {
          console.log(response);
          this.$router.push({ path: '/auth/register/token' })
        })
        .catch((err) => {
          this.msg = 'user already exist!'
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
  .police{
    font-size: 12px;
  }
</style>
