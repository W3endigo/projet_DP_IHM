<template>
  <div class="description-container">
    <h1 class="project-title">{{ project?.title }}</h1>
    <div class="project-details" v-if="project">
      <p><strong>Description:</strong> {{ project.description }}</p>
      <p><strong>Chef de projet:</strong> {{ project.email_chef_project }}</p>
      <p><strong>Statut actuel:</strong> {{ project.status }}</p>
      <p><strong>Date de début:</strong> {{ project.start_date }}</p>
      <p><strong>Date de fin:</strong> {{ project.end_date }}</p>
      <p><strong>Participant(s):</strong></p>
      <ul>
        <li v-for="participant in project.participants" :key="participant.email">
          {{ participant.email }}
        </li>
      </ul>
      <p><strong>Entreprise :</strong> {{ project.company }}</p>
      
    </div>
    <div v-else>
      <p>Chargement des détails du projet...</p>
    </div>
    <button @click="goBack" class="back-button">Retour aux projets</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      project: null,
    };
  },
  async created() {
    await this.fetchProject();
  },
  watch: {
    '$route.params.title': async function () {
      await this.fetchProject();
    }
  },
  methods: {
    async fetchProject() {
      const projectTitle = this.$route.params.title;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8082/api/user/participations', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Trouver le projet correspondant au titre
        this.project = response.data.find(proj => proj.title === projectTitle);

        // Extraire le nom de l'entreprise (si plusieurs, prend la première)
        if (this.project && this.project.compagnies.length > 0) {
            this.project.company = this.project.compagnies[0].name;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    },
    goBack() {
      this.$router.push('/home');
    },
  },
};
</script>


<style scoped>
.description-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #2980b9;
}

.project-title {
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
}

.project-details {
  font-size: 1.2em;
  line-height: 1.6;
}

.project-details p {
  margin: 10px 0;
}

.project-details ul {
  list-style-type: none;
  padding: 0;
}

.project-details ul li {
  margin: 5px 0;
  padding: 5px;
  background: #f9f9f9;
  border-radius: 5px;
}
</style>