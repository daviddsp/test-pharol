<template>
  <div>
    <v-layout class="mtr20px" row wrap v-for="(item, index) in detailProduct" :key="index" itemprop="itemListElement" itemscope itemtype="http://schema.org/Product">
      <v-flex xs12 sm6 md6 class="p50 center">
        <div class="detail_img_product">
          <img itemprop="image" class="resposive_img" :src="`${imgAws}${item.image}`" width="100%"  v-bind:alt="item.name">
        </div>
        <div class="detail_box_number" v-if="item.internet_sale != '0' || item.internet_sale != 0">
          <v-btn fab dark small color="naranja" @click="deleteCant(item)">
            <v-icon dark>remove</v-icon>
          </v-btn>
          <input type="number" placeholder="0" class="form-control detail_number" v-model="quantity" disabled>
          <v-btn fab dark small color="naranja" @click="addCant(item)">
            <v-icon dark>add</v-icon>
          </v-btn>
        </div>
        <v-btn color="naranja detail_btn_add" @click="addItemCart(item)" v-if="item.internet_sale != 0 || item.internet_sale != '0'" itemprop="availability">
          Agregar al carro | <i class="material-icons">shopping_cart</i>
        </v-btn>
        <v-btn v-if="item.internet_sale == '0' || item.internet_sale == 0" class="btn-product-ss btn-style-pruduct-detail" disabled>
          Sin Stock <span class="line_add_cart">|</span> <i class="material-icons">remove_shopping_cart</i>
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 md6 class="detail_product_caract pl50 row_resposive">
        <h1 class="fw500 title-des-product pr20" itemprop="name">{{ item.name }}</h1>
        <h2 class="detail_title2 fw500">Laboratorio: {{ item.laboratory.toLowerCase() }}</h2>
        <h3 class="detail_title2" v-if="item.principe_active != ''">
          Princio(s) Activo(s): {{ item.principe_active }}
        </h3>
        <br>
        <div v-if="item.master_category == 'Medicamentos'">
          <div class="box-prescription-type" v-if="item.prescription_type == 'NP'">
            <!--<img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rr.png">-->
            <p class="rxs-title">Medicamento de venta Libre</p>
          </div>
        </div>
        <div class="box-prescription-type"  v-if="item.prescription_type == 'WP'">
          <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rx.png" alt="Receta Medica Simple">
          <p class="rxs-title">Receta Medica Simple</p>
        </div>
        <div class="box-prescription-type" v-if="item.prescription_type == 'RMRSCS'">
          <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rr.png" alt="Receta Médica Retenida sin Control de Stock">
          <p class="rxs-title">Receta Médica Retenida sin Control de Stock</p>
        </div>
        <div class="box-prescription-type" v-if="item.prescription_type == 'RP'">
          <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rr-2.png" alt="Receta Medica Retenida con Control de Stock">
          <p class="rxs-title">Receta Medica Retenida con Control de Stock</p>
        </div>
        <div class="box-prescription-type" v-if="item.prescription_type == 'RCH'">
          <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rch.png" alt="Receta Medica Cheque">
          <p class="rxs-title">Receta Medica Cheque</p>
        </div>
        <div class="box-prescription-type" v-if="item.prescription_type == 'RRCS'">
          <img class="resposive_img" width="44px" src="~/assets/images/RX/RX.png" alt="Receta retenida con control de stock">
          <p class="rxs-title">Receta retenida con control de stock</p>
        </div>
        <div class="box-prescription-type" v-if="item.prescription_type == 'VDPR'">
          <img class="resposive_img" width="44px" src="~/assets/images/RX/RX.png" alt="Venta directa presentación de Receta">
          <p class="rxs-title">Venta directa presentación de Receta</p>
        </div>
        <div class="box-prescription-type" v-if="item.prescription_type == 'APR'">
          <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-Rr.png" alt="Antibiótico Presentación de Receta">
          <p class="rxs-title">Antibiótico Presentación de Receta</p>
        </div>
        <div class="box-prescription-type" v-if="item.bioequivalent == true">
          <img class="resposive_img" width="44px" src="~/assets/images/RX/ic-bioequivalente.png" alt="Bioequivalente">
          <p class="rxs-title">Medicamentos Intercambiables</p>
        </div>
        <br>
        <h3 class="fw500 price-detail" itemprop="price"><span class="price_span">$</span> {{ formatNumber(item.price) }}</h3>
        <!--<hr class="detail_hr">-->
        <br>
   
        <h3 class="fw500 c-8e8e8e">Tags</h3>
        <br>

        <div v-if="item.meta_keywords">
          <v-chip color="" text-color="white" v-for="(tag, index) in splitJoin(item.meta_keywords)" :key="index" class="metatabs">
            <span class="meta-key-title">{{tag}}</span>
          </v-chip>
        </div>
        
        <!--<v-chip color="" text-color="white" class="metatabs" v-if="item.meta_keywords == '' || item.meta_keywords == undefined">
          <span class="meta-key-title">{{item.name}}</span>
        </v-chip>-->
        <!--
        <div class="detail_redes">
          <a href=""><img src="~/assets/images/ic-detalle-favoritos.png" class="redes_detalle"></a>
          <a href="https://www.facebook.com/PharolFarmacias" target="_blank"><img src="~/assets/images/ic-detalle-facebook.png" alt="Facebook" class="redes_detalle"></a>
          <a href="https://twitter.com/PharolFarmacias" target="_blank"><img src="~/assets/images/ic-detalle-twitter.png" alt="Twitter" class="redes_detalle"></a>
          <a href="https://www.instagram.com/pharolfarmacias/" target="_blank"><img src="~/assets/images/ic-detalle-instagram.png" alt="Instagram" class="redes_detalle"></a>
          <a href="malito:contacto@pharol.cl"><img src="~/assets/images/ic-detalle-mail.png" alt="email" class="redes_detalle"></a>
        </div>
        -->
      </v-flex>

      <v-flex xs12 sm12 md12 class="mt20">
      <v-tabs class="detail_container_tabs"
        v-model="active"
        color="white"
        dark
        slider-color="blue_app"
        centered>
        <v-tab class="detail_title_tabs"
          ripple>
          Descripción
        </v-tab>
        <v-tab class="detail_title_tabs"
          ripple>
          información
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="p50 tabs-detail-product">
              <h3  v-if="item.register_isp_sag"><span class="fw500">Registro ISP</span>: {{item.register_isp_sag}}</h3>
              <h3 class="text-sm-left" v-if="item.principe_active"><span class="fw500">Principio Activo</span>: {{item.principe_active}}</h3>
              <h3 class="text-sm-left" v-if="item.indications"><span class="fw500">Indicaciones</span>: {{item.indications}}</h3>
              <div v-if="item.master_category == 'Medicamentos'">
                <div class="" v-if="item.prescription_type == 'NP'">
                  <h3 class="text-sm-left"><span class="fw500">Condición de venta:</span> Medicamento de venta Libre</h3>
                </div>
              </div>
              <div class=""  v-if="item.prescription_type == 'WP'">
                <h3 class="text-sm-left"><span class="fw500">Condición de venta:</span> Receta Medica Simple</h3>
              </div>
              <div class="" v-if="item.prescription_type == 'RMRSCS'">
                <h3 class="text-sm-left"><span class="fw500">Condición de venta:</span> Receta Médica Retenida sin Control de Stock</h3>
              </div>
              <div class="" v-if="item.prescription_type == 'RP'">
                <h3 class="text-sm-left"><span class="fw500">Condición de venta:</span> Receta Medica Retenida con Control de Stock</h3>
              </div>
              <div class="" v-if="item.prescription_type == 'RCH'">
                <h3 class="text-sm-left"><span class="fw500">Condición de venta:</span> Receta Medica Cheque</h3>
              </div>
              <div class="" v-if="item.prescription_type == 'RRCS'">
                <h3 class="text-sm-left"><span class="fw500">Condición de venta:</span> Receta retenida con control de stock</h3>
              </div>
              <div class="" v-if="item.prescription_type == 'VDPR'">
                <h3 class="text-sm-left"><span class="fw500">Condición de venta:</span> Venta directa presentación de Receta</h3>
              </div>
              <div class="" v-if="item.prescription_type == 'APR'">
                <h3 class="text-sm-left"><span class="fw500">Condición de venta:</span> Antibiótico Presentación de Receta</h3>
              </div>
              <div class="" v-if="item.bioequivalent == true">
                <h3 class="text-sm-left"><span class="fw500">Bioequivalente:</span> Si</h3>
              </div>
              <h3 class="text-sm-left" v-if="item.storage_conditions"><span class="fw500">Condiciones de almacenamieto:</span> {{item.storage_conditions}}</h3>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="p50 tabs-detail-product">
            <h3 v-show="item.side_effect == '' || item.drug_interactions == '' || item.pregnancy_and_breastfeeding == ''"><span class="fw500 text-sm-left">No hay información para mostrar</span></h3>
              <h3 v-if="item.pregnancy_and_breastfeeding"><span class="fw500 text-sm-left">Embarazo y lactancia:</span> {{item.pregnancy_and_breastfeeding}}</h3>
              <h3 v-if="item.side_effect"><span class="fw500 text-sm-left">Efectos Secundarios:</span> {{item.side_effect}}</h3>
              <h3 v-if="item.drug_interactions"><span class="fw500 text-sm-left">Interacciones:</span> {{item.drug_interactions}}</h3>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-show="similarsLaboratory.length >= 1">
      <v-container>
        <br>
        <h3 class="title_slider">Otros laboratorios</h3>
      </v-container>
      <product-carousel-component :items="{ products: similarsLaboratory } "/>
    </v-layout>

    <!--
    <v-layout row wrap v-show="relationsBioequivalents.length > 1" class="bg-f5f5f5">
      <v-container>
        <br>
        <h3 class="title_slider">Bioequivalentes</h3>
      </v-container>
      <product-carousel-component :items="{ products: relationsBioequivalents } "/>
    </v-layout>
    -->

    <v-layout row wrap v-show="relationsBioequivalents.length > 1">
      <v-container>
        <br>
        <h3 class="title_slider">Relacionados</h3>
      </v-container>
      <product-carousel-component :items="{ products: relationsProducts } "/>
    </v-layout>



    <v-layout row wrap justify-center>
      <v-dialog v-model="dialog" max-width="80%">
        <v-card>
          <v-card-title class="headline">Disculpe!</v-card-title>
          <v-card-text>Estimad@ para comprar productos con receta retenida deberá iniciar session</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Ahora no</v-btn>
            <v-btn color="green darken-1" flat="flat" :to="{ path: '/auth' }">Iniciar Sesión</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>

</template>

<script>
import axios from 'axios';
import format from 'format-number'
import ProductCarousel from '~/components/ProductCarousel/CarouselResponsive.vue'

import Product from '~/components/Product.vue'


export default {
  components: {
    'product-component': Product,
    'product-carousel-component': ProductCarousel,
  },
  asyncData (context) {
    return axios.get(`${context.env.apiPurchase}/products/find/?q=${context.params.id}`)
    .then((response) => {
      return {
        apiPurchase: context.env.apiPurchase,
        imgAws: context.env.imgAws,
        metaContent: (response.data[0].meta_description) ? response.data[0].meta_description : context.params.id.toLowerCase().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' - Farmacia online Pharol',
        metaKeywords: (response.data[0].meta_keywords) ? response.data[0].meta_keywords : 'medicamento, medicamentos genericos, precios de medicamentos, medicinas, receta medica, genérico, farmácias, salud alternativa, homeopatia, endocrinología infantil, sistema endocrino, endocrino, enfermedades del sistema endocrino, enfermedades endocrinas, sistema endocrino, sistema hormonal, glandulas endocrinas, sistema glandular, sistema ',
        metaName: (response.data[0].meta_title) ? response.data[0].meta_title : context.params.id.toLowerCase().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      }
    })
  },
  head () {
    return {
      title: `${this.slugToString(this.$route.params.id).replace(/\b\w/g, l => l.toUpperCase())} - Farmacia Online Pharol`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: this.metaKeywords},
        { hid: 'description', name: 'description', content: this.metaContent }
      ]
    }
  },
  data(){
    return  {
      dialog: false,
      findWord: 'hola',
      search: '',
      blanco: '',
      similarsLaboratory: [],
      detailProduct: [],
      relationsProducts: [],
      relationsBioequivalents: [],
      active: null,
      text: 'En Construcción.',
      metaContent: null,
      metaName: null,
      metaKeywords: null,
      objects:[{tags: 'test1, test2, test3'}]
    }
  },
  mounted: function() {
    this.getProduct(this.$route.params.id)
  },
  methods:{
    splitJoin(theText){
      return theText.split(', ');
    },
    getProduct(item){
      let self = this;
      axios({
        method:'GET',
        url:`${self.apiPurchase}/products/find/?q=${item}`,
      })
      .then(function(response) {
        console.log(response.data[0]);
        // se pregunta si tiene mas de una coincidencoa
        // se separan en variables
        if (response.data.length > 1) {
            // laboratorios con el mismo producto
            self.similarsLaboratory = response.data;
            self.similarsLaboratory.splice(0,1)
        }
        // detalle del producto
        self.detailProduct.push(response.data[0]);
        self.relationship(response.data[0].principe_active)
      });
    },
    addItemCart(item) {

      const search = this.$store.state.cart.find(search => {
        return search.objectID == item.objectID;
      });

      if (!localStorage.getItem('email')) {
        if (
            item.prescription_type == 'RP' ||
            item.prescription_type == 'RRCS' ||
            item.prescription_type == 'RCH'
            ) {
          this.dialog = true;
        } else {
          this.$store.commit('addItemCart', item);
          this.$store.commit('updateOrderOnServer');

          this.$notify({
            title: 'Producto agregado',
            message: 'Se ha agregado su producto con éxito.',
            type: 'info',
            horizontalAlign: 'right',
            showClose: false
          })
        }
      }

      if (localStorage.getItem('email')) {
        if(search == undefined){
          this.$set(item, 'quantity', 0)
          this.$set(item, 'sub_total', 0)
          this.$store.commit('addItemCart', item)
          this.$notify({
            title: 'item agregado',
            message: 'Se ha agregado su item satisfactoriamente',
            type: 'info',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            showClose: false,
          })
        }else{
          this.$notify({
            title: 'item agregado',
            message: 'Ya se ha agregado este producto al carro',
            type: 'danger',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            showClose: false,
          })
        }
      }





    },
    addCant(item){
      const search = this.$store.state.cart.find(search => {
        return search.objectID == item.objectID;
      });

      if(search == undefined){
        this.$set(item, 'quantity', 0)
        this.$set(item, 'sub_total', 0)
        this.$store.commit('addItemCart', item)
      }else{
        this.$store.commit('addItemCart', item)
      }
    },
    deleteCant(item){
      if (this.quantity > 1) {
        this.$store.commit('deleteQuantityCart', item)
      }
    },
    slugToString(item){
      return item.toLowerCase().replace(/-/g, ' ')
    },
    stringToSlug(item){
      return item.toString().toLowerCase().replace(/ /g, '-')
    },
    relationship(item){
      let self = this;
      axios({
        method:'GET',
        url:`${self.apiPurchase}/products/find`,
        params: {
          q: item
        }
      })
      .then(function(response) {
        self.relationsProducts = response.data;

        function fitlerBioequivalent(obj) {
          if (obj.bioequivalent = 1) {
            return true;
          }
        }

        self.relationsBioequivalents = self.relationsProducts.filter(fitlerBioequivalent);

      });
    },
    formatNumber(item){
      return format({prefix: '', integerSeparator: '.'})(item);
    },
  },
  computed: {
    quantity(){
      let search = this.$store.state.cart.findIndex(search => {
        return search.objectID == this.detailProduct[0].objectID;
      });

      if (search == -1){
        return 0
      }else {
        return this.$store.state.cart[search].quantity
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bg-f5f5f5{
    background: #F5F5F5
  }
  .c-8e8e8e{
    color:#8e8e8e;
  }
  .btn-style-pruduct-detail{
    background-color: #fd5621!important;
    border-color: #fd5621!important; 
    color:#fff!important
  }
  .pl50{
    padding-left:50px;
  }
  .mt20{
    margin-top:20px;
  }
  .box-prescription-type{
    display:-webkit-box;
  }
  .fw500{
    font-weight: 500;
  }
  .price-detail{
    font-size:22px;
  }
  .price_span{
    font-size:16px;
  }
  .redes_detalle {
    margin: 2px 5px;
  }
  /*
  *   TABS DETAIL PRODUCTS
  */
  .tabs__container{
    border-bottom: 1px solid #f9f7f7;
  }
  .detail_tabs{
    width: 100%;
  }
  .detail_title_tabs{
    color: #212121!important;
  }
  a:link {
      text-decoration: none!important;
  }
  .menu_history{
    color: #8e8e8e;
    font-size: 12px;
  }
  .detail_img_product{
    text-align: center;
  }
  .detail_img_product img{
    width: 100%;
  }
  .detail_title2{
    margin-bottom: 5px;
    color: #8e8e8e;
    font-size: 15px;
    font-weight:300;
  }
  .detail_hr{
    border: 1px solid #ddd;
  }
  .detail_number{
    border: 1px solid #ddd;
    width: 40px;
    text-align: center;
    border-radius: 0px;
    margin-top: 2px;
  }
  .detail_box_number{
    display: block;
    margin-top: 15px;
  }
  .btn--floating.btn--small {
      height: 30px;
      width: 30px;
  }
  .detail_btn_add{
    color: #fff!important;
    text-transform: capitalize;
    margin-top: 15px;
  }
  .detail_redes i{
    font-size: 25px;
    padding-right: 10px;
    color: #212121;
  }
  .btn-product-ss{
    text-transform: none;
    color: #fff !important;
    text-transform: none;
    margin-top: 15px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .btn-product-ss i{
    font-size: 16px;
    margin-left: 6px;
    margin-right: -10px;
  }

  .rxs-title{
    font-size: 13px;
    margin-bottom: 0px;
    margin-top: 12px;
    margin-left: 10px;
    color: #8e8e8e;
  }

  .title-des-product{
    font-size:25px;
  }

  .meta-key-title{
    color: rgba(0, 0, 0, .7);
    font-weight: 500;
    text-transform: capitalize;
  }

  .meta-key-icon{
    color: rgba(0, 0, 0, .3);
  }

  .metatabs{
    background: #f7f7f7;
    border: 1px solid #ececec;
  }

  .tabs-detail-product h3{
    font-size: 16px;
    font-weight:100;
    text-align:center;
  }

  /*responsive 768*/
  @media (min-width: 768px){
    .detail_img_product img{
      width: 300px;
    }
    .detail_product_caract{
      border-left:    2px solid #e0e0e0;
    }
    .mtr20px{
      margin-top:20px;
    }

  }

  /*responsive 550*/
  @media (max-width: 550px){
    .hr_detail{
      display: none;
    }
    .detail_box_number {
        display: block;
    }
    .detail_number{
      margin: 0 auto;
    }
  }

</style>
