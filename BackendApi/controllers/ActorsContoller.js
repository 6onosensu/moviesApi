const { db } = require('../db');
const Utils = require('./utils');

const actors = [
    { actorID: 1, name: "Daniel Radcliffe" },
    { actorID: 2, name: "Emma Watson" },
    { actorID: 3, name: "Rupert Grint" },
];

exports.getAll = async (req, res) => {
    res.send(actors);
};

exports.getById = async (req, res) => {
    const actor = await getActor(req, res);
    if (!actor) {
        return res.status(404).send({ Error: 'Actor not found' });
    }
    res.send(actor);
};

exports.editById = async (req, res) => {
    const actor = await getActor(req, res);
    if (!actor) return;

    const { body } = req;
    const { name } = body;

    if (!name) {
        return res.status(400).send({ error: "Name is required" });
    }

    actor.name = name;
    await actor.save();
    const link = `${req.protocol}://${req.get("host")}/actors/${actor.actorID}`;
    return res.status(200).location(link).send(actor);
};

exports.create = async (req, res) => {
    const { body } = req;
    const { name } = body;

    if (!name) {
        return res.status(400).send({ 
            error: "Actor name is required", 
        });
    }

    const newActor = {
        actorID: actors.length + 1,
        ...body,
    };
    const createdActor = await db.actors.create(newActor);
    const link = `${Utils.getBaseUrl(req)}/actors/${createdActor.actorID}`;
    res.status(201).location(link).send(createdActor);
};

exports.deleteById = async (req, res) => {
    const actor = await getActor(req, res);
    if (!actor) return;
    await actor.destroy();
    res.status(204).send({Error: 'No Content'});
};

const getActor = async (req, res) => {
    const id = parseInt(req.params.actorID);
    if (isNaN(id)) {
        res.status(400).send({Error: `ID must be a whole number: ${id}`});
        return null;
    }
    const actor = await db.actors.findByPk(id);
    if (!actor) {
        res.status(404).send({Error: `Actor with this ID not found: ${id}`});
        return null;
    }
    return actor;
}
