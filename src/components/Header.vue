<template>
  <header>
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo">
    </div>
    <!-- probleme de récup du firstName -->
    <!-- <div class="user-info">
      <span>Bonjour {{ firstName }}</span>
    </div> -->
    <div class="icons">
      <div class="notifications">
        <button>
          <i class="fas fa-bell"></i>
        </button>
      </div>
      <div class="messages">
        <button>
          <i class="fas fa-envelope"></i>
        </button>
      </div>
      <div class="profile">
        <button>
          <i class="fas fa-user-circle"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    firstName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f0f0f0; /* Couleur de fond de l'en-tête */
}

.logo img {
  width: 60px; /* Ajustez la taille du logo */
  height: auto;
}

.user-info {
  font-weight: bold;
}

.icons {
  display: flex;
  flex-direction: row-reverse; /* Aligne les icônes à droite */
}

.notifications button,
.messages button,
.profile button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin-left: 10px; /* Ajustez l'espacement entre les icônes */
}
</style>