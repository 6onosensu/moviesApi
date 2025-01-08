<template>
    <div>
      <h1>Add a New Movie</h1>
      <AddMovie
        :name="movie.name"
        :description="movie.description"
        :year="movie.year"
        :genres="movie.genres"
        :directors="movie.directors"
        :actors="movie.actors"
        @submit="submitMovie"
      />
    </div>
  </template>
  
  <script>
  import AddMovie from '../components/AddMovie.js';
  
  export default {
    name: 'AddMovie',
    components: {
      AddMovie,
    },
    data() {
      return {
        movie: {
          name: '',
          description: '',
          year: '',
          genres: '',
          directors: '',
          actors: '',
        },
      };
    },
    methods: {
      async submitMovie() {
        try {
          const response = await fetch('http://localhost:8080/movies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...this.movie,
              genres: this.movie.genres.split(',').map((g) => g.trim()),
              directors: this.movie.directors.split(',').map((d) => d.trim()),
              actors: this.movie.actors.split(',').map((a) => a.trim()),
            }),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log('Movie added successfully:', data);
          this.$router.push('/'); // Redirect to the movie list page
        } catch (error) {
          console.error('Error adding movie:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  .btn {
    margin-top: 10px;
    padding: 10px 20px;
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
  