<template>
  <div class="">
    <h1 class="title-labo">Laboratorios</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md4  class="p15" v-for="(item, index) in laboratories" :key="index">
          <v-card class="box_marca" :to="{ path: `/laboratorio/${stringToSlug(item.name)}` }">
            <img class="resposive_img" :src="item.image_logo" width="100%" height="150px">
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    asyncData (context) {
      return {
        apiUser: context.env.apiUser,
        apiPurchase: context.env.apiPurchase,
        apiTag: context.env.apiTag,
      }
    },
    data(){
      return  {
        laboratories: [],
      }
    },
    mounted () {
      this.getLaboratories()
    },
    created() {

    },
    methods: {
      getLaboratories(){
        var self = this;
        axios({
          method: 'GET',
          url:`${this.apiPurchase}/laboratories/`,
        })
        .then(function(response) {
          console.log(response.data);
          self.laboratories = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      stringToSlug(item){
        return item.toString().toLowerCase().replace(/ /g, '-')
      },
    }
  }

</script>


<style>
  .p15{
    padding: 15px;
  }
  .title-labo{
    color: #3f51b5;
    font-weight: 500;
    font-size: 20px;
    text-align: center;
    padding: 20px;

  }
</style>
