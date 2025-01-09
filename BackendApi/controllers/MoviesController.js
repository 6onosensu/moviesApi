const { db } = require('../db');
const Utils = require('./utils');

exports.getAll = async (req, res) => {
    try {
        const movies = await db.Movie.findAll(); 
        const formattedMovies = movies.map(({ movieID, name, description, year }) => ({ 
            movieID,
            name,
            description,
            year,
        }));
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
    try {
        const movie = await db.Movie.findByPk(id);
        if(!movie) {
            res.status(404).send({Error: `movie with this id not found: ${id}`});
            return null;
        }
        return movie;
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        res.status(500).send({ error: 'Failed to fetch movie' });
        return null;
    }
}
