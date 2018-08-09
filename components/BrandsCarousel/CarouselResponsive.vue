<template>
  <v-layout row>
    <v-flex xs12 sm12 md12>
      <v-carousel class="carousel_master_p hidden-xs-only">
        <carousel4-component :items=" { laboratories: items.laboratories } "/>
      </v-carousel>

      <v-carousel class="carousel_master_p hidden-sm-and-up">
        <carousel1-component :items=" { laboratories: items.laboratories } " />
      </v-carousel>
    </v-flex>
  </v-layout>
</template>

<script>
import Carousel1 from '~/components/BrandsCarousel/Carousel1.vue'
import Carousel4 from '~/components/BrandsCarousel/Carousel4.vue'

export default {
  props:['items'],
  components: {
    'carousel1-component': Carousel1,
    'carousel4-component': Carousel4,
  },
}
</script>

<style lang="stylus" scoped>

</style>
