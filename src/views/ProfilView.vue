<template>
  <div class="profile-container">
    <h1>Profil Utilisateur</h1>
    <div v-if="user">
      <div class="profile-field">
        <label>Nom:</label>
        <input type="text" v-model="user.lastName" />
      </div>
      <div class="profile-field">
        <label>Prénom:</label>
        <input type="text" v-model="user.firstName" />
      </div>
      <div class="profile-field">
        <label>Entreprise:</label>
        <select v-model="user.company">
          <option value="">Sélectionnez une entreprise</option>
          <option v-for="company in companies" :key="company.id" :value="company.name">{{ company.name }}</option>
        </select>
      </div>
      <div class="profile-field">
        <label>Mot de passe:</label>
        <input type="password" v-model="user.password" placeholder="Modifier votre mot de passe" />
      </div>
      <div class="profile-field">
        <label>Confirmer le mot de passe:</label>
        <input type="password" v-model="confirmPassword" placeholder="Confirmer le mot de passe" />
      </div>
      <button @click="updateUser">Enregistrer les modifications</button>
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

const USER_API_URL = 'http://localhost:8082/api/user';
const COMPANIES_API_URL = 'http://localhost:8082/api/companies';

export default {
  setup() {
    const user = ref(null);
    const originalUser = ref(null); // Pour stocker les valeurs initiales
    const confirmPassword = ref(""); // Pour stocker la confirmation du mot de passe
    const companies = ref([]);
    const error = ref(null);
    const token = ref(localStorage.getItem('token') || "");

    const getUser = async () => {
      if (!token.value) {
        error.value = "Utilisateur non authentifié";
        console.error("Aucun token trouvé !");
        return;
      }

      try {
        const response = await axios.get(USER_API_URL, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });

        user.value = response.data;
        console.log("value user", user.value)
        originalUser.value = { ...response.data };
        console.log("valeur origine", originalUser.value)
      } catch (err) {
        error.value = err.response ? err.response.data : err.message;
        console.error("Erreur lors de la récupération du profil :", error.value);
      }
    };

    const getCompanies = async () => {
      try {
        const response = await axios.get(COMPANIES_API_URL);
        companies.value = response.data;
      } catch (err) {
        console.error("Erreur lors de la récupération des compagnies :", err);
      }
    };

    const updateUser = async () => {
      if (user.value.password && user.value.password.length < 8) {
        alert("Le mot de passe doit contenir au minimum 8 caractères.");
        return;
      }

      if (user.value.password && user.value.password !== confirmPassword.value) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }

      const updatedFields = {};

      // Comparer les valeurs actuelles avec les valeurs initiales
      for (const key in user.value) {
        if (user.value[key] !== originalUser.value[key]) {
          updatedFields[key] = user.value[key];
        }
      }

      if (Object.keys(updatedFields).length === 0) {
        alert("Aucune modification détectée.");
        return;
      }

      try {
        await axios.put(USER_API_URL, updatedFields, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        alert("Modifications enregistrées avec succès !");
        originalUser.value = { ...user.value }; // Mettre à jour les valeurs initiales
      } catch (err) {
        error.value = err.response ? err.response.data : err.message;
        console.error("Erreur lors de la mise à jour du profil :", error.value);
      }
    };

    onMounted(() => {
      getUser();
      getCompanies();
    });

    return { user, confirmPassword, companies, error, updateUser };
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

h1 {
  text-align: center; /* Centrer le texte de la balise h1 */
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
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
}

.profile-field select {
  width: 98.5%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
}



button {
  width: 100%;
  padding: 10px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

.error-message {
  color: red;
}
</style>