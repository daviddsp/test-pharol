<template>
  <div class="">
    <section class="container_category">
      <ais-index :search-store="searchStore"  class="center xxdinone">
        <v-layout row wrap>
          <v-flex xs12 sm12 md3 class="pr25 pr9"><!-- hidden-sm-and-down  -->
            <ais-search-box
              placeholder="Búsqueda avanzada"
            ></ais-search-box>
          </v-flex>
        </v-layout>

      </ais-index>
      <v-container ><!-- fluid grid-list-md -->
        <v-layout row>
          <ais-index :search-store="searchStore">
            <v-layout row wrap>
              <v-flex xs12 sm12 md3 class="pr25 pb25 pr9 xdisnone"><!-- hidden-sm-and-down  -->
                <ais-search-box
                  placeholder="Búsqueda avanzada"
                ></ais-search-box>

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
import Product from '~/components/Product.vue'

const searchStore = createFromAlgoliaCredentials(
  'JGOZPIKO21',
  '3ebf0c63a02ea36c55c8e63198b94788'
);
searchStore.indexName = 'products';
searchStore.highlightPreTag = '<mark>';
searchStore.highlightPostTag = '</mark>';
searchStore.query = 'veterianaria';

export default {
  async asyncData() {
    searchStore.start();
    searchStore.refresh();
    await searchStore.waitUntilInSync();

    const serializedSearchStore = searchStore.serialize();

    return { serializedSearchStore }
  },

  components: {
    'product-component': Product
  },
  data(){
    return  {
      searchStore: null,
    }
  },
  mounted () {

  },
  created() {
    this.searchStore = createFromSerialized(this.serializedSearchStore);
  },
  watch: {

  },
  methods:{
    addItemCart(item) {
      this.$store.commit('addItemCart', item)
    },
    stringToSlug(item){
      return item.toString().toLowerCase().replace(/ /g, '-')
    }
  }
}

</script>

<style>
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
  .detail_title_tabsc{
    color: #212121!important;
    text-transform: none;
    padding: 10px;
  }
  .detail_title_tabsc i{
    color: #585858;
    padding-right: 5px;
  }
  .p20{
    padding: 20px!important;
  }
  .pb25 {
      padding-bottom: 25px;
  }
  .pr25 {
      padding-right: 25px;
  }
  .container_category{
    background: #fbfbfb;
  }
  .ais-stats {
    padding: 0px 15px;
  }
  .ais-price-range {
    margin: 0px 10px;
  }
  input.form-control.ais-price-range__input--to,
  input.form-control.ais-price-range__input--from {
    width: 37%;
    border: 1px solid #d4d4d4;
    border-radius: 4px;
    padding: 2px 5px;
  }
  .categoria_titulo {
    font-size: 14px;
    text-transform: uppercase;
    margin: 5px;
  }
  button.ais-search-box__submit,
  button.ais-clear {
    display: none;
  }
  input.ais-input {
    height: 35px;
    line-height: 35px;
    margin: 10px 10px;
    border: 1px solid #d4d4d4;
    padding: 0px 15px;
    border-radius: 4px;
    width: 95%;
  }
  .ais-index ,.ais-results {
     width: 100%;
  }
  button.ais-search-box__submit {
    margin: 5px 5px;
  }
  button.ais-clear.ais-clear--disabled {
    display: none;
  }

  input[type='checkbox'] {
    display: inline-block;
    width: 17px;
    height: 17px;
    margin: 0px 7px;
  }
  span.ais-refinement-list__value {
    font-size: 11px;
  }
  .ais-refinement-list span.badge {
    font-size: 12px;
    font-weight: bold;
    background: #f75828ba;
    padding: 1px 9px;
    border-radius: 11px;
    color: #fff;
    float: right;
    margin-left: 10px;
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
  .list__tile{
    height: auto;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  @media only screen and (max-width: 956px){
    .pr9{
      padding-right: 0px;
    }
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
  .text_result{
    font-size: 13px;
  }
  /*.tabs__item--active {
      background: transparent;
      border-top: 3px solid transparent;
      padding-top: 0px;
      color: #268ae0!important;
  }*/
  @media only screen and (min-width: 1264px){
    .container {
        max-width: 90%;
    }
  }

  .xxdinone{
    display: none;
  }
  .xdisnone{
    display: none;
  }
  @media (min-width: 768px){
    .xdisnone{
      display: block;
    }
  }
  @media (max-width: 768px){
    .xxdinone{
      display: block;
    }
  }

  .ais-tree-menu__count{
    font-size: 12px;
    font-weight: bold;
    background: rgba(247, 88, 40, 0.72941);
    padding: 1px 9px;
    border-radius: 11px;
    color: #fff;
    float: right;
    margin-left: 10px;
  }
  .ais-tree-menu__value{
    font-size: 13px;
    color: rgba(0, 0, 0, .87);
  }
  .ais-tree-menu__item--active .ais-tree-menu__value{
    color: #3f51b5!important;
    font-weight: 700;
  }
  .ais-tree-menu__item{
    list-style: none;
  }
</style>
