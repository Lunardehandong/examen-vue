<template>
  <div class="container">
    <h1>Iniciar Sesión</h1>

    <form class="form" @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input v-model="email" type="email" id="email" placeholder="usuario@correo.com" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" id="password" placeholder="Tu contraseña" required />
      </div>

      <button type="submit" class="btn">Entrar</button>

      <p v-if="error" class="error">{{ error }}</p>

      <p class="text-link">
        ¿No tienes cuenta?
        <router-link to="/register">Regístrate aquí</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    loginUser() {
      const userData = JSON.parse(localStorage.getItem("usuarioRegistrado"));
      if (!userData) {
        this.error = "No hay usuarios registrados.";
        return;
      }

      if (this.email === userData.email && this.password === userData.password) {
        localStorage.setItem("usuarioLogueado", true);
        this.$router.push("/hospitales");
      } else {
        this.error = "Correo o contraseña incorrectos.";
      }
    },
  },
};
</script>

<style scoped>
/* mismo estilo anterior */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;
}
h1 {
  margin-bottom: 20px;
  color: #333;
}
.form {
  background: #fff;
  padding: 25px 30px;
  border-radius: 10px;
  width: 320px;
  border: 1px solid #ddd;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.btn {
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: #0056b3;
}
.text-link {
  text-align: center;
  margin-top: 15px;
}
a {
  color: #007bff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
