<template>
  <div class="profile-container">
    <h1>Profil Utilisateur</h1>
    <div v-if="user">
      <div class="profile-field">
        <label>Nom:</label>
        <input type="text" :value="user.lastName" readonly />
      </div>
      <div class="profile-field">
        <label>Prénom:</label>
        <input type="text" :value="user.firstName" readonly />
      </div>
      <!-- <div class="profile-field">
        <label>Email:</label>
        <input type="text" :value="user.email" readonly class="non-modifiable" />
      </div> -->
      <div class="profile-field">
        <label>Entreprise:</label>
        <input type="text" :value="user.company || 'pas encore indiqué'" readonly />
      </div>
      <div class="profile-field">
        <label>Mot de passe:</label>
        <input type="text" :value="user.password || 'pas encore indiqué'" readonly />
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
    const token = ref(localStorage.getItem('token') || "");

    const getUser = async () => {
      if (!token.value) {
        error.value = "Utilisateur non authentifié";
        console.error("Aucun token trouvé !");
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });

        user.value = response.data;
      } catch (err) {
        error.value = err.response ? err.response.data : err.message;
        console.error("Erreur lors de la récupération du profil :", error.value);
      }
    };

    onMounted(getUser);

    return { user, error };
  },
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
  margin-bottom: 20px;
}

.profile-field label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.profile-field input {
  width: 96%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
}

.non-modifiable {
  color: gray;
}

.error-message {
  color: red;
}
</style>