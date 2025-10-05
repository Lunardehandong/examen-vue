<template>
  <div class="container">
    <div class="header">
      <h1>Hospitales Registrados</h1>
      <button class="btn-logout" @click="cerrarSesion">Cerrar sesión</button>
    </div>

    <div class="hospitales">
      <p>Aquí se mostrará la lista de hospitales.</p>
      <router-link to="/hospitales/nuevo" class="btn">+ Nuevo hospital</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HospitalList",
  methods: {
    cerrarSesion() {
      // Elimina la sesión del usuario
      localStorage.removeItem("usuarioLogueado");

      // Redirige al login
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background: #f2f2f2;
  height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

h1 {
  color: #333;
  margin: 0;
}

.hospitales {
  background: white;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.btn {
  display: inline-block;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
}
.btn:hover {
  background-color: #0056b3;
}

.btn-logout {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}
.btn-logout:hover {
  background-color: #b02a37;
}
</style>
