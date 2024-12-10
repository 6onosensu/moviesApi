const actors = [
    { actorID: 1, name: "Daniel Radcliffe" },
    { actorID: 2, name: "Emma Watson" },
    { actorID: 3, name: "Rupert Grint" },
];

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
*/