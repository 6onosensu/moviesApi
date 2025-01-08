<template>
  <div class="home">
    <h1>Welcome to the Movie Management App</h1>
    <p>
      This project is a simple Movie Management Application designed to help you manage movies, their details, and related information such as genres, directors, and actors.
    </p>

    <h2>Features:</h2>
    <ul>
      <li>View a list of movies with details such as name, description, and release year.</li>
      <li>Add new movies with associated genres, directors, and actors.</li>
      <li>Edit or update existing movies.</li>
      <li>Delete movies from the list.</li>
      <li>Navigate between different sections using a user-friendly interface.</li>
    </ul>

    <h2>How to Use:</h2>
    <p>
      Use the navigation bar at the top to explore the app:
    </p>
    <ul>
      <li><strong>Home:</strong> Learn about the project (this page).</li>
      <li><strong>Movies:</strong> View, add, edit, and delete movies.</li>
    </ul>

    <h2>Technologies Used:</h2>
    <ul>
      <li><strong>Frontend:</strong> Vue.js with Vite for building the user interface.</li>
      <li><strong>Backend:</strong> Node.js with Express and Sequelize for managing API requests and database operations.</li>
      <li><strong>Database:</strong> MariaDB for storing movies and related data.</li>
    </ul>

    <p>
      Start by exploring the <router-link to="/movies">Movies</router-link> page to view the list of movies!
    </p>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  padding: 20px;
}

.home h1 {
  color: #007bff;
  margin-bottom: 20px;
}

.home h2 {
  color: #0056b3;
  margin-top: 20px;
}

.home ul {
  list-style-type: disc;
  margin: 10px 0 20px 20px;
}

.home p {
  margin-bottom: 15px;
}

router-link {
  color: #007bff;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>