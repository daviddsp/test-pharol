<template lang="html">
  <div class="">
    <v-container ><!-- fluid grid-list-md -->
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 class="category_history">
          <p>
            <router-link :to="{ path: '/' }">Inicio</router-link> >
            <a :href="`/category/${$route.params.subCategory}/`">{{ MaysPrimera(slugToString($route.params.subCategory).toLowerCase()) }}</a> >
            <a :href="`/category/${$route.params.subCategory}/${$route.params.subCategory2}`">{{ MaysPrimera(slugToString($route.params.subCategory2).toLowerCase()) }}</a> >
            {{ MaysPrimera(slugToString($route.params.id).toLowerCase()) }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
    <section class="container_category">
      <v-container ><!-- fluid grid-list-md -->
        <v-layout row>
          <ais-index :search-store="searchStore">
            <v-layout row wrap>
              <v-flex xs12 sm12 md3 class="pr25 pb25 pr9 xdisnone">
                <h1 class="category_title_1">Filtros:</h1>
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
                          <v-list-tile-title class="category_title"><i class="material-icons">colorize</i> Laboratorios</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile class="content_items_ba">
                        <v-list-tile-content>
                          <ais-refinement-list
                            :limit="-1"
                            attribute-name="laboratory" :classNames="{
                            'ais-refinement-list__count': 'badge',
                            'ais-refinement-list__item': 'checkbox'
                            }">

                          </ais-refinement-list>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list-group>
                  </v-list>
                </v-card>
              </v-flex>
              <v-flex xs12 sm12 md9>
                <v-layout row wrap>
                  <ais-results class="wor">
                    <v-flex xs12 sm4 md4 slot-scope="{ result }">
                      <product-component :item="result"></product-component>
                    </v-flex>
                  </ais-results>
                  <v-flex xs12 sm12 md12>
                    <br><br>
                    <ais-stats>
                      <template slot-scope="{ totalResults, processingTime, query }">
                        <ais-pagination :padding="5"></ais-pagination>
                        <br>
                        <p class="text_result">Productos encontrados <b class="c-3949ab">{{ totalResults }}</b> en <b><small>{{ processingTime }}ms</small></b></p>
                      </template>
                    </ais-stats>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>

            <v-layout row class="hidden-sm-and-up">
              <v-flex xs12 sm9 md9>
                <v-layout row wrap>
                  <ais-results>
                    <v-flex xs12 sm4 md3 slot-scope="{ result }">
                      <product-component :item="result" />
                    </v-flex>
                  </ais-results>
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
import axios from 'axios';
import Product from '~/components/Product.vue'

const searchStore = createFromAlgoliaCredentials(
  'JGOZPIKO21',
  '3ebf0c63a02ea36c55c8e63198b94788'
);
searchStore.indexName = 'products';
searchStore.highlightPreTag = '<mark>';
searchStore.highlightPostTag = '</mark>';

export default {
  async asyncData (context) {

    searchStore.start();
    searchStore.refresh();
    searchStore.query = context.params.id;
    await searchStore.waitUntilInSync();

    const serializedSearchStore = searchStore.serialize();
    console.log(context.params);

    return axios.get(`${context.env.apiTag}/categoriesLevelTwo/slug/${context.params.id}`)
    .then((response) => {
      return {
        apiPurchase: context.env.apiPurchase,
        apiTag: context.env.apiTag,
        metaContent: response.data[0].meta_description,
        metaKeywords: response.data[0].meta_keywords,
        metaName: response.data[0].meta_title,
        serializedSearchStore: serializedSearchStore,
      }
    })
  },
  components: {
    'product-component': Product
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
      searchStore: null,
      allProducts: [],
      subCategories:[],
      metaContent: null,
      metaName: null,
      metaKeywords: null
    }
  },
  mounted: function() {
    this.getProducts(this.$route.params.id)
  },
  created() {
    this.searchStore = createFromSerialized(this.serializedSearchStore);
  },
  methods:{
    getProducts(item){
      let self = this;
      axios({
        method:'GET',
        url:`${this.apiPurchase}/products/find`,
        params: {
          q: this.slugToString(item)
        }
      })
      .then(function(response) {
        self.allProducts = response.data;
      });
    },
    stringToSlug(item){
      return item.toString().toLowerCase().replace(/ /g, '-')
    },
    slugToString(item){
      return item.toLowerCase().replace(/-/g, ' ')
    },
    addItemCart(item) {
      this.$store.commit('addItemCart', item)
    },
    MaysPrimera(string){
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}
</script>

<style lang="css">
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
.container_category{
  background: #fbfbfb;
}
.category_title_2{
  font-weight: 500;
  margin-bottom: 15px;
  margin-left: 14px;
  color: #3f51b5;
}
.category_title_1{
  font-weight: 400;
  font-size: 1.17em;
}


/*pagination*/
.ais-pagination{
  padding-left: 0;
  list-style-type: none;
  text-align: left;
}
.ais-pagination li {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  display: inline-flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  font-size: 14px;
  height: 34px;
  width: 34px;
  border-radius: 4px;
  background: transparent;
  margin: 0.3rem;
  text-decoration: none;
  transition: 0.3s cubic-bezier(0, 0, 0.2, 1);
}
.ais-pagination__item {
  position: relative;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  vertical-align: middle;
  z-index: 1;
  -webkit-transition: .3s ease-out;
  transition: .3s ease-out;
}
.ais-pagination li a {
  color: #444;
  display: inline-block;
  font-size: 12px;
  padding: 0 10px;
  line-height: 30px;
}
  .ais-pagination li.ais-pagination__item--active a {
    color: #fff;
}
.ais-pagination li.ais-pagination__item--active{
    background: #3949ab;
}
.ais-pagination__item--first a{
  color:#ddd;
}
</style>
