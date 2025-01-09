<template>
  <div class="container">
    <router-link to="/AddMovie" class="btn">Add Movie</router-link>
    <MoviesTable items="allMovies" />
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
    this.allMovies = await (await fetch('http://localhost:8080/movies')).json();
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