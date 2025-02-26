<template>
  <div>
    <Header :username="username" />
    <h1>Liste des Projets</h1>
    <div class="search-filter">
      <input type="text" v-model="searchQuery" placeholder="Rechercher par nom..." />
      <select v-model="selectedType">
        <option value="">Tous les types</option>
        <option value="type1">Type 1</option>
        <option value="type2">Type 2</option>
        <!-- Ajoutez d'autres types ici -->
      </select>
      <input type="date" v-model="startDate" placeholder="Date de début" />
      <input type="date" v-model="endDate" placeholder="Date de fin" />
      <select v-model="selectedAgency">
        <option value="">Toutes les agences</option>
        <option value="agency1">Agence 1</option>
        <option value="agency2">Agence 2</option>
        <!-- Ajoutez d'autres agences ici -->
      </select>
    </div>
    <ul>
      <li v-for="project in filteredProjects" :key="project.id">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
        <p>Gestionnaire: {{ project.manager }}</p>
        <p>Début: {{ project.startDate }} - Fin: {{ project.endDate }}</p>
        <p>Agence: {{ project.agency }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
  data() {
    return {
      username: 'lou', // Replace with the actual username
      searchQuery: '',
      selectedType: '',
      startDate: '',
      endDate: '',
      selectedAgency: '',
      projects: [
        { id: 1, name: 'Projet A', description: 'Description A', manager: 'Gestionnaire A', startDate: '2023-01-01', endDate: '2023-06-01', agency: 'agency1' },
        { id: 2, name: 'Projet B', description: 'Description B', manager: 'Gestionnaire B', startDate: '2023-02-01', endDate: '2023-07-01', agency: 'agency2' },
        // Ajoutez d'autres projets ici
      ],
    };
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => {
        return (
          project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.selectedType === '' || project.type === this.selectedType) &&
          (this.startDate === '' || new Date(project.startDate) >= new Date(this.startDate)) &&
          (this.endDate === '' || new Date(project.endDate) <= new Date(this.endDate)) &&
          (this.selectedAgency === '' || project.agency === this.selectedAgency)
        );
      });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.search-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-filter input,
.search-filter select {
  padding: 0.6em 1.2em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: border-color 0.25s;
}

.search-filter input:focus,
.search-filter select:focus {
  border-color: #646cff;
  outline: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  margin: 5px 0;
  background-color: #1a1a1a;
  color: rgba(255, 255, 255, 0.87);
  border-radius: 5px;
  transition: background-color 0.25s;
  font-family: 'Roboto', sans-serif;
}

li:hover {
  background-color: #646cff;
}

h1 {
  font-size: 2em;
  font-family: 'Roboto', sans-serif;
}

h2 {
  font-size: 1.5em;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

p {
  margin: 5px 0;
  font-size: 1em;
  font-family: 'Roboto', sans-serif;
}
</style>