import { createRouter, createWebHistory } from 'vue-router';
import MoviesView from './views/MoviesView.vue';
import MovieDetailView from './views/MovieDetailView.vue';

const routes = [
    {
        path: '/',
        name: 'Movies',
        component: MoviesView,
    },
    {
        path: '/movie/:id',
        name: 'MovieDetail',
        component: MovieDetailView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
