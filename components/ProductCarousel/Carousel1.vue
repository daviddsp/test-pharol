<template>
  <v-flex xs12 sm12 md12>
      <v-carousel-item v-for="(item, index) in items.products" :key="index">
        <v-container>
          <v-layout>
            <v-flex xs12 sm12 md12 class="p10">
              <product-component :item="item"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-carousel-item>
  </v-flex>
</template>

<script>
import Product from '~/components/Product.vue'

export default {
  props:['items'],
  components: {
    'product-component': Product
  },
  mounted(){

  },
  data: function () {
    return {

    }
  },
  methods: {

  }

}
</script>

<style lang="stylus" scoped>
  .carousel_master_p{
    height: auto;
  }
  .carousel_master_p .carousel__right {
      right: 5px;
      border-radius: 50%;
      background: #ddd;
  }
  .carousel_master_p .carousel__left {
      left: 5px;
      border-radius: 50%;
      background: #ddd;
  }
  .carousel_master_p .carousel__controls{
    display: none!important;
  }
</style>
