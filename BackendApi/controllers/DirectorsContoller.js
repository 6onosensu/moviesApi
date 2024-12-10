
const directors = [
    { directorID: 1, name: "Alfonso Cuarón" },
    { directorID: 2, name: "Mike Newell" },
    { directorID: 3, name: "Chris Columbus" },
];
/*

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