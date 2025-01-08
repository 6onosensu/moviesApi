<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="header-container">
      <nav>
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/movies" class="nav-link">Movies</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView/>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: flex-start;
  align-items: center; 
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
}

nav {
  display: flex;
  gap: 15px; 
}

.nav-link {
  text-decoration: none;
  color: #007bff;
  font-size: 1rem; 
  font-weight: 500; 
  padding: 5px 10px;
  border-radius: 5px; 
  transition: background-color 0.3s, color 0.3s; 
}

.nav-link:hover {
  background-color: #007bff;
  color: white;
  }
</style>
