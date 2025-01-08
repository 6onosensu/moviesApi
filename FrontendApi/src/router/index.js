import { createRouter, createWebHistory } from 'vue-router';
import MoviesView from '../views/MoviesView.vue';
import MovieDetails from '../components/movie/MovieDetails.vue'; 
import AddMovie from '@/components/movie/AddMovie';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView,
    },
    {
      path: '/add-movie',
      name: 'add-movie',
      component: () => AddMovie,
    },
  ],
});

export default router;