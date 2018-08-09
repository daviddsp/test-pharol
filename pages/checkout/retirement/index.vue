<template lang="html">
  <div class="">
      <v-layout row wrap>
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
              <v-stepper-items class="retirement_box">
                <v-stepper-content step="1">
                  <v-container>
                    <v-flex xs12 sm10 md10 offset-sm1>
                      <v-form v-model="valid" ref="form" lazy-validation>
                        <v-card class="p30">
                          <v-card-title primary-title class="retirement_title_1">
                            Datos Básicos
                          </v-card-title>
                          <v-layout row wrap>
                            <v-flex xs12 sm5 md5>
                              <v-text-field
                                label="Nombre (*)"
                                v-model="firstName"
                                :rules="[
                                  (v) => !!v || 'Este campo es obligatorio',
                                  (v) => !!v || v.length <= 3 || 'El usuario debe contener al menos 3 caracteres'
                                ]"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                              <v-text-field
                                label="Apellido (*)"
                                v-model="lastName"
                                :rules="[
                                (v) => !!v || 'Este campo es obligatorio',
                                (v) => !!v || v.length <= 3 || 'El usuario debe contener al menos 3 caracteres'
                                ]"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap>
                            <v-flex xs12 sm5 md5>
                              <v-text-field
                                label="Coreo electrónico (*)"
                                v-model="email"
                                :rules="[
                                  (v) => !!v || 'Campo obligatorio',
                                  (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El formato no es válido'
                                ]"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                              <v-text-field
                                label="Teléfono (*) "
                                hint="56 9 9999 9999"
                                persistent-hint
                                type="text"
                                v-model="phone"
                                mask="(##) # #### ####"

                                :rules="[
                                  (v) => !!v || 'Campo obligatorio',
                                  (v) => /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/.test(v) || 'Formato invalido'
                                ]"

                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap>
                            <v-flex xs12 sm5 md5>
                              <v-select
                                :items="itemsSex"
                                v-model="sex"
                                label="Sexo (*)"
                                :rules="[
                                  (v) => !!v || 'Campo obligatorio',
                                ]"
                              ></v-select>
                            </v-flex>
                            <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                              <v-text-field
                                label="RUT"
                                type="text"
                                v-model="rut"
                                mask="##.###.###-N"

                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                          <br>
                          <p class="retirement_title_2">¿Qué tipo de entrega deseas de esta farmacia?</p>
                          <v-layout row wrap>
                            <v-radio-group v-model="typeRetirement">
                              <v-flex xs12 sm6 md6>
                                <v-radio
                                  label="Retiro en Farmacia"
                                  value="farmacia"
                                ></v-radio>
                              </v-flex>
                              <v-flex xs12 sm6 md6>
                                <v-radio
                                label="Despacho a Domicilio"
                                value="domicilio"
                                ></v-radio>
                              </v-flex>
                            </v-radio-group>
                          </v-layout>
                        </v-card>

                        <br>
                        <v-card class="p30 bg-f5f5f5" v-if="typeRetirement == 'farmacia'">
                          <div class="img-horario">
                            <img src="~/assets/images/ic-checkout-farmacia.png" alt="Retiro en Farmacia">
                          </div>
                          <v-card-title primary-title class="retirement_title_1">
                            Retiro en Farmacia
                          </v-card-title>

                          <!-- RETIRO MIXTO -->
                          <v-layout row wrap v-if="expressProduct == true && programProduct == true">
                            <v-flex xs12 sm12 md12>
                              <p>Adicionalmente usted posee productos que pueden ser despachados inmediatamente y le queremos brindar dos opciones.</p>
                              <v-radio-group v-model="typeSchedule">
                                <v-flex xs12 sm12 md12>
                                  <p>Unir retiro: Podrán ser retirados en un lapso de 48 horas.</p>
                                  <v-radio
                                    label="Unir"
                                    value="unir"
                                  ></v-radio>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                  <p>Retiro separado: Los productos express podrán ser retirados en los horarios disponibles y posteriormente deberá esperar para preparar el resto de su pedido</p>
                                  <v-radio
                                  label="Separar"
                                  value="separar"
                                  ></v-radio>
                                </v-flex>
                              </v-radio-group>

                              <v-layout row wrap>
                                <v-flex xs12 sm5 md5 v-if="typeSchedule == 'unir' || typeSchedule == 'separar'">
                                  <v-select
                                    v-if="programProduct == true"
                                    :items="itemSchedule"
                                    v-model="schedule"
                                    item-text="value"
                                    label="Horario (*)"
                                    :rules="[
                                      (v) => !!v || 'Campo obligatorio',
                                    ]"
                                  ></v-select>
                                </v-flex>
                              </v-layout>

                              <v-flex xs12 sm5 md5 v-if="typeSchedule == 'separar'">
                                <v-select
                                :items="itemExpress"
                                v-model="expressOrderFarmacy"
                                item-text="value"
                                label="Despacho Express (*)"
                                ></v-select>
                              </v-flex>
                            </v-flex>
                          </v-layout>

                          <!-- RETIRO EXPRESS -->
                          <v-layout row wrap v-if="expressProduct == true && programProduct == false">
                            <v-flex xs12 sm5 md5>
                              <v-select
                              :items="itemExpress"
                              v-model="expressOrderFarmacy"
                              item-text="value"
                              label="Despacho Express (*)"
                              ></v-select>
                            </v-flex>
                          </v-layout>

                          <!-- RETIRO PROGRAMADO -->
                          <v-layout row wrap v-if="expressProduct == false && programProduct == true">
                            <v-flex xs12 sm5 md5>
                              <v-select
                                v-if="programProduct == true"
                                :items="itemSchedule"
                                v-model="schedule"
                                item-text="value"
                                return-object
                                label="Horario (*)"
                                :rules="[
                                  (v) => !!v || 'Campo obligatorio',
                                ]"
                              ></v-select>
                            </v-flex>
                          </v-layout>
                        </v-card>
                        <br>


                        <v-card class="p30 bg-f5f5f5" v-if="typeRetirement == 'domicilio'">
                          <div class="img-horario">
                            <img src="~/assets/images/ic-checkout-despacho.png" alt="Despacho a domicilio">
                          </div>
                          <v-card-title primary-title class="retirement_title_1">
                            Despacho a domicilio
                          </v-card-title>

                          <!-- RETIRO MIXTO -->
                          <v-layout row wrap v-if="expressProduct == true && programProduct == true">
                            <v-flex xs12 sm12 md12>
                              <p class="p-des-dom">Adicionalmente usted posee productos que pueden ser despachados inmediatamente y le queremos brindar dos opciones</p>
                              <v-radio-group v-model="typeSchedule">
                                <v-flex xs12 sm12 md12>
                                  <p class="p-des-dom">Unir despacho: Serán entregados en un lapso de 48 horas.</p>
                                  <v-radio
                                    class="radio-des-dom"
                                    label="Unir"
                                    value="unir"
                                  ></v-radio>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                  <p class="p-des-dom">Separar despacho: Se entregaran los productos con despacho inmediato por un valor de $1.800 adiconales y posteriormente se hará entrea del resto de los productos en 48 horas.</p>
                                  <v-radio
                                  class="radio-des-dom"
                                  label="Separar"
                                  value="separar"
                                  ></v-radio>
                                </v-flex>
                              </v-radio-group>

                              <v-layout row wrap>
                                <v-flex xs12 sm5 md5 v-if="typeSchedule == 'unir' || typeSchedule == 'separar'">
                                  <v-select
                                    v-if="programProduct == true"
                                    :items="itemSchedule"
                                    v-model="schedule"
                                    item-text="value"
                                    label="Horario (*)"
                                    :rules="[
                                      (v) => !!v || 'Campo obligatorio',
                                    ]"
                                  ></v-select>
                                </v-flex>

                                <v-flex xs12 sm5 md5 offset-sm1 offset-md1 v-if="typeSchedule == 'separar'">
                                  <v-select
                                  :items="itemExpress"
                                  v-model="expressOrderFarmacy"
                                  item-text="value"
                                  label="Despacho Express (*)"
                                  ></v-select>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>

                          <!-- RETIRO EXPRESS -->
                          <v-layout row wrap v-if="expressProduct == true && programProduct == false">
                            <v-flex xs12 sm5 md5>
                              <v-select
                              :items="itemExpress"
                              v-model="expressOrderFarmacy"
                              item-text="value"
                              label="Despacho Express (*)"
                              ></v-select>
                            </v-flex>
                          </v-layout>

                          <!-- RETIRO PROGRAMADO -->
                          <v-layout row wrap v-if="expressProduct == false && programProduct == true">
                            <v-flex xs12 sm5 md5>
                              <v-select
                                v-if="programProduct == true"
                                :items="itemSchedule"
                                v-model="schedule"
                                item-text="value"
                                return-object
                                label="Horario (*)"
                                :rules="[
                                  (v) => !!v || 'Campo obligatorio',
                                ]"
                              ></v-select>
                            </v-flex>
                          </v-layout>

                          <v-layout row wrap>
                            <v-flex xs12 sm5 md5>
                              <v-select
                                label="Comuna"
                                :items="itemComunas"
                                v-model="comuna"
                                item-text="name"
                                item-value="comuna"
                                autocomplete
                                :rules="[
                                  (v) => !!v || 'Campo obligatorio',
                                ]"

                              ></v-select>
                            </v-flex>
                            <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                              <v-text-field
                                label="Calle"
                                v-model="street"
                                :rules="[
                                  (v) => !!v || 'Campo obligatorio',
                                ]"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap>
                            <v-flex xs12 sm5 md5>
                              <v-text-field
                                label="N° de calle"
                                v-model="house"
                                :rules="[
                                  (v) => !!v || 'Campo obligatorio',
                                ]"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                              <v-text-field
                                label="N° Casa/ Depto"
                                hint="Casa: Utilice el mismo número de la calle"
                                persistent-hint
                                v-model="dpto"
                                :rules="[
                                  (v) => !!v || 'Campo obligatorio',
                                ]"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>

                          <v-layout row wrap>
                            <v-radio-group
                              v-show="itemAddress.length > 0"
                              v-model="direction"
                              >
                              <v-radio
                                v-for="(item, index) in itemAddress"
                                :key="item.id"
                                :label="`Dirección: ${item.city}, ${item.address}, ${item.department}`"
                                :value="index"
                                @click.native="selectDirection(item)"
                              ></v-radio>
                            </v-radio-group>
                          </v-layout>

                          <v-layout row wrap>
                            <v-radio-group
                              v-if="itemAddressMongo.length > 0"
                              v-model="direction2">
                              <v-radio
                                v-for="(item, index) in itemAddressMongo"
                                :key="item.id"
                                :label="`Dirección: ${item.commune}, ${item.street}, ${item.street_number}, ${item.number_dpto_house}`"
                                :value="index"
                                @click.native="selectDirectionMongo(item)"
                              ></v-radio>
                            </v-radio-group>
                          </v-layout>

                        </v-card>
                        <br>
                      </v-form>
                    </v-flex>
                  </v-container>

                  <v-flex xs12 sm12 md12 class="center">
                    <v-btn
                      class="my-none"
                      @click="submit"
                      :disabled="!valid"
                      dark
                      color="deep-orange darken-1">
                      continuar
                    </v-btn>
                  </v-flex>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-container>
        </v-flex>
      </v-layout>

      <v-dialog v-model="dialog" persistent max-width="290">
       <v-card>
         <v-card-title class="headline">Atención</v-card-title>
         <v-card-text>Hemos detectato que posee productos con despacho programador y otros productos con despacho express.</v-card-text>
         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="green darken-1" flat @click.native="dialog = false">Entendido</v-btn>
         </v-card-actions>
       </v-card>
     </v-dialog>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  asyncData (context) {
    return {
      apiPurchase: context.env.apiPurchase,
      apiTag: context.env.apiTag,
      apiUser: context.env.apiUser,
    }
  },
  data() {
    return {
      typeSchedule: null,
      dialog: false,
      step: 1,
      valid: true,
      pharmacy: false,
      direction: '',
      direction2: '',
      home: true,
      typeRetirement: 'farmacia',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      sex: '',
      rut: '',
      itemsSex: [
        'Masculino',
        'Femenino'
      ],
      house: '',
      street: '',
      dpto: '',
      comuna: '',
      itemComunas: [],
      itemSchedule: [],
      schedule: null,
      formItem: {},
      itemAddress: [],
      itemAddressMongo: [],
      expressOrder: false,
      expressOrderFarmacy: false,
      sendExpress: null,
      sendProgram: null,
      totalSend: 1800,
      swichMixto: false,
    }
  },
  mounted () {
    this.getCommune()
    this.getSchedule()
    if (this.expressProduct && this.programProduct) {
      this.dialog =  true;
    }

    if (this.$store.state.login) {
      this.email = localStorage.getItem('email');
      this.getData(this.email)
      this.getAddress(this.email)
      this.getAddressMongo(this.email);
    }

    if (typeof this.$store.state.purchase.info != 'undefined') {
      if (typeof this.$store.state.purchase.info.first_name != 'undefined') {
        // console.log('definido');
        // console.log(this.$store.state.purchase);
        let info = this.$store.state.purchase.info;
        // // Datos personales
        this.firstName = (typeof info.first_name != undefined) ? info.first_name : '';
        this.lastName = (typeof info.last_name != undefined) ? info.last_name : '';
        this.email = (typeof info.email != undefined) ? info.email : '';
        this.phone = (typeof info.phone != undefined) ? info.phone : '';
        this.rut = (typeof info.rut != undefined) ? info.rut : '';
        this.sex = (typeof info.sex != undefined) ? info.sex : '';
      }
    }
  },
  methods: {
    getSchedule(){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiPurchase}/purchase/dateDeliveryPurchase`,
      })
      .then(function(response) {
        self.schedule = response.data.objects[0];
        self.itemSchedule = response.data.objects;
        // console.log(self.itemSchedule);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getCommune(){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiTag}/commune`,
      })
      .then(function(response) {
        self.itemComunas = response.data;
        // console.log(self.itemComunas);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    submit () {
      if (this.$refs.form.validate()) {

        if (this.typeRetirement == 'farmacia') {
          this.formItem = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            phone: this.phone,
            sex: this.sex,
            schedule: this.schedule,
            rut: this.rut,
            mix_order: this.swichMixto,
            express_farmacy: this.expressOrderFarmacy,
            type_retirement: this.typeRetirement
          }
        }
        if (this.typeRetirement == 'domicilio') {
          this.formItem  = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            phone: this.phone,
            sex: this.sex,
            schedule: this.schedule,
            street: this.street,
            street_number: this.house,
            number_dpto_house: this.dpto,
            commune: this.comuna,
            rut: this.rut,
            express_order: this.expressOrder,
            mix_order: this.swichMixto,
            type_retirement: this.typeRetirement
          }

          if (this.expressOrder != false) {
            delete this.formItem.schedule
          }
        }


        // console.log(this.formItem);

        if (localStorage.getItem('email')) {
          // console.warn('AUTENTICADO');
          this.deleteAndUpdateOrder(localStorage.getItem('orderId'))
        }

        if (!localStorage.getItem('email')) {
          // console.warn('SIN AUTENTICAR');
          this.pendingOrders();
        }
      }
    },
    getData(item){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiPurchase}/purchase/myShoppingPending/`,
        headers: {
          email: item,
          status: 2,
          auth: true,
        }
      })
      .then(function(response) {
        // console.warn('OBTENIENDO EMAIL');
        if (!response.data.error) {
          self.email = response.data[0].info.email;
        }
      })
    },
    getAddress(item){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiUser}/address/myAddress/`,
        headers: {
          email: item,
        }
      })
      .then(function(response) {
        // console.warn('OBTENIENDO DIRECCIONES');
        // console.log(response.data);
        self.itemAddress = response.data;
      })
    },
    getAddressMongo(item){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiUser}/auth/info`,
        headers: {
          email: item,
        }
      })
      .then(function(response) {
        // console.warn('OBTENIENDO DIRECCIONES');
        if (!response.data.address) {
          self.itemAddressMongo = 0;
        }

        if (response.data.address) {
          self.itemAddressMongo = response.data.address;
        }

        // console.log(response.data.info);
        if (response.data.info) {
          self.firstName = response.data.info.first_name
          self.lastName = response.data.info.last_name
          self.sex = response.data.info.sex
          self.phone = response.data.info.phone
          self.rut = response.data.info.rut
        }

      })
    },
    selectDirection(item){
      // console.warn('CAMBIANDO DE DIRECCION');
      // console.log(item);
      this.direction2 = '';
      // this.comuna = item.city;
      this.house = item.type_house;
      this.street = item.address;
      this.dpto = item.department;
    },
    selectDirectionMongo(item){
      // console.warn('CAMBIANDO DE DIRECCION');
      // console.log(item);
      this.direction = '';
      // this.comuna = item.commune;
      this.house = item.street_number;
      this.street = item.street;
      this.dpto = item.number_dpto_house;
    },
    pendingOrders(){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiPurchase}/purchase/myShoppingPending/`,
        headers: {
          email: this.email,
          status: 2,
          auth: false,
        }
      })
      .then(function(response) {
        // console.warn('pendingOrders');
        if (response.data.error) {
          // console.warn('NO TIENE ORDEN EN EL SERVIDOR');
          localStorage.setItem('email', self.formItem.email);
          self.createOrder();
        }

        if (!response.data.error) {
          // console.warn('YA EXISTE ORDEN EN EL SERVIDOR');
          self.deleteAndUpdateOrder(response.data[0].id);
          localStorage.setItem('email', self.formItem.email);
          localStorage.setItem('orderId', response.data[0].id);

        }
      })
    },
    createOrder(){
      let self = this;
      axios({
        method: 'POST',
        url:`${this.apiPurchase}/purchase/add`,
        data: {
          status: 2,
          process: 1,
          info: this.formItem,
          auth: false,
          products: this.$store.state.cart
        }
      })
      .then(function(response) {
        // console.warn('CREANDO');
        // console.log(response.data);
        localStorage.setItem('orderId', response.data.id);
        self.$store.commit('globalMutation', { atribute: 'purchase', value: response.data})
        self.redirect(self.myCart)
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    deleteAndUpdateOrder(item){
      // console.warn('ACTUALIZANDO DATOS DE ORDEN EN EL SERVIDOR');

      let self = this;
      axios({
        method: 'PUT',
        url:`${this.apiPurchase}/purchase/update/order/${item}`,
        data: {
          info: this.formItem,
          products: this.$store.state.cart
        }
      })
      .then(function(response) {
        // console.warn('ACTUALIZANDO');
        // console.log(response.data);
        self.$store.commit('globalMutation', { atribute: 'purchase', value: { info: response.data[0].info } })
        self.redirect(self.myCart)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    addPurchase(item) {
      this.$store.commit('addPurchase', item)
    },
    redirect(item){
      if (item.length <= 0) {
        // console.warn('NO TIENE PRODUCTOS CON RECETA');
        this.$router.push({ path: '/checkout/payment' })
      }

      if (item.length > 0) {
        // console.warn('TIENE PRODUCTOS CON RECETA');
        this.$router.push({ path: '/checkout/recipe' })
      }
    }
  },
  computed: {
    myCart(){
      function fitlerRecipe(obj) {
        if (
            obj.prescription_type == 'WP'
         || obj.prescription_type == 'VDPR'
         || obj.prescription_type == 'RP'
         || obj.prescription_type == 'RCH'
         || obj.prescription_type == 'RRCS'
         || obj.prescription_type == 'APR'
         || obj.prescription_type == 'RMRSCS'
        ){
          return true;
        }
      }
      var filterCart = this.$store.state.cart.filter(fitlerRecipe);

      return filterCart;
    },
    itemExpress(){
      let items = [];
      let obj = new Date()
      let day = obj.getDay()
      let hours = obj.getHours()

      if (day == 0 || day == 6) {
        items.push({value: `No hay horario disponible`})
        return items;
      }
      //DESPACHO EXPRESS CON CORTES DE HORARIO
      if (hours <= 16) {
        items.push({value: `16:00 - 19:00`})
        return items
      } if (hours > 16 && hours <= 19) {
        items.push({value: `19:00 - 22:00`})
        return items
      } else {
        items.push({value: `No hay horario disponible`})
        return items;
      }

      // DESPACHO EXPRESS
      // if (hours <= 19) {
      //   hours = hours + 3;
      //   for (var i = 0; i <= 12; i++) {
      //     if (hours < 21) {
      //       hours = hours + 1;
      //       let interval = hours + 1;
      //       items.push({value: `${hours}:00 Hrs - ${interval}:00 Hrs`})
      //     }
      //   }
      //   return items
      // } else {
      //
      //   items.push({value: `No hay horario disponible`})
      //
      //   return items;
      // }
    },
    expressProduct(){
      let boolean;

      let product = this.$store.state.cart.find(function(obj) {
        return obj.delivery_express == "true"
      });

      if (product) {
        boolean = true;
      } else {
        boolean = false;
      }

      return boolean
    },
    programProduct(){
      let boolean;
      let product = this.$store.state.cart.find(function(obj) {
        return obj.delivery_express == "false"
      });

      if (product) {
        boolean = true;
      } else {
        boolean = false;
      }

      return boolean
    },
  },
}
</script>

<style lang="stylus" scoped>/**/
  .bg-f5f5f5{
    background: #f5f5f5;
  }
  .fab_bottom{
    margin-bottom: 50px;
  }
  .retirement_box{
    background: rgba(221, 221, 221, 0.13);
  }
  .p30{
    padding: 30px 30px 30px 30px;
  }
  .msn-programado{
    font-size:15px;
    color:rgba(0, 0, 0, .54);
  }
  .retirement_title_1{
    font-size: 20px;
    font-weight: 500;
    color: #3949ab;
  }
  .retirement_title_2{
    font-size: 17px;
    font-weight: 500;
    color: #3949ab;
  }
  .accent--text {
    color: #3949ab!important;
  }
  .theme--light .input-group:not(.input-group--error) .input-group__details:before, .application .theme--light.input-group:not(.input-group--error) .input-group__details:before {
      background-color: #ddd;
  }
  .input-group--text-field.input-group--dirty.input-group--select label, .input-group--text-field.input-group--dirty:not(.input-group--textarea) label {
      -webkit-transform: translate(0, -18px) scale(0.75);
      transform: translate(0, -18px) scale(0.75);
      color: #969696;
  }
  .text_align_right{
    text-align: right;
  }
  .my-none{
    text-transform: capitalize;
  }
  .img-horario{
    float: left;
    margin-top: 35px;
    padding-right: 20px;
  }
  .p-des-dom{
    margin-bottom: 0px;
    font-size: 15px;
    text-align: justify;
  }
  .radio-des-dom{
    padding: 10px 0px;
  }
  @media only screen and (max-width: 599px){
    .container {
      padding: 1px;
    }
    .img-horario img{
      width:50px;
    }
    .img-horario{
      text-align: center;
      float: none;
      margin-top: 0px;
      padding-right: 0px;
    }
  }

</style>
