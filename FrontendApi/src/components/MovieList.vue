<template>
  <div>
    <h1>Список фильмов</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.movieID">
        <router-link :to="`/movies/${movie.movieID}`">{{ movie.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MovieList',
  data() {
    return {
      movies: [],
    };
  },
  async created() {
    const response = await axios.get('/api/movies'); // Используйте ваш URL API
    this.movies = response.data;
  },
};
</script>
