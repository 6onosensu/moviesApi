const { db } = require('../db');
const Utils = require('./utils');

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

exports.getAll = async (req, res) => {
    try {
        const movies = await db.movies?.findAll() || []; 
        const formattedMovies = movies.map(({ movieID, name }) => ({ movieID, name }));
        res.status(200).send(formattedMovies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send({ error: 'Failed to fetch movies' });
    }
};

exports.getById = async (req, res) => {
    const movie = await getMovie(req, res);
    if (!movie) { 
        return res.status(404).send({Error: 'Movie not found'});
    }
    res.send(movie);
}

exports.create = async (req, res) => {
    const { body } = req;
    const { name, year, description, genres, directors, actors } = body;
    if (!name || !year || !description || 
        !Array.isArray(genres) || 
        !Array.isArray(directors) || 
        !Array.isArray(actors)) {
        return res.status(400).send({
            error: "One or multiple parameters are missing or invalid"
        });
    }

    const newMovie = {
        movieID: movies.length + 1,
        ...body, // All properties from the "body" object (name, description, year...)
    }
    
    const createdMovie = await db.movies.create(newMovie);
    const link = `${Utils.getBaseUrl(req)}/movies/${createdMovie.movieID}`;
    res.status(201).location(link).send(createdMovie);
}

exports.editById = async (req, res) => {
    const movie = await getMovie(req, res);
    if (!movie) return;

    const { body } = req;
    const { name, year, description, genres, directors, actors } = body;

    if (!name || !year || !description || 
        !Array.isArray(genres) || 
        !Array.isArray(directors) || 
        !Array.isArray(actors)) {
        return res.status(400).send({ error: 'Invalid or missing parameters' });
    }

    movie.name = name;
    movie.year = year;
    movie.description = description;
    movie.genres = genres;
    movie.directors = directors;
    movie.actors = actors;

    await movie.save();
    const link = `${Utils.getBaseUrl(req)}/movies/${movie.movieID}`;
    return res.status(200).location(link).send(movie);
}

exports.deleteById = async (req, res) => {
    const movie = await getMovie(req, res);
    if ( !movie ) { return }
    await movie.destroy();
    res.status(204).send({Error: 'No Content'});
}

const getMovie = async (req, res) => {
    const id = parseInt(req.params.movieID);
    if(isNaN(id)) {
        res.status(400).send({Error: `ID must be a whole number: ${id}`});
        return null;
    }
    const movie = await db.movies.findByPk(id);
    if(!movie) {
        res.status(404).send({Error: `movie with this id not found: ${id}`});
        return null;
    }
    return movie;
}
