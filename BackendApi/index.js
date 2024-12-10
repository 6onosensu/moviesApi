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