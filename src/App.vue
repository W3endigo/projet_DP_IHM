<template>
  <div id="app">
    <Header v-if="isLoggedIn" :firstName="userFirstName" />
    <LoginView v-else @login-success="handleLoginSuccess" />
    <router-view v-if="isLoggedIn"></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import LoginView from './views/LoginView.vue';
import axios from 'axios';

export default {
  components: {
    Header,
    LoginView,
  },
  data() {
    return {
      isLoggedIn: false, 
      userFirstName: '', 
    };
  },
  methods: {
    handleLoginSuccess(firstName) {
      this.isLoggedIn = true;
      this.userFirstName = firstName;
    },
    async checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          console.log('Token du App:', token);
          const response = await axios.get('http://localhost:8082/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.isLoggedIn = true;
          this.userFirstName = response.data.firstName;
        } catch (error) {
          console.error('Erreur lors de la vérification de l\'authentification:', error);
          this.isLoggedIn = false;
          localStorage.removeItem('token'); // Remove invalid token
          this.$router.push('/login'); // Redirect to login page
        }
      } else {
        this.$router.push('/login'); // Redirect to login page if no token
      }
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>