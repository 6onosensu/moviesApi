
<template>
    <div v-if="movieLoaded" class="update-movie-form">
        <h1>Update the Movie</h1>
        <div class="form-group">
            <label for="name">Name:</label>
            <input v-model="movie.name" id="nameToUpdate" type="text"/>
        </div>
    
        <div class="form-group">
            <label for="description">Description:</label>
            <textarea v-model="movie.description" id="descriptionToUpdate"></textarea>
        </div>
    
        <div class="form-group">
            <label for="year">Year:</label>
            <input v-model="movie.year" id="yearToUpdate" type="number"/>
        </div>
    
        <div class="form-group">
            <label for="genres">Genres:</label>
            <select v-model="selectedGenre" id="genresToUpdate">
            <option v-for="genre in genres" :key="genre.genreID" :value="genre">
                {{ genre.title }}
            </option>
            </select>
            <button @click="addGenre">Add Genre</button>
            <ul>
            <li v-for="genre in movie.genres" :key="genre.genreID">
                {{ genre.title }}
            </li>
            </ul>
        </div>
    
        <div class="form-group">
            <label for="actors">Actors:</label>
            <input v-model="actorName" id="actorsToUpdate" type="text" placeholder="Enter actor name" />
            <button @click="addActor">Add Actor</button>
            <ul>
            <li v-for="actor in movie.actors" :key="actor.actorID">
                {{ actor.name }}
            </li>
            </ul>
        </div>
    
        <div class="form-group">
            <label for="directors">Directors:</label>
            <input v-model="directorName" id="directorsToUpdate" type="text" placeholder="Enter director name" />
            <button @click="addDirector">Add Director</button>
            <ul>
            <li v-for="director in movie.directors" :key="director.directorID">
                {{ director.name }}
            </li>
            </ul>
        </div>
    
        <button class="submitBtn" @click="submitMovie">Submit</button>
    </div>
    <div v-else>
      <p>Loading movie data...</p>
    </div>
  </template>
 
<script>
import MovieAPI from './MovieUpdate.js';

export default {
  name: "UpdateMovie",
  data() {
    return {
      movie: {
        name: "",
        description: "",
        year: null,
        genres: [],
        actors: [],
        directors: [],
      },
      genres: [],
      selectedGenre: null,
      actorName: "",
      directorName: "",
      movieLoaded: false,
    };
  },
  async created() {
    const movieID = this.$route.params.movieID;
    try {
      const [movieDetails, genres] = await Promise.all([
        MovieAPI.fetchMovieDetails(movieID),
        MovieAPI.fetchGenres(),
      ]);
      this.movie = {
        ...this.movie,
        ...movieDetails,
      };
      this.genres = genres;
      this.movieLoaded = true;
    } catch (error) {
      console.error("Error loading movie data:", error);
    }
  },
  methods: {
    addGenre() {
      if (this.selectedGenre && !this.movie.genres.includes(this.selectedGenre)) {
        this.movie.genres.push(this.selectedGenre);
      }
    },
    addActor() {
      if (this.actorName.trim()) {
        this.movie.actors.push({ name: this.actorName.trim() });
        this.actorName = "";
      }
    },
    addDirector() {
      if (this.directorName.trim()) {
        this.movie.directors.push({ name: this.directorName.trim() });
        this.directorName = "";
      }
    },
    async submitMovie() {
      const movieID = this.$route.params.movieID;
      try {
        const updatedMovie = await MovieAPI.updateMovie(movieID, this.movie);
        console.log("Movie UPDATED successfully:", updatedMovie);
        this.$router.push("/movies");
      } catch (error) {
        console.error("Error submitting movie:", error);
      }
    },
  },
};

</script>

  <style scoped>
  .update-movie-form {
    min-width: 500px;
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
  }
  
  input,
  textarea,
  select {
    display: block;
    width: 100%;
    margin-top: 5px;
    padding: 10px;
    font-size: 14px;
  }
  
  button {
    display: block;
    margin: 5px auto;
    text-decoration: underline;
    font-size: 14px;
    border: none;
    background: none;
    color: #007bff;
    cursor: pointer;
  }
  
  button:hover {
    color: #0056b3;
    text-decoration: none;
  }
  
  .submitBtn {
    margin-top: 40px;
    padding: 5px 10px;
    background-color: #007bff;
    text-decoration: none;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .submitBtn:hover {
    color: white;
    background-color: #0056b3;
    text-decoration: none;
  }
  
  ul {
    margin-top: 10px;
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
  }
  </style>
  