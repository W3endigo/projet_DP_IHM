import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import ProfilView from '../views/ProfilView.vue';
import CreateProjectView from '../views/CreateProjectView.vue';
import DashboardView from '../views/DashboardView.vue';

const routes = [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profil',
      name: 'Profil',
      component: ProfilView,
      meta: { requiresAuth: true },
    },
    {
      path: '/create-project',
      name: 'CreateProject',
      component: CreateProjectView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
    },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;