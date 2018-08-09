<template lang="html">
  <div class="bg-fdfdfd">
    <v-container><!-- fluid grid-list-md -->
      <h1 class="title_profile_1 center">Perfil</h1>
      <v-layout row wrap>
        <v-flex xs12 sm4 md4 class="center prl15 pt10">
          <v-card class="p20">
            <img class="img_usuario" src="https://s3-us-west-2.amazonaws.com/pharol-v2/bank-image/pharol-logo-1000px-compressor.png" alt="Pharol logo">
            <br>
            <h2 class="title_profile_1">{{ firstName }}  {{ lastName }}</h2>
          </v-card>
        </v-flex>
        <v-flex xs12 sm8 md8 class="prl15 pt10">
          <v-card class="p20">
            <v-btn class="btn-edit" @click.stop="dialog = true">
              <i class="material-icons" title="Editar">create</i> Editar
            </v-btn>
            <h2 class="title_profile_1">Datos</h2>
            <hr class="hr_profile">
            <h3 class="title_profile_2">Nombre: {{ firstName }}</h3>
            <h3 class="title_profile_2">Apellido: {{ lastName }}</h3>
            <h3 class="title_profile_2">Email: {{ email }}</h3>
            <h3 class="title_profile_2">Télefono: {{ phone }}</h3>
            <h3 class="title_profile_2">RUT: {{ rut }}</h3>
            <h3 class="title_profile_2">Sexo: {{ sex }}</h3>
          </v-card>
          <br>
          <v-card class="p20">
            <v-btn class="btn-edit" @click.stop="dialog2 = true">
              <i class="material-icons">add</i> Agregar
            </v-btn>
            <h2 class="title_profile_1">Direcciones</h2>
            <hr class="hr_profile">
            <v-card class="p20 box_direc" v-for="(item, index) in itemAddress" :key="index">
              <h3 class="title_profile_2">Comuna: {{ item.commune }}</h3>
              <h3 class="title_profile_2">Calle: {{ item.street }}</h3>
              <h3 class="title_profile_2">N° Calle {{ item.street_number }}</h3>
              <h3 class="title_profile_2">N° Casa/Depto: {{ item.number_dpto_house }}</h3>
              <v-btn flat @click="deleteAddress(index)" class="btn_delete" title="Borrar">
                <i class="material-icons">delete</i>
              </v-btn>
            </v-card>
          </v-card>

        </v-flex>
      </v-layout>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar perfil</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-layout row wrap>
                  <v-flex xs12 sm5 md5>
                    <v-text-field
                      label="Nombre (*)"
                      v-model="firstName"
                      :rules="[
                        (v) => !!v || v.length <= 3 || 'El usuario debe contener al menos 3 caracteres'
                      ]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                    <v-text-field
                      label="Apellido (*)"
                      v-model="lastName"
                      :rules="[
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
                      disabled
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                    <v-text-field
                      label="Teléfono"
                      type="number"
                      v-model="phone"
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
                      (v) => !!v || 'Este campo es obligatorio'
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
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1 btn-modal-2" @click.native="dialog = false">Cerrar</v-btn>
            <v-btn color="naranja btn-modal-2" @click="setProfile()">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Agregar Dirección</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12 sm5 md5>
                  <v-select
                    label="Comuna"
                    :items="comunas"
                    v-model="comuna"
                    item-text="name"
                    item-value="name"
                    autocomplete
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
                    v-model="numStreet"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm5 md5 offset-sm1 offset-md1>
                  <v-text-field
                    label="N° casa/ depto"
                    v-model="dpto"
                  ></v-text-field>
                </v-flex>
              </v-layout>

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1 btn-modal-2" @click.native="dialog2 = false">Cerrar</v-btn>
            <v-btn color="naranja btn-modal-2" @click="setAdress()">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <!--<v-container>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <div class="icon-timeline">
            <i class="material-icons">error_outline</i>
          </div>
          <p class="title-timeline">Información personal</p>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <div class="box-timeline">
            <div class="center-gr">
              <v-btn color="naranja btn-editar">EDITAR</v-btn>
            </div>
            <v-layout row wrap class="box-time-line-form">
              <v-flex xs12 sm3 md3>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Nombre"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm3 md3 offset-sm1 offset-md1>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Apellido"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm3 md3 offset-sm1 offset-md1>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="RUT"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="box-time-line-form">
              <v-flex xs12 sm3 md3 class="mtr-timeline">
                <p class="title-timeline-form">Fecha de Nacimiento</p><br>
                <v-layout>
                  <v-flex xs12 sm4 md4>
                    <v-select
                      v-model="select"
                      :items="items"
                      label="Día"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm4 md4 offset-sm1 offset-md1>
                    <v-select
                      v-model="select"
                      :items="items"
                      label="Mes"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm4 md4 offset-sm1 offset-md1>
                    <v-select
                      v-model="select"
                      :items="items"
                      label="Año"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm3 md3 offset-sm1 offset-md1>
                <v-select
                  v-model="select"
                  :items="items"
                  label="Genero"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm3 md3 offset-sm1 offset-md1 class="mtr-timeline">
                <p class="title-timeline-form">Estatura y Peso</p><br>
                <v-layout>
                  <v-flex xs12 sm4 md4>
                    <v-select
                      v-model="select"
                      :items="items"
                      label="M"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm4 md4 offset-sm1 offset-md1>
                    <v-select
                      v-model="select"
                      :items="items"
                      label="cm"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm4 md4 offset-sm1 offset-md1>
                    <v-select
                      v-model="select"
                      :items="items"
                      label="Kg"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="box-time-line-form">
              <v-flex xs12 sm3 md3 class="mtr-timeline">
                <p class="title-timeline-form">Teléfono Móvil/Teléfono Fijo</p><br>
                <v-layout>
                  <v-flex xs12 sm4 md4>
                    <v-select
                      v-model="select"
                      :items="items"
                      label="Código"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm8 md8 offset-sm1 offset-md1>
                    <v-select
                      v-model="select"
                      :items="items"
                      label="Número"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm3 md3 offset-sm1 offset-md1>
                <v-select
                  v-model="select"
                  :items="items"
                  label="Isapre o Fonasa"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm3 md3 offset-sm1 offset-md1 class="mtr-timeline">
                <v-select
                  v-model="select"
                  :items="items"
                  label="Seguro Complementario"
                ></v-select>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <div class="icon-timeline">
            <i class="material-icons">https</i>
          </div>
          <p class="title-timeline">Seguridad</p>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <div class="box-timeline">
            <div class="center-gr">
              <v-btn color="naranja btn-editar">EDITAR</v-btn>
            </div>
            <v-layout row wrap class="box-time-line-form">
              <v-flex xs12 sm3 md3>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Usuario"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm3 md3 offset-sm1 offset-md1>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Contraseña"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <div class="icon-timeline">
            <i class="material-icons">location_on</i>
          </div>
          <p class="title-timeline">Mis direcciones de entrega</p>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <div class="box-timeline">
            <div class="center-gr">
              <v-btn color="naranja btn-editar">EDITAR</v-btn>
            </div>
            <br>
            <div class="box-time-line-form">
              <h3 class="title-direccion">Direccion 1</h3>
              <p class="des-direccion">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>

              <h3 class="title-direccion">Direccion 2</h3>
              <p class="des-direccion">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <div class="icon-timeline">
            <i class="material-icons">shopping_cart</i>
          </div>
          <p class="title-timeline">Historial de compras</p>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <div class="box-timeline">
            <div class="box-time-line-form">
              <h3 class="title-direccion">Mostrar compras</h3>
              <v-layout row wrap>
                <v-flex xs12 sm2 md2 class="pr20r">
                  <v-select
                    v-model="select"
                    :items="items"
                    label="Mes"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm10 md10>
                  <div class="box-historial-compras">
                    <v-layout row wrap class="box-title-historial-compras">
                      <v-flex xs12 sm1 md1>
                        <p class="box-title-historial-compras-fecha">Fecha<br>
                        06-11-17</p>
                      </v-flex>
                      <v-flex xs12 sm7 md7>
                        <p class="box-title-historial-compras-fecha">Numero de Orden<br>
                        238734723987493</p>
                      </v-flex>
                      <v-flex xs12 sm1 md1>
                        <p class="box-title-historial-compras-compartir">Compartir</p>
                      </v-flex>
                      <v-flex xs12 sm2 md2>
                        <p class="box-title-historial-compras-volvel-compar">Volver a comprar</p>
                      </v-flex>
                      <v-flex xs12 sm1 md1>
                        <p class="box-title-historial-compras-eliminiar">Eliminar</p>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap class="box-historial-compras-productos">
                      <v-flex xs12 sm1 md1>
                        <img src="~/assets/images/product.png" width="100%">
                      </v-flex>
                      <v-flex xs12 sm8 md8>
                        <p class="title-historial-product">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                      </v-flex>
                      <v-flex xs12 sm1 md1 offset-sm1 offset-md1>
                        <p class="cant-historial-compras-product">Cant <br>2</p>
                      </v-flex>
                      <v-flex xs12 sm1 md1>
                        <p class="price-historial-compras-product">Precio<br><span>$</span>9.365</p>
                      </v-flex>
                      <hr class="hr-historial-compras">
                    </v-layout>
                    <v-layout row wrap class="box-historial-compras-productos">
                      <v-flex xs12 sm1 md1>
                        <img src="~/assets/images/product.png" width="100%">
                      </v-flex>
                      <v-flex xs12 sm8 md8>
                        <p class="title-historial-product">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                      </v-flex>
                      <v-flex xs12 sm1 md1 offset-sm1 offset-md1>
                        <p class="cant-historial-compras-product">Cant <br>2</p>
                      </v-flex>
                      <v-flex xs12 sm1 md1>
                        <p class="price-historial-compras-product">Precio<br><span>$</span>9.365</p>
                      </v-flex>
                      <hr class="hr-historial-compras">
                    </v-layout>
                    <div class="historial-compra-total-compra">
                      <p>Total <span>$</span> 9.365</p>
                      <a href="#">ver detalle</a>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <div class="icon-timeline">
            <i class="material-icons">cloud_queue</i>
          </div>
          <p class="title-timeline">Cloud de recetas</p>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <div class="box-timeline">
            <div class="box-time-line-form">
              <h3 class="title-direccion">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
              <p class="des-direccion">Subir receta</p>
              <div class="center-gr">
                <v-btn color="naranja btn-editar">SUBIR RECETA</v-btn>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <br>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <div class="icon-timeline">
            <i class="material-icons">alarm</i>
          </div>
          <p class="title-timeline">Recordatorios</p>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <div class="box-timeline">
            <v-layout row wrap>
              <v-flex xs12 sm6 md6 class="p20">
                <div class="box-historial-compras">
                  <v-layout row wrap class="box-title-historial-compras">
                    <v-flex xs12 sm12 md12>
                      <p class="box-title-historial-compras-fecha">Recordatorio de Administración</p>
                    </v-flex>
                  </v-layout>
                  <div class="box-recordatorio">
                    <i class="material-icons recordatorio-close">close</i>
                    <p class="recordatorio-text-1">05/02/18</p>
                    <p class="recordatorio-text-2">6:00 pm</p>
                    <p class="recordatorio-text-3">Corcidin Gotas Pediatricas</p>
                    <p class="recordatorio-text-4">Cada 12 horas / 50 mg / 7 días</p>
                    <hr class="hr-recordatorios">
                  </div>
                  <div class="box-recordatorio">
                    <i class="material-icons recordatorio-close">close</i>
                    <p class="recordatorio-text-1">05/02/18</p>
                    <p class="recordatorio-text-2">6:00 pm</p>
                    <p class="recordatorio-text-3">Corcidin Gotas Pediatricas</p>
                    <p class="recordatorio-text-4">Cada 12 horas / 50 mg / 7 días</p>
                  </div>
                </div>
              </v-flex>
              <v-flex xs12 sm6 md6 class="p20">
                <div class="box-historial-compras">
                  <v-layout row wrap class="box-title-historial-compras">
                    <v-flex xs12 sm12 md12>
                      <p class="box-title-historial-compras-fecha">Recordatorio de Administración</p>
                    </v-flex>
                  </v-layout>
                  <div class="box-recordatorio">
                    <i class="material-icons recordatorio-close">close</i>
                    <p class="recordatorio-text-1">05/02/18</p>
                    <p class="recordatorio-text-2">6:00 pm</p>
                    <p class="recordatorio-text-3">Corcidin Gotas Pediatricas</p>
                    <p class="recordatorio-text-4">Cada 12 horas / 50 mg / 7 días</p>
                    <hr class="hr-recordatorios">
                  </div>
                  <div class="box-recordatorio">
                    <i class="material-icons recordatorio-close">close</i>
                    <p class="recordatorio-text-1">05/02/18</p>
                    <p class="recordatorio-text-2">6:00 pm</p>
                    <p class="recordatorio-text-3">Corcidin Gotas Pediatricas</p>
                    <p class="recordatorio-text-4">Cada 12 horas / 50 mg / 7 días</p>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-container>-->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  asyncData (context) {
    return {
      apiUser: context.env.apiUser,
      apiTag: context.env.apiTag,
    }
  },
  mounted(){
    this.email = localStorage.getItem('email')
    this.getProfile()
    this.getComunas()
  },
  data(){
    return {
      dialog: false,
      dialog2: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      sex: '',
      rut: '',
      direction: '',
      itemsSex: [
        'Masculino',
        'Femenino'
      ],
      house: '',
      street: '',
      numStreet: '',
      dpto: '',
      comuna: '',
      comunas: [],
      itemSchedule: [],
      schedule: null,
      formItem: {},
      itemAddress: null,

    }
  },
  methods: {
    getProfile(){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiUser}/auth/info`,
        headers: {
          email: this.email,
        }
      })
      .then(function(response) {
        if (response.data.info) {
          self.firstName = response.data.info.first_name
          self.lastName = response.data.info.last_name
          self.sex = response.data.info.sex
          self.phone = response.data.info.phone
          self.rut = response.data.info.rut
          self.itemAddress = response.data.address
          console.log(self.itemAddress);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getComunas(){
      let self = this;
      axios({
        method: 'GET',
        url:`${this.apiTag}/commune`,
      })
      .then(function(response) {
        self.comunas = response.data;

      })
      .catch(function (error) {
        console.log(error);
      });
    },
    setProfile(){
      this.dialog = false;
      let self = this;
      axios({
        method: 'POST',
        url:`${this.apiUser}/auth/infoProfile`,
        data: {
          email: this.email,
          info: {
            first_name: this.firstName,
            last_name: this.lastName,
            phone: this.phone,
            sex: this.sex,
            rut: this.rut
          }
        }
      })
      .then(function(response) {
        self.$notify({
          title: 'Actualizado',
          message: 'Su perfil ha sido actualizado exitosamente',
          type: 'info',
          horizontalAlign: 'right',
          showClose: false
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    setAdress(){
      this.dialog2 = false;
      let self = this;
      axios({
        method: 'POST',
        url:`${this.apiUser}/auth/addAddressUser`,
        data: {
          email: this.email,
          address: {
            commune: this.comuna,
            street: this.street,
            street_number: this.numStreet,
            number_dpto_house: this.dpto,
          }
        }
      })
      .then(function(response) {
        self.$notify({
          title: 'Actualizado',
          message: 'Su su dirección ha sido agregada exitosamente',
          type: 'info',
          horizontalAlign: 'right',
          showClose: false
        })

        self.getProfile()
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    deleteAddress(index){
      this.itemAddress.splice(index, 1)

      let self = this;
      axios({
        method: 'POST',
        url:`${this.apiUser}/auth/updateAddressUser`,
        data: {
          email: this.email,
          address: this.itemAddress
        }
      })
      .then(function(response) {
        console.log(response);
        self.$notify({
          title: 'Actualizado',
          message: 'Su su dirección ha sido eliminada exitosamente',
          type: 'info',
          horizontalAlign: 'right',
          showClose: false
        })

        self.getProfile()
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },

}
</script>

<style lang="css">
.bg-fdfdfd{
  background: #fdfdfd;
}
.img_usuario{
  max-width: 100%;
  width: 100%,
}
.prl15{
  padding-left: 15px;
  padding-right: 15px;
}
.p20{
  padding: 20px;
}
.pt10{
  padding-top: 10px;
}
.hr_profile{
  border: 1px solid #ddd;
  width: 100px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.title_profile_1{
  font-size: 20px;
  font-weight: 500;
}
.title_profile_2{
  font-size: 15px;
  font-weight: 400;
}
.btn-edit{
  position: absolute;
  right: 0;
  width: 0px;
  margin-top: -10px;
  text-transform: none;
  margin-right: 12px;
}
.btn-edit i{
  color: #4c4c4c;
  font-size: 16px;
  padding-right: 5px;
}
.btn-modal-2{
  color: #fff!important;
  text-transform: none;
}
.box_direc{
  box-shadow: 0px 1px 1px -1px rgba(0, 0, 0, .01), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .1);
}
.btn_delete{
  position: absolute;
  bottom: 0;
  right: 0;
}
.icon-timeline{
  background: #3949ab;
  width: 35px;
  height: 35px;
  text-align: center;
  border-radius: 50%;
  padding: 5px;
  margin: 0 auto;
}
.icon-timeline i{
  color:#fff;
}
.title-timeline {
    margin-top: 7px;
    font-size: 15px;
    font-weight: 500;
}
.box-timeline{
  padding: 10px 10px;
}
.btn-editar{
  color:#fff!important;
}
.title-timeline-form{
  font-size: 13px;
  font-weight: 500;
  margin-bottom: -30px;
}
.title-direccion{
  font-size: 14px;
  font-weight: 500;
}
.des-direccion{
  font-size: 14px;
  font-weight: 100;
  color: #949494;
}
.box-historial-compras{
  -webkit-box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12);
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12);
}
.box-title-historial-compras{
  padding:18px;
  background: #f3f3f3;
}
.box-title-historial-compras-fecha, .box-title-historial-compras-compartir, .box-title-historial-compras-volvel-compar, .box-title-historial-compras-eliminiar{
  margin-bottom: 0;
  font-size: 12px;
  font-weight: 400;
}
.box-title-historial-compras-compartir, .box-title-historial-compras-volvel-compar, .box-title-historial-compras-eliminiar{
    text-align: center;
}
.box-title-historial-compras-compartir{
  color:#3949ab;
}
.box-title-historial-compras-volvel-compar{
  color: green;
}
.box-title-historial-compras-eliminiar{
  color: red;
}
.box-historial-compras-productos{
  padding:15px;
}
.title-historial-product{
  margin-top: 25px;
  margin-bottom: 0;
  font-size: 13px;
  font-weight: 400;
}
.cant-historial-compras-product,.price-historial-compras-product{
    margin-bottom: 0;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    margin-top: 25px;
}
.price-historial-compras-product span{
  font-size: 9px;
}
.hr-historial-compras{
  width: 97%;
  margin: 0 auto;
  border: 1px solid #f3f3f3;
}
.historial-compra-total-compra{
  text-align: center;
  padding: 10px;
}
.historial-compra-total-compra p{
  margin-bottom: 0px;
  font-size: 14px;
  font-weight: 500;
}
.historial-compra-total-compra span{
  font-weight: 100;
  font-size: 12px;
}
.historial-compra-total-compra a{
  margin-bottom: 0px;
  font-size: 12px;
  font-weight: 100;
}
.box-recordatorio{
  padding:18px;
}
.recordatorio-close{
  float:right;
  color:#9b9b9b;
  font-size: 15px;
}
.recordatorio-text-1 {
    color: #9b9b9b;
    font-size: 18px;
    margin-bottom: 5px;
}
.recordatorio-text-2 {
    color: #9b9b9b;
    font-size: 12px;
    margin-bottom: 5px;
}
.recordatorio-text-3 {
    color: #3949ab;
    font-size: 15px;
    margin-bottom: 5px;
}
.recordatorio-text-4 {
    color: #9b9b9b;
    font-size: 15px;
    margin-bottom: 5px;
}
.hr-recordatorios {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #f3f3f3;
}

@media only screen and (min-width: 768px) {
    .icon-timeline{
      float: left;
    }
    .title-timeline {
      margin-left: 50px;
    }
    .box-timeline{
      border-left: 3px solid #e0e0e0;
      margin-left: 15px;
    }
    .box-time-line-form{
      padding: 15px;
    }
    .mtr-timeline{
          margin-top: -12px;
    }
    .pr20r{
      padding-right:20px;
    }
    .historial-compra-total-compra{
      text-align: right;
      padding-right: 20px;
    }
}
@media only screen and (max-width: 768px) {
    .title-timeline {
      text-align: center;
    }
    .center-gr{
      text-align: center;
    }
}
</style>
