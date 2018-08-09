<template>
  <div>

    <v-carousel-item>
      <v-container>
        <v-layout>
          <v-flex xs12 sm3 md3 class="p15" v-for="(item, index) in items.laboratories.slice(0,4)" :key="index">
            <v-card :to="{ path: `/laboratorio/${stringToSlug(item.name)}` }">
              <img class="resposive_img" :src="item.image_logo" width="100%" height="150px">
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-carousel-item>

    <v-carousel-item>
      <v-container>
        <v-layout>
          <v-flex xs12 sm3 md3 class="p15" v-for="(item, index) in items.laboratories.slice(4,8)" :key="index">
            <v-card :to="{ path: `/laboratorio/${stringToSlug(item.name)}` }">
              <img class="resposive_img" :src="item.image_logo" width="100%" height="150px">
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-carousel-item>

  </div>
  
</template>

<script>

export default {
  props:['items'],
  components: {

  },
  mounted(){

  },
  data: function () {
    return {

    }
  },
  methods: {
    stringToSlug(item){
      return item.toString().toLowerCase().replace(/ /g, '-')
    },
  }

}
</script>

<style lang="stylus" scoped>
  /*
  * Patología
  */
  .pat_box{
    background: #f4f4f4;
    color: #268ae0;
    text-align: right;
    margin-top: -5px;
    font-weight: 700;
    font-size: 15px;
  }
  .pat_box i{
    color: #fd5621!important;
    font-size: 40px;
    padding: 3px;
    background: #e4e4e4;
    margin-left: 5px;
  }
  .box_marca{
    padding: 20px;
  }
  .p15{
    padding: 16px;
  }
</style>
