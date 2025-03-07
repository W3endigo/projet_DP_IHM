<template>
  <div class="home-container">
    <h1 class="title">Liste des projets</h1>
    <button class="dashboard-button" @click="goToDashboard">Mes projets</button>
    <div class="filters">
      <div class="filter-row">
        <input type="text" v-model="filters.projectName" placeholder="Rechercher par nom de projet" class="full-width" />
        <select v-model="filters.projectStatus">
          <option value="">Sélectionnez l'état du projet</option>
          <option value="EN_COURS">EN COURS</option>
          <option value="TERMINE">TERMINE</option>
          <option value="ANNULE">ANNULE</option>
        </select>
        <select v-model="filters.participantEmail">
          <option value="">Sélectionnez un participant</option>
          <option v-for="email in participantEmails" :key="email" :value="email">{{ email }}</option>
        </select>
      </div>
      <div class="filter-row">
        <input type="date" v-model="filters.startDate" @change="applyFilters" placeholder="Date de début" />
        <input type="date" v-model="filters.endDate" @change="applyFilters" placeholder="Date de fin" />
        <button @click="resetFilters">Annuler</button>
      </div>
    </div>
    <div class="projects">
      <div v-if="loading">Chargement des projets...</div>
      <div v-else-if="filteredProjects.length === 0">Pas de projet en cours</div>
      <div v-else>
        <div v-for="project in filteredProjects" :key="project.id" class="project" @click="goToProject(project.title)">
          <h2>Titre : {{ project.title }}</h2>
          <p>Entreprise: {{ project.compagnies && project.compagnies.length > 0 ? project.compagnies[0].name : 'N/A' }}</p>
          <p>État d'avancement: {{ project.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      projects: [],
      participantEmails: [],
      filters: {
        projectName: '',
        projectStatus: '',
        startDate: '',
        endDate: '',
        participantEmail: '',
      },
      loading: true,
    };
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => {
        const projectStartDate = new Date(this.formatDateForComparison(project.start_date));
        const projectEndDate = new Date(this.formatDateForComparison(project.end_date));
        const filterStartDate = this.filters.startDate ? new Date(this.filters.startDate) : null;
        const filterEndDate = this.filters.endDate ? new Date(this.filters.endDate) : null;

        return (
          (!this.filters.projectName || project.title.includes(this.filters.projectName)) &&
          (!this.filters.projectStatus || project.status === this.filters.projectStatus) &&
          (!filterStartDate || projectStartDate >= filterStartDate) &&
          (!filterEndDate || projectEndDate <= filterEndDate) &&
          (!this.filters.participantEmail || project.participants.some(p => p.email === this.filters.participantEmail))
        );
      });
    },
  },
  methods: {
    async fetchProjects() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token non trouvé dans localStorage');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8082/api/user/participations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.projects = response.data.map(project => ({
          ...project,
          start_date: this.formatDate(project.start_date),
          end_date: this.formatDate(project.end_date),
        }));
        console.log("Projets récupérés:", this.projects);
        this.participantEmails = [...new Set(this.projects.flatMap(project => project.participants.map(p => p.email)))];
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      } finally {
        this.loading = false;
      }
    },
    applyFilters() {
      console.log('Date de début entrée:', this.filters.startDate);
      console.log('Date de fin entrée:', this.filters.endDate);
      console.log('Projets après filtrage:', this.filteredProjects);
      // La logique de filtrage est déjà gérée par la propriété calculée filteredProjects
    },
    resetFilters() {
      this.filters = {
        projectName: '',
        projectStatus: '',
        startDate: '',
        endDate: '',
        participantEmail: '',
      };
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    goToProject(projectTitle) {
    if (!projectTitle) {
        console.error("Le titre du projet est invalide !");
        return;
    }
    this.$router.push({ name: 'Description', params: { title: projectTitle } });
    },

    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    },
    formatDateForComparison(date) {
      const [day, month, year] = date.split('-');
      return `${year}-${month}-${day}`;
    },
  },
  mounted() {
    this.fetchProjects();
  },
};
</script>

<style scoped>
.home-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
}

.dashboard-button {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dashboard-button:hover {
  background-color: #2980b9;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.filter-row input,
.filter-row select,
.filter-row button {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.filter-row button {
  flex: 0 0 auto;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  border: none;
}

.filter-row button:hover {
  background-color: #2980b9;
}

.projects {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50%;
  margin-left: 25%;
}

.project {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.project:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.project h2 {
  margin: 0 0 10px;
  text-align: center;
}

.project p {
  margin: 5px 0;
  text-align: left;
}
</style>