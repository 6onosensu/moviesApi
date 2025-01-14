<template>
  <div class="container">
    <router-link to="/add-movie" class="btn">Add Movie</router-link>
    <MoviesTable :items="allMovies" @movieDeleted="refreshMovies" />
  </div>
</template>

<script>
import MoviesTable from '../components/MoviesTable.vue';

export default {
  name: "MoviesView",
  components: { MoviesTable },
  data() {
    return {
      allMovies: [],
    };
  },
  async created() {
    await this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await fetch('http://localhost:8080/movies');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.allMovies = await response.json();
        console.log('Movies fetched:', this.allMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    refreshMovies(deletedMovieID) {
      this.allMovies = this.allMovies.filter(movie => movie.movieID !== deletedMovieID);
    },
  },
};
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto; 
    padding: 20px;
}

.btn {
  margin-top: 20px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>