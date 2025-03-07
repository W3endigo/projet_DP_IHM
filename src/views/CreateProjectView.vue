<template>
  <div class="create-project-container">
    <h1>Créer un nouveau projet</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-field">
        <label for="email_chef_project">Email du chef de projet:</label>
        <input type="email" id="email_chef_project" v-model="form.email_chef_project" required />
      </div>
      <div class="form-field">
        <label for="title">Titre du projet:</label>
        <input type="text" id="title" v-model="form.title" required />
      </div>
      <div class="form-field">
        <label for="description">Description du projet:</label>
        <textarea id="description" v-model="form.description" required></textarea>
      </div>
      <div class="form-field">
        <label for="status">Statut:</label>
        <select id="status" v-model="form.status" required>
          <option value="EN_COURS">En cours</option>
          <option value="TERMINE">Terminé</option>
          <option value="ANNULE">Annulé</option>
        </select>
      </div>
      <div class="form-field">
        <label for="start_date">Date de début:</label>
        <input type="date" id="start_date" v-model="form.start_date" required />
      </div>
      <div class="form-field">
        <label for="end_date">Date de fin:</label>
        <input type="date" id="end_date" v-model="form.end_date" required />
      </div>
      <div class="form-field">
        <label for="participants">Ajout de participant(s) (emails):</label>
        <div class="input-group">
          <input type="text" id="participants" v-model="newParticipant" placeholder="Ajouter un participant" />
          <button type="button" @click="addParticipant"><i class="fas fa-plus"></i></button>
        </div>
        <ul>
          <li v-for="(participant, index) in form.participants" :key="index">
            {{ participant.email }} <button @click="removeParticipant(index)">Supprimer</button>
          </li>
        </ul>
      </div>
       <div class="form-field">
        <label for="companies">Entreprise:</label>
        <select id="companies" v-model="form.company" required>
          <option value="">Sélectionnez une entreprise</option>
          <option v-for="company in companies" :key="company.id" :value="company.name">{{ company.name }}</option>
        </select>
      </div>
      <button type="submit">Créer le projet</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email_chef_project: "",
        description: "",
        title: "",
        status: "EN_COURS",
        start_date: "",
        end_date: "",
        participants: [],
        company: "",
      },
      newParticipant: "",
      companies: [],
      errorMessage: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.errorMessage = "Utilisateur non authentifié";
          return;
        }

        console.log("avant put", this.form);
        await axios.put("http://localhost:8082/api/project", this.form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("après put", this.form);
        this.$router.push("/dashboard"); // Rediriger vers la liste des projets après la création
      } catch (error) {
        console.log("y a un soucy", error);
        this.errorMessage = error.response?.data?.message || "Une erreur est survenue.";
      }
    },
    addParticipant() {
      if (this.newParticipant) {
        console.log("newParticipant",this.newParticipant);
        this.form.participants.push({ email: this.newParticipant });
        this.newParticipant = "";
      }
    },
    removeParticipant(index) {
      this.form.participants.splice(index, 1);
    },
    async fetchCompanies() {
      try {
        const response = await axios.get("http://localhost:8082/api/companies");
        this.companies = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des compagnies :", error);
      }
    },
  },
   mounted() {
    this.fetchCompanies();
  },
};
</script>

<style scoped>
.create-project-container {
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

.form-field {
  margin-bottom: 20px;
}

.form-field label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-field input,
.form-field textarea,
.form-field select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-field .input-group {
  display: flex;
}

.form-field .input-group input {
  flex: 1;
}

.form-field .input-group button {
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  margin-left: 5px;
}

.form-field ul {
  list-style-type: none;
  padding: 0;
}

.form-field ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.form-field ul li button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #2980b9;
}
</style>