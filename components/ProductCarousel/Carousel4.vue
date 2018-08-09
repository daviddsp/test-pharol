<template>
  <div>
    <v-carousel-item>
      <v-container>
        <v-layout>
          <v-flex sm3 md3 class="p10" v-for="(item, index) in items.products.slice(0,4)" :key="index" >
            <product-component :item="item"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-carousel-item>

    <v-carousel-item v-if="items.products.length > 4">
      <v-container>
        <v-layout>
          <v-flex sm3 md3 class="p10" v-for="(item, index) in items.products.slice(4,8)" :key="index" >
            <product-component :item="item"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-carousel-item>
  </div>
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
    box-shadow: none;
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
