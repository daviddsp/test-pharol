<template>
  <div>
    <h1>Hellow _id vue <span>{{ $route.params.id }}</span></h1>
    <!-- <p>results: {{ $store.state.albums }}</p> -->
    <p>results: {{ results }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // middleware: 'search'
  asyncData ({ params }) {
    return axios.get(`https://itunes.apple.com/search?term=${params.id}&entity=album`)
    .then((res) => {
      return { results: res.data.results }
    })
  }
}
</script>

<style>
</style>
