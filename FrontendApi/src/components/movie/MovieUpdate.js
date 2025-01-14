export default {
    async fetchMovieDetails(movieID) {
      try {
        const response = await fetch(`http://localhost:8080/movies/${movieID}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch movie details. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
      }
    },

    async updateMovie(movieID, updatedMovie) {
      try {
        const response = await fetch(`http://localhost:8080/movies/${movieID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMovie),
        });
        if (!response.ok) {
          throw new Error(`Failed to update movie. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error updating movie:", error);
        throw error;
      }
    },
  
    async fetchGenres() {
      try {
        const response = await fetch(`http://localhost:8080/genres`);
        if (!response.ok) {
          throw new Error(`Failed to fetch genres. Status: ${response.status}`);
        }
        const genres = await response.json();
        return genres;
      } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
      }
    },
  };