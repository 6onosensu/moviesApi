<script>
export default {
  name: "MoviesTable",
  props: {
    items: Array,
  },
  methods: {
    async deleteMovie(movieID) {
      const confirmation = confirm("Are you sure you want to delete this movie?");
      if (!confirmation) return;

      try {
        const response = await fetch(`http://localhost:8080/movies/${movieID}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Failed to delete movie. Status: ${response.status}`);
        }
        this.$emit("movieDeleted", movieID);
      } catch (error) {
        console.error("Error deleting movie:", error);
        alert("Failed to delete the movie. Please try again.");
      }
    },
  },
};
</script>

<template>
  <div class="movies-table-container">
    <table class="movies-table">
      <thead>
        <tr>
          <th>Movie Name</th>
          <th>Description</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" v-bind:key="item.movieID">
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.year }}</td>
          <td>
            <router-link :to="`/movies/${item.movieID}`" class="btn">
              Details
            </router-link>
            <router-link :to="`/movies/UpdateMovie/${item.movieID}`" class="btn">
              Update
            </router-link>
            <button @click="deleteMovie(item.movieID)" class="btn">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.movies-table-container {
  margin: 20px 0;
  overflow-x: auto; 
}

.movies-table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9; 
  border: 1px solid #ddd; 
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.movies-table th,
.movies-table td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

.movies-table th {
  background-color: #007bff;
  color: white; 
  font-weight: bold;
}

.movies-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.movies-table tbody tr:hover {
  background-color: #e9ecef;
}

.btn {
  display: block;
  text-decoration: none;
  font-size: 14px;
  border: none;
  background: none;
  color: #007bff;
  cursor: pointer;
}

.btn:hover {
  text-decoration: underline;
  color: #0056b3;
}
</style>
