<template>
  <div>
    <h1>{{ movie.name }}</h1>
    <p><strong>Год:</strong> {{ movie.year }}</p>
    <p><strong>Описание:</strong> {{ movie.description }}</p>
    <p><strong>Жанры:</strong> {{ genres.join(', ') }}</p>
    <p><strong>Режиссеры:</strong> {{ directors.join(', ') }}</p>
    <p><strong>Актеры:</strong> {{ actors.join(', ') }}</p>
    <router-link to="/">Назад</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MovieDetail',
  props: ['id'],
  data() {
    return {
      movie: null,
      genres: [],
      directors: [],
      actors: [],
    };
  },
  async created() {
    const response = await axios.get(`/api/movies/${this.id}`);
    this.movie = response.data;

    const genreResponse = await axios.get('/api/genres');
    this.genres = this.movie.genres.map(
      (id) => genreResponse.data.find((g) => g.genreID === id)?.title
    );

    const directorResponse = await axios.get('/api/directors');
    this.directors = this.movie.directors.map(
      (id) => directorResponse.data.find((d) => d.directorID === id)?.name
    );

    const actorResponse = await axios.get('/api/actors');
    this.actors = this.movie.actors.map(
      (id) => actorResponse.data.find((a) => a.actorID === id)?.name
    );
  },
};
</script>

<style scoped>
/* Стили для компонента MovieDetail */
.movie-detail-container {
  display: flex;
  gap: 30px;
  margin-top: 30px;
}

.movie-detail-image img {
  max-width: 400px;
  border-radius: 10px;
}

.movie-detail-content {
  max-width: 600px;
}

.movie-detail-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.movie-detail-description {
  font-size: 16px;
  color: #555;
}

.movie-detail-buttons {
  margin-top: 20px;
}

button {
  background-color: #333;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}
</style>
