const app = require('express')();
const port = 8080;
const swaggerUI = require(`swagger-ui-express`);
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

const movies = [
    {
        id: 1, 
        name: "Harry Potter and the Philosopher's Stone",
        description: "movie",
        year: 2001,
    }, {
        id: 2, 
        name: "Harry Potter and the Chamber of Secrets",
        description: "movie",
        year: 2002,
    }, {
        id: 3, 
        name: "Harry Potter and the Prisoner of Azkaban",
        description: "movie",
        year: 2004,
    }, {
        id: 4, 
        name: "Harry Potter and the Goblet of Fire",
        description: "movie",
        year: 2005,
    },
]

app.get('/movies/:id', (req, res) => {
    if(typeof movies[req.params.id-1] === 'undefined'){
        return res.status(404).send({
            Error: "Movie not found"
        })
    }
    if (typeof movies[req.params.id-1] == null){
        return res.status(400).send({
            Error: "invalid movie id"
        });
    }
    res.send(movies[req.params.id-1]);
})

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


app.listen(port, () => {
    console.log(`Backend api: http://localhost:${port}`);
});