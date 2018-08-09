<template>
  <v-container>
    <v-layout align-center>
      <v-flex xs12 md6 class="mx-auto">
        <h1 class="auth_title">Iniciar sesión</h1>
        <v-card class="p30">
        <div class="center pb30">
          <v-layout row wrap>
            <v-flex xs12 md6 class="mx-auto">
              <fb-signin-button class="auth_btn_redes"
                :params="fbSignInParams"
                @success="onSignInSuccessFacebok"
                @error="onSignInErrorFacebook">
                <img src="~/assets/images/facebook.png" width="30px" alt="Facebook Auth"> <span class="hidden-sm-and-down">Iniciar con</span> Facebook
              </fb-signin-button>
            </v-flex>
            <v-flex xs12 md6 class="mx-auto">
              <g-signin-button class="auth_btn_redes"
                :params="googleSignInParams"
                @success="onSignInSuccessGoogle"
                @error="onSignInErrorGoogle">
                <img src="~/assets/images/google.png" width="30px" alt="Google Auth"> <span class="hidden-sm-and-down">Iniciar con</span> Google+
              </g-signin-button>

            </v-flex>
          </v-layout>
        </div>
          <div class="center c-ababab">
            Or
          </div>

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
            <v-text-field
              type="password"
              label="Password"
              v-model="password"
              :rules="[
                (v) => !!v || 'Password es obligatorio',
              ]"
              required
            ></v-text-field>
            <router-link
              to="/auth/recover"
            >
              ¿Olvido su contraseña?
            </router-link>
            <br><br>
            <div class="center">
              <v-btn class="auth_btn_is"
                @click="submit"
                :disabled="!valid"
              >
                Iniciar sesión
              </v-btn>
            </div>





            <div class="center auth_clickaqui">
              <br>
              ¿Aún no estas registrado?
              <router-link
                to="/auth/register"
              >
                Haz click aquí
              </router-link>
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
      apiPurchase: context.env.apiPurchase,
    }
  },
  data(){
    return {
      valid: true,
      password: '',
      email: '',
      msg: null,

      fbSignInParams: {
        scope: 'email, user_likes, public_profile',
        return_scopes: true
      },

      googleSignInParams: {
        client_id: '559025716898-a340hi2p8t3rpvp9cjducp8f311c1ild.apps.googleusercontent.com'
      }
    }
  },
  mounted(){
    window.fbAsyncInit = function() {
     FB.init({
       appId      : '1960641290915466',
       cookie     : true,  // enable cookies to allow the server to access the session
       xfbml      : true,  // parse social plugins on this page
       version    : 'v3.0' // use graph api version 2.8
     });
   };
   (function(d, s, id) {
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) return;
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  },
  methods: {
    onSignInSuccessGoogle (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      // console.log(googleUser);
      const profile = googleUser.getBasicProfile() // etc etc
      this.$store.commit('globalMutation', { atribute: 'login', value: profile.U3 })
      localStorage.setItem('email', profile.U3);
      this.email = profile.U3;

      axios({
        method:'post',
        url:`${this.apiUser}/user`,
        data: {
          username: profile.U3,
          email: profile.U3,
          password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          path: `https://www.pharol.cl/auth/confirm/`,
          login: 'google'
        }
      }).then(response => {
        this.pendingOrders();

        this.$notify({
          title: `Bienvenido ${this.email}`,
          message: 'Ha iniciado sesión correctamente.',
          type: 'info',
          horizontalAlign: 'right',
          showClose: false
        })
      })
      .catch((err) => {
        this.$notify({
          title: 'Error',
          message: `Problemas al iniciar sesión`,
          type: 'danger',
          horizontalAlign: 'right',
          showClose: false
        })
      });
    },
    onSignInErrorGoogle (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },

    onSignInSuccessFacebok (response) {

      FB.api('/me?fields=email,name', done => {
        // console.log(done);
        this.$store.commit('globalMutation', { atribute: 'login', value: done.email })

        localStorage.setItem('email', done.email);
        this.email = done.email;

        axios({
          method:'post',
          url:`${this.apiUser}/user`,
          data: {
            username: done.name,
            email: done.email,
            password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            path: `https://www.pharol.cl/auth/confirm/`,
            login: 'facebook'
          }
        }).then(response => {
          this.pendingOrders();

          this.$notify({
            title: `Bienvenido ${this.email}`,
            message: 'Ha iniciado sesión correctamente.',
            type: 'info',
            horizontalAlign: 'right',
            showClose: false
          })
        })
        .catch((err) => {
          this.$notify({
            title: 'Error',
            message: `Problemas al iniciar sesión`,
            type: 'danger',
            horizontalAlign: 'right',
            showClose: false
          })
        });
      })
    },
    onSignInErrorFacebook (error) {
      console.log('OH NOES', error)
    },
    submit () {
      var self = this;
      if (this.$refs.form.validate()) {
        axios({
          method:'post',
          url:`${this.apiUser}/auth/login`,
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(function(response) {
          // console.warn('token');
          if (response.data.token) {
            self.$store.commit('globalMutation', { atribute: 'login', value: response.data.token })
            // self.$store.commit('login', response.data.token)
            localStorage.setItem('email', self.email);
            self.pendingOrders();

            self.$notify({
              title: `Bienvenido ${self.email}`,
              message: 'Ha iniciado sesión correctamente.',
              type: 'info',
              horizontalAlign: 'right',
              showClose: false
            })
          }

          if (!response.data.token) {
            self.$notify({
              title: 'Error',
              message: `Problemas al iniciar sesión: ${response.data.msg}`,
              type: 'danger',
              horizontalAlign: 'right',
              showClose: false
            })
          }
        });


      }
    },
    clear () {
      this.$refs.form.reset()
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
          // console.warn('NO TIENE NINGUNA ORDEN EN SERVIDOR');
          self.createOrder();
        }

        if (!response.data.error) {
          // console.warn('YA EXISTE UNA ORDEN EN SERVIDOR');
          self.matchOrder(response.data[0])
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
          products: this.$store.state.cart,
          info: {
            email: this.email
          }
        }
      })
      .then(function(response) {
        // console.warn('SE CREA LA ORDEN');
        localStorage.setItem('orderId', response.data.id);
        console.log(localStorage.getItem('orderId', item.id));

        self.$store.commit('globalMutation', {
          atribute: 'purchase',
          value: {
            createdAt: response.data.createdAt,
            info: response.data.info,
            status: response.data.status,
            process: response.data.process,
            updatedAt: response.data.updatedAt,
            id: response.data.id
          }
        })
        // console.warn('SE MEZCLA EL STATE CON LA ORDEN DEL SERVIDOR');
        self.matchOrder(response.data)
        self.$router.push({ path: '/'})
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    updateOrder(item){
      localStorage.setItem('orderId', item.id);
      console.log(localStorage.getItem('orderId', item.id));
      this.$store.commit('globalMutation', { atribute: 'cart', value: item.products })
      this.$store.commit('globalMutation', {
        atribute: 'purchase',
        value: {
          id: item.id,
          process: item.process,
          status: item.status,
          info: item.info,
        }
      })
    },
    matchOrder(item){
      // console.log(item);
      // console.warn('VARIABLE AUXILIAR DEL STATE');
      var cartAux = (this.$store.state.cart) ? this.$store.state.cart : [];
      // console.warn('ACTUALIZO EL STATE');
      this.updateOrder(item);

      if (cartAux.length > 0) {
        for (var i = 0; i < cartAux.length; i++) {
          // console.warn('MEZCLANDO ELEMENTOS');
          console.log(cartAux[i]);
          this.$store.commit('addItemCart', cartAux[i]);
        }
        this.$store.commit('updateOrderOnServer');
      } else {
        this.$store.commit('globalMutation', { atribute: 'cart', value: [] })
      }
      // console.warn('SE ACTUALIZA LUEGO DE MEZCLAR');
      this.$router.push({ path: '/'})
    }
  }
}
</script>

<style>
  .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
  }


  .fb-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #4267b2;
    color: #fff;
  }


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
    -webkit-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 1px 5px 0px rgba(0, 0, 0, .12);
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, .2), 0px 2px 2px 0px rgba(0, 0, 0, .14), 0px 1px 5px 0px rgba(0, 0, 0, .12);
    padding: 10px 16px;
    height: 36px;
    font-size: 14px;
    font-weight: 500;
    margin: 10px;
  }
  .auth_btn_redes img{
    padding-right: 10px;
    margin-bottom: -5px;
  }
  .auth_btn_is{
    background-color: #fd5621!important;
    text-transform: none;
    color: #fff!important;
  }
  .auth_clickaqui{
    font-size: 14px;
  }
  .c-ababab{
    color:#ababab;
  }
</style>
