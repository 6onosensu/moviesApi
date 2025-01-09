export default {
  template: `
    <form @submit.prevent="$emit('submit')">
      <table class="table table-striped">
        <tr>
          <th>Name</th>
          <td><input v-model="name" placeholder="Enter movie name" /></td>
        </tr>
        <tr>
          <th>Description</th>
          <td><textarea v-model="description" placeholder="Enter movie description"></textarea></td>
        </tr>
        <tr>
          <th>Year</th>
          <td><input type="number" v-model="year" placeholder="Enter release year" /></td>
        </tr>
        <tr>
          <th>Genres</th>
          <td><input v-model="genres" placeholder="Comma-separated genres" /></td>
        </tr>
        <tr>
          <th>Directors</th>
          <td><input v-model="directors" placeholder="Comma-separated directors" /></td>
        </tr>
        <tr>
          <th>Actors</th>
          <td><input v-model="actors" placeholder="Comma-separated actors" /></td>
        </tr>
      </table>
      <button type="submit" class="btn btn-primary">Add Movie</button>
    </form>
  `,
  props: ['name', 'description', 'year', 'genres', 'directors', 'actors'],
  emits: ['submit'],
};
