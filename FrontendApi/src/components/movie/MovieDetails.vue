<template>
  <div class="movie-details">
      <h1>{{ movie.name }}</h1>
      <p><strong>Description:</strong> {{ movie.description }}</p>
      <p><strong>Year:</strong> {{ movie.year }}</p>

      <h3>Genres:</h3>
      <ul>
          <li><div v-for="genre in movie.genres" :key="genre.genreID" class="items-in-row">{{ genre.title }}, </div></li>
      </ul>

      <h3>Actors:</h3>
      <ul>
          <li>
            <div v-for="actor in movie.actors" :key="actor.actorID" class="items-in-row">{{ actor.name }}, </div>
          </li>
      </ul>

      <h3>Directors:</h3>
      <ul>
          <li>
            <div v-for="director in movie.directors" :key="director.directorID" class="items-in-row">{{ director.name }}, </div>
          </li>
      </ul>

      <router-link to="/movies">Back to Movies</router-link>
  </div>
</template>

  
  <script>
  import MovieDetailsTable from './MovieDetails.js'; 
  
  export default {
    name: 'MovieDetails',
    components: {
      MovieDetailsTable,
    },
    data() {
      return {
        movie: {
          genres: [],
          actors: [],
          directors: [],
        },
        movieLoaded: false, 
      };
    },
    methods: {
      async fetchMovie() {
        const movieID = this.$route.params.movieID;
        try {
          const response = await fetch(`http://localhost:8080/movies/${movieID}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Fetched movie:", data);
          this.movie = data;
          this.movieLoaded = true;
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      },
    },
    created() {
      this.fetchMovie();
    },
  };
  </script>
  
<style scoped>
    .movie-details {
    font-family: Arial, sans-serif;
    margin: 20px;
    }

    .movie-details h1 {
    font-size: 2em;
    margin-bottom: 10px;
    }

    .movie-details h3 {
    margin-top: 20px;
    }

    .movie-details ul {
    list-style-type: none;
    padding: 0;
    }

    .movie-details li {
    margin: 5px 0;
    }

    .movie-details a {
    display: inline-block;
    margin-top: 20px;
    text-decoration: none;
    color: blue;
    }

    .movie-details a:hover {
    text-decoration: underline;
    }

    .items-in-row {
      display: inline;
    }
</style>