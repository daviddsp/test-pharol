<template lang="html">
  <div class="">
    <v-container class="center ptb100"><!-- fluid grid-list-md -->
      <div class="icon_thx">
        <i class="material-icons">done</i>
      </div>
      <br>
      <h1 class="text_thx_1">Mensaje de confirmación del token.</h1>
      <br>
      <div class="box_btn_thx">
        <!-- <v-btn class="btn_thx_2">Ver detalle</v-btn> -->
        <v-btn to="/auth" class="btn_thx_3">Volver</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.center{
  text-align: center;
}
.ptb100{
  padding: 100px 0;
}
.icon_thx{
  border-radius: 50px;
  border: 5px solid #3949ab;
  text-align: center;
  padding: 25px;
  width: 100px;
  margin: 0 auto;
  margin-top: 30px;
}
.icon_thx i{
  color: #ff5722;
  font-size: 35px;
}
.text_thx_1{
  color: #3949ab;
  font-size: 30px;
  font-weight: 100;
}
.btn_thx_3{
  text-transform: none;
  background-color: #ff5722!important;
  color: #fff!important;
}
</style>
