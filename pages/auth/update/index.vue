<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 md6 class="mx-auto">
        <h1 class="auth_title">Actualizar contraseña</h1>
        <v-card class="p30">
          <v-form v-model="valid" ref="form" lazy-validation>

            <v-text-field
              type="password"
              label="Contraseña actual"
              v-model="oldPassword"
              :rules="[
                (v) => !!v || 'Es un campo obligatorio',
              ]"
              required
            ></v-text-field>

            <v-text-field
              type="password"
              label="Nueva contraseña"
              v-model="newPassword"
              :rules="[
                (v) => !!v || 'Es un campo obligatorio',
                (v) => v!=oldPassword || 'La contraseña debe ser distinta a la actual',
              ]"
              required
            ></v-text-field>

            <div class="center">
              <v-btn color="naranja" class="btn_enviar"
                @click="submit"
                :disabled="!valid"
              >
                Enviar
              </v-btn>
            </div>

          </v-form>
        </v-card>
        <br>
        <p>{{ msg }}</p>
        <br>
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
  mounted: function() {

    this.token = this.$store.state.login;
    console.log(this.token);
  },
  data () {
    return {
      valid: true,
      oldPassword: '',
      newPassword: '',
      msg: null,
      token: null,
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {

        let self = this;
        axios({
          method: 'POST',
          url:`${this.apiUser}/auth/reset/`,
          headers: {
            'Authorization': `JWT ${this.token}`
          },
          data: {
            old_password: this.oldPassword,
            new_password: this.newPassword,
          }
        })
        .then(function(response) {
          console.log(response.data);
          self.msg = response.data.msg
          if (response.data.ok == true) {
            self.$notify({
              title: 'Satisfactorio',
              message: 'Se ha modificado correctamente.',
              type: 'info',
              horizontalAlign: 'right',
              showClose: false
            })
          }

          if (response.data.ok == false) {
            self.$notify({
              title: 'Error',
              message: `Ocurrió el siguiente problema: ${response.data.msg}`,
              type: 'danger',
              horizontalAlign: 'right',
              showClose: false
            })
          }
        });
      }
    },
  }
}
</script>

<style>
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
.btn_enviar{
  text-transform: none;
  color: #fff!important;
}
.p30{
  padding: 30px;
}
</style>
