<template>
  <header>
    <div class="logo" @click="goToHome">
      <img src="@/assets/logo.png" alt="Logo">
    </div>
    <div class="right-section">
      <div class="icons">
        <div class="notifications">
          <button @click="toggleNotifications">
            <i class="fas fa-bell"></i>
          </button>
          <div v-if="showNotifications" class="notifications-panel">
            <h3>Notifications</h3>
            <ul>
              <li>Message numéro 1</li>
              <li>Message numéro 2</li>
            </ul>
            <button @click="viewAllNotifications">Tout afficher</button>
          </div>
        </div>
         <div class="messages">
          <button @click="toggleMessages">
            <i class="fas fa-envelope"></i>
          </button>
          <div v-if="showMessages" class="messages-panel">
            <div class="search-bar">
              <input type="text" placeholder="Rechercher...">
              <button>
                <i class="fas fa-search"></i>
              </button>
            </div>
            <div class="dropdowns">
              <div class="dropdown">
                <div class="dropdown-header">
                  <label>Favoris</label>
                  <span @click="toggleFavorite">{{ showFavoriteList ? '- voir moins' : '+ voir plus' }}</span>
                </div>
                <ul v-if="showFavoriteList">
                  <li @click="showFavorite('jhon-doe')">Jhon DOE</li>
                </ul>
              </div>
              <div class="dropdown">
                <div class="dropdown-header">
                  <label>Groupe</label>
                  <span @click="toggleGroup">{{ showGroupList ? '- voir moins' : '+ voir plus' }}</span>
                </div>
                <ul v-if="showGroupList">
                  <li @click="showGroup('projet-cipasimal')">Projet CIPASIMAL</li>
                </ul>
              </div>
              <div class="dropdown">
                <div class="dropdown-header">
                  <label>Privé</label>
                  <span @click="togglePrivate">{{ showPrivateList ? '- voir moins' : '+ voir plus' }}</span>
                </div>
                <ul v-if="showPrivateList">
                  <li @click="showPrivate('jhon-doe')">Jhon DOE</li>
                  <li @click="showPrivate('carl-max')">Carl MAX</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="menu">
          <button @click="toggleMenu">
            <i class="fas fa-bars"></i>
          </button>
          <div v-if="showMenu" class="dropdown-menu">
            <button @click="navigateTo('/home')">Accueil</button>
            <button @click="navigateTo('/create-project')">Nouveau project</button>
            <button @click="navigateTo('/dashboard')">Tableau de bord</button>
            <button @click="navigateTo('/profil')">Profil</button>
          </div>
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
  data() {
    return {
      showMenu: false,
      showNotifications: false,
      showMessages: false,
      showFavoriteList: false,
      showGroupList: false,
      showPrivateList: false,
    };
  },
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
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    navigateTo(route) {
      this.$router.push(route);
      this.showMenu = false;
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    toggleMessages() {
      this.showMessages = !this.showMessages;
    },
    viewAllNotifications() {
      // Logique pour afficher toutes les notifications
      console.log("Afficher toutes les notifications");
    },
    showFavorite(favorite) {
      console.log("Afficher les informations pour le favori:", favorite);
    },
    showGroup(group) {
      console.log("Afficher les informations pour le groupe:", group);
    },
    showPrivate(privateContact) {
      console.log("Afficher les informations pour le contact privé:", privateContact);
    },
    toggleFavorite() {
      this.showFavoriteList = !this.showFavoriteList;
    },
    toggleGroup() {
      this.showGroupList = !this.showGroupList;
    },
    togglePrivate() {
      this.showPrivateList = !this.showPrivateList;
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
.profile button,
.menu button {
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
  background-color: #7fa6bc; 
}

.dropdown-menu {
  position: absolute;
  top: 70px; 
  right: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 10px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: #f0f0f0;
}

.notifications-panel {
  position: absolute;
  top: 70px; 
  right: 110px; 
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 250px; 
  padding: 10px;
}

.notifications-panel h3 {
  text-align: center;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #5c5b5b;
}

.notifications-panel ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.notifications-panel ul li {
  padding: 10px 0; 
  border-bottom: 1px solid #ccc; 
}

.notifications-panel ul li:last-child {
  border-bottom: none;
}

.notifications-panel button {
  width: 90%;
  padding: 5px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 50px;
}

.notifications-panel button:hover {
  background-color: #2980b9;
}

.messages-panel {
  position: absolute;
  top: 70px; 
  right: 110px; 
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 250px; 
  padding: 10px;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar input {
  flex: 1;
  padding: 9px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}

.search-bar button {
  padding: 5px;
  border: 1px solid #ccc;
  /* border-left: none;  */
  border-radius: 0 5px 5px 0;
  background: #3498db;
  color: white;
  cursor: pointer;
}

.search-bar button:hover {
  background: #2980b9;
}

.dropdowns {
  display: flex;
  flex-direction: column;
}

.dropdown {
  margin-bottom: 10px;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown label {
  display: inline-block;
  margin-bottom: 5px;
  font-weight: bold;
}

.dropdown span {
  display: inline-block;
  color: #3498db; /* Couleur bleue */
  cursor: pointer;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown ul li {
  padding: 5px;
  cursor: pointer;
}

.dropdown ul li:hover {
  background-color: #f0f0f0;
}
</style>