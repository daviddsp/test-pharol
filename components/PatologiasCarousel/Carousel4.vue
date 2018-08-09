<template>
  <div>
    <v-carousel-item>
      <v-container>
        <v-layout>
          <v-flex xs12 sm3 md3 class="p15" v-for="(item, index) in items.patologies.slice(0,4)" :key="index">
            <v-card>
              <img class="resposive_img" :src="item.image_web" width="100%" v-bind:alt="item.name">
              <div class="pat_box">
                {{ item.name}} <i class="icon material-icons">chevron_right</i>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-carousel-item>

    <v-carousel-item>
      <v-container>
        <v-layout>
          <v-flex xs12 sm3 md3 class="p15" v-for="(item, index) in items.patologies.slice(4,8)" :key="index">
            <v-card>
              <img class="resposive_img" :src="item.image_web" width="100%" v-bind:alt="item.name">
              <div class="pat_box">
                {{ item.name}} <i class="icon material-icons">chevron_right</i>
              </div>
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
  /*
  * Patología
  */
  .pat_box{
    background: #f4f4f4;
    color: #268ae0;
    text-align: right;
    margin-top: -6px;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
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
