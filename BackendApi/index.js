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
        !req.body.description ) {
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

const genres = [
    {
        genreID: 1,
        Title: "Action",
    },
    {
        genreID: 1,
        Title: "Drama",
    },
    {
        genreID: 1,
        Title: "Comedy",
    },
    {
        genreID: 1,
        Title: "Horror",
    },
]

app.get('/genres', (req, res) => {
    res.send(genres);
})

app.listen(port, () => {
    console.log(`Backend api: http://localhost:${port}`);
});

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? "https" : "http" + `://${req.headers.host}`;
}