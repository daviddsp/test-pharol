<template>

  <div class=""><!-- v-show="id > 0"-->

    <v-container ><!-- fluid grid-list-md -->
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 class="category-history">
          <p><router-link :to="{ path: '/' }">Inicio</router-link> > Laborarios > {{  MaysPrimera(slugToString($route.params.id.toLowerCase())) }}</p>
        </v-flex>
        <div class="pag-web">
          Sitio Web
          <a :href="web" target="_blank">
            <v-btn fab dark small color="primary">
                <v-icon dark>public</v-icon>
            </v-btn>
          </a>
        </div>
      </v-layout>
    </v-container>

    <section class="laboratories-box-1" v-show="id > 0">
      <v-container ><!-- fluid grid-list-md -->
        <v-layout row wrap>
          <v-flex xs12 md4 class="laboratories-img-log center">
            <img :src="imageLogo" class="laboratories-logo-img" alt="Logo Laboratorios">
          </v-flex>
          <v-flex xs12 md8>
            <img :src="imageHeader" class="laboratories-banner-img" alt="Banner Laboratorios">
          </v-flex>
        </v-layout>
        <br>
        <v-layout row wrap>
          <v-flex xs12 md3 class="p20">
            <h1 class="laboratories-text-1">{{ slogans }} </h1>
          </v-flex>
          <v-flex xs12 md9 class="p20">
            <h2 class="laboratories-text-2">
              {{ description }}
            </h2>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <!--<v-layout row class="ptr15tabs">
      <v-flex xs12 sm12 md12>
        <v-tabs class="detail_container_tabs"
          v-model="active"
          dark
          slider-color="blue_app"
          centered
          show-arrows>
          <v-tab class="detail_title_tabs_2"
            ripple
            v-for="(item, index) in allCategories" :key="index"
            @click="changeCategories(item)">
            <div class="circle-tabs-index">
              <img :src="item.image" width="36px" class="tabs-color-no-active">
            </div>
            <h3 class="title_tabs2 hidden-sm-and-down">{{ item.name }}</h3>
          </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>-->

    <section class="laboratories-box-3" v-show="id > 0">
      <v-container ><!-- fluid grid-list-md -->
        <v-layout row>
          <ais-index :search-store="algolia" class="w100">
            <v-layout row wrap>
              <v-flex xs12 sm12 md3 class="pr25 pb25 pr9 xdisnone">
                <h3 class="laboratories-title-1">Filtros: </h3>
                <br>
                <v-card>
                  <v-list>
                    <v-list-group>
                      <v-list-tile slot="activator">
                        <v-list-tile-content>
                          <v-list-tile-title class="category_title"><i class="material-icons">search</i> Buscador</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <ais-search-box
                            placeholder="Búsqueda avanzada"
                          ></ais-search-box>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-group>
                  </v-list>
                </v-card>
                <br>
                <v-card>
                  <v-list>
                    <v-list-group>
                      <v-list-tile slot="activator">
                        <v-list-tile-content>
                          <v-list-tile-title class="category_title"><i class="material-icons">attach_money</i> Precio</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <ais-price-range
                            attribute-name="price"
                            currency="$"
                            from-placeholder="Desde"
                            to-placeholder="Hasta"
                            :classNames="{
                              'ais-price-range__input': 'form-control'
                            }">
                          </ais-price-range>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-group>
                  </v-list>
                </v-card>
                <br>
                <v-card>
                  <v-list>
                    <v-list-group>
                      <v-list-tile slot="activator">
                        <v-list-tile-content>
                          <v-list-tile-title class="category_title"><i class="material-icons">list</i>Categorias</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <ais-refinement-list attribute-name="master_category"></ais-refinement-list>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-group>
                  </v-list>
                </v-card>
                <br>
                <v-card>
                  <v-list>
                    <v-list-group>
                      <v-list-tile slot="activator">
                        <v-list-tile-content>
                          <v-list-tile-title class="category_title"><i class="material-icons">reorder</i> Sub Categorias</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>
                          <ais-refinement-list attribute-name="subcategory"></ais-refinement-list>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-group>
                  </v-list>
                </v-card>
                <br>
                <div class="hidden-sm-and-down pt20r">
                  <img :src="imageLogoTwo" class="laboratories-logo-img" alt="Logo Laboratories">
                </div>
              </v-flex>
              <v-flex xs12 sm12 md9>
                <v-layout row wrap>
                  <div class="pages-selec">
                    <span>Seleccionar:</span> <ais-results-per-page-selector :options="[9, 18, 50, 100]"></ais-results-per-page-selector>
                  </div>
                  <ais-results class="wor">
                    <v-flex xs12 sm4 md4 slot-scope="{ result }">
                      <product-component :item="result"></product-component>
                    </v-flex>
                  </ais-results>
                  <ais-stats class="pt50">
                    <template slot-scope="{ totalResults, processingTime, query }">
                      <ais-pagination :padding="5"></ais-pagination>
                      <br>
                      <p class="text_result">Productos encontrados <b class="c-3949ab">{{ totalResults }}</b> en <b><small>{{ processingTime }}ms</small></b></p>
                    </template>
                  </ais-stats>
                </v-layout>
              </v-flex>
            </v-layout>
          </ais-index>
        </v-layout>
      </v-container>
    </section>

  </div>

</template>

<script>
  import { createFromAlgoliaCredentials, createFromSerialized } from 'vue-instantsearch';
  import Product from '~/components/Product.vue'
  import axios from 'axios';

  const algolia = createFromAlgoliaCredentials(
    'JGOZPIKO21',
    '3ebf0c63a02ea36c55c8e63198b94788'
  );

  algolia.indexName = 'products';
  algolia.resultsPerPage = 9;
  // algolia.queryParameters = { filters:  `laboratory: chile` };

  export default {
    async asyncData (context) {
      algolia.start();
      algolia.refresh();
      algolia.queryParameters = { filters:  `laboratory: "${context.params.id.toLowerCase().replace(/-/g, ' ')}"` };
      // algolia.queryParameters = { filters:  `laboratory: "Farmo Dental"` };
      await algolia.waitUntilInSync();
      const serializedSearchStore = algolia.serialize();

      return {
        serializedSearchStore:  serializedSearchStore,
        apiUser: context.env.apiUser,
        apiPurchase: context.env.apiPurchase,
        apiTag: context.env.apiTag,
      }
    },
    components: {
      'product-component': Product
    },
    data(){
      return  {
        active: 1,
        algolia: null,
        allCategories: null,
        productByCatgories: null,
        laboratory: null,
        id: null,
        imageHeader: null,
        imageLogo: null,
        imageLogoTwo: null,
        keywords: null,
        name: null,
        slogans: null,
        slug: null,
        web: null,
        description: null,
      }
    },
    created() {
      this.algolia = createFromSerialized(this.serializedSearchStore);
    },

    head () {
    return {
      title: `${this.slugToString(this.$route.params.id).replace(/\b\w/g, l => l.toUpperCase())} - Farmacia Online Pharol`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: this.description + this.slogans }
      ]
    }
  },
    mounted() {
      this.getLaboratory(this.$route.params.id)
      this.getCategories()
    },
    methods:{
      slugToString(item){
        return item.toLowerCase().replace(/-/g, ' ')
      },
      MaysPrimera(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      getLaboratory(item){
        var self = this;

        console.log(item)
        axios({
          method: 'GET',
          url:`${this.apiPurchase}/laboratorySlug/`,
          headers: {
            slug: item
          }
        })
        .then(function(response) {
          self.laboratory = response.data;
          self.id = self.laboratory[0].id;
          self.imageHeader = self.laboratory[0].image_header;
          self.imageLogo = self.laboratory[0].image_logo;
          self.imageLogoTwo = self.laboratory[0].image_logo_two;
          self.keywords = self.laboratory[0].keywords;
          self.name = self.laboratory[0].name;
          self.description = self.laboratory[0].description;
          self.slogans = self.laboratory[0].slogans;
          self.slug = self.laboratory[0].slug;
          self.web = self.laboratory[0].web;
          self.description = self.laboratory[0].description
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      getCategories(){
        let self = this;
        axios({
          method:'GET',
          url:`${this.apiTag}/categories`,
        })
        .then(function(response) {
          self.allCategories = response.data.data;
        });
      },
      changeCategories(item){
        let self = this;
        axios({
          method:'GET',
          url:`${this.apiPurchase}/products/find`,
          params: {
            q: item.name
          }
        })
        .then(function(response) {
          self.productByCatgories = response.data;
        });
      },

    },
    computed: {

    }
  }
</script>

<style lang="stylus" scoped>
.c-3949ab{
  color:#3949ab;
}
.wor{
  -ms-flex-wrap:
  wrap;flex-wrap: wrap;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -ms-flex-wrap: nowrap;
}
.w100{
  width: 100%;
}
.pt50{
  padding-top:50px;
}

.category-history p{
  margin-bottom: 0px;
  font-size: 14px;
}

.laboratories-box-1{
  background: #f5f5f5;
  padding: 50px 0;
}

.laboratories-box-3{
  background: #f5f5f5;
  padding-bottom: 50px;
}

.laboratories-img-log{
  background: #fff;
}

.laboratories-logo-img{
  max-width: 100%;
  width: 100%;
}

.laboratories-banner-img{
  width: 100%;
  height: 100%;
}

.laboratories-text-1{
  color:red;
  font-size: 18px;
}

.laboratories-text-2{
  color: #606060;
  font-size: 12px;
}

.p20{
  padding: 20px;
}
.pr25{
  padding-right: 25px;
}
.pb25{
  padding-bottom: 25px;
}

.laboratories-title-1{
  font-weight: 400;
}

.category_title{
  color: #9a9a9a;
}
.category_title i{
  margin-right: 10px;
  font-size: 16px;
}

.list {
    padding: 0;
}
.pag-web{
  position: absolute;
  right: 0;
  margin-right: 13px;
  margin-top: -16px;
}
.pages-selec span{
  font-size:12px;
  margin-right:5px;
  color: #777;
}
.pages-selec{
  text-align: right;
  width: 100%;
  padding-right: 10px;
  padding-bottom: 5px;
}

@media only screen and (max-width: 956px){
  .pr9{
    padding-right: 0px;
  }
}

@media only screen and (min-width: 768px){
  .pt20r{
    padding-top: 20px;
  }
}

@media only screen and (max-width: 550px){
  .pag-web{
    position: relative;
    margin-top: 10px;
  }
}


</style>
