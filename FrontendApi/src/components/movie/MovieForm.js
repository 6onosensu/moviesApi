export default {
    template: `
    <table class="table table-striped">
        <tr>
            <th>Id</th>
            <th>{{movieID}}</th>
        </tr>
        <tr>
            <th>Name</th>
            <th><input :value="name" @input="$emit('update:name', $event.target.value)"/></th>
        </tr>
        <tr>
            <th>description</th>
            <th><input :value="description" @input="$emit('update:description', $event.target.value)"/></th>
        </tr>
        <tr>
            <th>year</th>
            <th><input :value="year" @input="$emit('update:year', $event.target.value)"/></th>
        </tr>
        <tr>
            <th>genres</th>
            <th><input :value="genres" @input="$emit('update:genres', $event.target.value)"/></th>
        </tr>
        <tr>
            <th>directors</th>
            <th><input :value="directors" @input="$emit('update:directors', $event.target.value)"/></th>
        </tr>
        <tr>
            <th>actors</th>
            <th><input :value="actors" @input="$emit('update:actors', $event.target.value)"/></th>
        </tr>
    </table>
    `,
    props: ["movieID", "name", "year", "description", "genres", "directors", "actors"],
    emits: ["update:name", "update:year", "update:description", "update:genres", "update:directors", "update:actors"]
}