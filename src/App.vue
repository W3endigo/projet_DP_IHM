<template>
  <div id="app">
    <Header :username="username" v-if="isLoggedIn"/>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header,
  },
  data() {
    return {
      isLoggedIn: false, // Initialement, l'utilisateur n'est pas connecté
      username: 'lou', // Remplacez par le nom d'utilisateur réel
    };
  },
  methods: {
    handleLoginSuccess(username) {
      this.isLoggedIn = true;
      this.username = username;
    },
  },
};
</script>