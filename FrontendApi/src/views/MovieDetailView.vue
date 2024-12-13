<template>
    <div>
      <MovieDetail :id="$route.params.id" />
    </div>
  </template>
  
  <script>
  import MovieDetail from '../components/MovieDetail.vue';
  
  export default {
    name: 'MovieDetailView',
    components: { MovieDetail },
  };
  </script>
  