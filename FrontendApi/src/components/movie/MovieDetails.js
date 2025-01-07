export default {
    template: `
    <table class="table table-striped">
        <tr>
            <th>Id</th>
            <th>{{movieInModal.movieID}}</th>
        </tr>
        <tr>
            <th>Name</th>
            <th>{{movieInModal.description}}</th>
        </tr>
        <tr>
            <th>Name</th>
            <th>{{movieInModal.year}}</th>
        </tr>
        <tr>
            <th>Name</th>
            <th>{{movieInModal.genres}}</th>
        </tr>
        <tr>
            <th>Name</th>
            <th>{{movieInModal.directors}}</th>
        </tr>
        <tr>
            <th>Name</th>
            <th>{{movieInModal.actors}}</th>
        </tr>
    </table>
    `,
    props: ["movieInModal"]
}