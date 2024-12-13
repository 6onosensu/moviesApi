<template>
    <div>
      <h1>{{ isEdit ? 'Редактировать фильм' : 'Добавить фильм' }}</h1>
      <form @submit.prevent="submitForm">
        <label>
          Название:
          <input v-model="movie.name" required />
        </label>
        <label>
          Год:
          <input type="number" v-model="movie.year" required />
        </label>
        <label>
          Описание:
          <textarea v-model="movie.description" required></textarea>
        </label>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MovieForm',
    props: ['id'],
    data() {
      return {
        movie: { name: '', year: '', description: '', genres: [], directors: [], actors: [] },
        isEdit: !!this.id,
      };
    },
    async created() {
      if (this.isEdit) {
        const response = await axios.get(`/api/movies/${this.id}`);
        this.movie = response.data;
      }
    },
    async submitForm() {
      if (this.isEdit) {
        await axios.put(`/api/movies/${this.id}`, this.movie);
      } else {
        await axios.post('/api/movies', this.movie);
      }
      this.$router.push('/');
    },
  };
  </script>
  