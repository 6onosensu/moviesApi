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
