<template>
  <header>
    <div class="logo" @click="goToHome">
        <img src="@/assets/logo.png" alt="Logo">
    </div>
    <div class="right-section">
      <div class="icons">
        <div class="notifications">
          <button>
            <i class="fas fa-bell"></i>
          </button>
        </div>
        <div class="messages">
          <button>
            <i class="fas fa-envelope"></i>
          </button>
        </div>
        <div class="profile">
          <button @click="goToProfile">
            <i class="fas fa-user-circle"></i>
          </button>
        </div>
      </div>
      <div class="deconnexion">
        <button v-if="isLoggedIn" @click="logout">Déconnexion</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    goToProfile() {
      this.$router.push('/profil');
    },
    goToHome() {
      this.$router.push('/home');
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  margin: 10px;
  background-color: #f0f0f0; 
}

.logo img {
  width: 70px; 
  height: auto;
}

.logo:hover {
  cursor: pointer;
}

.right-section {
  display: flex;
  align-items: center;
}

.icons {
  display: flex;
  align-items: center;
}

.notifications button,
.messages button,
.profile button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin-left: 10px; 
}

.deconnexion button {
  background: none;
  border-radius: 5px;
  border: 2px solid #000000;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.deconnexion button:hover {
  background-color: #7fa6bc; /* Bleu clair au survol */
}
</style>