export default {
  name: "MovieDetailsTable",
  props: ["movieInModal"],
  template: `
    <table class="table table-striped">
      <tr>
        <th>Id</th>
        <td>{{ movieInModal.movieID }}</td>
      </tr>
      <tr>
        <th>Description</th>
        <td>{{ movieInModal.description }}</td>
      </tr>
      <tr>
        <th>Year</th>
        <td>{{ movieInModal.year }}</td>
      </tr>
      <tr>
        <th>Genres</th>
        <td>{{ movieInModal.genres.map(genre => genre.name).join(', ') }}</td>
      </tr>
      <tr>
        <th>Directors</th>
        <td>{{ movieInModal.directors.map(director => director.name).join(', ') }}</td>
      </tr>
      <tr>
        <th>Actors</th>
        <td>{{ movieInModal.actors.map(actor => actor.name).join(', ') }}</td>
      </tr>
    </table>
  `,
};
