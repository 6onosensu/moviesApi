require('dotenv').config();

const express = require('express');
const cors = require("cors")
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const { db, sync } = require("./db");

const swaggerDocument = yamljs.load('./docs/swagger.yaml');
const app = express();
const port = process.env.PORT || 8080;
const host = 'localhost';

const actors = [
    { actorID: 1, name: "Daniel Radcliffe" },
    { actorID: 2, name: "Emma Watson" },
    { actorID: 3, name: "Rupert Grint" },
];

const directors = [
    { directorID: 1, name: "Alfonso Cuarón" },
    { directorID: 2, name: "Mike Newell" },
    { directorID: 3, name: "Chris Columbus" },
];

const genres = [
    { genreID: 1, title: "Adventure" },
    { genreID: 2, title: "Fantasy" },
    { genreID: 3, title: "Family" },
    { genreID: 4, title: "Mystery" },
    { genreID: 5, title: "Thriller" },
    { genreID: 6, title: "Drama" },
    { genreID: 7, title: "Action" },
    { genreID: 8, title: "Romance" },
];

const movies = [
    {
        movieID: 1, 
        name: "Harry Potter and the Philosopher's Stone",
        description: "A young boy discovers he is a wizard. He begins his magical journey at Hogwarts School of Witchcraft and Wizardry.",
        year: 2001,
        genres: [1, 2, 3],
        directors: [3],
        actors: [1, 2, 3],
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

app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req, res) => res.send(`Backend is running. Documentation is available <a href="http://${host}:${port}/docs">HERE</a>`))

require("./routes/movieRoutes")(app);
require('./routes/genreRoutes')(app);

app.listen(port, async () => {
    if (process.env.SYNC === 'true') {
        await sync();
    }
    console.log(`Backend api running at http://${host}:${port}`);
});
/*
app.get('/genres', (req, res) => res.send(genres))

app.post('/genres', (req, res) => {
    const { body } = req;

    if(!body.title) {
        return res.status(400).send({
            error: "Title parameter is missing"
        });
    }

    let genre = {
        genreID: genres.length + 1,
        title: body.title,
    }

    genres.push(genre);
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


app.get('/actors', (req, res) => res.send(actors))

app.post('/actors', (req, res) => {
    const { body } = req;

    if(!body.name) {
        return res.status(400).send({
            error: "Name parameter is missing"
        });
    }

    let actor = {
        actorID: actors.length + 1,
        name: body.name,
    }
    
    actors.push(actor);
    const link = `${getBaseUrl(req)}/actors/${actors.length}`
    res.status(201).location(link).send(actor);
})

app.get('/actors/:actorID', (req, res) => {
    if(typeof actors[req.params.actorID-1] === 'undefined'){
        return res.status(404).send({
            error: "Actor not found"
        })
    }
    if (typeof actors[req.params.actorID-1] == null){
        return res.status(400).send({
            error: "Invalid actorID"
        });
    }
    res.send(actors[req.params.actorID-1]);
})

app.put('/actors/:actorID' , (req, res) => {
    const { body } = req;
    const actor = getActor(res, req);
    if (!actor) return;
    if (!body.name) {
        return res.status(400).send({
            error: "Missing or invalid actor parameters"
        });
    }
    actor.name = body.name;
    
    const link = `${getBaseUrl(req)}/actors/${actor.actorID}`;
    return res.status(201).location(link).send(actor);
})

app.delete('/actors/:actorID', (req, res) => {
    const id = req.params.actorID - 1;
    if (actors[id] === undefined) {
        return res.status(404).send( {
            Error: "Actor not found"
        });
    }

    actors.splice(id, 1);
    res.status(204).send({Error: "No Content"});
})


app.get('/directors', (req, res) => res.send(directors))

app.post('/directors', (req, res) => {
    const { body } = req;

    if(!body.name) {
        return res.status(400).send({
            error: "Name parameter is missing"
        });
    }

    let director = {
        directorID: directors.length + 1,
        name: body.name,
    }
    
    directors.push(director);
    const link = `${getBaseUrl(req)}/directors/${directors.length}`
    res.status(201).location(link).send(director);
})

app.get('/directors/:directorID', (req, res) => {
    if(typeof directors[req.params.directorID-1] === 'undefined'){
        return res.status(404).send({
            error: "director not found"
        })
    }
    if (typeof directors[req.params.directorID-1] == null){
        return res.status(400).send({
            error: "Invalid directorID"
        });
    }
    res.send(directors[req.params.directorID-1]);
})

app.put('/directors/:directorID' , (req, res) => {
    const { body } = req;
    const director = getDirector(res, req);
    if (!director) return;
    if (!body.name) {
        return res.status(400).send({
            error: "Missing or invalid director parameters"
        });
    }
    director.name = body.name;
    
    const link = `${getBaseUrl(req)}/directors/${director.directorID}`;
    return res.status(201).location(link).send(director);
})

app.delete('/directors/:directorID', (req, res) => {
    const id = req.params.directorID - 1;
    if (directors[id] === undefined) {
        return res.status(404).send( {
            Error: "director not found"
        });
    }

    directors.splice(id, 1);
    res.status(204).send({Error: "No Content"});
})


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
}*/