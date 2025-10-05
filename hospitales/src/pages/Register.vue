<template>
  <div class="container">
    <h1>Registro de Usuario</h1>

    <form class="form" @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Nombre completo</label>
        <input v-model="name" type="text" id="name" placeholder="Tu nombre" required />
      </div>

      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input v-model="email" type="email" id="email" placeholder="usuario@correo.com" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" id="password" placeholder="Tu contraseña" required />
      </div>

      <button type="submit" class="btn">Registrar</button>

      <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

      <p class="text-link">
        ¿Ya tienes cuenta?
        <router-link to="/">Inicia sesión aquí</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      mensaje: "",
    };
  },
  methods: {
    registerUser() {
      const nuevoUsuario = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));
      this.mensaje = "Usuario registrado correctamente ✅";
      setTimeout(() => this.$router.push("/"), 1500);
    },
  },
};
</script>

<style scoped>
/* mismo estilo del login */
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
.mensaje {
  color: green;
  text-align: center;
  margin-top: 10px;
}
</style>
