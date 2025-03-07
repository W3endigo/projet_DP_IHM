<template>
  <div class="dashboard-container">
    <div class="sidebar">
      <h2>Statistiques</h2>
      <div class="stats-container">
        <div class="stat-box">
          <p><strong>Nombre de projets:</strong> {{ projects.length }}</p>
        </div>
        <div class="stat-box">
          <p><strong>Nombre d'équipes:</strong> 7</p>
        </div>
      </div>
      <h3>Liste des projets</h3>
      <div class="projects">
        <div v-for="project in projects" :key="project.id" class="project">
          <h4>{{ project.title }}</h4>
          <p>Entreprise: {{ project.compagnies && project.compagnies.length > 0 ? project.compagnies[0].name : 'N/A' }}</p>
          <p>État d'avancement: {{ project.status }}</p>
        </div>
      </div>
    </div>
    <div class="main-content">
      <h2>Statuts des projets</h2>
      <canvas id="projectStatusChart"></canvas>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  data() {
    return {
      projects: [],
      chartInstance: null,
    };
  },
  async mounted() {
    await this.fetchProjects();
    this.$nextTick(() => {
      this.renderChart();
    });
  },
  methods: {
    async fetchProjects() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8082/api/user/participations', {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.projects = response.data;

        console.log('Données des projets:', this.projects); // 👀 Vérification des données reçues
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    },

    renderChart() {
      const ctx = document.getElementById('projectStatusChart');
      if (!ctx) return;

      // Compter les projets par statut
      const statusCount = { EN_COURS: 0, ANNULE: 0, TERMINE: 0 };
      this.projects.forEach((project) => {
        if (statusCount[project.status] !== undefined) {
          statusCount[project.status]++;
        }
      });

      // Supprimer l'ancien graphique s'il existe
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Créer le graphique
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['EN COURS', 'ANNULÉ', 'TERMINÉ'],
          datasets: [
            {
              label: 'Nombre de projets',
              data: [statusCount.EN_COURS, statusCount.ANNULE, statusCount.TERMINE],
              backgroundColor: ['#3498db', '#e74c3c', '#2ecc71'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    goToProject(project) {
      this.$router.push({ name: 'description', params: { title: project.title } });
    },
  },
  watch: {
    projects: {
      handler() {
        this.renderChart();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.sidebar {
  width: 40%;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.stats-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-box {
  flex: 1;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.projects {
  margin-top: 20px;
}

.project {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.main-content {
  width: 60%;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
}
</style>