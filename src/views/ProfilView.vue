<template>
  <div class="profile-container">
    <h1>Profil Utilisateur</h1>
    <div v-if="user">
      <div class="profile-field">
        <label>Nom:</label>
        <span>{{ user.lastName }}</span>
      </div>
      <div class="profile-field">
        <label>Prénom:</label>
        <span>{{ user.firstName }}</span>
      </div>
      <!-- <div class="profile-field">
        <label>Email:</label>
        <span class="non-modifiable">{{ user.email }}</span>
      </div> -->
      <div class="profile-field" v-if="user.company">
        <label>Entreprise:</label>
        <span>{{ user.company }}</span>
      </div>
      <div class="profile-field" v-if="user.password">
        <label>Mot de passe:</label>
        <span>{{ user.password }}</span>
      </div>
    </div>
    <div v-else>
      <p>Chargement des informations du profil...</p>
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:8082/api/user';

export default {
  setup() {
    const user = ref(null);
    const error = ref(null);
    const token = localStorage.getItem('token'); // Assurez-vous que le token est bien stocké après connexion

    console.log("coucou")
    const getUser = async () => {
      try {
        console.log("avant get : ", token);
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("apres get : ", token);
        user.value = response.data;
        console.log("get user value : ", user.value);
      } catch (err) {
        error.value = err.response ? err.response.data : err.message;
        console.log("erreur user value : ", user.value);
      }
    };
    console.log("au revoir : ", token);

    onMounted(() => {
      if (token) {
        getUser();
      } else {
        error.value = 'Utilisateur non authentifié';
      }
    });

    return { user, error };
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-field {
  margin-bottom: 15px;
}

.profile-field label {
  font-weight: bold;
  margin-right: 10px;
}

.non-modifiable {
  color: gray;
}

.error-message {
  color: red;
}
</style>