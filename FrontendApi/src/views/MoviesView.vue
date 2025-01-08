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

<template>
    <main>
        <router-link to="/add-movie" class="btn btn-primary">Add Movie</router-link>
        <div v-if="allMovies.length === 0">Loading movies...</div>
        <MoviesTable v-else :items="allMovies" />
    </main>
</template>

<style scoped></style>