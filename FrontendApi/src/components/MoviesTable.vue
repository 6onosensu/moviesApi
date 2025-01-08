<script>
export default {
  name: "MoviesTable",
  props: {
    items: Array,
  },
};
</script>

<template>
  <div>
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
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
            <router-link :to="`/movies/${item.movieID}`" class="btn btn-primary">
              View Details
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>
