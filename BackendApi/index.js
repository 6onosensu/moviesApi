const app = require('express')();
const port = 8080;
const swaggerUI = require(`swagger-ui-express`);
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
var express = require('express')

const movies = [
    {
        movieID: 1, 
        name: "Harry Potter and the Philosopher's Stone",
        description: "movie",
        year: 2001,
    }, {
        movieID: 2, 
        name: "Harry Potter and the Chamber of Secrets",
        description: "movie",
        year: 2002,
    }, {
        movieID: 3, 
        name: "Harry Potter and the Prisoner of Azkaban",
        description: "movie",
        year: 2004,
    }, {
        movieID: 4, 
        name: "Harry Potter and the Goblet of Fire",
        description: "movie",
        year: 2005,
    },
]

app.use('/docs', swaggerUI.serve, swaggerUI
    .setup(swaggerDocument))
app.use(express.json());

app.get('/movies', (req, res) => {
    res.send(movies);
})

app.get('/movies/:movieID', (req, res) => {
    if(typeof movies[req.params.movieID-1] === 'undefined'){
        return res.status(404).send({
            error: "Movie not found"
        })
    }
    if (typeof movies[req.params.movieID-1] == null){
        return res.status(400).send({
            error: "InvalmovieID movie movieID"
        });
    }
    res.send(movies[req.params.movieID-1]);
})

app.post('/movies', (req, res) => {
    if(!req.body.name ||
        !req.body.year || 
        !req.body.description) {
        return res.status(400).send({
            error: "One or multiple parameters are missing"
        });
    }
    
    let movie = {
        movieID: movies.length + 1,
        name: req.body.name,
        description: req.body.description,
        year: req.body.year,
    }
    movies.push(movie);
    res.status(201)
    .location(`${getBaseUrl(req)}/movies/${movies.length}`)
    .send(movie);
})

app.delete('/movies/:movieID', (req, res) => {
    if (typeof movies[req.params.movieID - 1] === "undefined"){
        return res.status(404).send({Error: "Movie not found"});
    }

    movies.splice(req.params.movieID-1, 1);

    res.status(204).send({Error: "No Content"});
})

app.put('/movies/:movieID' , (req, res) => {
    const movie = getMovie(res, req);
    if (!movie) {return}
    if (!req.body.name ||
        !req.body.year || 
        !req.body.description) {
        return res.status(400).send({
            error: "Missing movie parameters"
        });
    }
    movie.name = req.body.name;
    movie.year = req.body.year;
    movie.description = req.body.description;
    return res.status(201)
    .location(`${getBaseUrl(req)}/movies/${movie.movieID}`)
    .send(movie);
})

const genres = [
    {
        genreID: 1,
        title: "Action",
    },
    {
        genreID: 2,
        title: "Drama",
    },
    {
        genreID: 3,
        title: "Comedy",
    },
    {
        genreID: 4,
        title: "Horror",
    },
]

app.get('/genres', (req, res) => {
    res.send(genres);
})

app.post('/genres', (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
            error: "Title parameter is missing"
        });
    }
    
    let genre = {
        genreIDID: genres.length + 1,
        title: req.body.title,
    }
    movies.push(genre);
    res.status(201)
    .location(`${getBaseUrl(req)}/genres/${genres.length}`)
    .send(genre);
})

app.get('/genres/:genreID', (req, res) => {
    if(typeof genres[req.params.genreID-1] === 'undefined'){
        return res.status(404).send({
            error: "Genre not found"
        })
    }
    if (typeof genres[req.params.genreID-1] == null){
        return res.status(400).send({
            error: "Invalid genreID"
        });
    }
    res.send(genres[req.params.genreID-1]);
})

app.delete('/genres/:genreID', (req, res) => {
    if (typeof genres[req.params.genreID - 1] === "undefined"){
        return res.status(404).send({Error: "Genre not found"});
    }

    genres.splice(req.params.genreID-1, 1);

    res.status(204).send({Error: "No Content"});
})

app.listen(port, () => {
    console.log(`Backend api: http://localhost:${port}`);
});

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? "https" : "http" + `://${req.headers.host}`;
}

function getMovie(req, res) {
    const id = parseInt(req.params.movieID);
    if (isNaN(id)) {
        res.status(400).send({Error: `id not found`});
        return null;
    }
    const movie = movies.find( movie => movie.movieID === id)
    if (!movie) {
        res.status(404).send({Error: `Movie not found`});
        return null;
    }
    return movie;
}