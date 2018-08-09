<template>

<div>

  <!--<v-btn icon dark class="clear-search-movil hidden-md-and-up" @click.native="clearSearchNavbar" v-show="vModelLike != '' ">
    <v-icon style="color: #9a9a9a;">close</v-icon>
  </v-btn>-->
  <autocomplete
    id="autocomplete"
    class="input-sesarch"
    name="name"
    placeholder="¿Qué estás buscando?"
    url="https://products.pharol.cl/products/find"
    param="q"
    limit="5"
    anchor="name"
    label="name"
    :onInput="getModel"
    :onShouldRenderChild="renderChild"
    :onSelect="onSelect"
    :onHide="onHide"
    ref="refValue">
  </autocomplete>

</div>

</template>


<script>

  import Autocomplete from 'vue2-autocomplete-js';

  export default {

    components: { Autocomplete },
    data(){
      return {
        model: '',
        vModelLike: "",
      }
    },
    methods: {
      onHide(e){
        console.log('onHide');
        this.$refs.refValue.setValue('')
      },
      getModel(obj){
        //console.log(obj);
        this.vModelLike = obj;
      },
      renderChild(data) {
        return `
          <a href="">
            <div style="display: flex;" class="container_search">
    					<div class="img_search">
    						<img  src="https://pharol.s3.amazonaws.com/media/${data.image}" width="100%">
    					</div>
    					<div class="box_text_search">
    						<h3 class="text_search_1">${data.name}</h3>
    		        <h3 class="text_search_2">${data.laboratory} <span class="price_search">$ ${data.price}</span></h3>
    					</div>
    	      </div>
          </a>
        `
      },
      onSelect(data){
        this.$router.push({ path: `/products/${this.stringToSlug(data.name)}` })
      },
      stringToSlug(item){
        return item.toString().toLowerCase()
                              .replace(/%/g, '') // eliminando %
                              .replace(/ /g, '-') // eliminando espacios
                              .replace(/\//g, '-'); // eliminando slash "/"
      },
      clearSearchNavbar: function (event) {
        this.vModelLike = "";
        this.$refs.refValue.setValue('')
      },
    }
  };

</script>

<style>

  @import 'vue2-autocomplete-js/dist/style/vue2-autocomplete.css';

  .input-sesarch input {
    height: 40px;
    width: 90%;
    line-height: 40px;
    border: solid 1px #ff5722;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border-radius: 2px;
    padding: 0px 10px;
    background: #f9f9f9;
  }
  .transition, .autocomplete, .showAll-transition, .autocomplete ul, .autocomplete ul li a{
  	transition:all 0.3s ease-out;
  	-moz-transition:all 0.3s ease-out;
  	-webkit-transition:all 0.3s ease-out;
  	-o-transition:all 0.3s ease-out;
  }

  .autocomplete ul{
  	font-family: 'Roboto';
  	position: absolute;
  	list-style: none;
  	background: #ffffff;
  	padding: 0;
  	margin: 10px 0;
  	display: inline-block;
  	min-width: 15%;
    z-index: 9999 !important;
    overflow: auto;
    height: 300px;
    left: 25%;
    border: 1.4px solid #f0f0f0;
    border-radius: 2px;
    box-shadow: 0px 4px 16px -5px rgba(125,125,125,1);
  }

  .autocomplete ul li {
    border-bottom: 1px solid #f5f5f5;
  }

  .autocomplete ul:before{
  	content: "";
  	display: block;
  	position: absolute;
  	height: 0;
  	width: 0;
  	border: 10px solid transparent;
  	border-bottom: 10px solid #68514e;
  	left: 46%;
  	top: -20px
  }

  .autocomplete ul li a{
  	text-decoration: none;
  	display: block;
  	background: #ffffff;
  	color: #fff;
  	padding: 5px;
  	padding-left: 10px;
    opacity: 1;
  }

  .autocomplete ul::-webkit-scrollbar {
        width: 5px;
    }

  .autocomplete ul::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  .autocomplete ul::-webkit-scrollbar-thumb {
    background-color: #3949ab;
    border-radius: 10px;
    outline: 1px solid slategrey;
  }

  .autocomplete ul li a:hover, .autocomplete ul li.focus-list a{
  	color: #FFFFFF;
  	background: #f7f7f7;
  }

  .showAll-transition{
  	opacity: 1;
  	height: 50px;
  	overflow: hidden;
  }

  .showAll-enter{
  	opacity: 0.3;
  	height: 0;
  }

  .showAll-leave{
  	display: none;
  }
  .container_search {
    height: 65px;
  }
  .price_search {
    font-size: 14px !important;
    font-weight: bold;
    float: right;
    color: #000000 !important;
  }

  a:link { text-decoration: none; }
  .search_pharol{
  	list-style: none;
  }
  .box_text_search{
  	width: 100%;
    text-align: left;
  }
  .img_search{
  	width: 100px;
    margin-top: 7px;
  }

  .img_search img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-left: 10px;
  }
  .text_search_1{
  	font-size: 15px;
  	font-weight: 300;
  	color: #757575;
  	overflow: hidden;
  	text-overflow: ellipsis;
  	-webkit-line-clamp: 2;
  	display: -webkit-box;
  	-webkit-box-orient: vertical;
  	text-transform: none;
  	margin-top: 5px;
    padding-top: 7px;
  }
  .text_search_2{
  	font-size: 10px;
  	color: rgba(86, 86, 86, 0.87);
  	margin-top: 0px;
  }
   .autocomplete .autocomplete-list{
    margin-top: 0px!important;
   }
   .autocomplete ul li a span, .autocomplete ul li a .autocomplete-anchor-label {
        display: block;
        margin-top: 0px;
        color: grey!important;
        font-size: 14px!important;
    }
    .clear-search-movil{
      position: absolute;right: 2px;
    }
    .clear-search-movil i{
      font-size:15px;
    }

   @media only screen and (max-width: 550px) {
      .input-sesarch input {
        height: 40px;
        width: 120%;
        line-height: 40px;
        border: solid 0px #ff5722;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        border-radius: 2px;
        padding: 0px 10px;
        background: #ffff;
        margin-top: 3px;
        font-size: 15px;
        color: #9a9a9a;
      }
      .input-sesarch input:focus, .input-sesarch input:focus-within, .input-sesarch input:active, .input-sesarch input:hover, .input-sesarch input:visited, .autocomplete-input:focus, #input__id-optional:focus {
        border: solid 0px transparent;
        color: #495057;
        background-color: #fff;
        border-color: #fff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,0);
      }
      .autocomplete ul {
       font-family: sans-serif;
       position: absolute;
       list-style: none;
       background: #ffffff;
       padding: 0px 0;
       margin: 0;
       display: inline-block;
       min-width: 15%;
       z-index: 9999 !important;
       overflow: auto;
       height: 400px;
       left: 0px;
       right: 0px;
       margin-top: 57px;
       border: 1px solid #ddd;
       border-bottom-right-radius: 3px;
       border-bottom-left-radius: 3px;
       box-shadow: none;
      }
      .img_search {
        width: 100px;
        margin-top: 7px;
        margin-left: -15px;
      }
   }
</style>
