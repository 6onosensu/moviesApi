<script>
export default {
    name: "GamesTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <div>
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Movie Name</th>
            <th>Description</th>
            <th>Release Year</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" v-bind:key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.Description }}</td>
            <td>{{ item.Year }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<style scoped>
</style>