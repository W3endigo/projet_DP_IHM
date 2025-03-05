<template>
  <div class="modal-container">
    <div class="modal">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <div class="tabs">
        <button :class="{ active: isLogin }" @click="isLogin = true">Connexion</button>
        <button :class="{ active: !isLogin }" @click="isLogin = false">Inscription</button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <input v-if="!isLogin" type="text" v-model="form.lastName" placeholder="Nom" required />
        <input v-if="!isLogin" type="text" v-model="form.firstName" placeholder="Prénom" required />
        <select v-if="!isLogin" v-model="form.company">
          <option value="">Sélectionnez une entreprise (optionnel)</option>
          <option v-for="company in companies" :key="company.id" :value="company.name">{{ company.name }}</option>
        </select>
        <input type="email" v-model="form.email" placeholder="Email" required />
        <input type="password" v-model="form.password" placeholder="Mot de passe" required />
        <input v-if="!isLogin" type="password" v-model="form.confirmPassword" placeholder="Confirmer le mot de passe" required />
        <button type="submit">{{ isLogin ? "Connexion" : "Inscription" }}</button>
      </form>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
   data() {
    return {
      isLogin: true,
      form: {
        lastName: "",
        firstName: "",
        company: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errorMessage: null,
      companies: [],
    };
  },
  methods: {
    validatePasswords() {
      if (!this.isLogin && this.form.password !== this.form.confirmPassword) {
        console.log("mdp pas pareil")
        this.errorMessage = "Les mots de passe ne correspondent pas.";
        return false;
      }
      if (this.form.password.length < 8) {
        this.errorMessage = "Le mot de passe doit contenir au minimum 8 caractères.";
        return false;
      }
      return true;
    },
    async handleSubmit() {
       if (!this.validatePasswords()) {
        return;
      }
      try {
        if (this.isLogin) {
          // Connexion (PUT /api/auth/login)
          const response = await axios.put("http://api_projet:8082/api/auth/login", {
            email: this.form.email,
            password: this.form.password,
          });


          // Stocker le JWT dans localStorage
          localStorage.setItem("token", response.data.token);
         

          // Émettre l'événement avec le prénom de l'utilisateur
          this.$emit("login-success", this.form.firstName); 
          

          // Rediriger vers page accueil
          this.$router.push("/create-project"); //changer pour home
        } else {
          // Si aucune entreprise n'est sélectionnée, définir company à null
          const company = this.form.company || null;

          //trouver solution pour company null
          await axios.post("http://api_projet:8082/api/auth/register", {
            lastName: this.form.lastName,
            firstName: this.form.firstName,
            company: company,
            email: this.form.email,
            password: this.form.password,
          });

          // Connexion automatique après inscription
          const loginResponse = await axios.put("http://api_projet:8082/api/auth/login", {
            email: this.form.email,
            password: this.form.password,
          });

          // Stocker le JWT dans localStorage
          localStorage.setItem("token", loginResponse.data.token);

          // Rediriger vers /home
          this.$emit("login-success", this.form.firstName); 
          this.$router.push("/create-project"); //changer pour home
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Une erreur est survenue.";
      }
    },async fetchCompanies() {
      try {
        const response = await axios.get("http://api_projet:8082/api/companies");
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
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.logo {
  width: 150px;
  height: auto;
  margin-bottom: 10px;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  cursor: pointer;
  border: none;
  background: lightgray;
  transition: background-color 0.3s ease;
}

.tabs .active {
  background: #3498db;
  color: white;
}

.tabs button:hover {
  background-color: #2980b9; 
}


form input, form select {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  transition: border-color 0.3s ease; 
}

form input:focus, form select:focus {
  border-color: #3498db;
  outline: none; 
  box-shadow: 0 0 5px rgba(#3498db, 0.2);
}


form button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease; /* Smooth transition */
}

form button:hover {
  background-color: #2980b9; /* Darker shade on hover */
}

a {
  display: block;
  margin-top: 10px;
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s ease; /* Smooth color transition */
}

a:hover {
  color: #2980b9; /* Darker shade on hover */
}
</style>