<template>
  <v-layout row>
    <v-flex xs12 sm12 md12>
      <v-carousel class="carousel_master_p hidden-xs-only">
        <carousel4-component :items=" { products: items.products } "/>
      </v-carousel>


      <v-carousel class="carousel_master_p hidden-sm-and-up">
        <carousel1-component :items=" { products: items.products } "/>
      </v-carousel>
    </v-flex>
  </v-layout>
</template>

<script>
import Carousel1 from '~/components/ProductCarousel/Carousel1.vue'
import Carousel4 from '~/components/ProductCarousel/Carousel4.vue'

export default {
  props:['items'],
  components: {
    'carousel1-component': Carousel1,
    'carousel4-component': Carousel4,
  },
}
</script>

<style lang="stylus" scoped>
  /*
  * Carousel
  */
  .carousel__controls {
    background: none;
  }
  .carousel {
    min-height: 360px;
  }
  .carousel_master_p{
    min-height: 360px;
    box-shadow: none;
  }
  .carousel__right {
    right: 5px;
    border-radius: 50%;
    background: #c1bfbf;
  }
  .carousel__left {
    left: 5px;
    border-radius: 50%;
    background: #c1bfbf;
  }
  .carousel_master_p .carousel__controls{
    display: none!important;
  }
  .title_slider{
    color: #268ae0;
    font-weight: 700;
  }
  .title_slider_more{
    color: #fd5621;
    font-size: 13px;
    font-weight: 200;
  }

</style>
