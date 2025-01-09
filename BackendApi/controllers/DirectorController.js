const {db} = require('../db');
const Utils = require('./utils');

exports.getAll = async (req, res) => {
    //res.send(directors);
    try {
        const data = await db.Director.findAll();
        res.status(200).send(data.map(({directorID, name}) => {return {directorID, name}}));
    } catch (error) {
        res.status(500).send({ error: "Failed to retrieve actors" });
    }
};

exports.getById = async (req, res) => {
    const director = await getDirector(req, res);
    if (!director) {
        return res.status(404).send({ Error: 'Director not found' });
    }
    res.send(director);
};

exports.editById = async (req, res) => {
    const director = await getDirector(req, res);
    if (!director) return;

    const { body } = req;
    const { name } = body;

    if (!name) {
        return res.status(400).send({ error: "Name is required" });
    }

    director.name = name;
    await director.save();
    const link = `${req.protocol}://${req.get("host")}/directors/${director.directorID}`;
    return res.status(200).location(link).send(director);
};

exports.create = async (req, res) => {
    const { body } = req;
    const { name } = body;

    if (!name) {
        return res.status(400).send({ 
            error: "Director name is required", 
        });
    }

    const newDirector = {
        directorID: director.length + 1,
        ...body,
    };
    const createdDirector = await db.directors.create(newDirector);
    const link = `${Utils.getBaseUrl(req)}/directors/${createdDirector.directorID}`;
    res.status(201).location(link).send(createdDirector);
};

exports.deleteById = async (req, res) => {
    const director = await getDirector(req, res);
    if (!director) return;
    await director.destroy();
    res.status(204).send({Error: 'No Content'});
};

const getDirector = async (req, res) => {
    const id = parseInt(req.params.directorID);
    if (isNaN(id)) {
        res.status(400).send({Error: `ID must be a whole number: ${id}`});
        return null;
    }
    const director = await db.Director.findByPk(id);
    if (!director) {
        res.status(404).send({Error: `Director with this ID not found: ${id}`});
        return null;
    }
    return director;
}

