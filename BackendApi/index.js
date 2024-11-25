const app = require('express')();
const port = 8080;
const swaggerUI = require(`swagger-ui-express`);
const swaggerDocument = require('./docs/swagger.json');

app.get('movies', (req, res) => {
    res.send(["Harry Potter", "dfs", "sgd", "sgd",])
})

app.use('/docs', swaggerUi.serve, swaggerUI.setup(swaggerDocument))


app.listen(port, () => {
    console.log(`Backend api: http://localhost:${port}`);
});