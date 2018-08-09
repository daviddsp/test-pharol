<template lang="html">
  <div class="">
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      v-if="presentation == false"
      :options="dropzoneOptions"
      v-on:vdropzone-success="successEvent"
      v-on:vdropzone-sending="sendingEvent"
    ></vue-dropzone>

    <v-flex xs12 sm12 md12 v-show="item.prescription_type == 'WP'">
      <v-checkbox
        label="Presentaré la receta al momento de la entrega del pedido"
        v-model="presentation"
        :change="changePresentation(item.objectID, presentation)"
      ></v-checkbox>
    </v-flex>
  </div>
</template>

<script>
import axios from 'axios';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'

export default {
  props:['item'],
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 10,
          addRemoveLinks: true,
          dictDefaultMessage: "<i class='material-icons' style='margin-top:5px; font-size:50px;color: #3949ab5c;'>backup</i> <p>Suelta los archivos <b> aquí </b> </p> o <br> <b> Haz click aqui </b> para subirlos. <br />"
      },
      presentation: (this.item.physical_presentation) ? this.item.physical_presentation: false,
    }
  },
  mounted(){


  },
  methods: {
    changePresentation(item, presentation){
      this.$store.commit('addFieldCart', { field: 'physical_presentation', value: presentation, objectID: item})
    },
    successEvent(file, response){
      // console.warn('successEvent');
      // console.log(file);
    },
    sendingEvent (file, xhr, formData) {
      let id = this.item.objectID;

      var data = new FormData();
      data.append('purchase', localStorage.getItem('orderId'));
      data.append('recipes', file);
      // data.append('sku', this.item.sku);

      let self = this;
      axios({
        method:'POST',
        url:`https://products.pharol.cl/recipe/upload`,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: data
      })
      .then(function(response) {
        console.warn('results');
        console.log(response);

        self.$store.commit({
          type: 'addImage',
          recipe: response.data.url,
          objectID: self.item.objectID,
        })

        self.$notify({
          title: 'Receta agregada',
          message: 'Se ha agregado su receta con éxito.',
          type: 'info',
          horizontalAlign: 'right',
          showClose: false
        })
      });
    },
  }
}

</script>

<style>


</style>
