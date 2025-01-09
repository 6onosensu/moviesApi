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
    try {
        const movieID = parseInt(req.params.movieID);
        if (isNaN(movieID)) {
            return res.status(400).send({ error: "Invalid movie ID" });
        }

        const movie = await db.Movie.findByPk(movieID, {
            include: [
                {
                    model: db.Genre,
                    through: { attributes: [] }, 
                    attributes: ['genreID', 'title'],
                },
                {
                    model: db.Actor,
                    through: { attributes: [] },
                    attributes: ['actorID', 'name'],
                },
                {
                    model: db.Director,
                    through: { attributes: [] },
                    attributes: ['directorID', 'name'],
                },
            ],
        });

        if (!movie) {
            return res.status(404).send({ error: "Movie not found" });
        }

        const formattedMovie = {
            movieID: movie.movieID,
            name: movie.name,
            description: movie.description,
            year: movie.year,
            genres: movie.Genres.map(genre => ({
                genreID: genre.genreID,
                title: genre.title,
            })),
            actors: movie.Actors.map(actor => ({
                actorID: actor.actorID,
                name: actor.name, 
            })),
            directors: movie.Directors.map(director => ({
                directorID: director.directorID,
                name: director.name,
            })),
        };

        res.status(200).send(formattedMovie);
    } catch (error) {
        console.error("Error fetching movie by ID:", error);
        res.status(500).send({ error: "Failed to fetch movie details" });
    }
};


exports.create = async (req, res) => {
    const { name, year, description, genres, actors, directors } = req.body;

    if (!name || !year || !description) {
        return res.status(400).send({ error: "Missing required fields: name, year, description" });
    }

    try {
        const movie = await db.Movie.create({ name, year, description });

        if (genres && Array.isArray(genres)) {
            for (const genre of genres) {
                const [genreRecord] = await db.Genre.findOrCreate({ where: { title: genre.title } });
                await movie.addGenre(genreRecord);
            }
        }

        if (actors && Array.isArray(actors)) {
            for (const actor of actors) {
                const [actorRecord] = await db.Actor.findOrCreate({ where: { name: actor.name } });
                await movie.addActor(actorRecord);
            }
        }

        if (directors && Array.isArray(directors)) {
            for (const director of directors) {
                const [directorRecord] = await db.Director.findOrCreate({ where: { name: director.name } });
                await movie.addDirector(directorRecord);
            }
        }

        const createdMovie = await db.Movie.findByPk(movie.movieID, {
            include: [
                { model: db.Genre, through: { attributes: [] } },
                { model: db.Actor, through: { attributes: [] } },
                { model: db.Director, through: { attributes: [] } },
            ],
        });

        res.status(201).send(createdMovie);
    } catch (error) {
        console.error("Error creating movie:", error);
        res.status(500).send({ error: "Failed to create movie" });
    }
};

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
