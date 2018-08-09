<template>
  <div itemprop="itemListElement" itemscope itemtype="http://schema.org/Product">
   <v-card class="proucts_general">
     <a :href="`/products/${stringToSlug(item.name)}`">
       <div class="product-image-wrapper">
         <div class="single-products">
           <div class="box_triangulo" v-if="item.offer >= 1" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
             <div class="triangulo_equilatero"><p>{{ item.offer }}</p></div>
           </div>
           <img itemprop="image" class="resposive_img" :src="`https://pharol.s3.amazonaws.com/media/${item.image}`" width="100%" height="150" v-bind:alt="item.name">

           <div class="" v-if="item.master_category == 'Medicamentos'">
             <div class="product-overlay" v-if="item.prescription_type == 'NP' ||
                                                item.prescription_type == 'WP' ||
                                                item.prescription_type == 'RMRSCS' ||
                                                item.prescription_type == 'RP' ||
                                                item.prescription_type == 'RCH' ||
                                                item.prescription_type == 'RRCS' ||
                                                item.prescription_type == 'VDPR' ||
                                                item.prescription_type == 'APR' ||
                                                item.bioequivalent == true
                                                ">
               <div class="overlay-content">
                 <div class="product_box_hover" v-if="item.prescription_type == 'NP'">
                   <!--<img class="resposive_img rr-img-producto" src="~/assets/images/RX/">-->
                   <h2 class="center ml0">Medicamento de venta Libre</h2>
                 </div>
                 <div class="product_box_hover" v-if="item.prescription_type == 'WP'">
                   <img class="resposive_img rr-img-producto" src="~/assets/images/RX/ic-Rx.png" alt="Receta Medica Simple">
                   <h2>Receta Medica Simple</h2>
                 </div>
                 <div class="product_box_hover" v-if="item.prescription_type == 'RMRSCS'">
                   <img class="resposive_img rr-img-producto" src="~/assets/images/RX/ic-Rr.png" alt="Receta Médica Retenida sin Control de Stock">
                   <h2>Receta Médica Retenida sin Control de Stock</h2>
                 </div>
                 <div class="product_box_hover" v-if="item.prescription_type == 'RP'">
                   <img class="resposive_img rr-img-producto" src="~/assets/images/RX/ic-Rr-2.png" alt="Receta Medica Retenida con Control de Stock">
                   <h2>Receta Medica Retenida con Control de Stock</h2>
                 </div>
                 <div class="product_box_hover" v-if="item.prescription_type == 'RCH'">
                   <img class="resposive_img rr-img-producto" src="~/assets/images/RX/ic-Rch.png" alt="Receta Medica Cheque">
                   <h2>Receta Medica Cheque</h2>
                 </div>
                 <div class="product_box_hover" v-if="item.prescription_type == 'RRCS'">
                   <img class="resposive_img rr-img-producto" src="~/assets/images/RX/RX.png" alt="Receta retenida con control de stock">
                   <h2>Receta retenida con control de stock</h2>
                 </div>
                 <div class="product_box_hover" v-if="item.prescription_type == 'VDPR'">
                   <img class="resposive_img rr-img-producto" src="~/assets/images/RX/RX.png" alt="Venta directa presentación de Receta">
                   <h2>Venta directa presentación de Receta</h2>
                 </div>
                 <div class="product_box_hover" v-if="item.prescription_type == 'APR'">
                   <img class="resposive_img rr-img-producto" src="~/assets/images/RX/ic-Rr.png" alt="Antibiotico con presentación de Receta">
                   <h2>Antibiotico con presentación de Receta</h2>
                 </div>
                 <div class="product_box_hover" v-if="item.bioequivalent == true">
                   <img class="resposive_img rr-img-producto" src="~/assets/images/RX/ic-bioequivalente.png" alt="Bioequivalente">
                   <h2>Bioequivalente</h2>
                 </div>
               </div>
             </div>
          </div>

         </div>
       </div>
     </a>

       <v-card-title primary-title>
         <div>
           <!-- <a :href="`/products/${stringToSlug(item.name)}`"> -->
           <a  @click="findProduct(item.name)">
             <h3 class="carru_title_1" itemprop="name">
               {{ MaysPrimera(item.name.slice(0,25).toLowerCase()) }}&nbsp;
               <span v-show="item.name.length>= 26">...</span>
             </h3>
           </a>
           <p class="carru_title_2" v-if="item.principe_active != ''">
            {{ MaysPrimera(item.principe_active.slice(0,25).toLowerCase())}}&nbsp;
            <span v-show="item.principe_active.length>= 26">...</span>

          </p>
           <p class="carru_title_2"> {{ MaysPrimera(item.laboratory.toLowerCase()) }} </p>
           <h3 class="carru_title_3" v-if="item.offer >= 1" itemprop="price">
             {{ formatNumber(item.offer_price) }}
             <span class="carru_title_4" itemprop="price">
               {{ formatNumber(item.price) }}
             </span>
           </h3>
           <h3 class="carru_title_3" v-else itemprop="price">
             <span class="carru_title_span">$</span>{{ formatNumber(item.price) }}
           </h3>
           <p class="espacio-blanco" v-if="item.principe_active == ''">
            &nbsp;
          </p>
         </div>
         </v-card-title>
         <div class="carru_add_cart_btn" v-if="item.internet_sale != '0' || item.internet_sale != 0" itemprop="availability">
           <v-btn color="naranja detail_btn_add" @click="addItemCart(item)">Agregar al carro <span class="line_add_cart">|</span> <i class="material-icons">shopping_cart</i></v-btn>
         </div>
         <div class="carru_add_cart_btn" v-if="item.internet_sale == '0' || item.internet_sale == 0">
           <v-btn class="btn-product-ss bt-custon-product-remove" disabled>
             Sin Stock <span class="line_add_cart">|</span> <i class="material-icons">remove_shopping_cart</i>
           </v-btn>
         </div>
       </v-card>


       <v-layout row justify-center>
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
import format from 'format-number'
import axios from 'axios';

export default {
  props:['item'],
  components: {

  },
  data: function () {
    return {
      dialog: false,
    }
  },
  mounted(){
    // console.log(this.item);
  },
  methods: {
    findProduct(item){
      this.$router.push({ path: `/products/${this.stringToSlug(item)}` })
    },
    stringToSlug(item){
      return item.toString().toLowerCase()
                            .replace(/%/g, '') // eliminando %
                            .replace(/ /g, '-') // eliminando espacios
                            .replace(/\//g, '-'); // eliminando slash "/"
    },
    addItemCart(item) {
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
    },
    formatNumber(item){
      return format({prefix: '', integerSeparator: '.'})(item);
    },
    MaysPrimera(string){
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

}
</script>

<style lang="stylus" scoped>/* */
  .ml0{
    margin-left:0px;
  }
  .card {
    border-radius: 5px;
    box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12);
  }
  .proucts_general {
    margin: 10px;
    color: #fff;
  }
  .proucts_general .btn__content {
    color: #fff;
    text-transform: capitalize;
  }
  .triangulo_equilatero {
     width: 0;
     height: 0;
     border-right: 40px solid transparent;
     border-top: 40px solid #f8002d;
     border-left: 40px solid #f8002d;
     border-bottom: 40px solid transparent;
     border-top-left-radius: 7px;
  }
  .box_triangulo{
    position: absolute;
    top:0;
    left: 0px;
  }
  .triangulo_equilatero p{
    position: absolute;
    top: 0;
    left: 0;
    padding: 12px;
    color: #fff;
    font-weight: 900;
  }
  .carru_add_cart_btn{
    text-align: center;
    padding-bottom: 12px;
    margin-left: -3px;
  }
  .carru_title_1{
    color: #3f51b5;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-weight: 500;
  }
  .carru_title_2{
    color: #9a9a9a;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .carru_title_3 {
    color: #f44336;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-weight: 500;
  }
  .carru_title_span{
    font-size: 12px;
  }
  .carru_title_4 {
    color: #9a9a9a;
    font-size: 12px;
  }
  .product-overlay {
    background: rgba(255, 255, 255, .8);
    top: 0;
    display: none;
    height: 0;
    position: absolute;
    -webkit-transition: height 500ms ease 0s;
    transition: height 500ms ease 0s;
    width: 100%;
    display: block;
  }
  .product-overlay .overlay-content {
    position: absolute;
    bottom: 0;
    text-align: left;
    width: 100%;
    padding:20px;
  }
  .product-overlay h2 {
    color: #212121;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: 500;
    margin-top: 15px;
    margin-left: 55px;
  }
  .product-overlay p {
    font-family: 'Roboto', sans-serif;
    font-size: 10px;
    font-weight: 400;
    color: #212121;
  }
  .product-overlay .add-to-cart {
    background: #fff;
    border: 0 none;
    border-radius: 0;
    color: #FE980F;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    margin-bottom: 25px;
  }
  .add-to-cart i {
    margin-right: 5px;
  }

  .single-products:hover .product-overlay {
    display: block;
    height: 100%;
  }
  .single-products {
    position: relative;
  }

  .product-image-wrapper {
    overflow: hidden;
  }
  .product_box_hover{
    padding: 10px;
  }
  .detail_btn_add i{
    font-size: 16px;
    margin-left: 6px;
    margin-right: -10px;
  }
  .detail_btn_add {
    color: #fff!important;
    text-transform: none;
    margin-top: 15px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .line_add_cart{
    color: #d6491c;
    padding-left: 10px;
    padding-right: 5px;
  }

  .resposive_img {
    max-width: 100%;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
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
  .rr-img-producto{
    float: left;
  }
  .espacio-blanco{
    margin-bottom: 4px;
  }
  /*responsive 550*/
  @media (max-width: 550px){
    .row_resposive{
      text-align: center;
    }
  }
  .bt-custon-product-remove{
    background-color: #fd5621!important;
    border-color: #fd5621!important; 
    color:#fff!important
  }

</style>
