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
        <input type="text" v-model="form.username" placeholder="Identifiant" required />
        <input v-if="!isLogin" type="email" v-model="form.email" placeholder="Email" required />
        <input type="password" v-model="form.password" placeholder="Mot de passe" required />
        <input v-if="!isLogin" type="password" v-model="form.confirmPassword" placeholder="Confirmer le mot de passe" required />
        <button type="submit">{{ isLogin ? "Connexion" : "Inscription" }}</button>
      </form>
      <!--TODO : enlever mdp oublié si pas fait -->
      <a v-if="isLogin" href="#">Mot de passe oublié ?</a>
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
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errorMessage : null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const endpoint = this.isLogin ? "/api/login" : "/api/register";
        const payload = this.isLogin
          ? { username: this.form.username, password: this.form.password }
          : this.form;

        const response = await axios.post(endpoint, payload);
        console.log("Réponse du serveur :", response.data);

        // Redirect only after successful login
        if (this.isLogin && response.status === 200) {  //check for successful response
          this.$emit('login-success', response.data.username); // Emit un événement pour notifier App.vue
          this.$router.push("/home");// Redirige vers la page produits
        } else if (!this.isLogin && response.status === 201) { // Example for successful registration
          this.isLogin = true; // Switch to login after successful registration
          // Optionally, display a success message
        }

      } catch (error) {
        console.error("Erreur :", error);
        // Handle errors more gracefully, e.g., display an error message to the user
        if (error.response) {
          console.error("Server Error Details:", error.response.data); // Log server error details
          // Display a user-friendly error message based on the error.response.data
        } else if (error.request) {
          console.error("Request Error:", error.request);
          // Display a message indicating no response was received
        } else {
          console.error("General Error:", error.message);
          // Display a general error message
        }
      }
    },
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
  width: 400px; /* Adjust as needed */
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.logo {
  width: 150px; /* Adjust size as needed */
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
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

.tabs .active {
  background: #3498db;
  color: white;
}

.tabs button:hover {
  background-color: #2980b9; /* Darker shade on hover */
}


form input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Include padding in width */
  transition: border-color 0.3s ease; /* Smooth border transition */
}

form input:focus {
  border-color: #3498db; /* Highlight border on focus */
  outline: none; /* Remove default outline */
  box-shadow: 0 0 5px rgba(#3498db, 0.2); /* Add a subtle shadow */
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