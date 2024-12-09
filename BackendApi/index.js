const app = require('express')();
const port = 8080;
const swaggerUI = require(`swagger-ui-express`);
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
var express = require('express');

const actors = [
    {
        actorID: 1,
        name: "Daniel Radcliffe",
    },
    {
        genreID: 2,
        name: "Emma Watson",
    },
    {
        genreID: 3,
        name: "Rupert Grint",
    },
]

const directors = [
    {
        directorID: 1, 
        name: "Alfonso Cuarón",
    }, 
    {
        directorID: 2, 
        name: "Mike Newell",
    }, 
    {
        directorID: 3, 
        name: "Chris Columbus",
    },
]

const genres = [
    {
        genreID: 1,
        title: "Adventure",
    },
    {
        genreID: 2,
        title: "Fantasy",
    },
    {
        genreID: 3,
        title: "Family",
    },
    {
        genreID: 4,
        title: "Mystery",
    },
    {
        genreID: 5,
        title: "Thriller",
    },
    {
        genreID: 6,
        title: "Drama",
    },
    {
        genreID: 7,
        title: "Action",
    },
    {
        genreID: 8,
        title: "Romance",
    }
]

const movies = [
    {
        movieID: 1, 
        name: "Harry Potter and the Philosopher's Stone",
        description: "A young boy discovers he is a wizard. He begins his magical journey at Hogwarts School of Witchcraft and Wizardry.",
        year: 2001,
        genres: [1, 2, 3],
        directors: [],
        actors: [],
    }, 
    {
        movieID: 2, 
        name: "Harry Potter and the Chamber of Secrets",
        description: "Harry returns to Hogwarts for his second year. He uncovers the truth behind a dark chamber in the school.",
        year: 2002,
        genres: [1, 2, 4],
        directors: [],
        actors: [],
    }, 
    {
        movieID: 3, 
        name: "Harry Potter and the Prisoner of Azkaban",
        description: "Harry learns about his connection to a dangerous prisoner. He discovers more about his past and family secrets.",
        year: 2004,
        genres: [1, 2, 5],
        directors: [],
        actors: [],
    }, 
    {
        movieID: 4, 
        name: "Harry Potter and the Goblet of Fire",
        description: "Harry is mysteriously entered into a dangerous tournament. He faces deadly challenges and the return of Voldemort.",
        year: 2005,
        genres: [1, 2, 6],
        directors: [],
        actors: [],
    },
    {
        movieID: 5, 
        name: "Harry Potter and the Order of the Phoenix",
        description: "Harry forms a secret group to fight against Voldemort. He confronts the Ministry and uncovers the prophecy about him.",
        year: 2007,
        genres: [1, 2, 7],
        directors: [],
        actors: [],
    },
    {
        movieID: 6, 
        name: "Harry Potter and the Half-Blood Prince",
        description: "Harry delves into Voldemort's past through memories. He discovers secrets about Horcruxes that can defeat him.",
        year: 2009,
        genres: [1, 2, 8],
        directors: [],
        actors: [],
    },
    {
        movieID: 7, 
        name: "Harry Potter and the Deathly Hallows: Part 1",
        description: "Harry, Ron, and Hermione search for Horcruxes. They face betrayal, danger, and growing threats from Voldemort.",
        year: 2010,
        genres: [1, 2, 6],
        directors: [],
        actors: [],
    },
    {
        movieID: 8, 
        name: "Harry Potter and the Deathly Hallows: Part 2",
        description: "The epic final battle between Harry and Voldemort unfolds. Hogwarts becomes the stage for the ultimate showdown.",
        year: 2011,
        genres: [1, 2, 7],
        directors: [],
        actors: [],
    }
]



app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(express.json());

app.get('/movies', (req, res) => res.send(movies))

app.get('/movies/:movieID', (req, res) => {
    const id = movies[req.params.movieID - 1];
    if (id === undefined) {
        return res.status(404).send({
            error: "Movie not found"
        })
    }
    if (id === null) {
        return res.status(400).send({
            error: "Invalid movieID"
        });
    }
    res.send(id);
})

app.post('/movies', (req, res) => {
    const { body } = req;

    if(!body.name || !body.year || !body.description ||
       !Array.isArray(body.genres) || !Array.isArray(body.directors)) {
        return res.status(400).send({
            error: "One or multiple parameters are missing or invalid"
        });
    }

    const movie = {
        movieID: movies.length + 1,
        ...body, // All properties from the "body" object (name, description, year...)
    }
    
    movies.push(movie);
    const link = `${getBaseUrl(req)}/movies/${movies.length}`;
    res.status(201).location(link).send(movie);
})

app.delete('/movies/:movieID', (req, res) => {
    const id = req.params.movieID - 1;
    if (movies[id] === undefined) {
        return res.status(404).send( {
            Error: "Movie not found"
        });
    }

    movies.splice(id, 1);
    res.status(204).send({Error: "No Content"});
})

app.put('/movies/:movieID' , (req, res) => {
    const { body } = req;
    const movie = getMovie(res, req);
    if (!movie) return;
    if (!body.name ||
        !body.year || 
        !body.description || 
        !Array.isArray(body.genres)) {
        return res.status(400).send({
            error: "Missing or invalid movie parameters"
        });
    }
    movie.name = body.name;
    movie.year = body.year;
    movie.description = body.description;
    movie.genres = body.genres;
    
    const link = `${getBaseUrl(req)}/movies/${movie.movieID}`;
    return res.status(201).location(link).send(movie);
})


app.get('/genres', (req, res) => res.send(genres))

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
    const link = `${getBaseUrl(req)}/genres/${genres.length}`
    res.status(201).location(link).send(genre);
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

app.put('/genres/:genreID' , (req, res) => {
    const genre = getGenre(res, req);
    if (!genre) {return}
    if (!req.body.title) {
        return res.status(400).send({
            error: "Missing genre name"
        });
    }
    genre.title = req.body.title;
    
    return res.status(201)
    .location(`${getBaseUrl(req)}/genres/${genre.genreID}`)
    .send(genre);
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

function getGenre(req, res) {
    const id = parseInt(req.params.genreID);
    if (isNaN(id)) {
        res.status(400).send({Error: `genreID not found`});
        return null;
    }
    const genre = genres.find( genre => genre.genreID === id)
    if (!genre) {
        res.status(404).send({Error: `Genre not found`});
        return null;
    }
    return genre;
}

function getActor(req, res) {
    const id = parseInt(req.params.actorID);
    if (isNaN(id)) {
        res.status(400).send({Error: `actorID not found`});
        return null;
    }
    const actor = actors.find( actor => actor.actorID === id)
    if (!actor) {
        res.status(404).send({Error: `actor not found`});
        return null;
    }
    return actor;
}

function getDirector(req, res) {
    const id = parseInt(req.params.directorID);
    if (isNaN(id)) {
        res.status(400).send({Error: `directorID not found`});
        return null;
    }
    const director = directors.find( director => director.directorID === id)
    if (!director) {
        res.status(404).send({Error: `director not found`});
        return null;
    }
    return director;
}